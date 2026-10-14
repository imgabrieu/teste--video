import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { L } from "../theme";
import { useLife } from "./Glass";
import { HEART_PATH, Sparkle } from "./Sparkle";

const LEN = 66; // approx. path length for the stroke draw

/** A thin heart that draws itself, fills softly and sends out two gentle pulses. No card: it floats on the footage. */
export const Heart: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const { frame, opacity } = useLife(durationInFrames);
  const { fps } = useVideoConfig();
  const draw = interpolate(frame, [2, 30], [LEN, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fill = interpolate(frame, [24, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const beat = spring({ frame: frame - 34, fps, config: { damping: 8, stiffness: 140, mass: 0.6 }, durationInFrames: 30 });
  const scale = 1 + 0.07 * Math.sin(beat * Math.PI) * (frame > 34 ? 1 : 0);
  const pulse = (start: number) => {
    const p = interpolate(frame, [start, start + 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return { r: 96 + 70 * p, o: (1 - p) * 0.55 * (frame >= start ? 1 : 0) };
  };
  const a = pulse(34);
  const b = pulse(46);
  return (
    <div style={{ position: "absolute", left: 540 - 180, top: 985 - 20, width: 360, height: 360, opacity }}>
      <svg width={360} height={360} viewBox="0 0 360 360" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={L.rose} />
            <stop offset="1" stopColor={L.purple} />
          </linearGradient>
        </defs>
        <circle cx={180} cy={180} r={a.r} fill="none" stroke={L.rose} strokeWidth={3} opacity={a.o} />
        <circle cx={180} cy={180} r={b.r} fill="none" stroke={L.purple} strokeWidth={3} opacity={b.o} />
        <circle cx={180} cy={180} r={96} fill="rgba(255,255,255,0.86)" stroke="rgba(255,255,255,0.95)" strokeWidth={1.5} style={{ filter: `drop-shadow(0 14px 30px ${L.shadow})` }} />
        <g transform={`translate(180 184) scale(${4.1 * scale}) translate(-12 -12.5)`}>
          <path d={HEART_PATH} fill="url(#hg)" opacity={fill * 0.9} />
          <path d={HEART_PATH} fill="none" stroke="url(#hg)" strokeWidth={1.1} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={LEN} strokeDashoffset={draw} pathLength={LEN} />
        </g>
      </svg>
      <Sparkle x={300} y={90} size={28} color={L.rose} delay={0} opacity={fill} />
      <Sparkle x={62} y={266} size={20} color={L.purple} delay={8} opacity={fill} />
    </div>
  );
};
