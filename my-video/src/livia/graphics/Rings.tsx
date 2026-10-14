import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { FONTS } from "../../config/theme";
import { f } from "../config";
import { L } from "../theme";
import { Glass, useLife } from "./Glass";

const D = 210;

/** "eu não consigo separar": casa and hospital drift together and overlap — one life. */
export const Rings: React.FC<{ durationInFrames: number; joinAt: number }> = ({ durationInFrames, joinAt }) => {
  const { frame } = useLife(durationInFrames);
  const { fps } = useVideoConfig();
  const join = spring({ frame: frame - joinAt, fps, config: { damping: 200, stiffness: 70 }, durationInFrames: 34 });
  const appear = interpolate(frame, [4, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gap = 150 - 80 * join; // half distance between centres: 150 -> 70
  const lens = interpolate(join, [0.4, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const W = 900;
  const H = 290;
  const cy = H / 2;
  const ring = (cx: number, color: string, tint: string, label: string, shift: number) => (
    <>
      <circle cx={cx} cy={cy} r={D / 2} fill={tint} stroke={color} strokeWidth={6} />
      <text x={cx + shift * join} y={cy + 12} textAnchor="middle" fontFamily={FONTS.family} fontWeight={600} fontSize={28} fill={L.plum}>{label}</text>
    </>
  );
  return (
    <Glass durationInFrames={durationInFrames} width={W} height={H}>
      <svg width={W} height={H} style={{ opacity: appear }}>
        <defs>
          <clipPath id="clipL"><circle cx={W / 2 - gap} cy={cy} r={D / 2} /></clipPath>
        </defs>
        {ring(W / 2 - gap, L.rose, "rgba(232,111,168,0.14)", "casa", -36)}
        {ring(W / 2 + gap, L.purple, "rgba(142,91,196,0.14)", "hospital", 36)}
        <g clipPath="url(#clipL)">
          <circle cx={W / 2 + gap} cy={cy} r={D / 2} fill="rgba(200,110,190,0.38)" opacity={lens} />
        </g>
      </svg>
    </Glass>
  );
};

export const ringsJoinFrame = f(12.05) - f(10.7);
