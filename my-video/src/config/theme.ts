// Central visual configuration: colours, fonts, sizes, safe areas and animation intensity.
export const COLORS = {
  white: "#FFFFFF",
  /** Secondary colour. Change this single constant to re-tint every highlight, chip and panel. */
  navy: "#0D2B45",
  navyGlass: "rgba(13, 43, 69, 0.84)",
  whiteSoft: "rgba(255, 255, 255, 0.78)",
  line: "rgba(255, 255, 255, 0.28)",
  shadow: "rgba(6, 20, 34, 0.55)",
} as const;

export const FONTS = {
  family: "Poppins, sans-serif",
  bold: 700,
  semiBold: 600,
  files: [
    { weight: 700, file: "fonts/poppins-latin-700-normal.woff2" },
    { weight: 600, file: "fonts/poppins-latin-600-normal.woff2" },
  ],
} as const;

export const CANVAS = { width: 1080, height: 1920 } as const;

/** Social-media UI safe areas (px) for a 1080x1920 canvas. */
export const SAFE = { top: 200, bottom: 470, left: 90, right: 130 } as const;

export const CAPTION = {
  fontSize: 70,
  lineHeight: 1.16,
  maxWordsPerPage: 3,
  maxCharsPerPage: 22,
  /** how long a page lingers after its last word if nothing follows (seconds) */
  holdSeconds: 0.35,
  wordGapEm: 0.26,
  scrimHeight: 900,
  scrimOpacity: 0.78,
} as const;

export const MOTION_ZONE = { top: 985, height: 250 } as const;

/** Global animation intensity: 0 = nearly static, 1 = default, 1.5 = livelier. */
export const ANIM = {
  intensity: 1,
  wordInFrames: 6,
  wordRisePx: 16,
  wordStartScale: 0.94,
} as const;

export const ZOOM = {
  /** [from, to] scale per segment, cycled. Subtle: 100% -> 103% -> 106%. */
  patterns: [
    [1.0, 1.03],
    [1.035, 1.06],
    [1.01, 1.035],
    [1.04, 1.065],
  ] as [number, number][],
  origin: "50% 36%",
} as const;

export const LOGO = {
  /** Replace the file in /public/logo (keep the name) or point this to your own file. SVG or PNG (white/transparent works best). */
  file: "logo/capitech.png",
  width: 800,
  outroSeconds: 1.8,
  overlayOpacity: 0.93,
} as const;
