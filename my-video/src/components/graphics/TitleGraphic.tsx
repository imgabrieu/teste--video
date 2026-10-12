import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ANIM, CANVAS, COLORS, FONTS, SAFE } from "../../config/theme";

export const TitleGraphic: React.FC<{ text: string; durationInFrames: number }> = ({ text, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200, stiffness: 110 }, durationInFrames: 22 });
  const exit = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line = interpolate(frame, [4, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        width: CANVAS.width,
        top: SAFE.top,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: Math.min(p, exit),
        transform: `translateY(${(1 - p) * -18 * ANIM.intensity}px)`,
      }}
    >
      <div
        style={{
          padding: "22px 44px",
          borderRadius: 999,
          background: COLORS.navyGlass,
          border: `1.5px solid ${COLORS.line}`,
          backdropFilter: "blur(14px)",
          boxShadow: "0 14px 40px rgba(6,20,34,0.3)",
          color: COLORS.white,
          fontFamily: FONTS.family,
          fontWeight: FONTS.semiBold,
          fontSize: 31,
          letterSpacing: "0.08em",
          textWrap: "balance",
          textTransform: "uppercase",
          maxWidth: CANVAS.width - SAFE.left * 2,
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {text}
      </div>
      <div style={{ marginTop: 16, height: 3, width: 140 * line, background: COLORS.white, borderRadius: 2, opacity: 0.9 }} />
    </div>
  );
};
