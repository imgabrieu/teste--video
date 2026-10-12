// Editorial decisions for THIS video (all times in seconds of the ORIGINAL file).
export const FPS = 30;
export const VIDEO_FILE = "video/original.mov";
export const SOURCE_IN = 0.1; // trims 0.1s of leading room
export const SOURCE_OUT = 82.15; // last word ends ~81.9s

/**
 * Pauses detected by audio energy (analysis/pauses.json). Only the pauses listed here are tightened;
 * `keep` is how much silence stays so the delivery remains natural. Everything else (short breaths) is left alone.
 */
export const PAUSE_TRIMS: { from: number; to: number; keep: number }[] = [
  { from: 10.16, to: 10.58, keep: 0.2 }, // end of sentence
  { from: 14.2, to: 14.5, keep: 0.12 },
  { from: 19.86, to: 20.14, keep: 0.12 },
  { from: 24.2, to: 24.54, keep: 0.2 }, // end of sentence
  { from: 27.77, to: 28.01, keep: 0.14 },
  { from: 30.75, to: 31.05, keep: 0.12 },
  { from: 32.3, to: 32.66, keep: 0.16 },
  { from: 41.24, to: 41.49, keep: 0.14 },
  { from: 47.07, to: 47.49, keep: 0.18 },
  { from: 67.03, to: 67.27, keep: 0.14 },
  { from: 70.65, to: 71.12, keep: 0.2 }, // end of sentence
  { from: 76.46, to: 76.91, keep: 0.18 },
];

export type MotionSpec =
  | { id: string; kind: "title"; from: number; to: number; text: string }
  | { id: string; kind: "stat"; from: number; to: number; a: number; b: number; suffix: string; label: string }
  | { id: string; kind: "thinning"; from: number; to: number; label: string }
  | { id: string; kind: "stepper"; from: number; to: number; steps: { at: number; label: string; weight: number }[] };

/** Motion graphics, only where they add meaning. */
export const MOTIONS: MotionSpec[] = [
  { id: "title", kind: "title", from: 0.3, to: 3.1, text: "Como explicar a calvície ao paciente" },
  { id: "stat", kind: "stat", from: 14.5, to: 17.6, a: 80, b: 90, suffix: "%", label: "da rotina do consultório" },
  { id: "thinning", kind: "thinning", from: 36.1, to: 38.9, label: "Afinamento do fio" },
  {
    id: "stepper",
    kind: "stepper",
    from: 45.2,
    to: 58.2,
    steps: [
      { at: 45.3, label: "Fio grosso", weight: 15 },
      { at: 50.3, label: "Inflamação", weight: 9 },
      { at: 53.7, label: "Fios finos", weight: 3.5 },
    ],
  },
];

export type SfxSpec = { id: string; file: string; at: number; volume: number };

/** Sound effects (SOURCE seconds). Deliberately sparse and quiet so they never compete with the voice. */
export const SFX: SfxSpec[] = [
  { id: "title-whoosh", file: "sfx/whoosh.wav", at: 0.3, volume: 0.32 },
  { id: "stat-pop", file: "sfx/pop.wav", at: 14.5, volume: 0.38 },
  { id: "thin-click", file: "sfx/click.wav", at: 36.1, volume: 0.32 },
  { id: "step-1", file: "sfx/click.wav", at: 45.3, volume: 0.28 },
  { id: "step-2", file: "sfx/click.wav", at: 50.3, volume: 0.28 },
  { id: "step-3", file: "sfx/click.wav", at: 53.7, volume: 0.28 },
];
