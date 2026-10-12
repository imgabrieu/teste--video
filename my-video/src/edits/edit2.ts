import { CAPTION_WORDS_2 } from "../data/captionWords2";
import type { EditConfig } from "./types";

// Edit 2 — "transplante capilar: quando indicar?" (41 s). Starts on B-roll (≈0.8–5.0 s) that is already in the footage.
export const EDIT2: EditConfig = {
  id: "Edit2",
  videoFile: "video/original2.mov",
  sourceIn: 0.03,
  sourceOut: 41.2,
  pauseTrims: [
    { from: 10.44, to: 10.72, keep: 0.16 }, // "…todo o Brasil. | Mas você sabe"
    { from: 15.79, to: 16.15, keep: 0.18 }, // "…transplante? | É todo tipo"
    { from: 21.66, to: 22.04, keep: 0.14 },
    { from: 23.44, to: 23.88, keep: 0.2 }, // "…transplantar. | Sim,"
    { from: 29.71, to: 29.94, keep: 0.12 },
    { from: 35.63, to: 36.03, keep: 0.18 }, // "…capilar. | Então,"
  ],
  words: CAPTION_WORDS_2,
  motions: [
    { id: "title", kind: "title", from: 0.15, to: 3.4, text: "Transplante capilar: quando indicar?" },
    { id: "growth", kind: "growth", from: 3.1, to: 5.9, label: "Cada vez mais popular" },
    { id: "spread", kind: "spread", from: 7.1, to: 10.4, label: "Clínicas por todo o Brasil" },
    { id: "when", kind: "keyword", from: 11.6, to: 14.55, kicker: "Você sabe", text: "Quando indicar?" },
    {
      id: "verdict",
      kind: "verdict",
      from: 16.15,
      to: 23.1,
      rows: [
        { at: 16.3, ok: true, text: "Todo tipo de alopecia?" },
        { at: 19.8, ok: false, text: "Algum que não pode?" },
      ],
    },
    { id: "tangle", kind: "tangle", from: 24.0, to: 27.0, label: "Mais complicada do que parece" },
    { id: "ready", kind: "keyword", from: 28.2, to: 31.8, kicker: "Esteja pronto", text: "Resposta na ponta da língua" },
    { id: "ask", kind: "bubble", from: 32.1, to: 35.5, who: "Paciente", text: "Doutor, posso fazer um transplante?" },
    {
      id: "chips",
      kind: "chips",
      from: 36.9,
      to: 41.0,
      label: "No Capflix",
      items: [
        { at: 37.9, text: "Conteúdos" },
        { at: 38.9, text: "Aulas" },
      ],
    },
  ],
  sfx: [
    { id: "title", file: "sfx/whoosh.wav", at: 0.15, volume: 0.32 },
    { id: "growth", file: "sfx/pop.wav", at: 3.1, volume: 0.34 },
    { id: "spread", file: "sfx/click.wav", at: 7.1, volume: 0.3 },
    { id: "when", file: "sfx/whoosh.wav", at: 11.6, volume: 0.26 },
    { id: "v1", file: "sfx/pop.wav", at: 16.3, volume: 0.3 },
    { id: "v2", file: "sfx/click.wav", at: 19.8, volume: 0.3 },
    { id: "tangle", file: "sfx/whoosh.wav", at: 24.0, volume: 0.24 },
    { id: "ready", file: "sfx/pop.wav", at: 28.2, volume: 0.32 },
    { id: "ask", file: "sfx/click.wav", at: 32.1, volume: 0.3 },
    { id: "c1", file: "sfx/pop.wav", at: 37.9, volume: 0.3 },
    { id: "c2", file: "sfx/pop.wav", at: 38.9, volume: 0.3 },
  ],
};
