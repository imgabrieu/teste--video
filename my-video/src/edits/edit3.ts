import { CAPTION_WORDS_3 } from "../data/captionWords3";
import type { EditConfig, Palette } from "./types";

/**
 * Capitech palette. The logo is a single colour — warm cream #F6F1EA (measured: 246,241,234) — so it is the accent for every
 * graphic, line and highlight. Deep navy is the supporting "ink" tone used for panels, veil and text on cream.
 */
export const CAPITECH_CREAM = "#F6F1EA";
export const CAPITECH_INK = "#0D2B45";
const PALETTE: Palette = { accent: CAPITECH_CREAM, ink: CAPITECH_INK, highlightBg: CAPITECH_CREAM, highlightFg: CAPITECH_INK };

// Edit 3 — "condicionador, leave-in e proteção térmica" (59.7 s, Dra. in meeting room, TV slides behind her).
export const EDIT3: EditConfig = {
  id: "Edit3",
  videoFile: "video/original3.mov",
  sourceIn: 0,
  sourceOut: 59.25,
  palette: PALETTE,
  pauseTrims: [
    { from: 2.13, to: 2.71, keep: 0.18 }, // "…para vocês. | E o condicionador"
    { from: 14.71, to: 14.95, keep: 0.12 },
    { from: 18.75, to: 19.35, keep: 0.2 }, // "…quebra. | Na regra,"
    { from: 20.07, to: 20.72, keep: 0.16 }, // hesitation after "Na regra,"
    { from: 26.2, to: 26.6, keep: 0.16 },
    { from: 34.43, to: 34.96, keep: 0.18 }, // "…babyliss. | Reduzir"
    { from: 40.69, to: 40.91, keep: 0.12 },
    { from: 44.71, to: 45.25, keep: 0.18 },
    { from: 51.48, to: 51.88, keep: 0.16 },
  ],
  words: CAPTION_WORDS_3,
  personClips: [
    { id: "p3a", file: "person/p3a.webm", fromFrame: 87 }, // source 2.90 s – 5.60 s
    { id: "p3b", file: "person/p3b.webm", fromFrame: 903 }, // source 30.10 s – 32.00 s
  ],
  motions: [
    { id: "title", kind: "title", from: 0.12, to: 2.3, text: "Condicionador, leave\u2011in\ne proteção térmica", logo: true },
    { id: "pilares", kind: "behind", from: 2.95, to: 5.55, word: "PILARES", person: "p3a" },
    { id: "friction", kind: "fibers", from: 6.3, to: 9.5, label: "Atrito entre as fibras", calmAt: 7.05 },
    {
      id: "benefits",
      kind: "chips",
      from: 11.35,
      to: 18.9,
      label: "O que o condicionador faz",
      compact: true,
      items: [
        { at: 11.5, text: "Desembaraça" },
        { at: 13.1, text: "Menos força" },
        { at: 15.0, text: "Maleabilidade" },
        { at: 17.2, text: "Menos quebra" },
      ],
    },
    {
      id: "versus",
      kind: "chips",
      from: 26.65,
      to: 29.95,
      label: "Quando usar cada um?",
      items: [
        { at: 26.95, text: "Leave-in" },
        { at: 27.5, text: "Proteção térmica" },
      ],
    },
    { id: "sempre", kind: "behind", from: 30.15, to: 31.95, word: "SEMPRE", person: "p3b" },
    {
      id: "heat-tools",
      kind: "devices",
      from: 32.3,
      to: 34.75,
      label: "Priorize quando usar",
      items: [
        { at: 32.7, text: "Secador", icon: "dryer" },
        { at: 33.5, text: "Chapinha", icon: "flat" },
        { at: 34.0, text: "Babyliss", icon: "curler" },
      ],
    },
    {
      id: "reduce",
      kind: "reduce",
      from: 35.05,
      to: 38.9,
      items: [
        { at: 35.4, text: "Temperatura", to: 0.35 },
        { at: 36.1, text: "Frequência", to: 0.45 },
        { at: 36.8, text: "Tempo de contato", to: 0.3 },
      ],
    },
    {
      id: "leave-in",
      kind: "chips",
      from: 39.4,
      to: 47.45,
      label: "Leave-in é ideal para cabelos",
      compact: true,
      items: [
        { at: 41.75, text: "Longos" },
        { at: 42.5, text: "Secos" },
        { at: 43.05, text: "Cacheados" },
        { at: 43.7, text: "Quimicamente tratados" },
        { at: 45.6, text: "Embaraçam fácil" },
      ],
    },
    {
      id: "where",
      kind: "matrix",
      from: 52.0,
      to: 59.1,
      cols: ["Couro", "Comprimento", "Pontas"],
      rows: [
        { label: "Leave-in", cells: [{ at: 54.8, ok: false }, { at: 53.0, ok: true }, { at: 53.8, ok: true }] },
        { label: "Proteção térmica", cells: [{ at: 58.0, ok: true }, null, null] },
      ],
    },
  ],
  sfx: [
    { id: "title", file: "sfx/whoosh.wav", at: 0.12, volume: 0.28 },
    { id: "pilares", file: "sfx/impact.wav", at: 3.0, volume: 0.3 },
    { id: "friction", file: "sfx/click.wav", at: 7.05, volume: 0.24 },
    { id: "benefits", file: "sfx/pop.wav", at: 11.5, volume: 0.26 },
    { id: "versus", file: "sfx/pop.wav", at: 26.95, volume: 0.26 },
    { id: "sempre", file: "sfx/whoosh.wav", at: 30.15, volume: 0.24 },
    { id: "dev1", file: "sfx/click.wav", at: 32.7, volume: 0.22 },
    { id: "dev2", file: "sfx/click.wav", at: 33.5, volume: 0.22 },
    { id: "dev3", file: "sfx/click.wav", at: 34.0, volume: 0.22 },
    { id: "reduce", file: "sfx/whoosh.wav", at: 35.1, volume: 0.22 },
    { id: "leave-in", file: "sfx/pop.wav", at: 41.75, volume: 0.24 },
    { id: "where", file: "sfx/pop.wav", at: 53.0, volume: 0.24 },
    { id: "where-x", file: "sfx/click.wav", at: 54.8, volume: 0.24 },
  ],
};
