import { FPS } from "../edits/types";

/** Passoni Clinic identity: white / off-white / very light beige. No saturated colours. */
export const PC = {
  bg: "#F6F1E9",
  ink: "#2B2622",
  taupe: "#A39482",
  beige: "#EADFCB",
  white: "#FFFFFF",
  glass: "rgba(38,32,27,0.42)", // soft graphite glass chip behind white text (no gradient, no band)
} as const;

/** 1080x1920 canvas. Captions sit low (above the Reels UI), photos live in the upper area. */
export const LAYOUT = {
  logoCenterTop: 206, // centred logo on the light screens
  logoWidth: 204,
  watermark: { top: 292, right: 112, width: 176 }, // small white logo over the black part of the TV
  captionY: 1330,
  captionFont: 58,
  cardWidth: 900, // opener hero card (square)
  cardTop: 290,
  motionTop: 318,
  // split screen: photos on top, footage in a rounded panel below
  split: { panelTop: 760, shift: 200, radius: 40, cardWidth: 820, cardTop: 296 },
} as const;

export const SRC = {
  videoFile: "video/passoni2_stab.mp4",
  sourceIn: 0.1,
  sourceOut: 44.35,
  trims: [
    { from: 7.06, to: 7.71, keep: 0.22 }, // after "cabelo?"
    { from: 10.98, to: 11.58, keep: 0.18 }, // before "onde"
    { from: 15.34, to: 15.69, keep: 0.2 }, // after "cabelo."
    { from: 19.19, to: 19.62, keep: 0.2 }, // after "Clinic,"
    { from: 42.12, to: 42.48, keep: 0.18 }, // before "procure"
  ],
  zoom: [
    [1.0, 1.025],
    [1.02, 1.04],
    [1.0, 1.03],
    [1.025, 1.045],
  ] as [number, number][],
  zoomOrigin: "50% 36%",
};

export const TIMING = {
  openerEndSrc: 3.55, // hands over to the speaker just before "e vocês logo já pensam em cirurgia"
  openerDissolve: 14,
  outroHold: 8,
  outroVeil: 14,
  outroFrames: 120,
  splitRamp: 16,
  /** photo + footage moments (source seconds) */
  splits: [
    { from: 15.7, to: 19.4 }, // "Esse é mais um caso clínico muito bonito aqui da Passoni Clinic"
    { from: 31.1, to: 34.4 }, // "toda a coroa de volta, todo o cabelo de volta"
  ],
};

export const toFrame = (s: number) => Math.round(s * FPS);
