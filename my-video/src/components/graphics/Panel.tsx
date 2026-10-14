import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ANIM, CANVAS, FONTS, MOTION_ZONE, SAFE } from "../../config/theme";
import { hexToRgba, usePalette } from "../../lib/EditContext";

/** Shared entrance/exit wrapper + navy glass panel for every motion graphic. */
export const Panel: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  padding?: string;
}> = ({ durationInFrames, children, top = MOTION_ZONE.top, left, width = CANVAS.width - SAFE.left * 2, height = MOTION_ZONE.height, padding = "0 48px" }) => {
  const pal = usePalette();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200, stiffness: 120 }, durationInFrames: 18 });
  const exit = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = Math.min(enter, exit);
  return (
    <div
      style={{
        position: "absolute",
        left: left ?? (CANVAS.width - width) / 2,
        top,
        width,
        height,
        boxSizing: "border-box",
        padding,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32,
        background: hexToRgba(pal.ink, 0.86),
        border: `1.5px solid ${hexToRgba(pal.accent, 0.28)}`,
        boxShadow: "0 18px 50px rgba(6,20,34,0.32)",
        backdropFilter: "blur(14px)",
        color: pal.accent,
        fontFamily: FONTS.family,
        opacity,
        transform: `translateY(${(1 - enter) * 26 * ANIM.intensity}px) scale(${0.97 + 0.03 * enter})`,
      }}
    >
      {children}
    </div>
  );
};
