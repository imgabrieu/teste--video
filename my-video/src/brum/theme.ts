// BRUM identity. The blue is sampled straight from the supplied logo PNG (pixel RGB 22,55,83 -> #163753).
export const BRAND = {
  blue: "#163753",
  blueRgb: "22,55,83",
  white: "#FFFFFF",
} as const;

export const FPS = 30;
export const W = 1080;
export const H = 1920;

/** Instagram/Reels safe area (px): top, bottom (UI + caption area), sides. */
export const SAFE = { top: 220, bottom: 470, left: 90, right: 130 } as const;

export const sec = (s: number) => Math.round(s * FPS);

export const EASE = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

/** Speech ends at ~18.3 s; the clip's ambient tail is kept until the closing wipe. */
export const TIMING = {
  outroStart: 19.4,
  outroSeconds: 2.2,
};
