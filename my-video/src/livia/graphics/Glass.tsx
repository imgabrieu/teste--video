import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { L, LAYOUT } from "../theme";

/** Entrance (soft rise + fade) / exit wrapper shared by every Lívia motion: a frosted white card with a plum-tinted shadow. */
export const useLife = (durationInFrames: number, enterFrames = 20) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200, stiffness: 110 }, durationInFrames: enterFrames });
  const exit = interpolate(frame, [durationInFrames - 9, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return { frame, enter, exit, opacity: Math.min(enter, exit) };
};

export const Glass: React.FC<{
  durationInFrames: number;
  width: number;
  height: number;
  top?: number;
  radius?: number;
  children: React.ReactNode;
  rise?: number;
}> = ({ durationInFrames, width, height, top = LAYOUT.motionTop, radius = 44, children, rise = 24 }) => {
  const { enter, opacity } = useLife(durationInFrames);
  return (
    <div
      style={{
        position: "absolute",
        left: (1080 - width) / 2,
        top,
        width,
        height,
        boxSizing: "border-box",
        borderRadius: radius,
        background: `linear-gradient(160deg, ${L.glass} 0%, rgba(255,244,249,0.84) 100%)`,
        border: `1.5px solid ${L.glassLine}`,
        boxShadow: `0 22px 60px ${L.shadow}, inset 0 1px 0 rgba(255,255,255,0.9)`,
        backdropFilter: "blur(18px)",
        opacity,
        transform: `translateY(${(1 - enter) * rise}px) scale(${0.97 + 0.03 * enter})`,
      }}
    >
      {children}
    </div>
  );
};
