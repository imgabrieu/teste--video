import { CAPTION_WORDS_7 } from "../data/captionWords7";
import { NAVY } from "./edit5";
import type { EditConfig, Palette } from "./types";

/**
 * Light system as edit 6 (white type, navy chips). The speaker wears a white coat with a navy tie, so nothing is placed on his body:
 * captions sit on the taupe wall just above his head and the few motions float higher, in the bare wall — both white with a soft shadow.
 * No gradient, no scrim, no sound.
 */
const PALETTE: Palette = {
  accent: "#FFFFFF",
  ink: NAVY,
  highlightBg: NAVY,
  highlightFg: "#FFFFFF",
  chipBg: "#FFFFFF",
  chipFg: NAVY,
  light: true,
  textShadow: "0 1px 3px rgba(6,20,34,0.55), 0 3px 14px rgba(6,20,34,0.4)",
};

// Edit 7 — alopecia areata explained to the patient as "a war between follicles and defence cells" (30.3 s, 720x1280 source).
export const EDIT7: EditConfig = {
  id: "Edit7",
  videoFile: "video/original7.mov",
  sourceIn: 0.05,
  sourceOut: 30.2,
  palette: PALETTE,
  layout: { motionTop: 250, motionHeight: 190, captionBottom: 1270 },
  caption: { fontSize: 74, maxChars: 16, maxWords: 3, scrim: false, strongShadow: true, chipBorder: true, baseWeight: 600, hlWeight: 700, hlScale: 1.14 },
  zoom: { origin: "50% 55%", patterns: [[1.0, 1.03], [1.03, 1.05], [1.0, 1.025], [1.035, 1.05]] },
  sfxEnabled: false,
  outro: { type: "cta", lines: ["AULA COMPLETA", "NO CAPIFLIX"], seconds: 2, bg: NAVY, fg: "#FFFFFF" },
  pauseTrims: [
    { from: 5.24, to: 5.41, keep: 0.1 },
    { from: 16.22, to: 16.41, keep: 0.1 },
    { from: 19.45, to: 19.79, keep: 0.14 }, // "…na hora. | Cara,"
    { from: 23.77, to: 24.0, keep: 0.12 },
  ],
  words: CAPTION_WORDS_7,
  motions: [
    {
      id: "war",
      kind: "chips",
      from: 7.6,
      to: 11.4,
      label: "Uma guerra",
      compact: true,
      items: [
        { at: 9.1, text: "Folículos" },
        { at: 10.3, text: "Células de defesa" },
      ],
    },
    { id: "lose", kind: "keyword", from: 15.4, to: 19.4, kicker: "Sem tratamento", text: "Elas podem vencer" },
    {
      id: "trust",
      kind: "chips",
      from: 20.2,
      to: 25.7,
      label: "O paciente",
      compact: true,
      items: [
        { at: 21.0, text: "Entende" },
        { at: 22.1, text: "Confia" },
        { at: 24.3, text: "Adere ao tratamento" },
      ],
    },
    { id: "ask", kind: "keyword", from: 27.2, to: 30.15, kicker: "Tratamento", text: "O que fazer?" },
  ],
  sfx: [],
};
