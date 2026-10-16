import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "../config/theme";
import { LAYOUT, PC } from "./config";
import { TL } from "./timeline";

const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.out(Easing.cubic);

/** Local progress helper: sequence window [from, to] in output frames, with gentle fade-out. */
const useWindow = (fromSrc: number, toSrc: number) => {
  const frame = useCurrentFrame();
  const from = TL.srcToOut(fromSrc);
  const to = TL.srcToOut(toSrc);
  const local = frame - from;
  const out = interpolate(frame, [to - 9, to], [1, 0], clampX);
  return { local, visible: frame >= from && frame <= to, out };
};

const textBase: React.CSSProperties = { fontFamily: FONTS.family, position: "absolute", width: "100%", textAlign: "center", color: PC.white, textShadow: "0 1px 14px rgba(20,16,12,0.34)" };

/** "30–40%" — the one number of the story, quietly. */
export const StatMotion: React.FC = () => {
  const { local, visible, out } = useWindow(11.9, 14.95);
  if (!visible) return null;
  const k = interpolate(local, [0, 22], [0, 1], { ...clampX, easing: Easing.out(Easing.quad) });
  const line = interpolate(local, [0, 14], [0, 1], { ...clampX, easing: ease });
  const labelO = interpolate(local, [4, 16], [0, 1], clampX);
  const numO = interpolate(local, [0, 10], [0, 1], clampX);
  const rise = interpolate(local, [0, 14], [10, 0], { ...clampX, easing: ease });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div style={{ position: "absolute", top: LAYOUT.motionTop, left: 540 - 36 * line, width: 72 * line, height: 1.5, background: PC.beige }} />
      <div style={{ ...textBase, top: LAYOUT.motionTop + 22, opacity: labelO, fontWeight: FONTS.semiBold, fontSize: 21, letterSpacing: "0.42em", paddingLeft: "0.42em", color: PC.beige }}>
        DOS CABELOS
      </div>
      <div style={{ ...textBase, top: LAYOUT.motionTop + 58, opacity: numO, transform: `translateY(${rise}px)`, fontWeight: FONTS.bold, fontSize: 84, lineHeight: 1.1, letterSpacing: "0.01em" }}>
        {Math.round(30 * k)}–{Math.round(40 * k)}%
      </div>
    </AbsoluteFill>
  );
};

/** Outlined pill that draws itself from the centre: the diagnosis. */
export const DiagnosisMotion: React.FC = () => {
  const { local, visible, out } = useWindow(25.15, 27.2);
  if (!visible) return null;
  const draw = interpolate(local, [0, 16], [50, 0], { ...clampX, easing: Easing.inOut(Easing.cubic) });
  const textO = interpolate(local, [8, 20], [0, 1], clampX);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div style={{ position: "absolute", top: LAYOUT.motionTop + 38, width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", padding: "16px 22px 16px 40px", border: "1.5px solid rgba(255,255,255,0.88)", borderRadius: 999, clipPath: `inset(0 ${draw}% 0 ${draw}%)` }}>
          <span style={{ fontFamily: FONTS.family, fontWeight: FONTS.semiBold, fontSize: 25, letterSpacing: "0.34em", color: PC.white, opacity: textO, textShadow: "0 1px 14px rgba(20,16,12,0.34)" }}>ALOPECIA AREATA</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
