import { CAPTION_WORDS_5 } from "../data/captionWords5";
import { CAPITECH_INK } from "./edit3";
import type { EditConfig, Palette } from "./types";

/** Light system: white is predominant, navy (#0D2B45) is the support colour. No gradients, no panels, no scrim behind captions. */
export const NAVY = CAPITECH_INK;
const PALETTE: Palette = { accent: NAVY, ink: "#FFFFFF", highlightBg: NAVY, highlightFg: "#FFFFFF", chipBg: "#FFFFFF", chipFg: NAVY, light: true };

/**
 * Edit 5 — Dra. Luciana Passoni, slides "Aulas do CAPIFLIX" (hipocromia da linha de implantação / máculas eritematosas), 53.9 s.
 * The speaker is small and low-right; the TV slide fills the middle. Graphics live in the bare wall ABOVE the TV (y ≈ 205–380),
 * captions sit on the dark marble table below it, so nothing covers the slide or the face.
 * SFX gains: tools/mix_sfx.py, margin 14 dB under the voice (voice is quiet in this clip, so the effects are barely there).
 */
export const EDIT5: EditConfig = {
  id: "Edit5",
  videoFile: "video/original5.mov",
  sourceIn: 0.05,
  sourceOut: 53.65,
  palette: PALETTE,
  layout: { motionTop: 205, motionHeight: 175 },
  caption: { fontSize: 62, maxChars: 17, maxWords: 3, scrim: false, strongShadow: true, baseWeight: 600, hlWeight: 700, hlScale: 1.2 },
  zoom: { origin: "75% 10%", patterns: [[1.0, 1.03], [1.03, 1.05], [1.0, 1.025], [1.035, 1.05]] },
  sfxEnabled: true,
  outro: { type: "cta", lines: ["EM BREVE,", "AULA COMPLETA", "NO CAPIFLIX"], seconds: 1.8, bg: NAVY, fg: "#FFFFFF", sfxVolume: 0.018 },
  pauseTrims: [
    { from: 3.39, to: 3.68, keep: 0.12 },
    { from: 3.87, to: 4.15, keep: 0.12 },
    { from: 10.68, to: 11.0, keep: 0.18 }, // "…também. | Hipocromia"
    { from: 14.55, to: 14.91, keep: 0.12 },
    { from: 19.91, to: 20.19, keep: 0.12 },
    { from: 21.1, to: 21.42, keep: 0.12 },
    { from: 25.11, to: 25.36, keep: 0.16 },
    { from: 26.76, to: 27.06, keep: 0.12 },
    { from: 29.69, to: 30.28, keep: 0.2 }, // "…calibrosos. | Epidemiologia"
    { from: 33.4, to: 33.69, keep: 0.12 },
    { from: 39.34, to: 39.81, keep: 0.16 },
    { from: 41.55, to: 41.77, keep: 0.14 },
    { from: 44.77, to: 44.97, keep: 0.12 },
    { from: 48.85, to: 49.09, keep: 0.14 },
    { from: 51.06, to: 51.34, keep: 0.14 },
  ],
  words: CAPTION_WORDS_5,
  motions: [
    // Source framing alternates between WIDE (TV top ≈ y 390: bare wall above) and CLOSE (TV top ≈ y 150) shots.
    // Graphics only appear in the wide shots (0–4.1 s, 11.4–20.1 s, 41.6–53.9 s); in the close shots the slide fills the frame,
    // so the key terms there are carried by the enlarged navy caption highlights instead.
    { id: "logo", kind: "plate", from: 0.12, to: 1.9, bg: NAVY },
    { id: "bx", kind: "keyword", from: 2.05, to: 4.0, kicker: "Vitiligo-símile", text: "Biópsia diferenciada" },
    { id: "hipo", kind: "keyword", from: 11.5, to: 15.3, kicker: "O mais comum", text: "Hipocromia na linha de implantação" },
    {
      id: "clin",
      kind: "chips",
      from: 17.5,
      to: 20.0,
      label: "Clínica",
      compact: true,
      items: [
        { at: 17.8, text: "Mácula hipocrômica" },
        { at: 18.95, text: "Mal delimitada" },
      ],
    },
    { id: "rosacea", kind: "keyword", from: 42.0, to: 44.9, kicker: "Máculas eritematosas", text: "Rosácea-símile" },
    { id: "comorb", kind: "keyword", from: 51.45, to: 53.6, kicker: "Comorbidade", text: "Muito frequente" },
  ],
  sfx: [
    { id: "logo", file: "sfx/whoosh.wav", at: 0.15, volume: 0.03 },
    { id: "hipo", file: "sfx/pop.wav", at: 11.5, volume: 0.026 },
    { id: "rosacea", file: "sfx/click.wav", at: 42.0, volume: 0.038 },
  ],
};
