import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ANIM, CANVAS, COLORS, FONTS, MOTION_ZONE, SAFE } from "../../config/theme";

/** Patient chat bubble: typing dots, then the question types out. White bubble / navy text = the inverse of the glass panels. */
export const BubbleGraphic: React.FC<{ who: string; text: string; durationInFrames: number }> = ({ who, text, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 150 }, durationInFrames: 20 });
  const exit = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const typing = frame < 22;
  const chars = Math.max(0, Math.floor((frame - 22) * 1.6));
  return (
    <div
      style={{
        position: "absolute",
        left: SAFE.left,
        top: MOTION_ZONE.top + 30,
        width: CANVAS.width - SAFE.left - SAFE.right,
        opacity: Math.min(enter, exit),
        transform: `translateY(${(1 - enter) * 30 * ANIM.intensity}px) scale(${0.94 + 0.06 * enter})`,
        transformOrigin: "0% 100%",
        fontFamily: FONTS.family,
      }}
    >
      <div style={{ fontWeight: FONTS.semiBold, fontSize: 28, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.white, textShadow: `0 2px 12px ${COLORS.shadow}`, marginBottom: 12, marginLeft: 8 }}>{who}</div>
      <div style={{ display: "inline-block", maxWidth: "100%", background: "rgba(255,255,255,0.97)", color: COLORS.navy, borderRadius: "34px 34px 34px 8px", padding: "26px 38px", fontWeight: FONTS.bold, fontSize: 48, lineHeight: 1.2, boxShadow: "0 18px 50px rgba(6,20,34,0.32)" }}>
        {typing ? (
          <span style={{ display: "inline-flex", gap: 12, alignItems: "center", height: 58 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: 16, height: 16, borderRadius: 8, background: COLORS.navy, opacity: 0.35 + 0.65 * Math.max(0, Math.sin((frame - i * 4) / 3)) }} />
            ))}
          </span>
        ) : (
          text.slice(0, chars)
        )}
      </div>
    </div>
  );
};
