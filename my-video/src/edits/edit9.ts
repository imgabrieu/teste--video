import { CAPTION_WORDS_9 } from "../data/captionWords9";
import { NAVY } from "./edit5";
import type { EditConfig, Palette } from "./types";

/** Light system. Navy type / white pills for motions on the beige wall; navy chips highlight key words in the white captions. */
const PALETTE: Palette = { accent: NAVY, ink: "#FFFFFF", highlightBg: NAVY, highlightFg: "#FFFFFF", chipBg: "#FFFFFF", chipFg: NAVY, light: true };

/**
 * Edit 9 — semifibrosis after topical dutasteride, treated with subcision (34.3 s, close shot, 1080x1920).
 * Brief: captions at the TOP, centred, with a safe margin; motions simple; no sound effects; original audio untouched.
 * The face sits at y ≈ 800–1300, so the whole wall above it is free: captions at y ≈ 370–520, motions at y ≈ 585–755.
 */
export const EDIT9: EditConfig = {
  id: "Edit9",
  videoFile: "video/original9.mp4",
  sourceIn: 0,
  sourceOut: 34.3,
  palette: PALETTE,
  layout: { motionTop: 590, motionHeight: 165, captionBottom: 1400 },
  caption: {
    fontSize: 64,
    maxChars: 23,
    maxWords: 5,
    minSeconds: 1.3,
    scrim: false,
    shadowCss: "0 1px 2px rgba(45,28,12,0.9), 0 2px 10px rgba(45,28,12,0.65), 0 0 28px rgba(45,28,12,0.4)",
    baseWeight: 600,
    hlWeight: 700,
    hlScale: 1.1,
  },
  zoom: { origin: "50% 62%", patterns: [[1.0, 1.02], [1.02, 1.035], [1.0, 1.015], [1.025, 1.035]] },
  sfxEnabled: false,
  outro: { type: "cta", lines: ["Você vai ficar de fora?", "Acesse agora o Capiflix"], seconds: 2.6, bg: NAVY, fg: "#FFFFFF", paragraphs: true },
  pauseTrims: [
    { from: 0.89, to: 1.16, keep: 0.12 },
    { from: 8.03, to: 8.44, keep: 0.14 },
    { from: 21.8, to: 22.31, keep: 0.2 }, // "…nesse caso é | subincisão" (kept as a beat)
    { from: 28.28, to: 28.53, keep: 0.12 },
  ],
  words: CAPTION_WORDS_9,
  motions: [
    {
      id: "irritation",
      kind: "chips",
      from: 2.9,
      to: 6.9,
      label: "Irritação da derme por",
      compact: true,
      items: [
        { at: 3.1, text: "Concentração" },
        { at: 4.2, text: "Oleosidade" },
      ],
    },
    { id: "semi", kind: "keyword", from: 8.5, to: 12.0, kicker: "Resultado", text: "Semifibrose" },
    { id: "mm", kind: "keyword", from: 15.4, to: 18.3, kicker: "Afundamento de", text: "2 milímetros" },
    { id: "conduta", kind: "keyword", from: 20.2, to: 25.0, kicker: "Conduta", text: "Subincisão" },
    {
      id: "like",
      kind: "chips",
      from: 26.2,
      to: 34.0,
      label: "Como se trata",
      compact: true,
      items: [
        { at: 26.6, text: "Celulite" },
        { at: 28.8, text: "Fibrose" },
        { at: 30.0, text: "Cicatriz" },
      ],
    },
  ],
  sfx: [],
};
