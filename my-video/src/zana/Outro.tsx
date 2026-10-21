import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, LOGO_IN, VEIL_FROM, f } from "./tokens";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** White veil closes over the last frame, then the black logo fades in with a very small scale. Nothing else on screen. */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const veil = interpolate(frame, [f(VEIL_FROM), f(LOGO_IN)], [0, 1], { easing: Easing.inOut(Easing.quad), ...clamp });
  const p = interpolate(frame, [f(LOGO_IN), f(LOGO_IN) + 22], [0, 1], { easing: Easing.bezier(0.16, 1, 0.3, 1), ...clamp });
  if (frame < f(VEIL_FROM)) return null;
  return (
    <AbsoluteFill style={{ background: `rgba(255,255,255,${veil})`, alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile("logo/zana-black.png")} style={{ width: 720, opacity: p, transform: `scale(${0.95 + 0.05 * p})` }} />
      <div style={{ display: "none", color: C.black }} />
    </AbsoluteFill>
  );
};
