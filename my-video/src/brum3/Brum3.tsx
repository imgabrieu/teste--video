import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useDelayRender } from "remotion";
import { FONTS } from "../config/theme";
import { loadFonts } from "../lib/fonts";
import { BRAND, EASE, FPS, H, SAFE, W, sec } from "../brum/theme";
import { COMPARE, FEATURE, OUTLINE, OUTRO, PRODUCT, RESULT, SCENES, Scene, SFX, VOICE, WINDOW, w } from "./data";
import { WORDS } from "./words";

export const BRUM3_TOTAL = sec(OUTRO.at) + sec(OUTRO.length);

/** y where the QUADRO BRUM half of the footage starts (the seam between the two halves). */
const SEAM = 911;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(...EASE.out);
const easeIO = Easing.bezier(...EASE.inOut);
const prog = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: ease });
const progIO = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: easeIO });

/** Solid brand blue with a barely-there technical grid. */
const Background: React.FC = () => (
  <AbsoluteFill style={{ background: BRAND.blue }}>
    <AbsoluteFill
      style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
        backgroundSize: "90px 90px",
      }}
    />
  </AbsoluteFill>
);

const Word: React.FC<{ text: string; size: number; dim?: boolean; chip?: boolean; localOnset: number }> = ({ text, size, dim, chip, localOnset }) => {
  const f = useCurrentFrame();
  const p = prog(f, localOnset - 2, localOnset + 8);
  const op = interpolate(f, [localOnset - 2, localOnset + 3], [0, 1], clamp);
  return (
    <span style={{ display: "inline-block", overflow: "hidden", padding: "0.22em 0.04em 0.08em", margin: "-0.22em 0 -0.08em" }}>
      <span
        style={{
          display: "inline-block",
          transform: `translateY(${(1 - p) * 112}%)`,
          opacity: op,
          color: chip ? BRAND.blue : dim ? "rgba(255,255,255,0.62)" : BRAND.white,
          background: chip ? BRAND.white : "transparent",
          borderRadius: chip ? size * 0.14 : 0,
          padding: chip ? "0 0.2em" : 0,
        }}
      >
        {text}
      </span>
    </span>
  );
};

