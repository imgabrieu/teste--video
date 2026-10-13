import React, { useMemo } from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { FONTS } from "../config/theme";
import { PAGES, WORDS } from "./data";
import { BRAND, EASE, H, SAFE, W, sec } from "./theme";

const FONT_SIZE = 70;

type BuiltPage = { from: number; to: number; lines: { idx: number[]; }[]; hl: Set<number> };

const build = (): BuiltPage[] => {
  const raw = PAGES.map((p) => {
    const first = p.lines[0][0];
    const last = p.lines[p.lines.length - 1][1];
    return { p, first, last };
  });
  return raw.map(({ p, first, last }, i) => {
    const from = sec(WORDS[first].s);
    const nextFrom = i + 1 < raw.length ? sec(WORDS[raw[i + 1].first].s) : Infinity;
    const natural = sec(WORDS[last].s) + sec(0.55);
    const to = Math.max(from + 10, Math.min(nextFrom + 2, natural));
    return {
      from,
      to,
      lines: p.lines.map(([a, b]) => ({ idx: Array.from({ length: b - a + 1 }, (_, k) => a + k) })),
      hl: new Set(p.hl ?? []),
    };
  });
};

const Page: React.FC<{ page: BuiltPage }> = ({ page }) => {
  const frame = useCurrentFrame();
  const life = page.to - page.from;
  const exit = interpolate(frame, [life - 4, life], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", opacity: exit }}>
      {page.lines.map((line, li) => (
        <div key={li} style={{ display: "flex", justifyContent: "center", gap: "0.28em", whiteSpace: "nowrap", lineHeight: 1.22 }}>
          {line.idx.map((wi) => {
            const local = frame - (sec(WORDS[wi].s) - page.from);
            const p = interpolate(local, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...EASE.out) });
            const hl = page.hl.has(wi);
            return (
              <span
                key={wi}
                style={{
                  display: "inline-block",
                  opacity: p,
                  transform: `translateY(${(1 - p) * 14}px) scale(${0.97 + 0.03 * p})`,
                  transformOrigin: "50% 100%",
                  padding: hl ? "0 0.24em" : 0,
                  borderRadius: 16,
                  background: hl ? BRAND.white : "transparent",
                  color: hl ? BRAND.blue : BRAND.white,
                  textShadow: hl ? "none" : "0 2px 6px rgba(8,22,36,0.55), 0 6px 26px rgba(8,22,36,0.45)",
                  boxShadow: hl ? "0 10px 30px rgba(8,22,36,0.35)" : "none",
                }}
              >
                {WORDS[wi].t}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/** Poppins Bold caps, white; brand-blue word chips only on key words. Sits above the Reels UI. A soft brand-blue scrim keeps white legible on bright footage. */
export const Captions: React.FC = () => {
  const pages = useMemo(build, []);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 1000,
          background: `linear-gradient(to top, rgba(${BRAND.blueRgb},0.9) 0%, rgba(${BRAND.blueRgb},0.8) 40%, rgba(${BRAND.blueRgb},0.55) 62%, rgba(${BRAND.blueRgb},0.2) 82%, rgba(${BRAND.blueRgb},0) 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: W - SAFE.left - SAFE.right,
          top: H - SAFE.bottom,
          height: 0,
          fontFamily: FONTS.family,
          fontWeight: FONTS.bold,
          fontSize: FONT_SIZE,
          letterSpacing: "0.01em",
          textTransform: "uppercase",
        }}
      >
        {pages.map((p, i) => (
          <Sequence key={i} from={p.from} durationInFrames={p.to - p.from} layout="none">
            <Page page={p} />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};
