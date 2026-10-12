import React, { useEffect, useState } from "react";
import { AbsoluteFill, Sequence, useDelayRender } from "remotion";
import { MOTIONS, SFX } from "../config/edit";
import { loadFonts } from "../lib/fonts";
import { OUTRO_FRAMES, SPEECH_FRAMES } from "../lib/timeline";
import { Captions } from "./Captions";
import { LogoOutro } from "./LogoOutro";
import { MotionGraphic } from "./MotionGraphic";
import { SoundEffect } from "./SoundEffect";
import { SpeechVideo } from "./SpeechVideo";

export const VideoComposition: React.FC = () => {
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading Poppins"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle, continueRender]);

  const outroFrom = SPEECH_FRAMES - 12; // veil starts inside the silent tail of the last word
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <SpeechVideo />
      {MOTIONS.map((m) => (
        <MotionGraphic key={m.id} spec={m} />
      ))}
      <Sequence from={0} durationInFrames={outroFrom + 8}>
        <Captions />
      </Sequence>
      {SFX.map((s) => (
        <SoundEffect key={s.id} file={s.file} at={s.at} volume={s.volume} />
      ))}
      <Sequence from={outroFrom} durationInFrames={OUTRO_FRAMES + 12}>
        <LogoOutro />
      </Sequence>
      <SoundEffect file="sfx/whoosh.wav" frame={outroFrom + 4} volume={0.28} />
      <SoundEffect file="sfx/impact.wav" frame={outroFrom + 14} volume={0.34} />
    </AbsoluteFill>
  );
};
