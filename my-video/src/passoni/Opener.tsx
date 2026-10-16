import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { FONTS } from "../config/theme";
import { LAYOUT, PC, TIMING } from "./config";
import { TL } from "./timeline";

const CARD_H = Math.round(LAYOUT.cardWidth / (1320 / 1176));
const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Pill: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      fontFamily: FONTS.family,
      fontWeight: FONTS.semiBold,
      fontSize: 23,
      letterSpacing: "0.3em",
      color: PC.ink,
      background: "rgba(246,241,233,0.94)",
      padding: "12px 12px 12px 26px", // trailing letter-spacing compensated on the right
      borderRadius: 999,
      ...style,
    }}
  >
    {children}
  </div>
);

/** First seconds: result first. A slim slider sweeps from ANTES to DEPOIS on a light screen, then the light screen dissolves into the speaker. */
export const Opener: React.FC = () => {
  const f = useCurrentFrame();
  const end = TL.openerEnd;
  const fade = interpolate(f, [end - TIMING.openerDissolve, end], [1, 0], { ...clampX, easing: Easing.inOut(Easing.cubic) });
  const intro = interpolate(f, [0, 9], [0, 1], clampX);
  const settle = interpolate(f, [0, 22], [0.982, 1], { ...clampX, easing: Easing.out(Easing.cubic) });
  const lift = interpolate(f, [end - TIMING.openerDissolve, end], [1, 1.018], { ...clampX, easing: Easing.in(Easing.cubic) });
  const p = interpolate(f, [20, 56], [0, 1], { ...clampX, easing: Easing.inOut(Easing.cubic) });
  const kenburns = interpolate(f, [0, end], [1, 1.04], clampX);
  const lineX = p * LAYOUT.cardWidth;
  const lineOpacity = interpolate(p, [0, 0.04, 0.96, 1], [0, 1, 1, 0], clampX);
  const showAfter = p > 0.5;
  const labelFade = interpolate(p, [0.42, 0.5, 0.58], [1, 0, 1], clampX);
  const dividerGlow = "0 0 18px rgba(255,255,255,0.65)";

  const img = (src: string, extra?: React.CSSProperties) => (
    <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: `scale(${kenburns})`, ...extra }} />
  );

  return (
    <AbsoluteFill style={{ backgroundColor: PC.bg, opacity: fade }}>
      <div style={{ position: "absolute", inset: 0, opacity: intro, transform: `scale(${settle * lift})`, transformOrigin: "50% 40%" }}>
        {/* kicker */}
        <div
          style={{
            position: "absolute",
            top: LAYOUT.cardTop - 70,
            width: "100%",
            textAlign: "center",
            fontFamily: FONTS.family,
            fontWeight: FONTS.semiBold,
            fontSize: 22,
            letterSpacing: "0.42em",
            paddingLeft: "0.42em",
            color: PC.taupe,
          }}
        >
          CASO CLÍNICO
        </div>
        {/* card */}
        <div
          style={{
            position: "absolute",
            left: (1080 - LAYOUT.cardWidth) / 2,
            top: LAYOUT.cardTop,
            width: LAYOUT.cardWidth,
            height: CARD_H,
            borderRadius: 6,
            overflow: "hidden",
            boxShadow: "0 30px 70px rgba(70,52,34,0.10)",
            background: "#E9E2D6",
          }}
        >
          {img("passoni/antes.jpg")}
          {img("passoni/depois.jpg", { clipPath: `inset(0 ${(1 - p) * 100}% 0 0)` })}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: lineX - 1.5, width: 3, background: PC.white, opacity: lineOpacity, boxShadow: dividerGlow }} />
          <div
            style={{
              position: "absolute",
              top: CARD_H / 2 - 28,
              left: lineX - 28,
              width: 56,
              height: 56,
              borderRadius: 28,
              background: "rgba(246,241,233,0.96)",
              opacity: lineOpacity,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 20px rgba(40,30,20,0.18)",
            }}
          >
            <svg width="28" height="14" viewBox="0 0 28 14" fill="none" stroke={PC.ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2 L2 7 L8 12" />
              <path d="M20 2 L26 7 L20 12" />
            </svg>
          </div>
          <Pill style={{ position: "absolute", top: 28, left: 28, opacity: labelFade }}>{showAfter ? "DEPOIS" : "ANTES"}</Pill>
        </div>
        <Img src={staticFile("passoni/logo-ink.png")} style={{ position: "absolute", top: LAYOUT.logoTop - 18, left: (1080 - 236) / 2, width: 236 }} />
      </div>
    </AbsoluteFill>
  );
};
