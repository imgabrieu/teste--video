import React, { useEffect, useMemo, useState } from "react";
import { AbsoluteFill, Easing, Freeze, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useDelayRender } from "remotion";
import { FONTS } from "../config/theme";
import { loadFonts } from "../lib/fonts";
import { Captions } from "./Captions";
import { LAYOUT, SC, TIMING } from "./config";
import { buildPages } from "./pages";
import { createTimeline } from "./timeline";
import type { SerieWord, SeriePart } from "./types";

const FADE = 2;
const fill: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };
const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.out(Easing.cubic);
const ZOOM: [number, number][] = [
  [1.0, 1.03],
  [1.03, 1.05],
  [1.0, 1.035],
  [1.035, 1.055],
];

export type SerieProps = {
  part: SeriePart;
  words: Record<number, SerieWord>;
  label: string; // "PARTE 1"
  cta: { line1: string; chip: string } | null;
  /** photo+footage opening (source seconds): the photo pair is on screen while the speaker talks */
  hook: { endSrc: number; stats: { fromSrc: number; toSrc: number; side: "left" | "right"; value: string; label: string }[] } | null;
  tags: { fromSrc: number; toSrc: number; file?: number; kicker: string; text: string }[];
};

const Clip: React.FC<{ file: string; first: boolean; index: number; trimBefore: number; trimAfter: number; length: number }> = ({ file, first, index, trimBefore, trimAfter, length }) => {
  const frame = useCurrentFrame();
  const [a, b] = ZOOM[index % ZOOM.length];
  const scale = interpolate(frame, [0, Math.max(1, length - 1)], [a, b], clampX);
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 40%" }}>
      <OffthreadVideo
        src={staticFile(file)}
        trimBefore={trimBefore}
        trimAfter={trimAfter}
        style={fill}
        volume={(f) => (first ? Math.min(1, (length - 1 - f) / FADE) : Math.max(0, Math.min(1, f / FADE, (length - 1 - f) / FADE)))}
      />
    </AbsoluteFill>
  );
};

const Pair: React.FC<{ o: number }> = ({ o }) => {
  const { pairWidth } = LAYOUT.split;
  const gap = 10;
  const w = (pairWidth - gap) / 2;
  const item = (src: string, label: string) => (
    <div style={{ position: "relative", width: w, height: w, borderRadius: 10, overflow: "hidden", boxShadow: "0 18px 44px rgba(13,43,69,0.14)" }}>
      <Img src={staticFile(src)} style={fill} />
      <div style={{ position: "absolute", left: 14, bottom: 14, fontFamily: FONTS.family, fontWeight: FONTS.semiBold, fontSize: 18, letterSpacing: "0.28em", color: SC.navy, background: "rgba(255,255,255,0.94)", padding: "8px 8px 8px 16px", borderRadius: 999 }}>{label}</div>
    </div>
  );
  return (
    <div style={{ display: "flex", gap, width: pairWidth, opacity: o }}>
      {item("serie/antes.jpg", "ANTES")}
      {item("serie/depois.jpg", "DEPOIS")}
    </div>
  );
};

