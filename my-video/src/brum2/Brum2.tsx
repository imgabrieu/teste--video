import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useDelayRender } from "remotion";
import { FONTS } from "../config/theme";
import { loadFonts } from "../lib/fonts";
import { BRAND, EASE, FPS, H, SAFE, W, sec } from "../brum/theme";
import { MOTION, OUTRO, RAW, SFX, SHOTS, Shot, VOICE } from "./data";

export const BRUM2_TOTAL = sec(OUTRO.at) + sec(OUTRO.length);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(...EASE.out);
const easeIO = Easing.bezier(...EASE.inOut);
const prog = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: ease });
const progIO = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: easeIO });
const fadeOut = (f: number, dur: number, len = 8) => interpolate(f, [dur - len, dur], [1, 0], clamp);

const ShotClip: React.FC<{ shot: Shot; length: number }> = ({ shot, length }) => {
  const f = useCurrentFrame();
  const scale = interpolate(f, [0, Math.max(1, length - 1)], shot.zoom, clamp);
  const fade = shot.fade ? interpolate(f, [0, sec(shot.fade)], [0, 1], clamp) : 1;
  return (
    <AbsoluteFill style={{ opacity: fade, transform: `scale(${scale})` }}>
      {/* the raw footage is silent; the voice-over is the only audio */}
      <OffthreadVideo src={staticFile(RAW)} trimBefore={sec(shot.src)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
  );
};

const base: React.CSSProperties = { fontFamily: FONTS.family, textTransform: "uppercase", color: BRAND.white };
const pill: React.CSSProperties = { background: BRAND.blue, borderRadius: 18, boxShadow: "0 14px 40px rgba(8,22,36,0.32)" };

/** "Presidente Prudente": brand-blue tag with a map pin; a thin line draws underneath. */
const PlaceTag: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const reveal = progIO(f, 0, 16);
  const line = prog(f, 12, 36);
  return (
    <div style={{ position: "absolute", left: SAFE.left, top: SAFE.top + 40, opacity: fadeOut(f, dur) }}>
      <div style={{ ...pill, ...base, display: "flex", alignItems: "center", gap: 18, padding: "20px 34px 20px 26px", fontWeight: FONTS.semiBold, fontSize: 44, letterSpacing: "0.1em", clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0 round 18px)` }}>
        <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
          <path d="M20 2C11 2 4 9 4 18c0 12 16 28 16 28s16-16 16-28C36 9 29 2 20 2Z" stroke="#fff" strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="20" cy="18" r="5.5" fill="#fff" />
        </svg>
        <span style={{ whiteSpace: "nowrap" }}>Presidente Prudente</span>
      </div>
      <div style={{ marginTop: 14, height: 4, width: 420 * line, background: BRAND.white, borderRadius: 2, boxShadow: "0 2px 10px rgba(8,22,36,0.4)" }} />
    </div>
  );
};

/** "Um dia inteiro": label + a line that fills from start to end of the day. */
const DayLine: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const reveal = progIO(f, 0, 14);
  const fill = interpolate(f, [8, dur - 6], [0, 1], { ...clamp, easing: easeIO });
  return (
    <div style={{ position: "absolute", left: SAFE.left, top: SAFE.top + 40, opacity: fadeOut(f, dur) }}>
      <div style={{ ...pill, ...base, padding: "20px 38px", fontWeight: FONTS.semiBold, fontSize: 44, letterSpacing: "0.1em", clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0 round 18px)` }}>Um dia inteiro</div>
      <div style={{ position: "relative", marginTop: 18, height: 4, width: 460, background: "rgba(255,255,255,0.45)", borderRadius: 2, boxShadow: "0 2px 10px rgba(8,22,36,0.35)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: BRAND.white, borderRadius: 2 }} />
        <div style={{ position: "absolute", top: -7, left: `calc(${fill * 100}% - 9px)`, width: 18, height: 18, borderRadius: 9, background: BRAND.white, boxShadow: "0 2px 10px rgba(8,22,36,0.45)" }} />
      </div>
    </div>
  );
};

/** "Brum sempre presente": closing line, sits above the Reels UI over a soft brand scrim. */
const Always: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const scrim = prog(f, 0, 14);
  const a = prog(f, 4, 22);
  const b = prog(f, 10, 28);
  const line = prog(f, 18, 40);
  const out = fadeOut(f, dur, 6);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 760, opacity: scrim, background: `linear-gradient(to top, rgba(${BRAND.blueRgb},0.88) 0%, rgba(${BRAND.blueRgb},0.7) 45%, rgba(${BRAND.blueRgb},0) 100%)` }} />
      <div style={{ position: "absolute", left: 0, width: W, top: H - SAFE.bottom - 210, display: "flex", flexDirection: "column", alignItems: "center", ...base }}>
        <div style={{ fontWeight: FONTS.semiBold, fontSize: 38, letterSpacing: "0.36em", opacity: a, transform: `translateY(${(1 - a) * 16}px)`, textShadow: "0 2px 12px rgba(8,22,36,0.5)" }}>Brum</div>
        <div style={{ marginTop: 10, fontWeight: FONTS.bold, fontSize: 84, letterSpacing: "0.01em", display: "flex", gap: "0.28em", whiteSpace: "nowrap", opacity: b, transform: `translateY(${(1 - b) * 22}px)`, textShadow: "0 2px 6px rgba(8,22,36,0.5), 0 6px 26px rgba(8,22,36,0.45)" }}>
          <span>Sempre</span>
          <span style={{ background: BRAND.white, color: BRAND.blue, borderRadius: 16, padding: "0 0.22em", textShadow: "none", boxShadow: "0 10px 30px rgba(8,22,36,0.35)" }}>presente</span>
        </div>
        <div style={{ marginTop: 22, height: 4, width: 300 * line, background: BRAND.white, borderRadius: 2 }} />
      </div>
    </AbsoluteFill>
  );
};

