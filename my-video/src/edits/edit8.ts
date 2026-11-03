import { CAPTION_WORDS_8 } from "../data/captionWords8";
import { NAVY } from "./edit5";
import type { EditConfig, Palette } from "./types";

/**
 * Light system, adapted to this room (beige striped wall, blue TV with a static title slide, silver laptop):
 * captions = white with a soft shadow at the lower centre (below the speaker's face, over table/laptop); motions = navy type on the
 * bare wall strip under the TV, left of the speaker; highlight chips = navy. No gradient, no scrim, no sound.
 */
// Highlight chips are WHITE with navy text (a navy chip disappears against the blue TV / its reflection in the table).
const PALETTE: Palette = { accent: NAVY, ink: "#FFFFFF", highlightBg: "#FFFFFF", highlightFg: NAVY, chipBg: "#FFFFFF", chipFg: NAVY, light: true };

// Edit 8 — "bolinhas / pápulas / acromias: manejar ou indicar ao dermatologista" (39.1 s, wide shot, slide on TV).
export const EDIT8: EditConfig = {
  id: "Edit8",
  videoFile: "video/original8.mp4",
  sourceIn: 0.5, // the first 0.5 s is the clipped tail of a previous word ("…gosto,")
  sourceOut: 39.0,
  palette: PALETTE,
  layout: { motionTop: 1040, motionHeight: 150, motionLeft: 24, motionWidth: 500, keywordScale: 0.9 },
  caption: { fontSize: 66, maxChars: 26, maxWords: 4, minSeconds: 1.3, scrim: false, strongShadow: true, baseWeight: 600, hlWeight: 700, hlScale: 1.1 },
  zoom: { origin: "75% 50%", patterns: [[1.0, 1.02], [1.02, 1.035], [1.0, 1.015], [1.025, 1.035]] },
  sfxEnabled: false,
  outro: { type: "cta", lines: ["Você vai ficar de fora?", "Acesse agora o Capiflix."], seconds: 2.2, bg: NAVY, fg: "#FFFFFF", paragraphs: true },
  pauseTrims: [
    { from: 1.8, to: 2.01, keep: 0.1 },
    { from: 4.04, to: 4.28, keep: 0.1 },
    { from: 5.96, to: 6.3, keep: 0.14 },
    { from: 9.97, to: 10.34, keep: 0.14 },
    { from: 11.31, to: 11.52, keep: 0.12 },
    { from: 12.01, to: 12.24, keep: 0.1 },
    { from: 14.29, to: 14.46, keep: 0.08 },
    { from: 18.04, to: 18.25, keep: 0.1 },
    { from: 20.93, to: 21.21, keep: 0.16 }, // "…da pele. | Eu sei"
    { from: 21.95, to: 22.33, keep: 0.12 },
    { from: 23.39, to: 23.7, keep: 0.12 },
    { from: 25.03, to: 25.34, keep: 0.12 },
    { from: 26.35, to: 26.62, keep: 0.1 },
    { from: 29.54, to: 29.97, keep: 0.14 },
    { from: 31.89, to: 32.17, keep: 0.1 },
    { from: 35.96, to: 36.34, keep: 0.12 },
  ],
  words: CAPTION_WORDS_8,
  motions: [
    { id: "papulas", kind: "keyword", from: 1.2, to: 5.9, kicker: "Pápulas", text: "Parecem queratose pilar" },
    { id: "acromia", kind: "keyword", from: 6.7, to: 10.95, kicker: "Acromias", text: "Sem pigmento" },
    { id: "conduta", kind: "keyword", from: 12.5, to: 20.8, kicker: "Conduta", text: "Manejar ou indicar" },
    { id: "folículo", kind: "keyword", from: 31.4, to: 34.9, kicker: "Quem só trata", text: "Folículo piloso" },
  ],
  sfx: [],
};
