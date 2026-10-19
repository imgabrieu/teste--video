import { FPS } from "../edits/types";

/** Series identity: white (dominant) + dark navy (support only). */
export const SC = {
  white: "#FFFFFF",
  navy: "#0D2B45",
  navyGlass: "rgba(13,43,69,0.80)",
  navySoft: "#5B6F84", // secondary text on white
  line: "rgba(13,43,69,0.22)",
} as const;

export const LAYOUT = {
  captionY: 1330, // centre of the caption chip (above the Reels UI)
  captionFont: 54,
  tagTop: 232,
  tagLeft: 84,
  split: { panelTop: 900, shift: 520, radius: 44, pairTop: 252, pairWidth: 960, kickerTop: 206 },
} as const;

export const TIMING = {
  hookEndSrc: 13.8, // end of the on-camera hook; footage returns to full frame here
  splitRamp: 16,
  outroHold: 6,
  outroVeil: 12,
  outroFrames: 96,
};

export const toFrame = (s: number) => Math.round(s * FPS);
