import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../../config/theme";
import { Panel } from "./Panel";

/** Rising curve that draws itself, with a pulsing end point. */
export const GrowthGraphic: React.FC<{ label: string; durationInFrames: number }> = ({ label, durationInFrames }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const p = interpolate(frame, [6, 44], [0, 1], { easing: Easing.out(Easing.cubic), ...clamp });
  const d = "M20 128 C 150 124, 260 112, 360 90 C 460 66, 560 42, 700 14";
  const pulse = 1 + 0.25 * Math.sin(frame / 4);
  const dot = interpolate(frame, [40, 50], [0, 1], clamp);
  return (
    <Panel durationInFrames={durationInFrames}>
      <svg width={720} height={150} viewBox="0 0 720 150" fill="none">
        <line x1={20} x2={700} y1={140} y2={140} stroke="rgba(255,255,255,0.22)" strokeWidth={2} />
        <path d={d} pathLength={1} stroke={COLORS.white} strokeWidth={6} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1 - p} />
        <circle cx={700} cy={14} r={9 * pulse * dot} fill={COLORS.white} />
        <circle cx={700} cy={14} r={20 * dot} stroke={COLORS.white} strokeWidth={2} opacity={0.35 * (1 - ((frame % 30) / 30))} />
      </svg>
      <div style={{ marginTop: 6, fontWeight: FONTS.semiBold, fontSize: 32, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.whiteSoft }}>{label}</div>
    </Panel>
  );
};
