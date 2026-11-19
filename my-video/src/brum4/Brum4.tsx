import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Easing, Freeze, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useDelayRender } from "remotion";
import { FONTS } from "../config/theme";
import { loadFonts } from "../lib/fonts";
import { BRAND, EASE, FPS, H, SAFE, W, sec } from "../brum/theme";
import { ASSEMBLY, BENEFITS, Clip, COMPARE, OUTLINE, OUTRO, PRODUCT, RESULT, Scene, SCENES, Seg, SFX, SOLUTION, VOICE, w, WindowScene } from "./data";
import { WORDS } from "./words";

export const BRUM4_TOTAL = sec(OUTRO.at) + sec(OUTRO.length);

/** y where the QUADRO BRUM half of the footage starts (the seam between the two halves). */
const SEAM = 911;
const LOGO_W = "logo/brum-white.png";
const LOGO_B = "logo/brum-blue.png";
const LOGO_RATIO = 1723 / 324;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(...EASE.out);
const easeIO = Easing.bezier(...EASE.inOut);
const prog = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: ease });
const progIO = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: easeIO });

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

const maskStyle: React.CSSProperties = { display: "inline-block", overflow: "hidden", padding: "0.22em 0.04em 0.08em", margin: "-0.22em 0 -0.08em" };

const Word: React.FC<{ text: string; size: number; dim?: boolean; chip?: boolean; localOnset: number }> = ({ text, size, dim, chip, localOnset }) => {
  const f = useCurrentFrame();
  const p = prog(f, localOnset - 2, localOnset + 8);
  const op = interpolate(f, [localOnset - 2, localOnset + 3], [0, 1], clamp);
  return (
    <span style={maskStyle}>
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

/** The official BRUM logo (never the typed word), revealed with the same mask as the words. */
const LogoMark: React.FC<{ height: number; localOnset: number }> = ({ height, localOnset }) => {
  const f = useCurrentFrame();
  const p = prog(f, localOnset - 2, localOnset + 10);
  const op = interpolate(f, [localOnset - 2, localOnset + 4], [0, 1], clamp);
  return (
    <span style={{ ...maskStyle, padding: "0.1em 0.04em" }}>
      <Img src={staticFile(LOGO_W)} style={{ display: "block", height, width: height * LOGO_RATIO, transform: `translateY(${(1 - p) * 112}%)`, opacity: op }} />
    </span>
  );
};

const SegView: React.FC<{ seg: Seg; from: number }> = ({ seg, from }) => {
  if (seg.logo && seg.r) return <LogoMark height={seg.size} localOnset={sec(w(seg.r[0])) - from} />;
  const items = seg.words ?? Array.from({ length: seg.r![1] - seg.r![0] + 1 }, (_, k) => ({ t: WORDS[seg.r![0] + k].t, s: w(seg.r![0] + k) }));
  return (
    <div style={{ display: "flex", gap: "0.26em", fontSize: seg.size }}>
      {items.map((it, i) => (
        <Word key={i} text={it.t} size={seg.size} dim={seg.dim} chip={seg.chip} localOnset={sec(it.s) - from} />
      ))}
    </div>
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
        <div key={li} style={{ display: "flex", gap: "0.26em", whiteSpace: "nowrap", lineHeight: 1.14, justifyContent: "center", alignItems: "baseline", marginTop: li ? Math.round(line[0].size * 0.1) : 0, fontSize: line[0].size }}>
          {line.map((seg, si) => (
            <SegView key={si} seg={seg} from={from} />
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

/** Replacement labels, drawn over the burned-in ones so that "BRUM" is always the official logo. */
const Label: React.FC<{ x: number; y: number; w: number; h: number; blue?: boolean; children: React.ReactNode }> = ({ x, y, w: ww, h, blue, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: h, borderRadius: 24, background: blue ? BRAND.blue : BRAND.white, color: blue ? BRAND.white : BRAND.blue, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, fontFamily: FONTS.family, fontWeight: FONTS.semiBold, fontSize: 44, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap", boxShadow: "0 6px 22px rgba(8,22,36,0.28)" }}>{children}</div>
);

/** The footage in its native 1080x1920 frame + labels / result card redrawn with the official logo. */
const Product: React.FC<{ src: number; onResult?: boolean }> = ({ src, onResult }) => {
  const f = useCurrentFrame();
  const t = src + f / FPS;
  const showResult = t >= 47.2;
  const pop = onResult ? interpolate(f, [0, 8], [0, 1], clamp) : 1;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H }}>
      <OffthreadVideo src={staticFile(PRODUCT)} trimBefore={sec(src)} muted style={{ width: W, height: H }} />
      <Label x={176} y={112} w={727} h={95}>
        Quadro convencional
      </Label>
      <Label x={272} y={912} w={536} h={95} blue>
        <span>Quadro</span>
        <Img src={staticFile(LOGO_W)} style={{ height: 40, width: 40 * LOGO_RATIO }} />
      </Label>
      {showResult && (
        <div style={{ position: "absolute", left: 212, top: 1197, width: 656, height: 140, borderRadius: 34, background: BRAND.white, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: BRAND.blue, fontFamily: FONTS.family, fontWeight: FONTS.bold, textTransform: "uppercase", fontSize: 40, lineHeight: 1.2, opacity: pop, transform: `translateY(${(1 - pop) * 10}px)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span>Quadro</span>
            <Img src={staticFile(LOGO_B)} style={{ height: 34, width: 34 * LOGO_RATIO }} />
            <span>montado</span>
          </div>
          <div>em 47 segundos</div>
        </div>
      )}
    </div>
  );
};

/** Side-by-side comparison, full frame. */
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
  const enter = interpolate(f, [0, 4], [0, 1], clamp);
  const end = interpolate(f, [dur - 5, dur], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, end) }}>
      <Product src={RESULT.src} onResult />
    </AbsoluteFill>
  );
};

const WIN_TOP = 850;

/** One half of the footage in a window, with a slow push-in (and an optional outline that zooms with it). */
const HalfClip: React.FC<{ clip: Clip; fadeIn: boolean; clipFrom: number }> = ({ clip, fadeIn, clipFrom }) => {
  const f = useCurrentFrame();
  const len = sec(clip.to) - sec(clip.from);
  const [z0, z1] = clip.zoom ?? [1, 1.04];
  const scale = interpolate(f, [0, Math.max(1, len - 1)], [z0, z1], { ...clamp, easing: easeIO });
  const fade = fadeIn ? interpolate(f, [0, 6], [0, 1], clamp) : 1;
  const hh = clip.half === "top" ? SEAM - 6 : H - SEAM;
  const box = clip.box;
  const boxOp = box ? interpolate(f, [box.from * FPS - clipFrom, box.from * FPS - clipFrom + 8, box.to * FPS - clipFrom - 4, box.to * FPS - clipFrom], [0, 1, 1, 0], clamp) : 0;
  const frozen = clip.hold !== undefined ? Math.min(f, sec(clip.hold)) : f;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: hh, overflow: "hidden", opacity: fade }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: hh, transform: `scale(${scale})`, transformOrigin: clip.origin ?? "50% 50%" }}>
        <div style={{ position: "absolute", left: 0, top: clip.half === "top" ? 0 : -SEAM, width: W, height: H }}>
          <Freeze frame={frozen}>
            <Product src={clip.src} />
          </Freeze>
        </div>
        {box && <div style={{ position: "absolute", left: box.x, top: box.y, width: box.w, height: box.h, border: "4px solid rgba(255,255,255,0.95)", borderRadius: 10, boxShadow: "0 0 0 2px rgba(22,55,83,0.45)", opacity: boxOp }} />}
      </div>
    </div>
  );
};

/** Keywords above, footage window below (barramento / assembly), same system for every window scene. */
const WindowView: React.FC<{ ws: WindowScene }> = ({ ws }) => {
  const f = useCurrentFrame();
  const dur = sec(ws.to) - sec(ws.from);
  const reveal = progIO(f, 0, 16);
  const out = interpolate(f, [dur - 5, dur], [1, 0], clamp);
  const maxH = Math.max(...ws.clips.map((c) => (c.half === "top" ? SEAM - 6 : H - SEAM)));
  return (
    <AbsoluteFill>
      {ws.stages.map((s) => (
        <Layer key={s.id} from={s.from - ws.from} to={s.to - ws.from}>
          <KineticScene scene={s} top={SAFE.top} height={WIN_TOP - SAFE.top - 30} />
        </Layer>
      ))}
      <div style={{ position: "absolute", left: 0, top: WIN_TOP, width: W, height: maxH, overflow: "hidden", clipPath: `inset(${(1 - reveal) * 100}% 0 0 0)`, opacity: out }}>
        {ws.clips.map((c, i) => (
          <Layer key={i} from={c.from - ws.from} to={c.to - ws.from + (i < ws.clips.length - 1 ? 0.2 : 0)}>
            <HalfClip clip={c} fadeIn={i > 0} clipFrom={sec(c.from)} />
          </Layer>
        ))}
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
        <Img src={staticFile(LOGO_W)} style={{ width: 640, height: "auto", opacity: fade, transform: `scale(${scale})` }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Brum4: React.FC = () => {
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
      {[ASSEMBLY, SOLUTION, BENEFITS].map((ws) => (
        <Layer key={ws.id} from={ws.from} to={ws.to}>
          <WindowView ws={ws} />
        </Layer>
      ))}
      <Layer from={COMPARE.from} to={COMPARE.to}>
        <Compare />
      </Layer>
      <Layer from={RESULT.from} to={RESULT.to}>
        <Result />
      </Layer>
      <Layer from={41.78} to={44.92}>
        <Hairline from={41.78} to={44.92} />
      </Layer>
      <Sequence from={sec(OUTRO.at)} durationInFrames={BRUM4_TOTAL - sec(OUTRO.at)}>
        <Outro />
      </Sequence>
      {/* new voice-over, normalised to -16 LUFS, never cut */}
      <Audio src={staticFile(VOICE)} volume={1} />
      {SFX.map((s, i) => (
        <Sequence key={i} from={sec(s.at)} durationInFrames={FPS} layout="none">
          <Audio src={staticFile(s.file)} volume={s.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
