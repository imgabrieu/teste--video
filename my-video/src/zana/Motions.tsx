import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, f } from "./tokens";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const OUT_E = Easing.bezier(0.16, 1, 0.3, 1);
const IN_E = Easing.bezier(0.7, 0, 0.84, 0);
const ramp = (frame: number, a: number, b: number, easing = OUT_E) => interpolate(frame, [a, b], [0, 1], { easing, ...clamp });

/** "olhar" → viewfinder corners settle in; "além da estética" → they open past the edges. */
export const Viewfinder: React.FC = () => {
  const frame = useCurrentFrame();
  const a = f(2.1);
  const b = f(4.78);
  if (frame < a - 1 || frame > b + 18) return null;
  const inP = ramp(frame, a, a + 12);
  const outP = ramp(frame, b, b + 16, IN_E);
  const inset = 70 - 150 * outP + 60 * (1 - inP);
  const opacity = inP * (1 - ramp(frame, b + 6, b + 16, Easing.linear));
  const L = 96;
  const T = 5;
  const corner = (x: "left" | "right", y: "top" | "bottom"): React.CSSProperties => ({
    position: "absolute",
    width: L,
    height: L,
    [x]: x === "left" ? inset : inset,
    [y]: y === "top" ? 210 + (inset - 70) : 1920 - 1210 + (inset - 70),
    [`border${x === "left" ? "Left" : "Right"}`]: `${T}px solid ${C.white}`,
    [`border${y === "top" ? "Top" : "Bottom"}`]: `${T}px solid ${C.white}`,
    borderRadius: 4,
  });
  return (
    <AbsoluteFill style={{ opacity, filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.35))" }}>
      <div style={corner("left", "top")} />
      <div style={corner("right", "top")} />
      <div style={corner("left", "bottom")} />
      <div style={corner("right", "bottom")} />
    </AbsoluteFill>
  );
};

const STEPS = [6.52, 7.92, 9.12, 10.0, 12.24];

/** Criteria counter: black pill, number rolls up with each item the narrator lists (localização … potencial). */
export const Counter: React.FC = () => {
  const frame = useCurrentFrame();
  const a = f(6.4);
  const b = f(14.3);
  if (frame < a || frame > b + 10) return null;
  const inP = ramp(frame, a, a + 10);
  const outP = ramp(frame, b, b + 8, Easing.linear);
  const pos = STEPS.reduce((acc, s) => acc + ramp(frame, f(s), f(s) + 8), 0) - 1; // 0..4
  const idx = Math.round(pos);
  const H = 50;
  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        top: 236,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "14px 28px 14px 24px",
        borderRadius: 999,
        background: C.ink,
        fontFamily: "Poppins, sans-serif",
        opacity: inP * (1 - outP),
        transform: `translateY(${(1 - inP) * -16}px)`,
      }}
    >
      <div style={{ height: H, overflow: "hidden", color: C.white, fontWeight: 700, fontSize: 40, lineHeight: `${H}px` }}>
        <div style={{ transform: `translateY(${-Math.max(0, pos) * H}px)` }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ height: H }}>{`0${i + 1}`}</div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 7 }}>
        {STEPS.map((_, i) => {
          const fill = ramp(frame, f(STEPS[i]), f(STEPS[i]) + 8);
          return <div key={i} style={{ width: 30, height: 5, borderRadius: 3, background: `rgba(255,255,255,${0.28 + 0.72 * fill})` }} />;
        })}
      </div>
      <div style={{ color: C.grey, fontWeight: 500, fontSize: 28 }}>{`/05`}</div>
      <span style={{ display: "none" }}>{idx}</span>
    </div>
  );
};

/** "Na Zana Homes" — brief veil + white wordmark, the only time the brand appears before the end card. */
export const BrandMoment: React.FC = () => {
  const frame = useCurrentFrame();
  const a = f(14.75);
  const b = f(16.35);
  if (frame < a - 1 || frame > b + 12) return null;
  const inP = ramp(frame, a, a + 14);
  const outP = ramp(frame, b, b + 10, Easing.linear);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "#000", opacity: 0.34 * inP * (1 - outP) }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 470 }}>
        <div style={{ overflow: "hidden", padding: 10 }}>
          <Img
            src={staticFile("logo/zana-white.png")}
            style={{ width: 460, display: "block", opacity: inP * (1 - outP), transform: `translateY(${(1 - inP) * 40}px)` }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Plate: React.FC<{ opacity: number; children: React.ReactNode; w: number; h: number }> = ({ opacity, children, w, h }) => (
  <div
    style={{
      position: "absolute",
      left: 540 - w / 2,
      top: 260,
      width: w,
      height: h,
      borderRadius: 40,
      background: C.ink,
      opacity,
      transform: `scale(${0.94 + 0.06 * opacity})`,
    }}
  >
    {children}
  </div>
);

/** "análise completa" — ring closes while the words are said, then the tick. */
export const CompleteRing: React.FC = () => {
  const frame = useCurrentFrame();
  const a = f(17.84);
  const done = f(18.95);
  const b = f(19.45);
  if (frame < a - 1 || frame > b + 10) return null;
  const inP = ramp(frame, a, a + 8);
  const outP = ramp(frame, b, b + 8, Easing.linear);
  const prog = interpolate(frame, [a + 4, done], [0, 1], { easing: Easing.inOut(Easing.cubic), ...clamp });
  const tick = ramp(frame, done, done + 8);
  const R = 52;
  const len = 2 * Math.PI * R;
  return (
    <Plate opacity={inP * (1 - outP)} w={190} h={190}>
      <svg width={190} height={190} viewBox="0 0 190 190">
        <circle cx={95} cy={95} r={R} fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth={7} />
        <circle
          cx={95}
          cy={95}
          r={R}
          fill="none"
          stroke={C.white}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={len}
          strokeDashoffset={len * (1 - prog)}
          transform="rotate(-90 95 95)"
        />
        <path d="M72 97 L88 113 L119 79" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={90} strokeDashoffset={90 * (1 - tick)} />
      </svg>
    </Plate>
  );
};

/** "construir patrimônio" — three rising bars. */
export const GrowthBars: React.FC = () => {
  const frame = useCurrentFrame();
  const a = f(25.15);
  const b = f(26.4);
  if (frame < a - 1 || frame > b + 10) return null;
  const inP = ramp(frame, a, a + 8);
  const outP = ramp(frame, b, b + 8, Easing.linear);
  const heights = [52, 92, 138];
  return (
    <Plate opacity={inP * (1 - outP)} w={190} h={190}>
      <div style={{ position: "absolute", left: 38, right: 38, bottom: 34, top: 20, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        {heights.map((h, i) => {
          const g = ramp(frame, a + 4 + i * 7, a + 22 + i * 7);
          return <div key={i} style={{ width: 30, height: h * g, borderRadius: 8, background: i === 2 ? C.white : C.greyLight }} />;
        })}
      </div>
    </Plate>
  );
};
