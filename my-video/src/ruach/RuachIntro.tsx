import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, continueRender, delayRender, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, cameraAt } from "./Background";
import { Finale } from "./Finale";
import { clamp01, RowView } from "./kinetic";
import { BEAT_EXIT, RBEATS, type RBeat } from "./schedule";
import { FONT_FILES } from "./theme";
import { SFX } from "./timing";

/** Carrega Anton + Poppins (500/600/700) empacotadas em /public — sem rede. */
const useFonts = () => {
  const [handle] = useState(() => delayRender("ruach-fonts"));
  useEffect(() => {
    Promise.all(
      FONT_FILES.map(({ family, weight, file }) => {
        const face = new FontFace(family, `url(${staticFile(file)}) format("woff2")`, { weight });
        document.fonts.add(face);
        return face.load();
      }),
    )
      .then(() => continueRender(handle))
      .catch((e) => {
        console.error(e);
        continueRender(handle);
      });
  }, [handle]);
};

const BeatView: React.FC<{ rb: RBeat; t: number }> = ({ rb, t }) => {
  const life = rb.until - rb.firstTime;
  const k = clamp01((t - rb.firstTime) / life);
  const ex = clamp01((t - rb.exitAt) / BEAT_EXIT);
  const gap = rb.beat.rowGap ?? 0;
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: 1 - ex,
        // deriva lenta enquanto está em cena + saída com leve avanço e desfoque
        transform: `translateY(${-ex * 34}px) scale(${1 + k * 0.022 + ex * 0.035})`,
        filter: ex > 0 ? `blur(${ex * 9}px)` : undefined,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap }}>
        {rb.rows.map((r, i) => (
          <RowView key={i} r={r} t={t} variant={rb.beat.variant} dir={rb.beat.dir ?? 1} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const RuachIntro: React.FC = () => {
  useFonts();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cam = cameraAt(t);

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
