import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useDelayRender } from "remotion";
import { loadFonts } from "../lib/fonts";
import { Captions } from "./Captions";
import { f, FPS, MOTION, OUTRO_SECONDS, SFX, SOURCE_SECONDS } from "./config";
import { Heart } from "./graphics/Heart";
import { Rings, ringsJoinFrame } from "./graphics/Rings";
import { Title } from "./graphics/Title";
import { Together } from "./graphics/Together";
import { Outro } from "./Outro";
import { Video } from "./Video";

export const LIVIA_FRAMES = f(SOURCE_SECONDS) + Math.round(OUTRO_SECONDS * FPS);

const span = (m: { from: number; to: number }) => ({ from: f(m.from), duration: f(m.to) - f(m.from) });

/** Soft rose/lilac wash that ties the talking head and the b-roll into one palette (very light, keeps skin tones natural). */
const Grade: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none", background: "linear-gradient(180deg, rgba(255,183,216,0.10) 0%, rgba(142,91,196,0.10) 100%)", mixBlendMode: "soft-light" }} />
);

export const LiviaComposition: React.FC = () => {
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading Poppins"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle, continueRender]);

  const speechEnd = f(SOURCE_SECONDS);
  const outroFrom = speechEnd - 12;
  const t = span(MOTION.title);
  const r = span(MOTION.rings);
  const h = span(MOTION.heart);
  const g = span(MOTION.together);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Video />
      <Grade />
      <Sequence from={t.from} durationInFrames={t.duration} layout="none"><Title durationInFrames={t.duration} /></Sequence>
      <Sequence from={r.from} durationInFrames={r.duration} layout="none"><Rings durationInFrames={r.duration} joinAt={ringsJoinFrame} /></Sequence>
      <Sequence from={h.from} durationInFrames={h.duration} layout="none"><Heart durationInFrames={h.duration} /></Sequence>
      <Sequence from={g.from} durationInFrames={g.duration} layout="none">
        <Together durationInFrames={g.duration} secondAt={f(22.3) - g.from} joinAt={f(23.0) - g.from} />
      </Sequence>
      <Sequence from={0} durationInFrames={outroFrom + 6}><Captions /></Sequence>
      {SFX.map((s) => (
        <Sequence key={s.id} from={f(s.at)} durationInFrames={90} layout="none"><Audio src={staticFile(s.file)} volume={s.volume} /></Sequence>
      ))}
      <Sequence from={outroFrom} durationInFrames={LIVIA_FRAMES - outroFrom}><Outro /></Sequence>
      <Sequence from={outroFrom + 6} durationInFrames={90} layout="none"><Audio src={staticFile("sfx/swipe.wav")} volume={0.22} /></Sequence>
      <Sequence from={outroFrom + 20} durationInFrames={90} layout="none"><Audio src={staticFile("sfx/chime.wav")} volume={0.24} /></Sequence>
    </AbsoluteFill>
  );
};
