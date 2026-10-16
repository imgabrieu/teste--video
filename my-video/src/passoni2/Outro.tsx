import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { PC, TIMING } from "./config";
import { FullPair, FULL_RATIO } from "./Opener";

const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.out(Easing.cubic);
const W = 760;
const TOP = 330;

/** Closing screen: light background, the result once more (side by side), the logo. Everything enters softly, then rests. */
export const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const veilStart = TIMING.outroHold;
  const veil = interpolate(f, [veilStart, veilStart + TIMING.outroVeil], [0, 1], { ...clampX, easing: Easing.inOut(Easing.cubic) });
  const t = f - (veilStart + TIMING.outroVeil - 4);
  const cardO = interpolate(t, [0, 20], [0, 1], clampX);
  const cardY = interpolate(t, [0, 28], [22, 0], { ...clampX, easing: ease });
  const lineW = interpolate(t, [34, 56], [0, 64], { ...clampX, easing: ease });
  const logoO = interpolate(t, [40, 64], [0, 1], clampX);
  const drift = interpolate(t, [0, 100], [1, 1.012], clampX);
  const ph = (W - 8) / 2 / FULL_RATIO;
  return (
    <AbsoluteFill style={{ backgroundColor: PC.bg, opacity: veil }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${drift})` }}>
        <div style={{ position: "absolute", top: TOP, left: (1080 - W) / 2, opacity: cardO, transform: `translateY(${cardY}px)` }}>
          <FullPair width={W} />
        </div>
        <div style={{ position: "absolute", top: TOP + ph + 96, left: 540 - lineW / 2, width: lineW, height: 1.5, background: PC.taupe }} />
        <Img src={staticFile("passoni2/logo-ink.png")} style={{ position: "absolute", top: TOP + ph + 140, left: (1080 - 340) / 2, width: 340, opacity: logoO }} />
      </div>
    </AbsoluteFill>
  );
};
