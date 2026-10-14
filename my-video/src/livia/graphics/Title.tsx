import React from "react";
import { interpolate } from "remotion";
import { FONTS } from "../../config/theme";
import { GRADIENT, L, LAYOUT } from "../theme";
import { Sparkle } from "./Sparkle";
import { useLife } from "./Glass";

/** Opening card: the occasion. Sits in the top safe area, above the face. */
export const Title: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const { frame, enter, opacity } = useLife(durationInFrames, 24);
  const line = interpolate(frame, [8, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub = interpolate(frame, [14, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 0, width: 1080, top: LAYOUT.safeTop, display: "flex", justifyContent: "center", opacity, transform: `translateY(${(1 - enter) * -20}px)` }}>
      <div
        style={{
          position: "relative",
          padding: "26px 58px 24px",
          borderRadius: 56,
          background: `linear-gradient(160deg, ${L.glass} 0%, rgba(255,244,249,0.84) 100%)`,
          border: `1.5px solid ${L.glassLine}`,
          boxShadow: `0 18px 50px ${L.shadow}`,
          backdropFilter: "blur(18px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: FONTS.family,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 36, letterSpacing: "0.14em", color: L.plum, textTransform: "uppercase" }}>Dia do Neurologista</div>
        <div style={{ margin: "12px 0 10px", height: 3, width: 150 * line, borderRadius: 2, background: GRADIENT }} />
        <div style={{ fontWeight: 500, fontSize: 31, letterSpacing: "0.06em", color: L.purple, opacity: sub, transform: `translateY(${(1 - sub) * 6}px)` }}>Mês do Médico</div>
        <Sparkle x={-8} y={4} size={30} color={L.rose} delay={0} />
        <Sparkle x={618} y={118} size={22} color={L.purple} delay={9} />
      </div>
    </div>
  );
};
