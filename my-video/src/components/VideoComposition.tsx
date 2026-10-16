import React, { useEffect, useState } from "react";
import { AbsoluteFill, Sequence, useDelayRender } from "remotion";
import type { EditConfig } from "../edits/types";
import { EditProvider, useEdit } from "../lib/EditContext";
import { loadFonts } from "../lib/fonts";
import { Captions } from "./Captions";
import { CtaOutro } from "./CtaOutro";
import { LogoOutro } from "./LogoOutro";
import { MotionGraphic } from "./MotionGraphic";
import { SoundEffect } from "./SoundEffect";
import { SpeechVideo } from "./SpeechVideo";

const Inner: React.FC = () => {
  const { cfg, tl } = useEdit();
  const { speechFrames: SPEECH_FRAMES, outroFrames: OUTRO_FRAMES } = tl;
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading Poppins"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle, continueRender]);

  const cta = cfg.outro?.type === "cta";
  const outroFrom = cta ? SPEECH_FRAMES : SPEECH_FRAMES - 12; // logo veil starts in the silent tail; the CTA card starts only after the last word
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <SpeechVideo />
      {cfg.motions.map((m) => (
        <MotionGraphic key={m.id} spec={m} />
      ))}
      <Sequence from={0} durationInFrames={cta ? outroFrom : outroFrom + 8}>
        <Captions />
      </Sequence>
      {cfg.sfx.map((s) => (
        <SoundEffect key={s.id} file={s.file} at={s.at} volume={s.volume} />
      ))}
      <Sequence from={outroFrom} durationInFrames={cta ? OUTRO_FRAMES : OUTRO_FRAMES + 12}>
        {cta ? <CtaOutro /> : <LogoOutro />}
      </Sequence>
      {cta ? (
        <SoundEffect file="sfx/whoosh.wav" frame={outroFrom + 6} volume={cfg.outro?.sfxVolume ?? 0.1} />
      ) : (
        <>
          <SoundEffect file="sfx/whoosh.wav" frame={outroFrom + 4} volume={0.28} />
          <SoundEffect file="sfx/impact.wav" frame={outroFrom + 14} volume={0.34} />
        </>
      )}
    </AbsoluteFill>
  );
};

export const VideoComposition: React.FC<{ edit: EditConfig }> = ({ edit }) => (
  <EditProvider cfg={edit}>
    <Inner />
  </EditProvider>
);
