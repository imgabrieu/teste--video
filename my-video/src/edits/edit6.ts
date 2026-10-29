import { CAPTION_WORDS_6 } from "../data/captionWords6";
import { NAVY } from "./edit5";
import type { EditConfig, Palette } from "./types";

/** Same light system as edit 5: white is predominant, navy (#0D2B45) supports. No gradient, no scrim, no sound effects. */
const PALETTE: Palette = {
  accent: "#FFFFFF", // type colour on the taupe wall
  ink: NAVY,
  highlightBg: NAVY,
  highlightFg: "#FFFFFF",
  chipBg: "#FFFFFF",
  chipFg: NAVY,
  light: true,
  textShadow: "0 1px 3px rgba(6,20,34,0.55), 0 3px 14px rgba(6,20,34,0.4)",
};

/**
 * Edit 6 — nutrient excess / lab interference / telogen effluvium (34.9 s, 720x1280 source, close shot).
 * Face sits at y ≈ 940–1320 (of 1920); the black top below it is the dark backdrop for the white captions, so no scrim is needed.
 * Graphics live in the bare wall above her head and only mirror what is being listed.
 */
export const EDIT6: EditConfig = {
  id: "Edit6",
  videoFile: "video/original6.mov",
  sourceIn: 0.1,
  sourceOut: 34.85,
  palette: PALETTE,
  layout: { motionTop: 300, motionHeight: 190 },
  caption: { fontSize: 74, maxChars: 16, maxWords: 3, scrim: false, strongShadow: true, chipBorder: true, baseWeight: 600, hlWeight: 700, hlScale: 1.14 },
  zoom: { origin: "50% 60%", patterns: [[1.0, 1.03], [1.03, 1.05], [1.0, 1.025], [1.035, 1.05]] },
  sfxEnabled: false,
  outro: { type: "cta", lines: ["AULA COMPLETA", "NO CAPIFLIX"], seconds: 2, bg: NAVY, fg: "#FFFFFF" },
  pauseTrims: [
    { from: 3.47, to: 3.67, keep: 0.1 },
    { from: 6.18, to: 6.49, keep: 0.12 },
    { from: 11.7, to: 11.89, keep: 0.14 }, // "…também. | Raramente"
    { from: 14.88, to: 15.25, keep: 0.14 },
    { from: 17.83, to: 18.32, keep: 0.16 }, // "…ferritina. | Então,"
    { from: 18.63, to: 19.04, keep: 0.14 },
    { from: 20.75, to: 21.52, keep: 0.12 }, // 0.8 s hesitation inside "para vocês | monitorarem"
    { from: 30.75, to: 31.08, keep: 0.12 },
  ],
  words: CAPTION_WORDS_6,
  motions: [
    {
      id: "excess",
      kind: "chips",
      from: 0.15,
      to: 11.5,
      label: "Em excesso",
      compact: true,
      items: [
        { at: 0.25, text: "Zinco" },
        { at: 2.3, text: "Selênio" },
        { at: 3.85, text: "Vitamina A" },
        { at: 9.85, text: "Biotina" },
      ],
    },
    {
      id: "labs",
      kind: "chips",
      from: 11.95,
      to: 18.1,
      label: "Pode alterar exames",
      compact: true,
      items: [
        { at: 14.2, text: "TSH" },
        { at: 15.3, text: "T4 livre" },
        { at: 16.6, text: "Troponina" },
        { at: 17.3, text: "Ferritina" },
      ],
    },
    { id: "telogen", kind: "keyword", from: 29.4, to: 34.75, kicker: "Causa mais comum", text: "Eflúvio telógeno" },
  ],
  sfx: [],
};
