import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "../config/theme";
import { useEdit } from "../lib/EditContext";

/** Simple white end card: the footage fades to white, name appears with a thin line. No logo, no sound. */
export const CleanOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const o = useEdit().cfg.outro;
  const text = o?.type === "clean" ? o.text : "";
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const veil = interpolate(frame, [0, 14], [0, 1], { easing: Easing.inOut(Easing.cubic), ...clamp });
  const t = interpolate(frame, [8, 24], [0, 1], { easing: Easing.out(Easing.cubic), ...clamp });
  const line = interpolate(frame, [14, 34], [0, 1], { easing: Easing.out(Easing.cubic), ...clamp });
  return (
    <AbsoluteFill style={{ backgroundColor: `rgba(255,255,255,${veil})`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontFamily: FONTS.family, fontWeight: FONTS.bold, fontSize: 84, letterSpacing: "-0.01em", color: "#1F2430", opacity: t, transform: `translateY(${(1 - t) * 14}px)` }}>{text}</div>
      <div style={{ marginTop: 26, height: 3, width: 140 * line, borderRadius: 2, background: "#1F2430" }} />
    </AbsoluteFill>
  );
};
