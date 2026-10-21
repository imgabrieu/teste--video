// Zana Homes — strictly black / white / grey.
export const C = {
  black: "#0A0A0A",
  ink: "rgba(10, 10, 10, 0.86)",
  white: "#FFFFFF",
  paper: "#FFFFFF",
  grey: "#8C8C8C",
  greyLight: "#D6D6D6",
  greyDark: "#3A3A3A",
  line: "rgba(255, 255, 255, 0.28)",
} as const;

export const FPS = 30;
export const f = (sec: number) => Math.round(sec * FPS);

/** Narration length 32.07 s; the logo card follows. */
export const SPEECH_END = 32.07;
export const VEIL_FROM = 31.6;
export const LOGO_IN = 32.0;
export const TOTAL_SEC = 34.5;
export const TOTAL_FRAMES = f(TOTAL_SEC);

export const SAFE = { left: 90, right: 130, bottom: 470 } as const;
export const CENTER_X = (SAFE.left + (1080 - SAFE.right)) / 2; // 520
