import React, { useEffect, useState } from "react";
import { AbsoluteFill, Easing, Freeze, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useDelayRender } from "remotion";
import { loadFonts } from "../lib/fonts";
import { Captions } from "./Captions";
import { LAYOUT, PC, SRC, TIMING } from "./config";
import { FolliclePill, MonthsMotion } from "./Motions";
import { Opener } from "./Opener";
import { Outro } from "./Outro";
import { PhotoPair } from "./PhotoCard";
import { TL } from "./timeline";

const FADE = 2;
const fill: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };
const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Clip: React.FC<{ index: number; trimBefore: number; trimAfter: number; length: number }> = ({ index, trimBefore, trimAfter, length }) => {
  const frame = useCurrentFrame();
  const [a, b] = SRC.zoom[index % SRC.zoom.length];
  const scale = interpolate(frame, [0, Math.max(1, length - 1)], [a, b], clampX);
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: SRC.zoomOrigin }}>
      <OffthreadVideo src={staticFile(SRC.videoFile)} trimBefore={trimBefore} trimAfter={trimAfter} style={fill} volume={(f) => Math.max(0, Math.min(1, f / FADE, (length - 1 - f) / FADE))} />
    </AbsoluteFill>
  );
};

/** 0 = full-frame footage, 1 = split screen (photos above, footage in a rounded panel below). */
const useSplit = (): number => {
  const frame = useCurrentFrame();
  let s = 0;
  for (const w of TIMING.splits) {
    const a = TL.srcToOut(w.from);
    const b = TL.srcToOut(w.to);
    const k = interpolate(frame, [a, a + TIMING.splitRamp, b - TIMING.splitRamp, b], [0, 1, 1, 0], { ...clampX, easing: Easing.inOut(Easing.cubic) });
    s = Math.max(s, k);
  }
  return s;
};

const Footage: React.FC = () => {
  const s = useSplit();
  const { panelTop, shift, radius } = LAYOUT.split;
  const last = TL.segments[TL.segments.length - 1];
  return (
    <AbsoluteFill style={{ backgroundColor: PC.bg }}>
      <AbsoluteFill style={{ clipPath: `inset(${panelTop * s}px 0 0 0 round ${radius * s}px ${radius * s}px 0 0)` }}>
        <AbsoluteFill style={{ transform: `translateY(${shift * s}px)`, backgroundColor: "#000" }}>
          {TL.segments.map((seg) => (
            <Sequence key={seg.index} from={seg.outStart} durationInFrames={seg.length} premountFor={30}>
              <Clip index={seg.index} trimBefore={seg.srcStart} trimAfter={seg.srcEnd} length={seg.length} />
            </Sequence>
          ))}
          <Sequence from={TL.speechFrames} durationInFrames={TIMING.outroFrames}>
            <AbsoluteFill style={{ transform: `scale(${SRC.zoom[last.index % SRC.zoom.length][1]})`, transformOrigin: SRC.zoomOrigin }}>
              <Freeze frame={0}>
                <OffthreadVideo src={staticFile(SRC.videoFile)} trimBefore={TL.lastSourceFrame} muted style={fill} />
              </Freeze>
            </AbsoluteFill>
          </Sequence>
        </AbsoluteFill>
      </AbsoluteFill>
      {/* photos + ink logo on the light area above the panel */}
      <div style={{ position: "absolute", inset: 0, opacity: s, pointerEvents: "none" }}>
        <Img src={staticFile("passoni2/logo-ink.png")} style={{ position: "absolute", top: LAYOUT.logoCenterTop, left: (1080 - LAYOUT.logoWidth) / 2, width: LAYOUT.logoWidth }} />
        <div style={{ position: "absolute", top: LAYOUT.split.cardTop + (1 - s) * 18, left: (1080 - LAYOUT.split.cardWidth) / 2 }}>
          <PhotoPair width={LAYOUT.split.cardWidth} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Small white logo over the (black) right side of the TV; swaps to the ink logo on the light screens. */
const Watermark: React.FC = () => {
  const frame = useCurrentFrame();
  const s = useSplit();
  const { top, right, width } = LAYOUT.watermark;
  const o =
    interpolate(frame, [TL.openerEnd - 2, TL.openerEnd + 16, TL.speechFrames + TIMING.outroHold - 4, TL.speechFrames + TIMING.outroHold + 6], [0, 0.92, 0.92, 0], clampX) * (1 - s);
  return <Img src={staticFile("passoni2/logo-white.png")} style={{ position: "absolute", top, right, width, opacity: o, filter: "drop-shadow(0 1px 8px rgba(20,16,12,0.30))" }} />;
};

export const Passoni2: React.FC = () => {
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading Poppins"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle, continueRender]);
  return (
    <AbsoluteFill style={{ backgroundColor: PC.bg }}>
      <Footage />
      <Watermark />
      <FolliclePill />
      <MonthsMotion />
      <Sequence from={0} durationInFrames={TL.openerEnd + 1}>
        <Opener />
      </Sequence>
      <Captions />
      <Sequence from={TL.speechFrames} durationInFrames={TIMING.outroFrames}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
