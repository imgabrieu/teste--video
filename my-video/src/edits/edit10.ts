import { CAPTION_WORDS_10 } from "../data/captionWords10";
import { NAVY } from "./edit5";
import type { EditConfig, Palette } from "./types";

/** Light system: navy type / white pills for motions on the light wall; navy chips highlight key words in the white captions. */
const PALETTE: Palette = { accent: NAVY, ink: "#FFFFFF", highlightBg: NAVY, highlightFg: "#FFFFFF", chipBg: "#FFFFFF", chipFg: NAVY, light: true };

/**
 * Edit 10 — HORIZONTAL 1920x1080 split screen (procedure close-up on the left, speaker on the right), 31.2 s.
 * The footage already ends with its own CAPIFLIX closing scene (24.9 s →): kept untouched, no overlay, no extra outro.
 * Captions: top, centred on the full frame, one line, symmetric 120 px margins. Motions: the light wall above the speaker's head.
 * No zoom (original framing), no sound effects, original audio.
 */
export const EDIT10: EditConfig = {
  id: "Edit10",
  videoFile: "video/original10.mp4",
  canvas: { width: 1920, height: 1080 },
  sourceIn: 0,
  sourceOut: 31.2,
  palette: PALETTE,
  layout: { motionTop: 215, motionHeight: 190, motionLeft: 1100, motionWidth: 780, captionBottom: 920, captionMargin: 120 },
  caption: {
    fontSize: 54,
    maxChars: 40,
    maxWords: 7,
    minSeconds: 1.5,
    scrim: false,
    shadowCss: "0 1px 2px rgba(10,16,24,0.9), 0 2px 10px rgba(10,16,24,0.7), 0 0 26px rgba(10,16,24,0.45)",
    baseWeight: 600,
    hlWeight: 700,
    hlScale: 1.08,
  },
  zoom: { patterns: [[1.0, 1.0]] },
  sfxEnabled: false,
  outro: { type: "none" },
  pauseTrims: [
    { from: 0.65, to: 0.91, keep: 0.1 },
    { from: 3.52, to: 3.83, keep: 0.14 },
  ],
  words: CAPTION_WORDS_10,
  motions: [
    { id: "anest", kind: "keyword", from: 1.0, to: 3.8, kicker: "Anestesia", text: "Botões anestésicos" },
    {
      id: "tecnica",
      kind: "chips",
      from: 7.2,
      to: 13.4,
      label: "Técnica",
      compact: true,
      items: [
        { at: 7.5, text: "Cânula 22" },
        { at: 9.2, text: "Soltura em leque" },
        { at: 11.9, text: "Massagem" },
      ],
    },
    { id: "colageno", kind: "keyword", from: 14.5, to: 18.7, kicker: "Derme irritada", text: "Mais colágeno" },
    {
      id: "opcoes",
      kind: "chips",
      from: 19.4,
      to: 24.7,
      label: "Se necessário",
      compact: true,
      items: [
        { at: 20.2, text: "Preencher" },
        { at: 23.4, text: "Encaminhar" },
      ],
    },
  ],
  sfx: [],
};
