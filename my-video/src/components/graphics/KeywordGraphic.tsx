import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../../config/theme";
import { usePalette } from "../../lib/EditContext";
import { Panel } from "./Panel";

/** Key phrase with a small kicker and an underline that draws in. Light mode: navy type straight on the footage, tighter sizes. */
export const KeywordGraphic: React.FC<{ kicker?: string; text: string; durationInFrames: number }> = ({ kicker, text, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = usePalette();
  const p = spring({ frame: frame - 4, fps, config: { damping: 200, stiffness: 120 }, durationInFrames: 20 });
  const line = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const light = !!pal.light;
  const big = light ? (text.length > 20 ? 56 : text.length > 14 ? 66 : 78) : text.length > 18 ? 58 : 84;
  return (
    <Panel durationInFrames={durationInFrames}>
      {kicker && (
        <div style={{ fontWeight: FONTS.semiBold, fontSize: light ? 26 : 30, letterSpacing: "0.16em", textTransform: "uppercase", opacity: p * (light ? 0.8 : 0.78), marginBottom: light ? 8 : 12 }}>{kicker}</div>
      )}
      <div style={{ fontWeight: FONTS.bold, fontSize: big, lineHeight: 1.06, letterSpacing: "-0.015em", textAlign: "center", opacity: p, transform: `translateY(${(1 - p) * 18}px)` }}>{text}</div>
      <div style={{ marginTop: light ? 12 : 18, height: light ? 4 : 4, width: 200 * line, borderRadius: 2, background: pal.accent }} />
    </Panel>
  );
};
