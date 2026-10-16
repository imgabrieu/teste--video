import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { FONTS } from "../config/theme";
import { LAYOUT, PC, TIMING } from "./config";
import { TL } from "./timeline";

const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const GAP = 8;
export const FULL_RATIO = 638 / 1280; // width / height of each full-length photo (no distortion)

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

/** ANTES | DEPOIS as two full-length photos side by side; `reveal` (0..1) wipes the DEPOIS panel in from top to bottom. */
export const FullPair: React.FC<{ width: number; reveal?: number; zoom?: number; label?: number }> = ({ width, reveal = 1, zoom = 1, label = 1 }) => {
  const pw = (width - GAP) / 2;
  const ph = pw / FULL_RATIO;
  const panel = (src: string, text: string, clip?: string, extra?: React.CSSProperties) => (
    <div style={{ position: "relative", width: pw, height: ph, borderRadius: 6, overflow: "hidden", background: "#E9E2D6", boxShadow: "0 28px 60px rgba(70,52,34,0.10)", ...extra }}>
      <div style={{ position: "absolute", inset: 0, clipPath: clip }}>
        <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` }} />
        <Pill style={{ position: "absolute", left: 18, bottom: 18, fontSize: 21, padding: "10px 10px 10px 22px", opacity: label }}>{text}</Pill>
      </div>
    </div>
  );
  return (
    <div style={{ display: "flex", gap: GAP, width, height: ph }}>
      {panel("passoni2/antes_full.jpg", "ANTES")}
      {panel("passoni2/depois_full.jpg", "DEPOIS", `inset(0 0 ${(1 - reveal) * 100}% 0)`, { background: "#EFE8DC" })}
    </div>
  );
};

/** First seconds: the result first. ANTES is already there; DEPOIS is revealed by a soft vertical mask. Then the light screen dissolves into the speaker. */
export const Opener: React.FC = () => {
  const f = useCurrentFrame();
  const end = TL.openerEnd;
  const fade = interpolate(f, [end - TIMING.openerDissolve, end], [1, 0], { ...clampX, easing: Easing.inOut(Easing.cubic) });
  const intro = interpolate(f, [0, 8], [0, 1], clampX);
  const settle = interpolate(f, [0, 22], [0.984, 1], { ...clampX, easing: Easing.out(Easing.cubic) });
  const lift = interpolate(f, [end - TIMING.openerDissolve, end], [1, 1.018], { ...clampX, easing: Easing.in(Easing.cubic) });
  const reveal = interpolate(f, [6, 34], [0, 1], { ...clampX, easing: Easing.inOut(Easing.cubic) });
  const zoom = interpolate(f, [0, end], [1, 1.035], clampX);
  const pairW = 940;
  return (
    <AbsoluteFill style={{ backgroundColor: PC.bg, opacity: fade }}>
      <div style={{ position: "absolute", inset: 0, opacity: intro, transform: `scale(${settle * lift})`, transformOrigin: "50% 40%" }}>
        <Img src={staticFile("passoni2/logo-ink.png")} style={{ position: "absolute", top: LAYOUT.logoCenterTop, left: (1080 - LAYOUT.logoWidth) / 2, width: LAYOUT.logoWidth }} />
        <div style={{ position: "absolute", top: LAYOUT.cardTop, left: (1080 - pairW) / 2 }}>
          <FullPair width={pairW} reveal={reveal} zoom={zoom} label={interpolate(reveal, [0, 0.3], [1, 1], clampX)} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
