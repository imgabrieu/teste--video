import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../../config/theme";
import { Panel } from "./Panel";

/** Dots popping in from a centre point: clinics spreading across the country. */
export const SpreadGraphic: React.FC<{ label: string; durationInFrames: number }> = ({ label, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const W = 720, H = 120, cx = W / 2, cy = H / 2;
  const dots = Array.from({ length: 22 }, (_, i) => ({
    x: 30 + random(`x${i}`) * (W - 60),
    y: 14 + random(`y${i}`) * (H - 28),
    delay: 4 + Math.round(Math.hypot(30 + random(`x${i}`) * (W - 60) - cx, 0) / 14),
  }));
  return (
    <Panel durationInFrames={durationInFrames}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        {dots.map((d, i) => {
          const p = spring({ frame: frame - d.delay, fps, config: { damping: 14, stiffness: 160 }, durationInFrames: 18 });
          const line = interpolate(frame - d.delay, [0, 12], [0, 0.22], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={cx + (d.x - cx) * Math.min(1, p)} y2={cy + (d.y - cy) * Math.min(1, p)} stroke={COLORS.white} strokeWidth={1.5} opacity={line} />
              <circle cx={d.x} cy={d.y} r={7 * p} fill={COLORS.white} opacity={0.92} />
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={12} fill={COLORS.white} />
      </svg>
      <div style={{ marginTop: 10, fontWeight: FONTS.semiBold, fontSize: 32, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.whiteSoft }}>{label}</div>
    </Panel>
  );
};
