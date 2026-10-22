/** Risca video — clean/chic: white captions, champagne key words, graphite logo on off-white. No blue graphics. */
export const RC = {
  white: "#FFFFFF",
  champagne: "#F5E6C9",
  bg: "#F6F1E9",
  shadow: "0 2px 16px rgba(24,16,14,0.62), 0 0 3px rgba(24,16,14,0.5)",
} as const;

/** Wide shot: doctor at the right, TV with the lavender photo at the left. Captions go below the photo (its bottom edge is tracked), across the TV's plain lower area and the doctor's legs — never over her face or the photo. */
export const LAYOUT = { minY: 1235, maxY: 1385, below: 195, maxWidth: 940 } as const;

export const SRC = {
  videoFile: "video/tv.mp4",
  sourceIn: 0,
  sourceOut: 55.4,
  trims: [
    { from: 2.89, to: 3.37, keep: 0.24 },
    { from: 12.16, to: 12.81, keep: 0.24 },
    { from: 17.59, to: 18.18, keep: 0.24 },
    { from: 22.73, to: 23.29, keep: 0.24 },
    { from: 37.8, to: 38.35, keep: 0.24 },
    { from: 38.87, to: 39.37, keep: 0.24 },
    { from: 41.79, to: 42.32, keep: 0.24 },
    { from: 49.31, to: 49.92, keep: 0.24 },
  ],
  zoom: [
    [1.0, 1.035],
    [1.035, 1.0],
  ] as [number, number][],
  zoomOrigin: "70% 42%",
};
export const END = { hold: 6, veil: 12, frames: 84 };
export const toFrame = (s: number) => Math.round(s * 30);
