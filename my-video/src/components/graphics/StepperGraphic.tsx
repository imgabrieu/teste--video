import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../../config/theme";
import { Panel } from "./Panel";

type Step = { frameAt: number; label: string; weight: number };

/**
 * Vertical three-step progression (thick strand -> inflammation -> thin strand) docked on the left edge, beside the face,
 * so it never covers the model/hands in the lower half. Each step lights up on the word it illustrates.
 */
export const StepperGraphic: React.FC<{ steps: Step[]; durationInFrames: number }> = ({ steps, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ROW = 108;
  const H = ROW * (steps.length - 1);
  const lastActive = steps.reduce((acc, s, i) => (frame >= s.frameAt ? i : acc), -1);
  let progress = 0;
  if (lastActive >= steps.length - 1) progress = 1;
  else if (lastActive >= 0) {
    const a = steps[lastActive].frameAt;
    const b = steps[lastActive + 1].frameAt;
    const k = Easing.inOut(Easing.cubic)(interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
    progress = (lastActive + k) / (steps.length - 1);
  }
  return (
    <Panel durationInFrames={durationInFrames} left={44} top={430} width={330} height={H + 150} padding="0">
      <svg width={290} height={H + 90} viewBox={`0 0 290 ${H + 90}`} fill="none">
        <line x1={38} x2={38} y1={45} y2={45 + H} stroke="rgba(255,255,255,0.22)" strokeWidth={4} strokeLinecap="round" />
        <line x1={38} x2={38} y1={45} y2={45 + H * progress} stroke={COLORS.white} strokeWidth={4} strokeLinecap="round" />
        {steps.map((s, i) => {
          const p = spring({ frame: frame - s.frameAt, fps, config: { damping: 200, stiffness: 140 }, durationInFrames: 16 });
          const active = frame >= s.frameAt;
          return (
            <g key={i} transform={`translate(38 ${45 + i * ROW})`}>
              <circle r={31} fill={active ? COLORS.white : "rgba(13,43,69,0.9)"} stroke={COLORS.white} strokeWidth={3} opacity={active ? 1 : 0.55} transform={`scale(${active ? 0.9 + 0.1 * p : 1})`} />
              <line x1={0} x2={0} y1={-14} y2={14} stroke={active ? COLORS.navy : COLORS.white} strokeWidth={s.weight} strokeLinecap="round" opacity={active ? 1 : 0.6} />
              <text x={56} y={10} fontFamily="Poppins, sans-serif" fontWeight={FONTS.semiBold} fontSize={29} fill={COLORS.white} opacity={active ? 1 : 0.5}>
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
};
