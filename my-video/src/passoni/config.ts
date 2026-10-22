import { FPS } from "../edits/types";

/** Passoni Clinic identity: white / off-white / very light beige. No saturated colours. */
export const PC = {
  bg: "#F6F1E9", // off-white with a hint of beige (opener + end card)
  ink: "#2B2622", // warm graphite, only used on the light screens
  taupe: "#A39482", // soft secondary text on light screens
  beige: "#EADFCB", // very light beige: the occasional caption highlight / motion accent over video
  white: "#FFFFFF",
} as const;

/** 1080x1920 canvas. Captions live ABOVE the speaker's head (the dress below is white, so white text would vanish there). */
export const LAYOUT = {
  logoTop: 236,
  logoWidth: 204,
  motionTop: 308,
  captionY: 528, // vertical centre of the caption line while over the video
  captionFont: 62,
  openerCaptionY: 1318, // below the before/after card, on the light background
  cardWidth: 940,
  cardTop: 380,
} as const;

export const SRC = {
  videoFile: "video/passoni_stab.mp4",
  sourceIn: 1.06, // first word starts at 1.38 s: 0.3 s of lead-in
  sourceOut: 45.38,
  /** Pauses tightened (source seconds). Cuts always land inside silence; breaths stay. */
  trims: [
    { from: 8.14, to: 8.34, keep: 0 },
    { from: 11.41, to: 11.59, keep: 0 },
    { from: 15.35, to: 15.74, keep: 0 },
    { from: 16.22, to: 16.37, keep: 0 },
    { from: 21.1, to: 21.23, keep: 0 },
    { from: 35.57, to: 35.64, keep: 0 },
  ],
  /** Subtle punch-ins that alternate per cut (also hides the jump cuts). */
  zoom: [
    [1.0, 1.025],
    [1.02, 1.04],
    [1.0, 1.03],
    [1.025, 1.045],
  ] as [number, number][],
  zoomOrigin: "50% 36%",
};

export const TIMING = {
  /** source second where the opener hands over to the speaker ("perdeu todos os cabelos" starts a caption page) */
  openerEndSrc: 5.19,
  openerDissolve: 14, // frames
  outroHold: 8, // frames of the last frame before the light screen comes in
  outroVeil: 14,
  outroFrames: 120,
};

export const toFrame = (s: number) => Math.round(s * FPS);
