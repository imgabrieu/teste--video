import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../../config/theme";
import { Panel } from "./Panel";

type Row = { frameAt: number; ok: boolean; text: string };

/** Two stacked questions with a check / cross mark: "any alopecia? / any that can't be transplanted?" */
export const VerdictGraphic: React.FC<{ rows: Row[]; durationInFrames: number }> = ({ rows, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Panel durationInFrames={durationInFrames} height={250} padding="0 56px">
      <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "flex-start", width: "100%" }}>
        {rows.map((r, i) => {
          const p = spring({ frame: frame - r.frameAt, fps, config: { damping: 200, stiffness: 140 }, durationInFrames: 18 });
          const pop = spring({ frame: frame - r.frameAt - 6, fps, config: { damping: 12, stiffness: 180 }, durationInFrames: 20 });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, opacity: p, transform: `translateX(${(1 - p) * -30}px)` }}>
              <svg width={64} height={64} viewBox="0 0 64 64" style={{ transform: `scale(${pop})`, flex: "none" }}>
                {r.ok ? (
                  <>
                    <circle cx={32} cy={32} r={29} fill={COLORS.white} />
                    <path d="M18 33 L28 43 L47 22" stroke={COLORS.navy} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </>
                ) : (
                  <>
                    <circle cx={32} cy={32} r={28} stroke={COLORS.white} strokeWidth={4} fill="none" />
                    <path d="M21 21 L43 43 M43 21 L21 43" stroke={COLORS.white} strokeWidth={6} strokeLinecap="round" />
                  </>
                )}
              </svg>
              <div style={{ fontFamily: FONTS.family, fontWeight: FONTS.bold, fontSize: 46, letterSpacing: "-0.01em" }}>{r.text}</div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};
