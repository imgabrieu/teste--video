import React from "react";
import { ANTON, COLORS, POPPINS } from "./theme";
import { clamp01, distribute, OUT_EXPO, OUT_QUART, prog } from "./kinetic";
import { FINALE } from "./timing";

const pulse = (t: number, at: number, dur = 0.7) => {
  const x = (t - at) / dur;
  if (x < 0 || x > 1) return 0;
  return Math.sin(Math.min(1, x * 6) * (Math.PI / 2)) * Math.exp(-x * 3.2);
};

const NAME_SIZE = 296;
const nameBase: React.CSSProperties = {
  fontFamily: ANTON,
  fontWeight: 400,
  fontSize: NAME_SIZE,
  lineHeight: 1.0,
  textTransform: "uppercase",
  letterSpacing: "0.012em",
  whiteSpace: "nowrap",
  display: "inline-block",
};

/** Cena final · "APÓSTOLO / CARL MORGAN / APOSTLE CARL MORGAN" */
export const Finale: React.FC<{ t: number }> = ({ t }) => {
  const { apostle, carl, morgan } = FINALE;
  if (t < apostle - 0.1) return null;

  // pulsos sincronizados com o nome falado (EN e depois PT)
  const pu = pulse(t, carl, 0.9) + pulse(t, morgan, 0.9) * 0.7 + pulse(t, FINALE.ptCarl, 0.6) * 0.5 + pulse(t, FINALE.ptMorgan, 0.6) * 0.5;

  // APÓSTOLO (acima)
  const pa = prog(t, apostle - 0.06, 0.9, OUT_EXPO);
  const lines = prog(t, apostle + 0.1, 1.1, OUT_EXPO);

  // CARL / MORGAN
  const pc = prog(t, carl - 0.05, 0.62, OUT_QUART);
  const pm = prog(t, morgan - 0.05, 0.62, OUT_QUART);
  const slamStyle = (p: number): React.CSSProperties => ({
    opacity: Math.min(1, p * 3.5),
    transform: `scale(${1 + (1 - p) * 0.95}) translateY(${(1 - p) * 26}px)`,
    filter: `blur(${(1 - p) * 22}px) brightness(${1 + (1 - p) * 1.1}) drop-shadow(0 16px 36px rgba(4,9,20,0.55))`,
  });

  // varredura de luz que atravessa as letras (após a entrada e de novo no nome em português)
  const sweepFor = (delay: number) => {
    const sp = t >= FINALE.ptCarl ? clamp01((t - FINALE.ptCarl - delay) / 1.3) : clamp01((t - (morgan + 0.45) - delay) / 1.5);
    return 0.92 - sp * 0.84;
  };
  const fillStyle = (delay: number): React.CSSProperties => ({
    backgroundImage: `linear-gradient(105deg, ${COLORS.white} 0%, ${COLORS.white} 41%, #FFE189 50%, ${COLORS.white} 59%, ${COLORS.white} 100%)`,
    backgroundSize: "300% 100%",
    backgroundPosition: `${sweepFor(delay) * 100}% 0`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  });

  // choque de luz + anel
  const flash = pulse(t, carl, 0.45) * 0.34 + pulse(t, morgan, 0.4) * 0.16;
  const ringP = clamp01((t - carl) / 1.3);

  // frase de boas-vindas (topo)
  const wp = prog(t, carl + 0.25, 0.8, OUT_EXPO);
  const ptWords = ["Recebam", "com", "muito", "carinho,"];
  const ptStarts = distribute(ptWords, FINALE.welcomePt[0], FINALE.welcomePt[1]);
  const welcomeActive = t >= FINALE.welcomePt[0] - 0.05 && t < FINALE.welcomePt[1] + 0.25;

  // APOSTLE CARL MORGAN (abaixo)
  const ep = prog(t, morgan + 0.18, 0.9, OUT_EXPO);
  const enSpoken = t >= apostle && t < morgan + 0.55;

  const drift = 1 + 0.018 * clamp01((t - carl) / 7);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* flash + anel de luz */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,236,190,${flash}) 0%, transparent 70%)` }} />
      {ringP > 0 && ringP < 1 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 1000 + ringP * 1900,
            height: 380 + ringP * 700,
            marginLeft: -(1000 + ringP * 1900) / 2,
            marginTop: -(380 + ringP * 700) / 2,
            borderRadius: "50%",
            border: `2px solid rgba(255,226,150,${0.5 * (1 - ringP)})`,
            boxShadow: `0 0 40px rgba(255,214,120,${0.25 * (1 - ringP)})`,
          }}
        />
      )}

      <div style={{ transform: `scale(${drift * (1 + pu * 0.012)})`, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* frase PT/EN no topo */}
        <div style={{ opacity: wp, transform: `translateY(${(1 - wp) * -18}px)`, textAlign: "center", marginBottom: 34 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "0 16px", fontFamily: POPPINS, fontWeight: 600, fontSize: 52, lineHeight: 1.3 }}>
            {ptWords.map((w, i) => {
              const active = t >= ptStarts[i] && t < (ptStarts[i + 1] ?? FINALE.welcomePt[1]);
              return (
                <span
                  key={i}
                  style={{
                    color: COLORS.white,
                    opacity: welcomeActive ? (active ? 1 : t >= ptStarts[i] ? 0.95 : 0.72) : 0.8,
                    textShadow: active
                      ? "0 0 34px rgba(255,236,190,0.7), 0 3px 22px rgba(4,9,20,0.7)"
                      : "0 3px 24px rgba(4,9,20,0.7)",
                    transform: `translateY(${active ? -2 : 0}px)`,
                  }}
                >
                  {w}
                </span>
              );
            })}
          </div>
          <div style={{ fontFamily: POPPINS, fontWeight: 500, fontSize: 32, color: COLORS.yellow, marginTop: 6, opacity: 0.88, textShadow: "0 2px 16px rgba(4,9,20,0.85)" }}>
            Please welcome with great affection,
          </div>
        </div>

        {/* APÓSTOLO */}
        <div style={{ display: "flex", alignItems: "center", gap: 36, marginBottom: 6 }}>
          <div style={{ height: 3, width: 190 * lines, background: `linear-gradient(90deg, transparent, ${COLORS.gold})`, opacity: lines }} />
          <div
            style={{
              fontFamily: ANTON,
              fontSize: 112,
              lineHeight: 1.1,
              color: COLORS.white,
              letterSpacing: `${0.46 - (pa - 0.5) * 0.0 + (1 - pa) * 0.9}em`,
              opacity: pa,
              filter: `blur(${(1 - pa) * 8}px)`,
              textShadow: "0 6px 40px rgba(4,9,20,0.6)",
              marginRight: `-${0.46}em`,
            }}
          >
            APÓSTOLO
          </div>
          <div style={{ height: 3, width: 190 * lines, background: `linear-gradient(270deg, transparent, ${COLORS.gold})`, opacity: lines }} />
        </div>

        {/* CARL MORGAN */}
        <div style={{ position: "relative", display: "flex", gap: "0 0.22em", fontSize: NAME_SIZE, lineHeight: 1 }}>
          <div style={{ clipPath: "inset(-0.2em -0.3em -0.05em -0.3em)" }}>
            <span style={{ ...nameBase, ...slamStyle(pc), ...fillStyle(0) }}>CARL</span>
          </div>
          <div style={{ clipPath: "inset(-0.2em -0.3em -0.05em -0.3em)" }}>
            <span style={{ ...nameBase, ...slamStyle(pm), ...fillStyle(0.14) }}>MORGAN</span>
          </div>
        </div>

        {/* APOSTLE CARL MORGAN */}
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div style={{ height: 3, width: 120 * ep, background: `linear-gradient(90deg, transparent, ${COLORS.yellow}, transparent)`, opacity: ep }} />
          <div
            style={{
              fontFamily: POPPINS,
              fontWeight: enSpoken ? 700 : 600,
              fontSize: 46,
              letterSpacing: `${0.4 + (1 - ep) * 0.5}em`,
              marginRight: `-${0.4}em`,
              color: enSpoken ? "#FFE27A" : COLORS.yellow,
              opacity: ep,
              transform: `translateY(${(1 - ep) * 16}px)`,
              textShadow: "0 2px 18px rgba(4,9,20,0.85), 0 0 30px rgba(255,210,80,0.25)",
              whiteSpace: "nowrap",
            }}
          >
            APOSTLE CARL MORGAN
          </div>
        </div>
      </div>
    </div>
  );
};
