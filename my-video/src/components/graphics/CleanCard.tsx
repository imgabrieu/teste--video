import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { CANVAS, FONTS, SAFE } from "../../config/theme";

const INK = "#1F2430";
const MUTED = "#7B8190";
const TOP = 960;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = { easing: Easing.out(Easing.cubic), ...clamp } as const;

/** White card: soft fade + 14 px rise in, fade out. No gradient, no sound, no bounce. */
const Card: React.FC<{ durationInFrames: number; children: React.ReactNode }> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 14], [0, 1], ease);
  const exit = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: SAFE.left,
        top: TOP,
        width: CANVAS.width - SAFE.left - SAFE.right,
        boxSizing: "border-box",
        padding: "34px 44px 36px",
        borderRadius: 28,
        background: "rgba(255,255,255,0.96)",
        boxShadow: "0 10px 36px rgba(20,24,40,0.16)",
        color: INK,
        fontFamily: FONTS.family,
        textAlign: "center",
        opacity: Math.min(enter, exit),
        transform: `translateY(${(1 - enter) * 14}px)`,
      }}
    >
      {children}
    </div>
  );
};

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontWeight: FONTS.semiBold, fontSize: 26, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED, marginBottom: 14 }}>{children}</div>
);

/** One key phrase with an optional small label above and a thin line that draws in below. */
export const CleanKeyword: React.FC<{ kicker?: string; text: string; durationInFrames: number }> = ({ kicker, text, durationInFrames }) => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [8, 28], [0, 1], ease);
  return (
    <Card durationInFrames={durationInFrames}>
      {kicker && <Kicker>{kicker}</Kicker>}
      <div style={{ fontWeight: FONTS.bold, fontSize: text.length > 20 ? 56 : text.length > 12 ? 68 : 84, lineHeight: 1.08, letterSpacing: "-0.015em" }}>{text}</div>
      <div style={{ margin: "18px auto 0", height: 3, width: 140 * line, borderRadius: 2, background: INK }} />
    </Card>
  );
};

/** Short label + words appearing one at a time (fade + tiny rise), separated by thin dots. */
export const CleanList: React.FC<{ label: string; items: { frameAt: number; text: string }[]; durationInFrames: number }> = ({ label, items, durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <Card durationInFrames={durationInFrames}>
      <Kicker>{label}</Kicker>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "6px 22px" }}>
        {items.map((it, i) => {
          const p = interpolate(frame, [it.frameAt, it.frameAt + 10], [0, 1], ease);
          return (
            <React.Fragment key={i}>
              {i > 0 && <span style={{ width: 8, height: 8, borderRadius: 4, background: MUTED, opacity: 0.35 }} />}
              <span style={{ fontWeight: FONTS.bold, fontSize: 46, lineHeight: 1.25, opacity: 0.22 + 0.78 * p, display: "inline-block" }}>{it.text}</span>
            </React.Fragment>
          );
        })}
      </div>
    </Card>
  );
};
