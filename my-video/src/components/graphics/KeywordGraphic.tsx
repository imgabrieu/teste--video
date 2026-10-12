import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../../config/theme";
import { Panel } from "./Panel";

/** Big key phrase with a small kicker and an underline that draws in. */
export const KeywordGraphic: React.FC<{ kicker?: string; text: string; durationInFrames: number }> = ({ kicker, text, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 4, fps, config: { damping: 200, stiffness: 120 }, durationInFrames: 20 });
  const line = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Panel durationInFrames={durationInFrames}>
      {kicker && (
        <div style={{ fontWeight: FONTS.semiBold, fontSize: 30, letterSpacing: "0.16em", textTransform: "uppercase", color: COLORS.whiteSoft, opacity: p, marginBottom: 12 }}>{kicker}</div>
      )}
      <div style={{ fontWeight: FONTS.bold, fontSize: text.length > 18 ? 58 : 84, lineHeight: 1.08, letterSpacing: "-0.015em", textAlign: "center", opacity: p, transform: `translateY(${(1 - p) * 18}px)` }}>{text}</div>
      <div style={{ marginTop: 18, height: 4, width: 220 * line, borderRadius: 2, background: COLORS.white }} />
    </Panel>
  );
};
