import React from "react";
import { ANTON, COLORS } from "./theme";
import { clamp01, OUT_EXPO, OUT_QUART, prog } from "./kinetic";

export type NameConfig = {
  pre: string;
  lines: [string, string];
  size: number;
  /** instantes (relógio do áudio) em que cada parte é pronunciada */
  times: { pre: number; l1: number; l2: number };
};

const pulse = (t: number, at: number, dur = 0.7) => {
  const x = (t - at) / dur;
  if (x < 0 || x > 1) return 0;
  return Math.sin(Math.min(1, x * 6) * (Math.PI / 2)) * Math.exp(-x * 3.2);
};

const baseStyle = (size: number): React.CSSProperties => ({
  fontFamily: ANTON,
  fontWeight: 400,
  fontSize: size,
  lineHeight: 1.0,
  textTransform: "uppercase",
  letterSpacing: "0.012em",
  whiteSpace: "nowrap",
  display: "inline-block",
});

/** Cena final · "PR. / NOME / SOBRENOME" (t no relógio do áudio). */
export const NameFinale: React.FC<{ t: number; cfg: NameConfig }> = ({ t, cfg }) => {
  const SIZE = cfg.size;
  const base = baseStyle(SIZE);
  const { pre: pr, l1: marcos, l2: rozenio } = cfg.times;
  if (t < pr - 0.1) return null;

  const pu = pulse(t, marcos, 0.9) + pulse(t, rozenio, 0.9) * 0.7;

  const pp = prog(t, pr - 0.06, 0.9, OUT_EXPO);
  const lines = prog(t, pr + 0.1, 1.1, OUT_EXPO);

  const p1 = prog(t, marcos - 0.05, 0.62, OUT_QUART);
  const p2 = prog(t, rozenio - 0.05, 0.62, OUT_QUART);
  const slam = (p: number): React.CSSProperties => ({
    opacity: Math.min(1, p * 3.5),
    transform: `scale(${1 + (1 - p) * 0.95}) translateY(${(1 - p) * 26}px)`,
    filter: `blur(${(1 - p) * 22}px) brightness(${1 + (1 - p) * 1.1}) drop-shadow(0 16px 36px rgba(4,9,20,0.55))`,
  });

  // varredura de luz dentro das letras, logo depois da entrada
  const sweepFor = (delay: number) => 0.92 - clamp01((t - (rozenio + 0.5) - delay) / 1.5) * 0.84;
  const fill = (delay: number): React.CSSProperties => ({
    backgroundImage: `linear-gradient(105deg, ${COLORS.white} 0%, ${COLORS.white} 41%, #FFE189 50%, ${COLORS.white} 59%, ${COLORS.white} 100%)`,
    backgroundSize: "300% 100%",
    backgroundPosition: `${sweepFor(delay) * 100}% 0`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  });

  // choque de luz + anel
  const flash = pulse(t, marcos, 0.45) * 0.34 + pulse(t, rozenio, 0.4) * 0.18;
  const ringP = clamp01((t - marcos) / 1.3);
  const rule = prog(t, rozenio + 0.25, 1.0, OUT_EXPO);
  const drift = 1 + 0.018 * clamp01((t - marcos) / 6);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,236,190,${flash}) 0%, transparent 70%)` }} />
      {ringP > 0 && ringP < 1 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 1000 + ringP * 1900,
            height: 520 + ringP * 800,
            marginLeft: -(1000 + ringP * 1900) / 2,
            marginTop: -(520 + ringP * 800) / 2,
            borderRadius: "50%",
            border: `2px solid rgba(255,226,150,${0.5 * (1 - ringP)})`,
            boxShadow: `0 0 40px rgba(255,214,120,${0.25 * (1 - ringP)})`,
          }}
        />
      )}

      <div style={{ transform: `scale(${drift * (1 + pu * 0.012)})`, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* PR. */}
        <div style={{ display: "flex", alignItems: "center", gap: 36, marginBottom: 4 }}>
          <div style={{ height: 3, width: 190 * lines, background: `linear-gradient(90deg, transparent, ${COLORS.gold})`, opacity: lines }} />
          <div
            style={{
              fontFamily: ANTON,
              fontSize: 112,
              lineHeight: 1.1,
              color: COLORS.white,
              letterSpacing: `${0.46 + (1 - pp) * 0.9}em`,
              marginRight: `-0.46em`,
              opacity: pp,
              filter: `blur(${(1 - pp) * 8}px)`,
              textShadow: "0 6px 40px rgba(4,9,20,0.6)",
            }}
          >
            {cfg.pre}
          </div>
          <div style={{ height: 3, width: 190 * lines, background: `linear-gradient(270deg, transparent, ${COLORS.gold})`, opacity: lines }} />
        </div>

        {/* MARCOS / ROZENIO */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
          <div style={{ clipPath: `inset(${-0.16 * SIZE}px ${-SIZE}px ${-0.02 * SIZE}px ${-SIZE}px)` }}>
            <span style={{ ...base, ...slam(p1), ...fill(0) }}>{cfg.lines[0]}</span>
          </div>
          <div style={{ clipPath: `inset(${-0.02 * SIZE}px ${-SIZE}px ${-0.05 * SIZE}px ${-SIZE}px)`, marginTop: -SIZE * 0.06 }}>
            <span style={{ ...base, ...slam(p2), ...fill(0.14) }}>{cfg.lines[1]}</span>
          </div>
        </div>

        <div style={{ marginTop: 26, height: 3, width: 420 * rule, background: `linear-gradient(90deg, transparent, ${COLORS.yellow}, transparent)`, opacity: rule }} />
      </div>
    </div>
  );
};
