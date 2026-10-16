import React, { useEffect, useState } from "react";
import { AbsoluteFill, Freeze, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useDelayRender } from "remotion";
import { loadFonts } from "../lib/fonts";
import { Captions } from "./Captions";
import { LAYOUT, SRC, TIMING } from "./config";
import { DiagnosisMotion, StatMotion } from "./Motions";
import { Opener } from "./Opener";
import { Outro } from "./Outro";
import { TL } from "./timeline";

const FADE = 2; // frames of audio micro-fade at every cut (cuts sit in silences) to avoid clicks
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

/** Small white logo, top centre, inside the safe area. Enters when the opener hands over, leaves before the closing screen. */
const Watermark: React.FC = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [TL.openerEnd - 2, TL.openerEnd + 16, TL.speechFrames + TIMING.outroHold - 4, TL.speechFrames + TIMING.outroHold + 6], [0, 0.9, 0.9, 0], clampX);
  return <Img src={staticFile("passoni/logo-white.png")} style={{ position: "absolute", top: LAYOUT.logoTop, left: (1080 - LAYOUT.logoWidth) / 2, width: LAYOUT.logoWidth, opacity: o, filter: "drop-shadow(0 1px 8px rgba(20,16,12,0.30))" }} />;
};

export const Passoni: React.FC = () => {
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading Poppins"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle, continueRender]);
  const last = TL.segments[TL.segments.length - 1];
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {TL.segments.map((s) => (
        <Sequence key={s.index} from={s.outStart} durationInFrames={s.length} premountFor={30}>
          <Clip index={s.index} trimBefore={s.srcStart} trimAfter={s.srcEnd} length={s.length} />
        </Sequence>
      ))}
      {/* last frame held under the closing screen */}
      <Sequence from={TL.speechFrames} durationInFrames={TIMING.outroFrames}>
        <AbsoluteFill style={{ transform: `scale(${SRC.zoom[last.index % SRC.zoom.length][1]})`, transformOrigin: SRC.zoomOrigin }}>
          <Freeze frame={0}>
            <OffthreadVideo src={staticFile(SRC.videoFile)} trimBefore={TL.lastSourceFrame} muted style={fill} />
          </Freeze>
        </AbsoluteFill>
      </Sequence>
      <Watermark />
      <StatMotion />
      <DiagnosisMotion />
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
