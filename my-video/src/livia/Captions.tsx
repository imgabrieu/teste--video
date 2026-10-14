import React from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../config/theme";
import { f, FPS, Page, PAGES } from "./config";
import { CAP, GRADIENT, L, LAYOUT } from "./theme";

type Timed = { from: number; to: number; words: { t: string; at: number; hl: boolean }[] };

/** Page lifetime: stays until the next page when the gap is small, otherwise lingers ~0.7 s after its last word. */
const timed: Timed[] = PAGES.map((p: Page, i) => {
  const from = f(p[0].s);
  const last = f(p[p.length - 1].s);
  const nextFrom = i + 1 < PAGES.length ? f(PAGES[i + 1][0].s) : Infinity;
  const linger = last + Math.round(0.75 * FPS);
  const to = nextFrom - linger <= 6 ? nextFrom : linger;
  return { from, to: Math.max(to, from + 12), words: p.map((w) => ({ t: w.t, at: f(w.s) - from, hl: !!w.hl })) };
});

const Page: React.FC<{ page: Timed }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const life = page.to - page.from;
  const exit = interpolate(frame, [life - CAP.exitFrames, life], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: "0.28em",
        textAlign: "center",
        fontFamily: FONTS.family,
        fontWeight: 600,
        fontSize: CAP.fontSize,
        lineHeight: CAP.lineHeight,
        letterSpacing: "-0.012em",
        color: L.white,
        textShadow: L.textShadow,
        opacity: exit,
        transform: `translateY(${(1 - exit) * -6}px)`,
      }}
    >
      {page.words.map((w, i) => {
        const local = frame - w.at;
        const p = spring({ frame: local, fps, config: { damping: 200, stiffness: 110, mass: 0.9 }, durationInFrames: CAP.wordInFrames + 8 });
        const fade = interpolate(local, [0, CAP.wordInFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const underline = interpolate(local, [4, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <span
            key={i}
            style={{
              position: "relative",
              display: "inline-block",
              opacity: fade,
              filter: `blur(${(1 - fade) * 5}px)`,
              transform: `translateY(${(1 - p) * CAP.risePx}px) scale(${0.96 + 0.04 * p})`,
              transformOrigin: "50% 80%",
              ...(w.hl ? { color: L.roseSoft, fontWeight: 700, textShadow: `0 0 26px rgba(255,140,200,0.6), ${L.textShadow}` } : {}),
            }}
          >
            {w.t}
            {w.hl && <span style={{ position: "absolute", left: "4%", bottom: "0.02em", height: 5, width: `${92 * underline}%`, borderRadius: 3, background: GRADIENT, boxShadow: "0 0 14px rgba(232,111,168,0.55)" }} />}
          </span>
        );
      })}
    </div>
  );
};

/** Plum scrim keeps white type legible over the cream blouse; captions sit above the social-UI safe area. */
export const Captions: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 880,
        background: "linear-gradient(to top, rgba(58,26,86,0.80) 0%, rgba(74,37,105,0.62) 38%, rgba(74,37,105,0.30) 66%, rgba(74,37,105,0) 100%)",
      }}
    />
    <div style={{ position: "absolute", left: LAYOUT.safeSide, right: LAYOUT.safeSide + 40, bottom: LAYOUT.safeBottom, height: 0 }}>
      {timed.map((p, i) => (
        <Sequence key={i} from={p.from} durationInFrames={p.to - p.from} layout="none">
          <Page page={p} />
        </Sequence>
      ))}
    </div>
  </AbsoluteFill>
);
