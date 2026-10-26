import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../../config/theme";
import { usePalette } from "../../lib/EditContext";
import { Panel } from "./Panel";

type Row = { frameAt: number; ok: boolean; text: string };

/** Two stacked questions with a check / cross mark: "any alopecia? / any that can't be transplanted?" */
export const VerdictGraphic: React.FC<{ rows: Row[]; durationInFrames: number }> = ({ rows, durationInFrames }) => {
  const pal = usePalette();
  const light = !!pal.light;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Panel durationInFrames={durationInFrames} height={250} padding={light ? "0 40px" : "0 56px"}>
      <div style={{ display: "flex", flexDirection: "column", gap: light ? 14 : 28, alignItems: "flex-start", width: "100%" }}>
        {rows.map((r, i) => {
          const p = spring({ frame: frame - r.frameAt, fps, config: { damping: 200, stiffness: 140 }, durationInFrames: 18 });
          const pop = spring({ frame: frame - r.frameAt - 6, fps, config: { damping: 12, stiffness: 180 }, durationInFrames: 20 });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, opacity: p, transform: `translateX(${(1 - p) * -30}px)` }}>
              <svg width={light ? 52 : 64} height={light ? 52 : 64} viewBox="0 0 64 64" style={{ transform: `scale(${pop})`, flex: "none" }}>
                {r.ok ? (
                  <>
                    <circle cx={32} cy={32} r={29} fill={pal.accent} />
                    <path d="M18 33 L28 43 L47 22" stroke={pal.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </>
                ) : (
                  <>
                    <circle cx={32} cy={32} r={28} stroke={pal.accent} strokeWidth={4} fill="none" />
                    <path d="M21 21 L43 43 M43 21 L21 43" stroke={pal.accent} strokeWidth={6} strokeLinecap="round" />
                  </>
                )}
              </svg>
              <div style={{ fontFamily: FONTS.family, fontWeight: FONTS.bold, fontSize: light ? 40 : 46, letterSpacing: "-0.01em" }}>{r.text}</div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};