const Inner: React.FC<SerieProps> = ({ part, words, label, cta, hook, tags }) => {
  const frame = useCurrentFrame();
  const tl = useMemo(() => createTimeline(part), [part]);
  const pages = useMemo(() => buildPages(part, words, tl), [part, words, tl]);
  const { panelTop, shift, radius, pairTop, pairWidth, kickerTop } = LAYOUT.split;

  // split progress: 1 while the photos are on screen (hook), eases out before the footage returns to full frame
  const hookEnd = hook ? tl.srcToOut(hook.endSrc) : 0;
  const s = hook ? interpolate(frame, [0, 8, hookEnd - TIMING.splitRamp, hookEnd], [1, 1, 1, 0], { ...clampX, easing: Easing.inOut(Easing.cubic) }) : 0;
  const last = tl.segments[tl.segments.length - 1];
  const gap = 10;
  const half = (pairWidth - gap) / 2;
  const left0 = (1080 - pairWidth) / 2;

  const labelO = interpolate(frame, [0, 6, 36, 48], [0, 1, 1, 0], clampX);
  const pairIn = interpolate(frame, [0, 14], [0, 1], clampX);
  const pairY = interpolate(frame, [0, 22], [16, 0], { ...clampX, easing: ease });

  return (
    <AbsoluteFill style={{ backgroundColor: SC.white }}>
      {/* footage (full frame, or in a rounded panel while the photos are shown) */}
      <AbsoluteFill style={{ clipPath: `inset(${panelTop * s}px 0 0 0 round ${radius * s}px ${radius * s}px 0 0)` }}>
        <AbsoluteFill style={{ transform: `translateY(${shift * s}px)`, backgroundColor: "#000" }}>
          {tl.segments.map((seg) => (
            <Sequence key={seg.index} from={seg.outStart} durationInFrames={seg.length} premountFor={30}>
              <Clip file={part.videoFiles[seg.file]} first={seg.index === 0} index={seg.index} trimBefore={seg.srcStart} trimAfter={seg.srcEnd} length={seg.length} />
            </Sequence>
          ))}
          <Sequence from={tl.speechFrames} durationInFrames={TIMING.outroFrames}>
            <AbsoluteFill style={{ transform: `scale(${ZOOM[last.index % ZOOM.length][1]})`, transformOrigin: "50% 40%" }}>
              <Freeze frame={0}>
                <OffthreadVideo src={staticFile(part.videoFiles[tl.lastFile])} trimBefore={tl.lastSourceFrame} muted style={fill} />
              </Freeze>
            </AbsoluteFill>
          </Sequence>
        </AbsoluteFill>
      </AbsoluteFill>

      {hook && (
        <div style={{ position: "absolute", inset: 0, opacity: Math.min(1, s * 1.4), pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: kickerTop, width: "100%", textAlign: "center", fontFamily: FONTS.family, fontWeight: FONTS.semiBold, fontSize: 21, letterSpacing: "0.44em", paddingLeft: "0.44em", color: SC.navy, opacity: labelO }}>{label}</div>
          <div style={{ position: "absolute", top: pairTop + (1 - s) * 14 + pairY, left: left0 }}>
            <Pair o={pairIn} />
          </div>
          {hook.stats.map((st, i) => {
            const a = tl.srcToOut(st.fromSrc);
            const b = tl.srcToOut(st.toSrc);
            if (frame < a || frame > b) return null;
            const l = frame - a;
            const o = interpolate(l, [0, 10], [0, 1], clampX) * interpolate(frame, [b - 8, b], [1, 0], clampX);
            const y = interpolate(l, [0, 14], [10, 0], { ...clampX, easing: ease });
            const lineW = interpolate(l, [0, 14], [0, 56], { ...clampX, easing: ease });
            const cx = left0 + (st.side === "left" ? half / 2 : half + gap + half / 2);
            return (
              <div key={i} style={{ position: "absolute", top: pairTop + half + 26, left: cx - 250, width: 500, textAlign: "center", fontFamily: FONTS.family, color: SC.navy, opacity: o, transform: `translateY(${y}px)` }}>
                <div style={{ margin: "0 auto 10px", width: lineW, height: 2, background: SC.navy }} />
                <div style={{ fontWeight: FONTS.bold, fontSize: 62, lineHeight: 1.08 }}>{st.value}</div>
                <div style={{ fontWeight: FONTS.semiBold, fontSize: 20, letterSpacing: "0.3em", paddingLeft: "0.3em", color: SC.navySoft, marginTop: 4 }}>{st.label}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* step tags */}
      {tags.map((t, i) => {
        const a = tl.srcToOut(t.fromSrc, t.file ?? 0);
        const b = tl.srcToOut(t.toSrc, t.file ?? 0);
        if (frame < a || frame > b) return null;
        const l = frame - a;
        const o = interpolate(l, [0, 10], [0, 1], clampX) * interpolate(frame, [b - 8, b], [1, 0], clampX);
        const x = interpolate(l, [0, 14], [-18, 0], { ...clampX, easing: ease });
        return (
          <div key={i} style={{ position: "absolute", top: LAYOUT.tagTop, left: LAYOUT.tagLeft, opacity: o, transform: `translateX(${x}px)`, display: "flex", alignItems: "center", gap: 14, background: SC.navyGlass, backdropFilter: "blur(8px)", borderRadius: 999, padding: "12px 28px 13px 24px", fontFamily: FONTS.family, color: SC.white }}>
            <span style={{ fontWeight: FONTS.bold, fontSize: 21, letterSpacing: "0.22em" }}>{t.kicker}</span>
            <span style={{ width: 1.5, height: 22, background: "rgba(255,255,255,0.55)" }} />
            <span style={{ fontWeight: FONTS.semiBold, fontSize: 24, letterSpacing: "0.02em" }}>{t.text}</span>
          </div>
        );
      })}

      {/* captions are hidden while the CTA card is up */}
      <Sequence from={0} durationInFrames={tl.speechFrames}>
        <Captions pages={pages} dropFor={() => s * LAYOUT.split.captionDrop} />
      </Sequence>

      {cta && (
        <Sequence from={tl.speechFrames} durationInFrames={TIMING.outroFrames}>
          <CtaCard line1={cta.line1} chip={cta.chip} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};

const CtaCard: React.FC<{ line1: string; chip: string }> = ({ line1, chip }) => {
  const f = useCurrentFrame();
  const v0 = TIMING.outroHold;
  const veil = interpolate(f, [v0, v0 + TIMING.outroVeil], [0, 1], { ...clampX, easing: Easing.inOut(Easing.cubic) });
  const t = f - (v0 + TIMING.outroVeil - 2);
  const o1 = interpolate(t, [0, 16], [0, 1], clampX);
  const y1 = interpolate(t, [0, 22], [20, 0], { ...clampX, easing: ease });
  const lw = interpolate(t, [10, 30], [0, 72], { ...clampX, easing: ease });
  const o2 = interpolate(t, [18, 34], [0, 1], clampX);
  const y2 = interpolate(t, [18, 38], [16, 0], { ...clampX, easing: ease });
  return (
    <AbsoluteFill style={{ backgroundColor: SC.white, opacity: veil }}>
      <div style={{ position: "absolute", top: 760, width: "100%", textAlign: "center", fontFamily: FONTS.family }}>
        <div style={{ fontWeight: FONTS.bold, fontSize: 92, lineHeight: 1.1, color: SC.navy, opacity: o1, transform: `translateY(${y1}px)` }}>{line1}</div>
        <div style={{ margin: "34px auto 38px", width: lw, height: 2, background: SC.navy }} />
        <div style={{ display: "inline-block", opacity: o2, transform: `translateY(${y2}px)`, background: SC.navy, color: SC.white, fontWeight: FONTS.semiBold, fontSize: 44, borderRadius: 999, padding: "20px 52px 22px" }}>{chip}</div>
      </div>
    </AbsoluteFill>
  );
};

export const Serie: React.FC<SerieProps> = (props) => {
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading Poppins"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle, continueRender]);
  return <Inner {...props} />;
};
