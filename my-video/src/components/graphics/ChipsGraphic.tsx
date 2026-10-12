import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../../config/theme";
import { Panel } from "./Panel";

/** Brand label + chips ticking in one by one (content offered on the platform). */
export const ChipsGraphic: React.FC<{ label: string; items: { frameAt: number; text: string }[]; durationInFrames: number }> = ({ label, items, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Panel durationInFrames={durationInFrames}>
      <div style={{ fontWeight: FONTS.semiBold, fontSize: 30, letterSpacing: "0.16em", textTransform: "uppercase", color: COLORS.whiteSoft, marginBottom: 22 }}>{label}</div>
      <div style={{ display: "flex", gap: 24 }}>
        {items.map((it, i) => {
          const p = spring({ frame: frame - it.frameAt, fps, config: { damping: 13, stiffness: 170 }, durationInFrames: 20 });
          return (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 34px", borderRadius: 999, background: COLORS.white, color: COLORS.navy, fontWeight: FONTS.bold, fontSize: 44, opacity: Math.min(1, p * 1.5), transform: `scale(${0.7 + 0.3 * p})` }}
            >
              <svg width={34} height={34} viewBox="0 0 34 34"><path d="M7 18 L14 25 L27 10" stroke={COLORS.navy} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
              {it.text}
            </div>
          );
        })}
      </div>
    </Panel>
  );
};
