import { PART1, PART1_WORDS } from "./part1";
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
