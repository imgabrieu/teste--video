import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../../config/theme";
import { Panel } from "./Panel";

/** Three strands getting progressively thinner, joined by faint arrows. */
export const ThinningGraphic: React.FC<{ label: string; durationInFrames: number }> = ({ label, durationInFrames }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const widths = [16, 9, 3.5];
  return (
    <Panel durationInFrames={durationInFrames}>
      <svg width={520} height={130} viewBox="0 0 520 130" fill="none">
        {widths.map((w, i) => {
          const x = 90 + i * 170;
          const grow = interpolate(frame, [6 + i * 7, 22 + i * 7], [0, 1], { easing: Easing.out(Easing.cubic), ...clamp });
          return (
            <g key={i}>
              <path d={`M${x} 122 C ${x + 14} 86, ${x - 14} 50, ${x} ${122 - 112 * grow}`} stroke={COLORS.white} strokeWidth={w} strokeLinecap="round" opacity={0.95 - i * 0.12} />
              {i < 2 && (
                <path
                  d={`M${x + 56} 70 h58 m-12 -12 l12 12 l-12 12`}
                  stroke={COLORS.white}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.4 * interpolate(frame, [14 + i * 7, 26 + i * 7], [0, 1], clamp)}
                />
              )}
            </g>
          );
        })}
      </svg>
      <div style={{ marginTop: 8, fontWeight: FONTS.semiBold, fontSize: 32, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.whiteSoft }}>{label}</div>
    </Panel>
  );
};
