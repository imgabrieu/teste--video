import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS, LOGO } from "../config/theme";
import { hexToRgba, useEdit, usePalette } from "../lib/EditContext";

/** Closing call-to-action card: navy veil, small Capitech logo, then the CTA as the only text on screen. */
export const CtaOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = usePalette();
  const o = useEdit().cfg.outro;
  const lines = o?.type === "cta" ? o.lines : [];
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const veil = interpolate(frame, [0, 10], [0, 0.95], clamp);
  const logoP = spring({ frame: frame - 8, fps, config: { damping: 200, stiffness: 110 }, durationInFrames: 22 });
  const ctaP = spring({ frame: frame - 16, fps, config: { damping: 200, stiffness: 100 }, durationInFrames: 24 });
  const line = interpolate(frame, [26, 46], [0, 1], { easing: Easing.out(Easing.cubic), ...clamp });
  return (
    <AbsoluteFill style={{ backgroundColor: hexToRgba(pal.ink, veil), justifyContent: "center", alignItems: "center" }}>
      <Img src={staticFile(LOGO.file)} style={{ width: 420, opacity: logoP, transform: `scale(${0.96 + 0.04 * logoP})`, marginBottom: 90 }} />
      <div
        style={{
          fontFamily: FONTS.family,
          fontWeight: FONTS.bold,
          fontSize: 108,
          lineHeight: 1.08,
          letterSpacing: "-0.01em",
          textAlign: "center",
          color: "#FFFFFF",
          opacity: ctaP,
          transform: `translateY(${(1 - ctaP) * 24}px) scale(${0.97 + 0.03 * ctaP})`,
        }}
      >
        {lines.map((l, i) => (
          <div key={i} style={{ color: i === lines.length - 1 ? pal.accent : "#FFFFFF" }}>
            {l}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 44, height: 5, width: 300 * line, borderRadius: 3, background: pal.accent, opacity: 0.9 }} />
    </AbsoluteFill>
  );
};
