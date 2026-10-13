import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { BRAND, EASE } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Closing: a brand-blue panel wipes up over the footage, then the white logo fades in with a very subtle scale. Logo keeps its native proportions (1723x324). */
export const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const wipe = interpolate(f, [0, 20], [0, 1], { ...clamp, easing: Easing.bezier(...EASE.inOut) });
  const fade = interpolate(f, [14, 32], [0, 1], { ...clamp, easing: Easing.bezier(...EASE.out) });
  const scale = interpolate(f, [14, 54], [0.965, 1], { ...clamp, easing: Easing.bezier(...EASE.out) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: BRAND.blue, clipPath: `inset(${(1 - wipe) * 100}% 0 0 0)` }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Img src={staticFile("logo/brum-white.png")} style={{ width: 640, height: "auto", opacity: fade, transform: `scale(${scale})` }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
