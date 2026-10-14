// Visual system for the Dra. Lívia edit: white base, plum / purple / rose accents, Poppins only.
export const L = {
  white: "#FFFFFF",
  blush: "#FFF4F9",
  plum: "#4A2569", // deep purple: text on white glass, caption scrim
  purple: "#8E5BC4",
  lilac: "#D9C6F2",
  rose: "#E86FA8",
  roseSoft: "#FFB7D8", // highlighted caption words (reads well on the plum scrim)
  glass: "rgba(255,255,255,0.88)",
  glassLine: "rgba(255,255,255,0.95)",
  shadow: "rgba(74,37,105,0.30)",
  textShadow: "0 2px 6px rgba(52,22,78,0.45), 0 6px 30px rgba(52,22,78,0.55)",
} as const;

export const GRADIENT = `linear-gradient(120deg, ${L.rose} 0%, ${L.purple} 100%)`;

export const LAYOUT = {
  safeTop: 200,
  safeBottom: 470,
  safeSide: 90,
  motionTop: 985,
} as const;

export const CAP = {
  fontSize: 76,
  lineHeight: 1.18,
  wordInFrames: 9,
  risePx: 14,
  exitFrames: 5,
} as const;

/** Scenes of the source footage (seconds): talking head / b-roll cuts. The slow camera push restarts on every cut, which hides the reset. */
export const SCENE_CUTS = [0, 6.37, 14.07, 16.8, 19.23, 21.67, 22.33];
export const ZOOMS: [number, number][] = [
  [1.0, 1.04],
  [1.02, 1.05],
  [1.0, 1.035],
  [1.03, 1.055],
  [1.0, 1.04],
  [1.03, 1.05],
  [1.0, 1.04],
];