/** Closing: brand-blue panel wipes up, white logo fades in with a very subtle scale (native 1723x324 proportions). */
const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const wipe = progIO(f, 0, 20);
  const fade = prog(f, 14, 32);
  const scale = interpolate(f, [14, 56], [0.965, 1], { ...clamp, easing: ease });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: BRAND.blue, clipPath: `inset(${(1 - wipe) * 100}% 0 0 0)` }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Img src={staticFile("logo/brum-white.png")} style={{ width: 640, height: "auto", opacity: fade, transform: `scale(${scale})` }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Window: React.FC<{ from: number; to: number; children: (dur: number) => React.ReactNode }> = ({ from, to, children }) => {
  const a = sec(from);
  const dur = sec(to) - a;
  return (
    <Sequence from={a} durationInFrames={dur} layout="none">
      {children(dur)}
    </Sequence>
  );
};

export const Brum2: React.FC = () => {
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading Poppins"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle, continueRender]);

  const outroFrom = sec(OUTRO.at);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {SHOTS.map((s, i) => {
        const next = SHOTS[i + 1];
        // a shot that is followed by a crossfade stays underneath for the fade length
        const tail = next?.fade ? sec(next.fade) : 0;
        const length = sec(s.dur) + tail;
        return (
          <Sequence key={s.id} from={sec(s.at)} durationInFrames={length} premountFor={20}>
            <ShotClip shot={s} length={length} />
          </Sequence>
        );
      })}
      <Window from={MOTION.place.from} to={MOTION.place.to}>{(d) => <PlaceTag dur={d} />}</Window>
      <Window from={MOTION.day.from} to={MOTION.day.to}>{(d) => <DayLine dur={d} />}</Window>
      <Window from={MOTION.always.from} to={MOTION.always.to}>{(d) => <Always dur={d} />}</Window>
      <Sequence from={outroFrom} durationInFrames={BRUM2_TOTAL - outroFrom}>
        <Outro />
      </Sequence>
      {/* voice-over: the main audio. Normalised to -16 LUFS. */}
      <Audio src={staticFile(VOICE)} volume={1} />
      {SFX.map((s, i) => (
        <Sequence key={i} from={sec(s.at)} durationInFrames={FPS} layout="none">
          <Audio src={staticFile(s.file)} volume={s.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
