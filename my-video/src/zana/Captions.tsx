import React, { useMemo } from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { PAGES, Page, Size } from "./data";
import { C, SAFE, f } from "./tokens";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const OUT_E = Easing.bezier(0.16, 1, 0.3, 1);

const STYLE: Record<Size, React.CSSProperties> = {
  key: { fontWeight: 700, fontSize: 104, letterSpacing: "-0.025em", color: C.white },
  base: { fontWeight: 600, fontSize: 62, letterSpacing: "-0.01em", color: C.white },
  small: { fontWeight: 500, fontSize: 46, letterSpacing: "0", color: C.greyLight },
};

type Timed = { page: Page; from: number; to: number };

const buildTimed = (): Timed[] =>
  PAGES.map((page, i) => {
    const starts = page.lines.flatMap((l) => l.words.map((x) => x.s));
    const first = Math.min(...starts);
    const last = Math.max(...starts);
    const nextFirst = i + 1 < PAGES.length ? Math.min(...PAGES[i + 1].lines.flatMap((l) => l.words.map((x) => x.s))) : 32;
    const natural = last + 0.85;
    const end = nextFirst - natural < 0.3 ? nextFirst : natural;
    return { page, from: f(first), to: Math.max(f(Math.min(end, nextFirst)), f(first) + 10) };
  });

const Word: React.FC<{ t: string; z: Size; delay: number; dark?: boolean }> = ({ t, z, delay, dark }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const p = interpolate(local, [0, z === "key" ? 11 : 8], [0, 1], { easing: OUT_E, ...clamp });
  const scale = z === "key" ? 0.9 + 0.1 * p : 1;
  return (
    <span style={{ display: "inline-block", overflow: "hidden", padding: "0.12em 0.06em 0.2em", margin: "-0.12em -0.06em -0.2em" }}>
      <span
        style={{
          display: "inline-block",
          ...STYLE[z],
          color: dark ? C.black : STYLE[z].color,
          transform: `translateY(${(1 - p) * 105}%) scale(${scale})`,
          transformOrigin: "50% 100%",
          opacity: interpolate(local, [0, 4], [0, 1], clamp),
          textShadow: dark ? "none" : "0 2px 22px rgba(0,0,0,0.38)",
        }}
      >
        {t}
      </span>
    </span>
  );
};

const PageView: React.FC<{ item: Timed }> = ({ item }) => {
  const frame = useCurrentFrame();
  const life = item.to - item.from;
  const exit = interpolate(frame, [life - 4, life], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: SAFE.left,
        width: 1080 - SAFE.left - SAFE.right,
        bottom: SAFE.bottom,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        fontFamily: "Poppins, sans-serif",
        lineHeight: 1.08,
        opacity: exit,
        transform: `translateY(${(1 - exit) * -6}px)`,
      }}
    >
      {item.page.lines.map((line, li) => (
        <div
          key={li}
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 62,
            gap: "0.3em",
            ...(line.chip ? { background: C.white, borderRadius: 18, padding: "0.02em 0.34em 0.1em", marginTop: 8 } : {}),
          }}
        >
          {line.words.map((wd, wi) => (
            <Word key={wi} t={wd.t} z={wd.z ?? "base"} delay={f(wd.s) - item.from} dark={line.chip} />
          ))}
        </div>
      ))}
    </div>
  );
};

/** Soft black foot-scrim for legibility; captions are stacked, centred, short blocks. */
export const Captions: React.FC = () => {
  const timed = useMemo(buildTimed, []);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 900,
          background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.32) 45%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div style={{ position: "absolute", inset: 0 }}>
        {timed.map((t, i) => (
          <Sequence key={i} from={t.from} durationInFrames={t.to - t.from} layout="none">
            <PageView item={t} />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};
