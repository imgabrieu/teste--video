import React, { useMemo } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, cameraAt, type Bump } from "./Background";
import { BeatView } from "./BeatView";
import { clamp01 } from "./kinetic";
import { NameFinale, type NameConfig } from "./NameFinale";
import { buildSchedule } from "./schedule";
import type { Beat } from "./timing";
import { useFonts } from "./useFonts";

export type IntroConfig = {
  beats: Beat[];
  /** segundos de abertura (fade do fundo) antes da voz */
  offset: number;
  /** duração total do vídeo (s) */
  total: number;
  /** arquivo da narração em /public */
  audio: string;
  sfx: { at: number; file: string; volume: number }[];
  name: NameConfig;
};

/** Abertura em português: beats cinéticos sincronizados + cena final com o nome. */
export const makeIntro = (cfg: IntroConfig): React.FC => {
  const schedule = buildSchedule(
    cfg.beats.map((b) => ({ ...b, tight: true })),
    0.15,
  );
  const bumps: Bump[] = [
    ...schedule.flatMap((b) => [
      { at: b.firstTime - 0.06 + cfg.offset, strength: b.beat.push },
      ...(b.beat.extraPush ?? []).map((e) => ({ at: e.at - 0.05 + cfg.offset, strength: e.strength })),
    ]),
    { at: cfg.name.times.l1 - 0.05 + cfg.offset, strength: 0.085 },
    { at: cfg.name.times.l2 - 0.05 + cfg.offset, strength: 0.06 },
  ];

  const Intro: React.FC = () => {
    useFonts();
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const t = frame / fps; // relógio do vídeo
    const ta = t - cfg.offset; // relógio do áudio
    const cam = useMemo(() => cameraAt(t, bumps, cfg.total), [t]);
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
          {schedule.map((rb) =>
            ta >= rb.firstTime - 0.15 && ta < rb.until ? <BeatView key={rb.beat.id} rb={rb} t={ta} /> : null,
          )}
          <NameFinale t={ta} cfg={cfg.name} />
        </AbsoluteFill>

        {/* abertura: o fundo surge do escuro antes da voz */}
        {fade > 0 && <AbsoluteFill style={{ background: "#050a14", opacity: fade }} />}

        {/* narração integral, deslocada só pela abertura */}
        <Sequence from={Math.round(cfg.offset * fps)}>
          <Audio src={staticFile(cfg.audio)} volume={1} />
        </Sequence>
        {cfg.sfx.map((s) => (
          <Sequence key={s.at} from={Math.round((s.at + cfg.offset) * fps)}>
            <Audio src={staticFile(s.file)} volume={s.volume} />
          </Sequence>
        ))}
      </AbsoluteFill>
    );
  };
  return Intro;
};
