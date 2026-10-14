import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { FONTS } from "../../config/theme";
import { L } from "../theme";
import { Glass, useLife } from "./Glass";
import { HEART_PATH, Sparkle } from "./Sparkle";

const D = 200;
const W = 940;
const H = 290;

/** Climax — "o sucesso do paciente é o nosso sucesso": patient and doctor circles meet; the overlap glows. */
export const Together: React.FC<{ durationInFrames: number; secondAt: number; joinAt: number }> = ({ durationInFrames, secondAt, joinAt }) => {
  const { frame } = useLife(durationInFrames);
  const { fps } = useVideoConfig();
  const a = spring({ frame: frame - 6, fps, config: { damping: 200, stiffness: 90 }, durationInFrames: 24 });
  const b = spring({ frame: frame - secondAt, fps, config: { damping: 200, stiffness: 90 }, durationInFrames: 24 });
  const join = spring({ frame: frame - joinAt, fps, config: { damping: 200, stiffness: 80 }, durationInFrames: 28 });
  const cy = H / 2;
  const gap = 170 - 100 * join; // half distance: 170 -> 70
  const lx = W / 2 - gap;
  const rx = W / 2 + gap;
  const glow = interpolate(join, [0.5, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lensX = W / 2;
  return (
    <Glass durationInFrames={durationInFrames} width={W} height={H}>
      <svg width={W} height={H} style={{ overflow: "visible" }}>
        <defs>
          <clipPath id="tl"><circle cx={lx} cy={cy} r={D / 2} /></clipPath>
          <radialGradient id="lens"><stop offset="0" stopColor="#FFFFFF" stopOpacity={0.95} /><stop offset="1" stopColor={L.rose} stopOpacity={0.55} /></radialGradient>
        </defs>
        <g opacity={a} transform={`translate(${(1 - a) * -30} 0)`}>
          <circle cx={lx} cy={cy} r={D / 2} fill="rgba(232,111,168,0.16)" stroke={L.rose} strokeWidth={6} />
          <text x={lx - 30 * join} y={cy + 12} textAnchor="middle" fontFamily={FONTS.family} fontWeight={600} fontSize={30} fill={L.plum}>Paciente</text>
        </g>
        <g opacity={b} transform={`translate(${(1 - b) * 30} 0)`}>
          <circle cx={rx} cy={cy} r={D / 2} fill="rgba(142,91,196,0.16)" stroke={L.purple} strokeWidth={6} />
          <text x={rx + 30 * join} y={cy + 12} textAnchor="middle" fontFamily={FONTS.family} fontWeight={600} fontSize={30} fill={L.plum}>Médico</text>
        </g>
        <g clipPath="url(#tl)" opacity={glow}>
          <circle cx={rx} cy={cy} r={D / 2} fill="url(#lens)" />
        </g>
        <g opacity={glow} transform={`translate(${lensX} ${cy}) scale(${1.2 + 0.1 * Math.sin(frame / 5)}) translate(-12 -12.5)`}>
          <path d={HEART_PATH} fill={L.rose} transform="scale(1.1) translate(-1 -1)" />
        </g>
      </svg>
      <div style={{ position: "absolute", inset: 0, opacity: glow }}>
        <Sparkle x={W / 2 - 4} y={46} size={34} color={L.rose} delay={0} />
        <Sparkle x={W / 2 + 70} y={H - 52} size={22} color={L.purple} delay={7} />
        <Sparkle x={W / 2 - 78} y={H - 38} size={18} color={L.rose} delay={13} />
      </div>
    </Glass>
  );
};
