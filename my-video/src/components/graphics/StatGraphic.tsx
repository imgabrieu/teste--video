import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../../config/theme";
import { Panel } from "./Panel";

/** Count-up "80–90%" with a thin gauge that fills to 90% and marks 80%. */
export const StatGraphic: React.FC<{ a: number; b: number; suffix: string; label: string; durationInFrames: number }> = ({ a, b, suffix, label, durationInFrames }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const t = interpolate(frame, [4, 26], [0, 1], { easing: Easing.out(Easing.cubic), ...clamp });
  return (
    <Panel durationInFrames={durationInFrames}>
      <div style={{ fontWeight: FONTS.bold, fontSize: 112, lineHeight: 1, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
        {Math.round(a * t)}–{Math.round(b * t)}
        <span style={{ fontSize: 76, marginLeft: 6 }}>{suffix}</span>
      </div>
      <div style={{ position: "relative", marginTop: 20, width: 560, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.22)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${(b * t)}%`, borderRadius: 3, background: COLORS.white }} />
        <div style={{ position: "absolute", top: -5, bottom: -5, left: `${a}%`, width: 2, background: COLORS.white, opacity: t * 0.9 }} />
      </div>
      <div style={{ marginTop: 16, fontWeight: FONTS.semiBold, fontSize: 34, color: COLORS.whiteSoft, letterSpacing: "0.01em" }}>{label}</div>
    </Panel>
  );
};
