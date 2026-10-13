import React, { useEffect, useState } from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, Sequence, staticFile, useDelayRender } from "remotion";
import { loadFonts } from "../lib/fonts";
import { SoundEffect } from "../components/SoundEffect";
import { Captions } from "./Captions";
import { SFX } from "./data";
import { BehindCutout, BehindLayer, Motions } from "./Motions";
import { Outro } from "./Outro";
import { EditProvider } from "../lib/EditContext";
import { FPS, TIMING, sec } from "./theme";
import type { EditConfig } from "../edits/types";

export const BRUM_TOTAL = sec(TIMING.outroStart) + sec(TIMING.outroSeconds);

// SoundEffect only needs srcToOut: identity mapping (no cuts in this edit).
const IDENTITY: EditConfig = { id: "Brum", videoFile: "video/original3.mov", sourceIn: 0, sourceOut: BRUM_TOTAL / FPS, pauseTrims: [], words: [], motions: [], sfx: [] };

const Inner: React.FC = () => {
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading Poppins"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle, continueRender]);

  const outroFrom = sec(TIMING.outroStart);
  const outroLen = BRUM_TOTAL - outroFrom;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* untouched footage: original framing, cuts and audio (audio fades out under the closing wipe) */}
      <OffthreadVideo
        src={staticFile("video/original3.mov")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        volume={(f) => interpolate(f, [outroFrom, outroFrom + 16], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      <BehindLayer />
      <BehindCutout />
      <Motions />
      <Sequence durationInFrames={outroFrom + 6}>
        <Captions />
      </Sequence>
      {SFX.map((s, i) => (
        <SoundEffect key={i} file={s.file} at={s.at} volume={s.volume} />
      ))}
      <Sequence from={outroFrom} durationInFrames={outroLen}>
        <Outro />
      </Sequence>
      <SoundEffect file="sfx/whoosh.wav" frame={outroFrom + 2} volume={0.22} />
      <SoundEffect file="sfx/impact.wav" frame={outroFrom + 16} volume={0.26} />
    </AbsoluteFill>
  );
};

export const Brum: React.FC = () => (
  <EditProvider cfg={IDENTITY}>
    <Inner />
  </EditProvider>
);
