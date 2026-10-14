import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../../config/theme";
import { usePalette } from "../../lib/EditContext";
import { Panel } from "./Panel";

type Cell = { frameAt: number; ok: boolean } | null;

/** Where each product is applied: columns = hair zones, rows = products; ✓/✕ appear exactly when each is spoken. */
export const MatrixGraphic: React.FC<{ cols: string[]; rows: { label: string; cells: Cell[] }[]; durationInFrames: number }> = ({ cols, rows, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = usePalette();
  const LBL = 290, COL = 170;
  return (
    <Panel durationInFrames={durationInFrames} height={250} padding="0 34px">
      <div style={{ display: "grid", gridTemplateColumns: `${LBL}px repeat(${cols.length}, ${COL}px)`, alignItems: "center", rowGap: 18, fontFamily: FONTS.family }}>
        <div />
        {cols.map((c, i) => (
          <div key={i} style={{ textAlign: "center", fontWeight: FONTS.semiBold, fontSize: 26, letterSpacing: "0.02em", opacity: 0.78 }}>{c}</div>
        ))}
        {rows.map((r, ri) => (
          <React.Fragment key={ri}>
            <div style={{ fontWeight: FONTS.bold, fontSize: 33, whiteSpace: "nowrap" }}>{r.label}</div>
            {r.cells.map((cell, ci) => {
              const p = cell ? spring({ frame: frame - cell.frameAt, fps, config: { damping: 11, stiffness: 190 }, durationInFrames: 20 }) : 0;
              return (
                <div key={ci} style={{ display: "flex", justifyContent: "center", height: 62 }}>
                  {cell ? (
                    <svg width={58} height={58} viewBox="0 0 64 64" style={{ transform: `scale(${p})` }}>
                      {cell.ok ? (
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
                  ) : (
                    <div style={{ width: 22, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.18)", alignSelf: "center" }} />
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </Panel>
  );
};
