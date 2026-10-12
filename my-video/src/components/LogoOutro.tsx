import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, LOGO } from "../config/theme";

/** Closing logo: navy veil fades in, logo fades + scales (very subtly) into place. Swap the file in /public/logo or edit LOGO.file. */
export const LogoOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const veil = interpolate(frame, [0, 12], [0, LOGO.overlayOpacity], { extrapolateRight: "clamp" });
  const p = spring({ frame: frame - 8, fps, config: { damping: 200, stiffness: 110 }, durationInFrames: 22 });
  const fade = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: `rgba(13,43,69,${veil})`, justifyContent: "center", alignItems: "center" }}>
      <Img
        src={staticFile(LOGO.file)}
        style={{ width: LOGO.width, opacity: fade, transform: `scale(${0.94 + 0.06 * p})`, filter: `drop-shadow(0 6px 24px ${COLORS.shadow})` }}
      />
    </AbsoluteFill>
  );
};
