import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, cameraAt, type Bump } from "./Background";
import { BeatView } from "./BeatView";
import { Finale } from "./Finale";
import { RBEATS } from "./schedule";
import { TOTAL_SECONDS } from "./theme";
import { FINALE, SFX } from "./timing";
import { useFonts } from "./useFonts";

/** "Pushes" de câmera nas entradas importantes. */
const BUMPS: Bump[] = [
  ...RBEATS.map((b) => ({ at: b.firstTime - 0.06, strength: b.beat.push })),
  { at: FINALE.carl - 0.05, strength: 0.085 },
  { at: FINALE.morgan - 0.05, strength: 0.05 },
  { at: FINALE.ptCarl - 0.04, strength: 0.03 },
  { at: FINALE.ptMorgan - 0.04, strength: 0.03 },
];

export const RuachIntro: React.FC = () => {
  useFonts();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cam = cameraAt(t, BUMPS, TOTAL_SECONDS);

  return (
    <AbsoluteFill style={{ background: "#0b1829" }}>
      <Background t={t} frame={frame} cam={cam} dim={1} />

      {/* camada de texto: acompanha a câmera de leve (pequenos pushes nas entradas) */}
      <AbsoluteFill
        style={{
          transform: `translate3d(${cam.x * 0.35}px, ${cam.y * 0.35}px, 0) scale(${1 + cam.bump * 0.65})`,
          transformOrigin: "50% 46%",
        }}
      >
        {RBEATS.map((rb) =>
          t >= rb.firstTime - 0.15 && t < rb.until ? <BeatView key={rb.beat.id} rb={rb} t={t} /> : null,
        )}
        <Finale t={t} />
      </AbsoluteFill>

      {/* narração original, íntegra */}
      <Audio src={staticFile("ruach/narration.mp3")} volume={1} />
      {/* efeitos discretos, bem abaixo da voz */}
      {SFX.map((s) => (
        <Sequence key={s.at} from={Math.round(s.at * fps)}>
          <Audio src={staticFile(s.file)} volume={s.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
