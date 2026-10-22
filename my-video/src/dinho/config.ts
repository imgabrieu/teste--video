/** Dinho video — clean/chic palette (no blue): white, champagne, warm graphite, off-white. */
export const DC = {
  white: "#FFFFFF",
  champagne: "#F3E4C8", // key words
  graphite: "#2B2622", // logo / end card ink
  bg: "#F6F1E9", // end card
  shadow: "0 2px 16px rgba(46,26,22,0.55), 0 0 3px rgba(46,26,22,0.45)",
} as const;

/** 1080x1920. The footage is an extreme close-up: the face fills the top ~58%, the burned-in before/after photo sits at y≈1332–1731,
 *  so the only clear band is between chin and photo (y≈1100–1320). Captions live there and nowhere else. */
export const LAYOUT = { captionY: 1208, captionFont: 66, maxWidth: 940 } as const;

export const SRC = {
  videoFile: "video/dinho.mp4",
  sourceOut: 59.7,
  /** pauses tightened (source seconds): the removed middle part is [from + keep/2, to - keep/2]; every cut sits in a quiet moment */
  trims: [
    { from: 18.21, to: 18.86, keep: 0.16 },
    { from: 22.71, to: 23.18, keep: 0.16 },
    { from: 25.85, to: 26.25, keep: 0.14 },
    { from: 31.66, to: 32.8, keep: 0.18 }, // breath before "Esse tratamento"
    { from: 37.57, to: 38.04, keep: 0.14 },
    { from: 42.44, to: 42.9, keep: 0.16 },
    { from: 53.63, to: 54.03, keep: 0.15 },
    { from: 57.87, to: 58.31, keep: 0.16 },
  ],
  zoom: [
    [1.0, 1.03],
    [1.03, 1.0],
  ] as [number, number][],
  zoomOrigin: "50% 28%",
};

export const END = { hold: 6, veil: 12, frames: 84 }; // closing logo screen
export const toFrame = (s: number) => Math.round(s * 30);
