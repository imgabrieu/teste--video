export const FPS = 30;

export type CaptionWord = { t: string; s: number; hl?: boolean };

export type MotionSpec =
  | { id: string; kind: "title"; from: number; to: number; text: string }
  | { id: string; kind: "stat"; from: number; to: number; a: number; b: number; suffix: string; label: string }
  | { id: string; kind: "thinning"; from: number; to: number; label: string }
  | { id: string; kind: "stepper"; from: number; to: number; steps: { at: number; label: string; weight: number }[] }
  | { id: string; kind: "growth"; from: number; to: number; label: string }
  | { id: string; kind: "spread"; from: number; to: number; label: string }
  | { id: string; kind: "keyword"; from: number; to: number; kicker?: string; text: string }
  | { id: string; kind: "verdict"; from: number; to: number; rows: { at: number; ok: boolean; text: string }[] }
  | { id: string; kind: "tangle"; from: number; to: number; label: string }
  | { id: string; kind: "bubble"; from: number; to: number; who: string; text: string }
  | { id: string; kind: "chips"; from: number; to: number; label: string; items: { at: number; text: string }[] };

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
};
