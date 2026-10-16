import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { FONTS } from "../config/theme";
import { PC, TIMING } from "./config";

const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.out(Easing.cubic);
const CW = 470;
const CH = Math.round(CW / (1320 / 1176));
const GAP = 20;
const TOP = 590;

const Label: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => (
  <div style={{ marginTop: 26, textAlign: "center", fontFamily: FONTS.family, fontWeight: FONTS.semiBold, fontSize: 21, letterSpacing: "0.38em", paddingLeft: "0.38em", color: PC.ink, opacity }}>{text}</div>
);

/** Closing screen: light background, the result once more (side by side), the logo. Everything enters softly, then rests. */
export const Outro: React.FC = () => {
  const f = useCurrentFrame(); // local to the outro sequence (starts at the speech end)
  const veilStart = TIMING.outroHold;
  const veil = interpolate(f, [veilStart, veilStart + TIMING.outroVeil], [0, 1], { ...clampX, easing: Easing.inOut(Easing.cubic) });
  const t = f - (veilStart + TIMING.outroVeil - 4);
  const card = (delay: number) => ({
    o: interpolate(t, [delay, delay + 18], [0, 1], clampX),
    y: interpolate(t, [delay, delay + 26], [22, 0], { ...clampX, easing: ease }),
  });
  const a = card(0);
  const b = card(8);
  const lineW = interpolate(t, [34, 56], [0, 64], { ...clampX, easing: ease });
  const logoO = interpolate(t, [40, 64], [0, 1], clampX);
  const drift = interpolate(t, [0, 100], [1, 1.012], clampX);
  const total = 2 * CW + GAP;
  const left = (1080 - total) / 2;
  return (
    <AbsoluteFill style={{ backgroundColor: PC.bg, opacity: veil }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${drift})`, transformOrigin: "50% 50%" }}>
        {[
          { src: "passoni/antes.jpg", label: "ANTES", x: left, ...a },
          { src: "passoni/depois.jpg", label: "DEPOIS", x: left + CW + GAP, ...b },
        ].map((c) => (
          <div key={c.label} style={{ position: "absolute", top: TOP, left: c.x, width: CW, opacity: c.o, transform: `translateY(${c.y}px)` }}>
            <div style={{ width: CW, height: CH, borderRadius: 5, overflow: "hidden", boxShadow: "0 24px 56px rgba(70,52,34,0.10)" }}>
              <Img src={staticFile(c.src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <Label text={c.label} opacity={1} />
          </div>
        ))}
        <div style={{ position: "absolute", top: TOP + CH + 150, left: 540 - lineW / 2, width: lineW, height: 1.5, background: PC.taupe }} />
        <Img src={staticFile("passoni/logo-ink.png")} style={{ position: "absolute", top: TOP + CH + 196, left: (1080 - 340) / 2, width: 340, opacity: logoO }} />
      </div>
    </AbsoluteFill>
  );
};
