import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ANIM, CAPTION, COLORS, FONTS } from "../config/theme";
import type { CaptionPage } from "../lib/captionPages";
import { useEdit, usePalette } from "../lib/EditContext";

const measure = (text: string, weight: number, px: number) => {
  const ctx = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : null;
  if (!ctx) return text.length * px * 0.6;
  ctx.font = `${weight} ${px}px Poppins, sans-serif`;
  return ctx.measureText(text).width;
};

/** One caption page: words enter one by one (fade + tiny rise + soft spring scale). Highlighted words sit on a white chip with navy text. */
export const AnimatedCaption: React.FC<{ page: CaptionPage }> = ({ page }) => {
  const pal = usePalette();
  const capCfg = useEdit().cfg.caption;
  const fontSize = capCfg?.fontSize ?? CAPTION.fontSize;
  const baseWeight = capCfg?.baseWeight ?? FONTS.bold;
  const hlWeight = capCfg?.hlWeight ?? FONTS.bold;
  const hlScale = capCfg?.hlScale ?? 1;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const life = page.to - page.from;
  const gapPx = CAPTION.wordGapEm * fontSize;
  const widths = page.words.map((w) => {
    const px = fontSize * (w.hl ? hlScale : 1);
    return measure(w.text, w.hl ? hlWeight : baseWeight, px) + (w.hl ? 0.56 * px : 0);
  });
  const totalW = widths.reduce((a, b) => a + b, 0) + gapPx * (page.words.length - 1);
  let visW = 0;
  page.words.forEach((w, i) => {
    const prog = interpolate(frame - (w.frame - page.from), [0, ANIM.wordInFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    visW += (widths[i] + (i > 0 ? gapPx : 0)) * prog;
  });
  const shiftX = (totalW - visW) / 2;
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
        fontWeight: baseWeight,
        fontSize,
        lineHeight: CAPTION.lineHeight,
        letterSpacing: "-0.01em",
        color: COLORS.white,
        textShadow: capCfg?.strongShadow ? `0 1px 3px rgba(6,20,34,0.75), 0 2px 10px rgba(6,20,34,0.6), 0 4px 28px rgba(6,20,34,0.45)` : `0 2px 4px rgba(6,20,34,0.5), 0 4px 28px ${COLORS.shadow}`,
        opacity: exit,
        transform: `translate(${shiftX}px, ${(1 - exit) * -4}px)`,
      }}
    >
      {page.words.map((w, i) => {
        const local = frame - (w.frame - page.from);
        const p = spring({ frame: local, fps, config: { damping: 200, stiffness: 120, mass: 0.8 }, durationInFrames: ANIM.wordInFrames + 6 });
        const fade = interpolate(local, [0, ANIM.wordInFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const reveal = interpolate(local, [0, ANIM.wordInFrames + 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
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
                    background: pal.highlightBg,
                    color: pal.highlightFg,
                    fontWeight: hlWeight,
                    fontSize: `${hlScale}em`,
                    lineHeight: 1.1,
                    textShadow: "none",
                    padding: "0 0.28em",
                    borderRadius: 18,
                    boxShadow: "0 8px 28px rgba(6,20,34,0.28)",
                    border: capCfg?.chipBorder ? "1.5px solid rgba(255,255,255,0.3)" : undefined,
                    clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0 round 18px)`,
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
