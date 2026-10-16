import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "../config/theme";
import { LAYOUT, PC } from "./config";
import { CaptionPage, PAGE_LIST } from "./pages";
import { TL } from "./timeline";

const ease = Easing.out(Easing.cubic);

const Page: React.FC<{ page: CaptionPage; onLight: boolean; frame: number }> = ({ page, onLight, frame }) => {
  const local = frame - page.from;
  const len = page.to - page.from;
  const pageOpacity = interpolate(local, [len - 5, len], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pageScale = interpolate(local, [0, 12], [0.985, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const y = onLight ? LAYOUT.openerCaptionY : LAYOUT.captionY;
  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        right: 90,
        top: y - 60,
        height: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.26em",
        whiteSpace: "nowrap",
        fontFamily: FONTS.family,
        fontSize: LAYOUT.captionFont,
        letterSpacing: "0.005em",
        lineHeight: 1.1,
        opacity: pageOpacity,
        transform: `scale(${pageScale})`,
      }}
    >
      {page.words.map((w, i) => {
        const t = frame - w.frame;
        const o = interpolate(t, [-1, 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
        const rise = interpolate(t, [-1, 7], [9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
        const color = onLight ? (w.hl ? "#8A7860" : PC.ink) : w.hl ? PC.beige : PC.white;
        return (
          <span
            key={i}
            style={{
              opacity: o,
              transform: `translateY(${rise}px)`,
              color,
              fontWeight: w.hl ? FONTS.bold : FONTS.semiBold,
              textShadow: onLight ? "none" : "0 1px 14px rgba(20,16,12,0.34)",
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};

/** Short pages, revealed word by word with the speech. Dark ink on the light opener, white over the footage. */
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {PAGE_LIST.map((p, i) => (frame >= p.from && frame <= p.to ? <Page key={i} page={p} frame={frame} onLight={p.words[0].frame < TL.openerEnd} /> : null))}
    </AbsoluteFill>
  );
};
