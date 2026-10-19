import { CAPTION_WORDS_5 } from "../data/captionWords5";
import type { EditConfig } from "./types";

/**
 * Edit 5 — Dra. Lívia, "não existe receita de bolo para tratar autismo" (88 s). Clean style: white cards, no gradient behind
 * captions, no sound effects (voice only), simple white end card. Cuts only tighten silences (cut lands mid-silence).
 */
export const EDIT5: EditConfig = {
  id: "Edit5",
  videoFile: "video/original5.mov",
  sourceIn: 0.1,
  sourceOut: 88.45,
  style: "clean",
  caption: { fontSize: 66, maxChars: 20, maxWords: 3 },
  outro: { type: "clean", text: "Dra. Lívia", seconds: 1.8 },
  pauseTrims: [
    { from: 11.61, to: 11.94, keep: 0.16 },
    { from: 16.72, to: 17.36, keep: 0.26 }, // beat between the two "Depende" — kept, just tightened
    { from: 22.93, to: 23.25, keep: 0.14 },
    { from: 26.68, to: 27.03, keep: 0.14 },
    { from: 28.16, to: 28.58, keep: 0.2 },
    { from: 33.17, to: 33.6, keep: 0.16 },
    { from: 35.1, to: 35.67, keep: 0.2 },
    { from: 37.41, to: 37.98, keep: 0.16 },
    { from: 40.95, to: 41.37, keep: 0.2 },
    { from: 46.84, to: 47.31, keep: 0.2 },
    { from: 65.55, to: 65.87, keep: 0.16 },
    { from: 69.06, to: 69.42, keep: 0.2 },
    { from: 77.31, to: 77.66, keep: 0.16 },
  ],
  words: CAPTION_WORDS_5,
  motions: [
    { id: "abertura", kind: "cleanKeyword", from: 0.5, to: 3.7, kicker: "Tratar autismo", text: "Não existe receita de bolo" },
    {
      id: "quadro",
      kind: "cleanList",
      from: 10.3,
      to: 14.9,
      label: "O quadro",
      items: [
        { at: 10.32, text: "Nível 3 de suporte" },
        { at: 12.16, text: "Deficiência intelectual" },
        { at: 13.6, text: "Crises agressivas" },
      ],
    },
    { id: "depende", kind: "cleanKeyword", from: 16.1, to: 18.0, kicker: "A resposta", text: "Depende" },
    { id: "prioridade", kind: "cleanKeyword", from: 21.6, to: 23.9, kicker: "Pergunta-chave", text: "Qual é a prioridade?" },
    {
      id: "porques",
      kind: "cleanList",
      from: 39.9,
      to: 46.9,
      label: "Por que está agressiva?",
      items: [
        { at: 40.4, text: "Dor?" },
        { at: 42.4, text: "Comunicação?" },
        { at: 45.9, text: "Sobrecarga?" },
      ],
    },
    {
      id: "urgente",
      kind: "cleanList",
      from: 48.3,
      to: 56.2,
      label: "Mais urgente",
      items: [
        { at: 48.4, text: "Pedir ajuda" },
        { at: 50.7, text: "Se comunicar" },
      ],
    },
    {
      id: "terapias",
      kind: "cleanList",
      from: 69.4,
      to: 74.0,
      label: "Intervenções",
      items: [
        { at: 69.4, text: "Fono" },
        { at: 69.9, text: "T.O." },
        { at: 70.5, text: "Integração sensorial" },
        { at: 71.86, text: "Psicólogo" },
        { at: 72.82, text: "Musicoterapia" },
      ],
    },
    {
      id: "prioridades",
      kind: "cleanList",
      from: 79.6,
      to: 88.2,
      label: "Prioridades",
      items: [
        { at: 80.74, text: "Segurança" },
        { at: 81.78, text: "Comunicação" },
        { at: 82.98, text: "Autonomia" },
        { at: 84.58, text: "Qualidade de vida" },
      ],
    },
  ],
  sfx: [],
};