/** Kinetic typography: words slide up out of a mask exactly on their spoken onset. */
const KineticScene: React.FC<{ scene: Scene; top?: number; height?: number }> = ({ scene, top = SAFE.top, height = H - SAFE.top - SAFE.bottom }) => {
  const f = useCurrentFrame();
  const from = sec(scene.from);
  const dur = sec(scene.to) - from;
  const out = interpolate(f, [dur - 5, dur], [1, 0], clamp);
  return (
    <div style={{ position: "absolute", left: SAFE.left, width: W - SAFE.left - SAFE.right, top, height, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", opacity: out, transform: `translateY(${(1 - out) * -16}px)`, fontFamily: FONTS.family, fontWeight: FONTS.bold, textTransform: "uppercase", letterSpacing: "0.005em" }}>
      {scene.lines.map((line, li) => (
        <div key={li} style={{ display: "flex", gap: "0.26em", whiteSpace: "nowrap", lineHeight: 1.14, justifyContent: "center", alignItems: "baseline", marginTop: li ? Math.round(line[0].size * 0.1) : 0 }}>
          {line.map((seg, si) => (
            <div key={si} style={{ display: "flex", gap: "0.26em", fontSize: seg.size }}>
              {Array.from({ length: seg.r[1] - seg.r[0] + 1 }, (_, k) => seg.r[0] + k).map((wi) => (
                <Word key={wi} text={WORDS[wi].t} size={seg.size} dim={seg.dim} chip={seg.chip} localOnset={sec(w(wi)) - from} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Layer: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => (
  <Sequence from={sec(from)} durationInFrames={sec(to) - sec(from)} layout="none">
    {children}
  </Sequence>
);

const Product: React.FC<{ src: number; style?: React.CSSProperties }> = ({ src, style }) => (
  <OffthreadVideo src={staticFile(PRODUCT)} trimBefore={sec(src)} muted style={{ width: W, height: H, ...style }} />
);

/** Side-by-side comparison, full frame: top = QUADRO CONCORRENTE, bottom = QUADRO BRUM (labels and timers are part of the footage). */
const Compare: React.FC = () => {
  const f = useCurrentFrame();
  const dur = sec(COMPARE.to) - sec(COMPARE.from);
  const open = progIO(f, 0, 14);
  const o = (a: number, b: number) => {
    const s = sec(a) - sec(COMPARE.from);
    const e = sec(b) - sec(COMPARE.from);
    return interpolate(f, [s - 3, s + 3, e - 3, e + 3], [0, 1, 1, 0], clamp);
  };
  const end = interpolate(f, [dur - 5, dur], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ clipPath: `inset(${(1 - open) * 50}% 0 ${(1 - open) * 50}% 0)`, opacity: end }}>
      <Product src={COMPARE.src} />
      <div style={{ position: "absolute", left: 14, right: 14, top: 14, height: SEAM - 30, border: "5px solid rgba(255,255,255,0.95)", borderRadius: 6, opacity: o(OUTLINE.top.from, OUTLINE.top.to), boxShadow: "0 0 0 2px rgba(22,55,83,0.5)" }} />
      <div style={{ position: "absolute", left: 14, right: 14, top: SEAM + 12, height: H - SEAM - 26, border: "5px solid rgba(255,255,255,0.95)", borderRadius: 6, opacity: o(OUTLINE.bottom.from, OUTLINE.bottom.to), boxShadow: "0 0 0 2px rgba(22,55,83,0.5)" }} />
    </AbsoluteFill>
  );
};

const Result: React.FC = () => {
  const f = useCurrentFrame();
  const dur = sec(RESULT.to) - sec(RESULT.from);
  const enter = interpolate(f, [0, 5], [0, 1], clamp);
  const end = interpolate(f, [dur - 5, dur], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, end) }}>
      <Product src={RESULT.src} />
    </AbsoluteFill>
  );
};

/** "Agilidade, organização e eficiência": keywords above, the QUADRO BRUM assembly (bottom half of the footage) below. */
const Feature: React.FC = () => {
  const f = useCurrentFrame();
  const dur = sec(FEATURE.to) - sec(FEATURE.from);
  const reveal = progIO(f, 0, 16);
  const winTop = 850;
  const out = interpolate(f, [dur - 5, dur], [1, 0], clamp);
  return (
    <AbsoluteFill>
      <KineticScene scene={FEATURE} top={SAFE.top} height={winTop - SAFE.top - 30} />
      <div style={{ position: "absolute", left: 0, top: winTop, width: W, height: H - SEAM, overflow: "hidden", clipPath: `inset(${(1 - reveal) * 100}% 0 0 0)`, opacity: out }}>
        <div style={{ position: "absolute", left: 0, top: -SEAM, width: W, height: H }}>
          <Product src={WINDOW.src} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 4, background: BRAND.white }} />
      </div>
    </AbsoluteFill>
  );
};

const Hairline: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const f = useCurrentFrame();
  const dur = sec(to) - sec(from);
  const p = prog(f, 0, 24);
  return <div style={{ position: "absolute", left: (W - 220 * p) / 2, width: 220 * p, top: H - SAFE.bottom + 20, height: 4, borderRadius: 2, background: BRAND.white, opacity: interpolate(f, [dur - 8, dur], [1, 0], clamp) }} />;
};

const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const fade = prog(f, 8, 28);
  const scale = interpolate(f, [8, 50], [0.965, 1], { ...clamp, easing: ease });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: BRAND.blue, opacity: interpolate(f, [0, 8], [0, 1], clamp) }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Img src={staticFile("logo/brum-white.png")} style={{ width: 640, height: "auto", opacity: fade, transform: `scale(${scale})` }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Brum3: React.FC = () => {
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading Poppins"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle, continueRender]);

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.blue }}>
      <Background />
      {SCENES.map((s) => (
        <Layer key={s.id} from={s.from} to={s.to}>
          <KineticScene scene={s} />
        </Layer>
      ))}
      <Layer from={COMPARE.from} to={COMPARE.to}>
        <Compare />
      </Layer>
      <Layer from={RESULT.from} to={RESULT.to}>
        <Result />
      </Layer>
      <Layer from={FEATURE.from} to={FEATURE.to}>
        <Feature />
      </Layer>
      <Layer from={32.72} to={36.0}>
        <Hairline from={32.72} to={36.0} />
      </Layer>
      <Sequence from={sec(OUTRO.at)} durationInFrames={BRUM3_TOTAL - sec(OUTRO.at)}>
        <Outro />
      </Sequence>
      {/* voice-over, normalised to -16 LUFS, never cut */}
      <Audio src={staticFile(VOICE)} volume={1} />
      {SFX.map((s, i) => (
        <Sequence key={i} from={sec(s.at)} durationInFrames={FPS} layout="none">
          <Audio src={staticFile(s.file)} volume={s.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
