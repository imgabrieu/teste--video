import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../../config/theme";
import { Panel } from "./Panel";

/** A straight line that becomes a knot: "it's more complicated than it looks". */
export const TangleGraphic: React.FC<{ label: string; durationInFrames: number }> = ({ label, durationInFrames }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [4, 52], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const d = "M20 80 L190 80 C260 80 270 20 330 44 C400 74 300 128 290 76 C282 30 410 24 436 82 C458 130 350 140 362 88 C372 46 470 52 500 80 C520 98 560 80 700 80";
  return (
    <Panel durationInFrames={durationInFrames}>
      <svg width={720} height={150} viewBox="0 0 720 150" fill="none">
        <path d={d} pathLength={1} stroke={COLORS.white} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={1} strokeDashoffset={1 - p} />
      </svg>
      <div style={{ marginTop: 4, fontWeight: FONTS.semiBold, fontSize: 32, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.whiteSoft }}>{label}</div>
    </Panel>
  );
};
