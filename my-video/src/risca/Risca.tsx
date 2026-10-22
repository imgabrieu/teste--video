import React, { useEffect, useMemo, useState } from "react";
import { AbsoluteFill, Easing, Freeze, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useDelayRender } from "remotion";
import { FONTS } from "../config/theme";
import { loadFonts } from "../lib/fonts";
import { RC, END, LAYOUT, SRC } from "./config";
import PHOTO from "./photo.json";
import { TL } from "./timeline";
import { RPAGES, RWORDS } from "./words";

const FADE = 2;
const fill: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };
const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.out(Easing.cubic);
const easeBack = Easing.out(Easing.back(1.4));

const Clip: React.FC<{ index: number; trimBefore: number; trimAfter: number; length: number }> = ({ index, trimBefore, trimAfter, length }) => {
  const frame = useCurrentFrame();
  const [a, b] = SRC.zoom[index % SRC.zoom.length];
  const scale = interpolate(frame, [0, Math.max(1, length - 1)], [a, b], clampX);
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: SRC.zoomOrigin }}>
      <OffthreadVideo src={staticFile(SRC.videoFile)} trimBefore={trimBefore} trimAfter={trimAfter} style={fill} volume={(f) => (index === 0 ? Math.min(1, (length - 1 - f) / FADE) : Math.max(0, Math.min(1, f / FADE, (length - 1 - f) / FADE)))} />
    </AbsoluteFill>
  );
};

type Page = { from: number; to: number; y: number; words: { t: string; frame: number; hl: boolean }[] };

/** photo bottom edge (px) at an output frame, via the source time of the segment it belongs to */
const photoBottomAt = (frame: number): number => {
  const seg = TL.segments.find((s) => frame >= s.outStart && frame < s.outStart + s.length) ?? TL.segments[TL.segments.length - 1];
  const tSrc = (seg.srcStart + Math.min(frame - seg.outStart, seg.length - 1)) / 30;
  const i = Math.max(0, Math.min(PHOTO.length - 1, Math.round(tSrc * 10)));
  return PHOTO[i][1];
};
const HOLD = 14;
const buildPages = (): Page[] => {
  const raw = RPAGES.map(([a, b]) => {
    const ws: Page["words"] = [];
    for (let i = a; i <= b; i++) {
      const w = RWORDS[i];
      if (w) ws.push({ t: w.t, frame: TL.srcToOut(w.s), hl: !!w.hl });
    }
    return ws;
  });
  return raw.map((ws, i) => {
    const from = Math.max(0, ws[0].frame - 1);
    const nextFrom = i + 1 < raw.length ? Math.max(0, raw[i + 1][0].frame - 1) : TL.speechFrames;
    const last = ws[ws.length - 1].frame;
    const to = Math.max(from + 10, Math.min(nextFrom, last + HOLD));
    let bottom = 0;
    for (let f = from; f <= to; f += 3) bottom = Math.max(bottom, photoBottomAt(f));
    const y = Math.max(LAYOUT.minY, Math.min(LAYOUT.maxY, bottom + LAYOUT.below));
    return { from, to, y, words: ws };
  });
};

/** Words enter one by one with the speech (fade + small rise + soft scale); key words in champagne. Fixed band between chin and photo. */
const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const pages = useMemo(buildPages, []);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {pages.map((p, i) => {
        if (frame < p.from || frame > p.to) return null;
        const local = frame - p.from;
        const len = p.to - p.from;
        const exit = interpolate(local, [len - 3, len], [1, 0], clampX);
        // short pages are set bigger, long ones smaller: always inside the safe width
        const chars = p.words.map((w) => w.t).join(" ").length;
        const size = Math.max(54, Math.min(76, Math.round(880 / (chars * 0.585))));
        return (
          <div key={i} style={{ position: "absolute", left: (1080 - LAYOUT.maxWidth) / 2, width: LAYOUT.maxWidth, top: p.y - 60, height: 120, display: "flex", justifyContent: "center", alignItems: "center", gap: "0.27em", whiteSpace: "nowrap", fontFamily: FONTS.family, fontSize: size, lineHeight: 1.1, letterSpacing: "0.003em", opacity: exit }}>
            {p.words.map((w, k) => {
              const t = frame - w.frame;
              const o = interpolate(t, [-1, 4], [0, 1], { ...clampX, easing: ease });
              const rise = interpolate(t, [-1, 7], [16, 0], { ...clampX, easing: ease });
              const sc = interpolate(t, [-1, 8], [0.88, 1], { ...clampX, easing: easeBack });
              return (
                <span key={k} style={{ opacity: o, transform: `translateY(${rise}px) scale(${sc})`, display: "inline-block", color: w.hl ? RC.champagne : RC.white, fontWeight: w.hl ? FONTS.bold : FONTS.semiBold, textShadow: RC.shadow }}>
                  {w.t}
                </span>
              );
            })}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** Closing: soft veil to off-white, logo centred with a very discreet scale; the logo is the last visual element. */
const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const veil = interpolate(f, [END.hold, END.hold + END.veil], [0, 1], { ...clampX, easing: Easing.inOut(Easing.cubic) });
  const t = f - (END.hold + END.veil - 2);
  const o = interpolate(t, [0, 22], [0, 1], clampX);
  const scale = interpolate(t, [0, 70], [0.965, 1.0], { ...clampX, easing: Easing.out(Easing.quad) });
  return (
    <AbsoluteFill style={{ backgroundColor: RC.bg, opacity: veil }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Img src={staticFile("passoni/logo-ink.png")} style={{ width: 520, opacity: o, transform: `scale(${scale})` }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Risca: React.FC = () => {
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading Poppins"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle, continueRender]);
  const last = TL.segments[TL.segments.length - 1];
  return (
    <AbsoluteFill style={{ backgroundColor: RC.bg }}>
      {TL.segments.map((s) => (
        <Sequence key={s.index} from={s.outStart} durationInFrames={s.length} premountFor={30}>
          <Clip index={s.index} trimBefore={s.srcStart} trimAfter={s.srcEnd} length={s.length} />
        </Sequence>
      ))}
      <Sequence from={TL.speechFrames} durationInFrames={END.frames}>
        <AbsoluteFill style={{ transform: `scale(${SRC.zoom[last.index % SRC.zoom.length][1]})`, transformOrigin: SRC.zoomOrigin }}>
          <Freeze frame={0}>
            <OffthreadVideo src={staticFile(SRC.videoFile)} trimBefore={TL.lastSourceFrame} muted style={fill} />
          </Freeze>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={0} durationInFrames={TL.speechFrames}>
        <Captions />
      </Sequence>
      <Sequence from={TL.speechFrames} durationInFrames={END.frames}>
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
