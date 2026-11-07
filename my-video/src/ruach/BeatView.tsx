import React from "react";
import { AbsoluteFill } from "remotion";
import { clamp01, RowView } from "./kinetic";
import { BEAT_EXIT, type RBeat } from "./schedule";

export const BeatView: React.FC<{ rb: RBeat; t: number }> = ({ rb, t }) => {
  const life = rb.until - rb.firstTime;
  const k = clamp01((t - rb.firstTime) / life);
  const ex = clamp01((t - rb.exitAt) / BEAT_EXIT);
  const gap = rb.beat.rowGap ?? 0;
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: 1 - ex,
        // deriva lenta enquanto está em cena + saída com leve avanço e desfoque
        transform: `translateY(${-ex * 34}px) scale(${1 + k * 0.022 + ex * 0.035})`,
        filter: ex > 0 ? `blur(${ex * 9}px)` : undefined,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap }}>
        {rb.rows.map((r, i) => (
          <RowView key={i} r={r} t={t} variant={rb.beat.variant} dir={rb.beat.dir ?? 1} tight={rb.beat.tight} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
