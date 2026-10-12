import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ANIM, CAPTION, COLORS, FONTS } from "../config/theme";
import type { CaptionPage } from "../lib/captionPages";

/** One caption page: words enter one by one (fade + tiny rise + soft spring scale). Highlighted words sit on a white chip with navy text. */
export const AnimatedCaption: React.FC<{ page: CaptionPage }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const life = page.to - page.from;
  const exit = interpolate(frame, [life - 4, life], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        textAlign: "center",
        fontFamily: FONTS.family,
        fontWeight: FONTS.bold,
        fontSize: CAPTION.fontSize,
        lineHeight: CAPTION.lineHeight,
        letterSpacing: "-0.01em",
        color: COLORS.white,
        textShadow: `0 2px 4px rgba(6,20,34,0.5), 0 4px 28px ${COLORS.shadow}`,
        opacity: exit,
        transform: `translateY(${(1 - exit) * -4}px)`,
      }}
    >
      {page.words.map((w, i) => {
        const local = frame - (w.frame - page.from);
        const p = spring({ frame: local, fps, config: { damping: 200, stiffness: 120, mass: 0.8 }, durationInFrames: ANIM.wordInFrames + 6 });
        const fade = interpolate(local, [0, ANIM.wordInFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const rise = (1 - p) * ANIM.wordRisePx * ANIM.intensity;
        const scale = ANIM.wordStartScale + (1 - ANIM.wordStartScale) * p;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              marginRight: i < page.words.length - 1 ? `${CAPTION.wordGapEm}em` : 0,
              opacity: fade,
              transform: `translateY(${rise}px) scale(${scale})`,
              transformOrigin: "50% 80%",
              ...(w.hl
                ? {
                    background: "rgba(255,255,255,0.97)",
                    color: COLORS.navy,
                    textShadow: "none",
                    padding: "0 0.28em",
                    borderRadius: 18,
                    boxShadow: "0 8px 28px rgba(6,20,34,0.28)",
                  }
                : {}),
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
