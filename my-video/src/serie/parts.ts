import { PART1, PART1_WORDS } from "./part1";
import { PART2, PART2_WORDS } from "./part2";
import { createTimeline } from "./timeline";
import type { SerieProps } from "./Serie";

export const SERIE1: SerieProps = {
  part: PART1,
  words: PART1_WORDS,
  label: "PARTE 1",
  cta: { line1: "Quer a parte 2?", chip: "Comente: PARTE 2" },
  hook: {
    endSrc: 13.8,
    stats: [
      { fromSrc: 5.0, toSrc: 8.2, side: "left", value: "60%", label: "DE PERDA CAPILAR" },
      { fromSrc: 10.8, toSrc: 13.4, side: "right", value: "quase 100%", label: "RECUPERADO" },
    ],
  },
  tags: [
    { fromSrc: 18.5, toSrc: 22.6, kicker: "ETAPA 1", text: "X-Restart" },
    { fromSrc: 63.0, toSrc: 68.3, kicker: "ETAPA 2", text: "PS02" },
    { fromSrc: 117.7, toSrc: 124.8, kicker: "ETAPA 3", text: "Fotobiomodulação" },
  ],
};
export const SERIE1_FRAMES = createTimeline(PART1).totalFrames;

export const SERIE2: SerieProps = {
  part: PART2,
  words: PART2_WORDS,
  label: "PARTE 2",
  cta: { line1: "Quer a parte 3?", chip: "Comente: PARTE 3" },
  hook: {
    endSrc: 183.12,
    stats: [
      { fromSrc: 176.4, toSrc: 183.0, side: "left", value: "60%", label: "DE PERDA CAPILAR" },
      { fromSrc: 176.4, toSrc: 183.0, side: "right", value: "quase 100%", label: "RECUPERADO" },
    ],
  },
  tags: [
    { fromSrc: 12.4, toSrc: 17.6, file: 1, kicker: "BLOQUEIO", text: "DHT" },
    { fromSrc: 66.0, toSrc: 70.0, file: 1, kicker: "AGULHA", text: "2 mm de profundidade" },
    { fromSrc: 123.9, toSrc: 131.5, file: 1, kicker: "ATENÇÃO", text: "Volume injetado" },
  ],
};
export const SERIE2_FRAMES = createTimeline(PART2).totalFrames;
