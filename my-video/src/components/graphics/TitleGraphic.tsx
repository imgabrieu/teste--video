import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ANIM, CANVAS, FONTS, LOGO, SAFE } from "../../config/theme";
import { hexToRgba, usePalette } from "../../lib/EditContext";

export const TitleGraphic: React.FC<{ text: string; logo?: boolean; durationInFrames: number }> = ({ text, logo, durationInFrames }) => {
  const pal = usePalette();
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
        top: logo ? SAFE.top - 70 : SAFE.top,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: Math.min(p, exit),
        transform: `translateY(${(1 - p) * -18 * ANIM.intensity}px)`,
      }}
    >
      {logo && <Img src={staticFile(LOGO.file)} style={{ width: 330, marginBottom: 18, filter: "drop-shadow(0 4px 18px rgba(6,20,34,0.55))" }} />}
      <div
        style={{
          padding: "22px 44px",
          borderRadius: 999,
          background: hexToRgba(pal.ink, 0.86),
          border: `1.5px solid ${hexToRgba(pal.accent, 0.28)}`,
          backdropFilter: "blur(14px)",
          boxShadow: "0 14px 40px rgba(6,20,34,0.3)",
          color: pal.accent,
          fontFamily: FONTS.family,
          fontWeight: FONTS.semiBold,
          fontSize: 31,
          letterSpacing: "0.08em",
          textWrap: "balance",
          textTransform: "uppercase",
          maxWidth: CANVAS.width - SAFE.left * 2,
          textAlign: "center",
          lineHeight: 1.3,
          whiteSpace: "pre-line",
        }}
      >
        {text}
      </div>
      <div style={{ marginTop: 16, height: 3, width: 140 * line, background: pal.accent, borderRadius: 2, opacity: 0.9 }} />
    </div>
  );
};
