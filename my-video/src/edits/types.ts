export const FPS = 30;

/** Colour system for one edit. Defaults (white + navy) are used when omitted. */
export type Palette = { accent: string; ink: string; highlightBg: string; highlightFg: string };

export type CaptionWord = { t: string; s: number; hl?: boolean };

export type MotionSpec =
  | { id: string; kind: "title"; from: number; to: number; text: string; logo?: boolean }
  | { id: string; kind: "stat"; from: number; to: number; a: number; b: number; suffix: string; label: string }
  | { id: string; kind: "thinning"; from: number; to: number; label: string }
  | { id: string; kind: "stepper"; from: number; to: number; steps: { at: number; label: string; weight: number }[] }
  | { id: string; kind: "growth"; from: number; to: number; label: string }
  | { id: string; kind: "spread"; from: number; to: number; label: string }
  | { id: string; kind: "keyword"; from: number; to: number; kicker?: string; text: string }
  | { id: string; kind: "verdict"; from: number; to: number; rows: { at: number; ok: boolean; text: string }[] }
  | { id: string; kind: "tangle"; from: number; to: number; label: string }
  | { id: string; kind: "bubble"; from: number; to: number; who: string; text: string }
  | { id: string; kind: "chips"; from: number; to: number; label: string; items: { at: number; text: string }[]; compact?: boolean }
  | { id: string; kind: "behind"; from: number; to: number; word: string; person: string }
  | { id: string; kind: "fibers"; from: number; to: number; label: string; calmAt: number }
  | { id: string; kind: "devices"; from: number; to: number; label: string; items: { at: number; text: string; icon: "dryer" | "flat" | "curler" }[] }
  | { id: string; kind: "reduce"; from: number; to: number; items: { at: number; text: string; to: number }[] }
  | { id: string; kind: "cleanKeyword"; from: number; to: number; kicker?: string; text: string }
  | { id: string; kind: "cleanList"; from: number; to: number; label: string; items: { at: number; text: string }[] }
  | { id: string; kind: "matrix"; from: number; to: number; cols: string[]; rows: { label: string; cells: ({ at: number; ok: boolean } | null)[] }[] };

/** Person cut-out clips (WebM with alpha) covering SOURCE frames [fromFrame, toFrame), used by "behind" motions. */
export type PersonClip = { id: string; file: string; fromFrame: number };

export type SfxSpec = { id: string; file: string; at: number; volume: number };

/** Everything that is specific to one edited video (times are seconds of the ORIGINAL file). */
export type EditConfig = {
  id: string;
  videoFile: string;
  sourceIn: number;
  sourceOut: number;
  pauseTrims: { from: number; to: number; keep: number }[];
  words: CaptionWord[];
  motions: MotionSpec[];
  sfx: SfxSpec[];
  palette?: Palette;
  /** "clean": white cards, no scrim/gradient behind captions, simple white end card, voice only. */
  style?: "clean";
  personClips?: PersonClip[];
  /** Vertical placement (px on the 1080x1920 canvas) when the framing differs from the default (face high, panels low). */
  layout?: { motionTop?: number; behindTop?: number };
  caption?: { fontSize?: number; maxChars?: number; maxWords?: number };
  /** Closing card. Default: logo only. `cta`: logo + call-to-action text (one entry per line; joined it reads as the full sentence). */
  outro?: { type: "cta"; lines: string[]; seconds: number; sfxVolume?: number } | { type: "clean"; text: string; seconds: number };
};
