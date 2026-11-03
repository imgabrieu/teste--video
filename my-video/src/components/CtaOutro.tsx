import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS, LOGO } from "../config/theme";
import { hexToRgba, useEdit, usePalette } from "../lib/EditContext";

/** Closing card: solid brand background, small Capitech logo, then the call-to-action as the only text on screen. */
export const CtaOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = usePalette();
  const outro = useEdit().cfg.outro;
  const lines = outro?.lines ?? [];
  const paragraphs = !!outro?.paragraphs;
  const bg = outro?.bg ?? pal.ink;
  const fg = outro?.fg ?? "#FFFFFF";
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const veil = interpolate(frame, [0, 8], [0, 0.97], clamp);
  const logoP = spring({ frame: frame - 6, fps, config: { damping: 200, stiffness: 110 }, durationInFrames: 20 });
  const ctaP = spring({ frame: frame - 12, fps, config: { damping: 200, stiffness: 100 }, durationInFrames: 22 });
  const line = interpolate(frame, [20, 38], [0, 1], { easing: Easing.out(Easing.cubic), ...clamp });
  return (
    <AbsoluteFill style={{ backgroundColor: hexToRgba(bg, veil), justifyContent: "center", alignItems: "center" }}>
      <Img src={staticFile(LOGO.file)} style={{ width: 420, opacity: logoP, transform: `scale(${0.96 + 0.04 * logoP})`, marginBottom: 90 }} />
      {paragraphs ? (
        <div style={{ width: 860, textAlign: "center", fontFamily: FONTS.family, color: fg }}>
          {lines.map((l, i) => {
            const p = spring({ frame: frame - (12 + i * 16), fps, config: { damping: 200, stiffness: 100 }, durationInFrames: 22 });
            const last = i === lines.length - 1;
            return (
              <div
                key={i}
                style={{
                  fontWeight: last ? FONTS.bold : FONTS.semiBold,
                  fontSize: last ? 84 : 70,
                  lineHeight: 1.12,
                  marginTop: i === 0 ? 0 : 30,
                  textWrap: "balance",
                  opacity: p,
                  transform: `translateY(${(1 - p) * 22}px) scale(${0.97 + 0.03 * p})`,
                }}
              >
                {l}
              </div>
            );
          })}
        </div>
      ) : (
      <div
        style={{
          fontFamily: FONTS.family,
          fontWeight: FONTS.bold,
          fontSize: 96,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          textAlign: "center",
          color: fg,
          opacity: ctaP,
          transform: `translateY(${(1 - ctaP) * 24}px) scale(${0.97 + 0.03 * ctaP})`,
        }}
      >
        {lines.map((l, i) => (
          <React.Fragment key={i}>
            {l}
            {i < lines.length - 1 && (
              <>
                {" "}
                <br />
              </>
            )}
          </React.Fragment>
        ))}
      </div>
      )}
      <div style={{ marginTop: 44, height: 5, width: 300 * line, borderRadius: 3, background: fg, opacity: 0.85 }} />
    </AbsoluteFill>
  );
};
