import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "../config/theme";
import { LAYOUT, PC } from "./config";
import { TL } from "./timeline";

const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.out(Easing.cubic);

const useWindow = (fromSrc: number, toSrc: number) => {
  const frame = useCurrentFrame();
  const from = TL.srcToOut(fromSrc);
  const to = TL.srcToOut(toSrc);
  return { local: frame - from, visible: frame >= from && frame <= to, out: interpolate(frame, [to - 9, to], [1, 0], clampX) };
};

const glass: React.CSSProperties = { background: PC.glass, backdropFilter: "blur(10px)" };
const shadow = "0 1px 10px rgba(20,16,12,0.30)";

/** Outlined pill that draws itself from the centre: the key idea of the hook ("folículo vivo"). */
export const FolliclePill: React.FC = () => {
  const { local, visible, out } = useWindow(12.3, 15.25);
  if (!visible) return null;
  const draw = interpolate(local, [0, 16], [50, 0], { ...clampX, easing: Easing.inOut(Easing.cubic) });
  const textO = interpolate(local, [8, 20], [0, 1], clampX);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div style={{ position: "absolute", top: LAYOUT.motionTop + 30, width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ ...glass, padding: "16px 22px 16px 40px", border: "1.5px solid rgba(255,255,255,0.88)", borderRadius: 999, clipPath: `inset(0 ${draw}% 0 ${draw}%)` }}>
          <span style={{ fontFamily: FONTS.family, fontWeight: FONTS.semiBold, fontSize: 25, letterSpacing: "0.34em", color: PC.white, opacity: textO, textShadow: shadow }}>FOLÍCULO VIVO</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** "menos de 6 meses" — the one number of the story, quietly. */
export const MonthsMotion: React.FC = () => {
  const { local, visible, out } = useWindow(29.45, 31.0);
  if (!visible) return null;
  const line = interpolate(local, [0, 14], [0, 1], { ...clampX, easing: ease });
  const labelO = interpolate(local, [4, 16], [0, 1], clampX);
  const numO = interpolate(local, [0, 10], [0, 1], clampX);
  const rise = interpolate(local, [0, 14], [10, 0], { ...clampX, easing: ease });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div style={{ position: "absolute", top: LAYOUT.motionTop - 14, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ ...glass, borderRadius: 28, padding: "26px 54px 24px", textAlign: "center", fontFamily: FONTS.family, color: PC.white }}>
          <div style={{ margin: "0 auto 14px", width: 64 * line, height: 1.5, background: PC.beige }} />
          <div style={{ opacity: labelO, fontWeight: FONTS.semiBold, fontSize: 20, letterSpacing: "0.42em", paddingLeft: "0.42em", color: PC.beige }}>MENOS DE</div>
          <div style={{ opacity: numO, transform: `translateY(${rise}px)`, fontWeight: FONTS.bold, fontSize: 76, lineHeight: 1.12, textShadow: shadow }}>6 meses</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
