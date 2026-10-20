import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "../config/theme";
import { LAYOUT, SC } from "./config";
import type { CaptionPage } from "./pages";

const ease = Easing.out(Easing.cubic);
const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Page: React.FC<{ page: CaptionPage; frame: number; drop: number }> = ({ page, frame, drop }) => {
  const local = frame - page.from;
  const len = page.to - page.from;
  const o = interpolate(local, [0, 5], [0, 1], clampX) * interpolate(local, [len - 5, len], [1, 0], clampX);
  const rise = interpolate(local, [0, 10], [10, 0], { ...clampX, easing: ease });
  const scale = interpolate(local, [0, 12], [0.985, 1], { ...clampX, easing: ease });
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: LAYOUT.captionY + drop - 60, height: 120, display: "flex", justifyContent: "center", alignItems: "center", opacity: o, transform: `translateY(${rise}px) scale(${scale})` }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.26em", whiteSpace: "nowrap", fontFamily: FONTS.family, fontSize: LAYOUT.captionFont, lineHeight: 1.1, padding: "15px 36px 17px", borderRadius: 999, background: SC.navyGlass, backdropFilter: "blur(8px)" }}>
        {page.words.map((w, i) => {
          const t = frame - w.frame;
          const wo = interpolate(t, [-1, 5], [0.32, 1], { ...clampX, easing: ease });
          return (
            <span
              key={i}
              style={{
                opacity: wo,
                fontWeight: w.hl ? FONTS.bold : FONTS.semiBold,
                color: w.hl ? SC.navy : SC.white,
                background: w.hl ? SC.white : "none",
                padding: w.hl ? "0 0.24em" : 0,
                borderRadius: w.hl ? 14 : 0,
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/** Short pages in a navy glass chip (no gradient), words revealed with the speech; highlights = white chip with navy text. */
/** `drop` (px) moves the chip lower while the photos are on screen, so it stays clear of the speaker's face. */
export const Captions: React.FC<{ pages: CaptionPage[]; dropFor?: (frame: number) => number }> = ({ pages, dropFor }) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill>{pages.map((p, i) => (frame >= p.from && frame <= p.to ? <Page key={i} page={p} frame={frame} drop={dropFor ? dropFor(frame) : 0} /> : null))}</AbsoluteFill>;
};
