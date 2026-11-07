import React, { useMemo } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, cameraAt, type Bump } from "../Background";
import { BeatView } from "../BeatView";
import { clamp01 } from "../kinetic";
import { buildSchedule } from "../schedule";
import { useFonts } from "../useFonts";
import { NameFinale } from "./NameFinale";
import { MARCOS_BEATS, MARCOS_SFX, NAME, OFFSET, TOTAL_SECONDS } from "./timing";

const SCHEDULE = buildSchedule(
  MARCOS_BEATS.map((b) => ({ ...b, tight: true })),
  0.15,
);

/** Pushes de câmera no relógio do vídeo (áudio + OFFSET). */
const BUMPS: Bump[] = [
  ...SCHEDULE.flatMap((b) => [
    { at: b.firstTime - 0.06 + OFFSET, strength: b.beat.push },
    ...(b.beat.extraPush ?? []).map((e) => ({ at: e.at - 0.05 + OFFSET, strength: e.strength })),
  ]),
  { at: NAME.marcos - 0.05 + OFFSET, strength: 0.085 },
  { at: NAME.rozenio - 0.05 + OFFSET, strength: 0.06 },
];

export const MarcosIntro: React.FC = () => {
  useFonts();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps; // relógio do vídeo
  const ta = t - OFFSET; // relógio do áudio
  const cam = useMemo(() => cameraAt(t, BUMPS, TOTAL_SECONDS), [t]);
  const fade = 1 - clamp01(t / 0.9);

  return (
    <AbsoluteFill style={{ background: "#0b1829" }}>
      <Background t={t} frame={frame} cam={cam} dim={1} />

      <AbsoluteFill
        style={{
          transform: `translate3d(${cam.x * 0.35}px, ${cam.y * 0.35}px, 0) scale(${1 + cam.bump * 0.65})`,
          transformOrigin: "50% 46%",
        }}
      >
        {SCHEDULE.map((rb) =>
          ta >= rb.firstTime - 0.15 && ta < rb.until ? <BeatView key={rb.beat.id} rb={rb} t={ta} /> : null,
        )}
        <NameFinale t={ta} />
      </AbsoluteFill>

      {/* abertura: o fundo surge do escuro antes da voz */}
      {fade > 0 && <AbsoluteFill style={{ background: "#050a14", opacity: fade }} />}

      {/* narração integral, deslocada só pela abertura */}
      <Sequence from={Math.round(OFFSET * fps)}>
        <Audio src={staticFile("ruach/marcos-narracao.mp3")} volume={1} />
      </Sequence>
      {MARCOS_SFX.map((s) => (
        <Sequence key={s.at} from={Math.round((s.at + OFFSET) * fps)}>
          <Audio src={staticFile(s.file)} volume={s.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
