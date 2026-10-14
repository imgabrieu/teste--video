import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../config/theme";
import { GRADIENT, L } from "./theme";
import { HEART_PATH, Sparkle } from "./graphics/Sparkle";

const ease = (frame: number, a: number, b: number) => interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

/** Closing card: a blush-white veil, a thin heart, the occasion and the signature. */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const veil = ease(frame, 0, 16) * 0.95;
  const s = (d: number) => spring({ frame: frame - d, fps, config: { damping: 200, stiffness: 100 }, durationInFrames: 26 });
  const heart = s(8);
  const l1 = s(16);
  const l2 = s(22);
  const line = ease(frame, 30, 52);
  const sign = s(38);
  const text = (p: number): React.CSSProperties => ({ opacity: p, transform: `translateY(${(1 - p) * 18}px)` });
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 38%, rgba(255,255,255,${veil}) 0%, rgba(255,240,248,${veil}) 45%, rgba(238,224,250,${veil}) 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONTS.family,
        color: L.plum,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -40 }}>
        <svg width={120} height={120} viewBox="0 0 24 24" style={{ opacity: heart, transform: `scale(${0.8 + 0.2 * heart})`, marginBottom: 34, overflow: "visible" }}>
          <defs>
            <linearGradient id="og" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={L.rose} /><stop offset="1" stopColor={L.purple} /></linearGradient>
          </defs>
          <path d={HEART_PATH} fill="rgba(232,111,168,0.16)" stroke="url(#og)" strokeWidth={0.9} strokeLinejoin="round" />
        </svg>
        <div style={{ fontWeight: 500, fontSize: 52, letterSpacing: "0.02em", color: L.purple, ...text(l1) }}>Feliz Dia do</div>
        <div style={{ fontWeight: 700, fontSize: 96, lineHeight: 1.1, letterSpacing: "-0.015em", background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", ...text(l1) }}>Neurologista</div>
        <div style={{ margin: "30px 0 22px", height: 3, width: 220 * line, borderRadius: 2, background: GRADIENT }} />
        <div style={{ fontWeight: 500, fontSize: 38, letterSpacing: "0.14em", textTransform: "uppercase", color: L.plum, ...text(l2) }}>Mês do Médico</div>
        <div style={{ marginTop: 54, fontWeight: 600, fontSize: 56, ...text(sign) }}>Dra. Lívia</div>
      </div>
      <Sparkle x={250} y={760} size={34} color={L.rose} delay={0} opacity={heart} />
      <Sparkle x={840} y={1120} size={26} color={L.purple} delay={8} opacity={heart} />
      <Sparkle x={800} y={640} size={20} color={L.rose} delay={14} opacity={heart} />
      <Sparkle x={220} y={1180} size={20} color={L.purple} delay={20} opacity={heart} />
    </AbsoluteFill>
  );
};
