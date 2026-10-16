import { CAPTION_WORDS_4 } from "../data/captionWords4";
import { CAPITECH_CREAM, CAPITECH_INK } from "./edit3";
import type { EditConfig, Palette } from "./types";

const PALETTE: Palette = { accent: CAPITECH_CREAM, ink: CAPITECH_INK, highlightBg: CAPITECH_CREAM, highlightFg: CAPITECH_INK };

/**
 * Edit 4 — case of a young patient with androgenetic alopecia (33.7 s). Face sits LOW in this framing (≈ y 920–1210),
 * so graphics live in the empty upper half and captions stay on one line below the chin.
 * SFX gains come from tools/mix_sfx.py (effect RMS ≈ 15 dB under the voice at that moment, peak under the voice RMS).
 */
export const EDIT4: EditConfig = {
  id: "Edit4",
  videoFile: "video/original4.mov",
  sourceIn: 0,
  sourceOut: 33.62,
  palette: PALETTE,
  layout: { motionTop: 250, behindTop: 840 },
  caption: { fontSize: 64, maxChars: 19, maxWords: 3 },
  outro: { type: "cta", lines: ["ACESSE AGORA", "O CAPIFLIX"], seconds: 2, sfxVolume: 0.043 },
  pauseTrims: [
    { from: 2.37, to: 2.87, keep: 0.16 }, // dead air before "que"
    { from: 3.29, to: 3.81, keep: 0.12 }, // hesitation between "que" and "passa"
    { from: 6.43, to: 6.99, keep: 0.2 }, // after "androgenética,"
    { from: 8.3, to: 8.62, keep: 0.14 },
    { from: 10.16, to: 10.54, keep: 0.18 },
    { from: 11.48, to: 11.87, keep: 0.16 },
    { from: 13.17, to: 13.57, keep: 0.16 },
    { from: 15.02, to: 16.01, keep: 0.22 }, // sentence end, ~1 s of dead air
    { from: 17.65, to: 17.95, keep: 0.14 },
    { from: 20.32, to: 20.56, keep: 0.12 },
    { from: 26.66, to: 27.16, keep: 0.2 },
    { from: 28.5, to: 28.88, keep: 0.14 },
    { from: 30.2, to: 30.47, keep: 0.12 },
    { from: 31.49, to: 31.74, keep: 0.12 },
  ],
  words: CAPTION_WORDS_4,
  personClips: [
    { id: "p4a", file: "person/p4a.webm", fromFrame: 483 }, // source 16.10 – 18.00 s
    { id: "p4b", file: "person/p4b.webm", fromFrame: 849 }, // source 28.30 – 30.20 s
  ],
  motions: [
    { id: "title", kind: "title", from: 0.1, to: 2.3, text: "Caso clínico", logo: true },
    { id: "dx", kind: "keyword", from: 5.2, to: 6.9, kicker: "Diagnóstico", text: "Alopecia androgenética" },
    {
      id: "routine",
      kind: "chips",
      from: 10.4,
      to: 15.2,
      label: "Rotina da paciente",
      compact: true,
      items: [
        { at: 10.9, text: "Shampoo bom" },
        { at: 12.3, text: "Condicionador bom" },
        { at: 13.75, text: "Lava todo dia" },
      ],
    },
    { id: "jovem", kind: "behind", from: 16.2, to: 17.7, word: "JOVEM", person: "p4a" },
    { id: "density", kind: "growth", from: 19.95, to: 22.4, label: "Densidade devolvida" },
    {
      id: "returns",
      kind: "chips",
      from: 22.9,
      to: 26.95,
      label: "O fio volta a ter",
      items: [
        { at: 23.05, text: "Brilho" },
        { at: 24.95, text: "Maciez" },
        { at: 26.3, text: "Vida" },
      ],
    },
    { id: "entupir", kind: "behind", from: 28.82, to: 30.2, word: "ENTUPIR?", person: "p4b" },
  ],
  sfx: [
    { id: "title", file: "sfx/whoosh.wav", at: 0.1, volume: 0.035 },
    { id: "dx", file: "sfx/click.wav", at: 5.2, volume: 0.038 },
    { id: "routine", file: "sfx/pop.wav", at: 10.9, volume: 0.079 },
    { id: "jovem", file: "sfx/whoosh.wav", at: 16.2, volume: 0.086 },
    { id: "density", file: "sfx/click.wav", at: 19.95, volume: 0.081 },
    { id: "returns", file: "sfx/pop.wav", at: 23.05, volume: 0.071 },
    { id: "entupir", file: "sfx/whoosh.wav", at: 28.82, volume: 0.063 },
  ],
};
