import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../../config/theme";
import { usePalette } from "../../lib/EditContext";
import { Panel } from "./Panel";

/** Label + pills ticking in one by one (wraps onto several lines when `compact`). */
export const ChipsGraphic: React.FC<{ label: string; items: { frameAt: number; text: string }[]; compact?: boolean; durationInFrames: number }> = ({ label, items, compact, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = usePalette();
  const font = compact ? 30 : 38;
  return (
    <Panel durationInFrames={durationInFrames} padding={compact ? "0 36px" : "0 48px"}>
      <div style={{ fontWeight: FONTS.semiBold, fontSize: compact ? 26 : 30, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.78, marginBottom: compact ? 16 : 22 }}>{label}</div>
      <div style={{ display: "flex", gap: compact ? 14 : 24, flexWrap: "wrap", justifyContent: "center" }}>
        {items.map((it, i) => {
          const p = spring({ frame: frame - it.frameAt, fps, config: { damping: 13, stiffness: 170 }, durationInFrames: 20 });
          return (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: compact ? "8px 20px" : "16px 30px", borderRadius: 999, background: pal.chipBg ?? pal.highlightBg, color: pal.chipFg ?? pal.highlightFg, border: pal.light ? `2px solid ${pal.accent}` : undefined, fontWeight: FONTS.bold, fontSize: font, opacity: Math.min(1, p * 1.5), transform: `scale(${0.7 + 0.3 * p})` }}
            >
              <svg width={font * 0.78} height={font * 0.78} viewBox="0 0 34 34"><path d="M7 18 L14 25 L27 10" stroke={pal.chipFg ?? pal.highlightFg} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
              {it.text}
            </div>
          );
        })}
      </div>
    </Panel>
  );
};
