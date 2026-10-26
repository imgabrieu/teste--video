import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CANVAS, LOGO, SAFE } from "../../config/theme";

/** Discreet brand sign-off: the (cream) logo on a solid navy plate, so it stays legible on any footage. */
export const LogoPlate: React.FC<{ bg: string; durationInFrames: number }> = ({ bg, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200, stiffness: 110 }, durationInFrames: 20 });
  const exit = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 0, width: CANVAS.width, top: SAFE.top + 10, display: "flex", justifyContent: "center", opacity: Math.min(p, exit), transform: `translateY(${(1 - p) * -14}px)` }}>
      <div style={{ background: bg, borderRadius: 22, padding: "20px 38px 16px", boxShadow: "0 10px 30px rgba(6,20,34,0.22)" }}>
        <Img src={staticFile(LOGO.file)} style={{ width: 300, display: "block" }} />
      </div>
    </div>
  );
};
