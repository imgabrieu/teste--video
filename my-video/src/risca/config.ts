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
  videoFile: "video/tv2.mp4",
  sourceIn: 0,
  sourceOut: 55.5, // last sound at 54.87 s; nothing in the speech is cut
  /** NO cuts inside her speech (client request): the take plays uninterrupted. */
  trims: [] as { from: number; to: number; keep: number }[],
  /** one continuous, very slow push-in across the whole take (no jump cuts to hide) */
  zoom: [[1.0, 1.04]] as [number, number][],
  zoomOrigin: "70% 42%",
};
export const END = { hold: 6, veil: 12, frames: 84 };
export const toFrame = (s: number) => Math.round(s * 30);
