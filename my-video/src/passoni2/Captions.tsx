import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "../config/theme";
import { LAYOUT, PC } from "./config";
import { CaptionPage, PAGE_LIST } from "./pages";
import { TL } from "./timeline";

const ease = Easing.out(Easing.cubic);
const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Page: React.FC<{ page: CaptionPage; onLight: boolean; frame: number }> = ({ page, onLight, frame }) => {
  const local = frame - page.from;
  const len = page.to - page.from;
  const pageOpacity = interpolate(local, [0, 5], [0, 1], clampX) * interpolate(local, [len - 5, len], [1, 0], clampX);
  const pageScale = interpolate(local, [0, 12], [0.985, 1], { ...clampX, easing: ease });
  const rise = interpolate(local, [0, 10], [10, 0], { ...clampX, easing: ease });
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: LAYOUT.captionY - 60, height: 120, display: "flex", justifyContent: "center", alignItems: "center", opacity: pageOpacity, transform: `translateY(${rise}px) scale(${pageScale})` }}>
      <div
        style={{
          display: "flex",
          gap: "0.26em",
          whiteSpace: "nowrap",
          alignItems: "center",
          fontFamily: FONTS.family,
          fontSize: LAYOUT.captionFont,
          lineHeight: 1.1,
          letterSpacing: "0.005em",
          padding: onLight ? 0 : "16px 36px 18px",
          borderRadius: 999,
          background: onLight ? "none" : PC.glass,
          backdropFilter: onLight ? undefined : "blur(10px)",
        }}
      >
        {page.words.map((w, i) => {
          const t = frame - w.frame;
          const o = interpolate(t, [-1, 5], [0.3, 1], { ...clampX, easing: ease });
          const color = onLight ? (w.hl ? "#8A7860" : PC.ink) : w.hl ? PC.beige : PC.white;
          return (
            <span key={i} style={{ opacity: o, color, fontWeight: w.hl ? FONTS.bold : FONTS.semiBold, textShadow: onLight ? "none" : "0 1px 10px rgba(20,16,12,0.30)" }}>
              {w.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/** Short pages at the bottom (above the Reels UI), revealed word by word with the speech. */
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {PAGE_LIST.map((p, i) => (frame >= p.from && frame <= p.to ? <Page key={i} page={p} frame={frame} onLight={p.words[0].frame < TL.openerEnd} /> : null))}
    </AbsoluteFill>
  );
};
