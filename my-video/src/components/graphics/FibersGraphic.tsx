import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "../../config/theme";
import { usePalette } from "../../lib/EditContext";
import { Panel } from "./Panel";

/** Fibres that start rough and tangled (friction) and smooth into parallel lines once the conditioner is mentioned. */
export const FibersGraphic: React.FC<{ label: string; calmFrame: number; durationInFrames: number }> = ({ label, calmFrame, durationInFrames }) => {
  const frame = useCurrentFrame();
  const pal = usePalette();
  const k = interpolate(frame, [calmFrame, calmFrame + 26], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lines = 7;
  return (
    <Panel durationInFrames={durationInFrames}>
      <svg width={720} height={140} viewBox="0 0 720 140" fill="none">
        {Array.from({ length: lines }, (_, i) => {
          const y = 18 + i * 17;
          const amp = (1 - k) * (22 + (i % 3) * 7);
          const ph = i * 1.7;
          let d = `M10 ${y}`;
          for (let x = 10; x <= 710; x += 10) {
            const yy = y + Math.sin(x / 38 + ph + frame / 7 * (1 - k)) * amp * Math.sin((x / 710) * Math.PI);
            d += ` L${x} ${yy.toFixed(1)}`;
          }
          return <path key={i} d={d} stroke={pal.accent} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" opacity={0.5 + 0.5 * k} />;
        })}
      </svg>
      <div style={{ marginTop: 8, fontWeight: FONTS.semiBold, fontSize: 31, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.8 }}>{label}</div>
    </Panel>
  );
};
