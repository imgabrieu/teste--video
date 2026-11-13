import { WORDS } from "./words";

export const VOICE = "audio/locucao_off.wav";
export const PRODUCT = "video/brum_produto.mp4";

export const w = (i: number) => WORDS[i].s;

/** A run of consecutive spoken words (indices into WORDS) rendered on one line with its own style. */
export type Seg = { r: [number, number]; size: number; dim?: boolean; chip?: boolean };
export type Scene = { id: string; from: number; to: number; lines: Seg[][] };

// Script (approved text): see source/locucao.srt for the original timestamps (re-timed against the audio).
export const SCENES: Scene[] = [
  { id: "s1", from: 0.0, to: 2.38, lines: [[{ r: [0, 2], size: 60, dim: true }], [{ r: [3, 4], size: 60, dim: true }], [{ r: [5, 5], size: 112 }], [{ r: [6, 6], size: 112 }]] },
  { id: "s2", from: 2.4, to: 4.3, lines: [[{ r: [7, 8], size: 60, dim: true }], [{ r: [9, 10], size: 84 }], [{ r: [11, 12], size: 84 }], [{ r: [13, 14], size: 112 }]] },
  { id: "s3", from: 4.32, to: 6.85, lines: [[{ r: [15, 16], size: 112 }], [{ r: [17, 18], size: 60, dim: true }], [{ r: [19, 21], size: 60, dim: true }], [{ r: [22, 22], size: 104, chip: true }]] },
  { id: "s4", from: 6.82, to: 7.9, lines: [[{ r: [23, 23], size: 150 }], [{ r: [24, 25], size: 120 }]] },
  { id: "s5", from: 7.87, to: 9.8, lines: [[{ r: [26, 26], size: 100 }], [{ r: [27, 29], size: 60, dim: true }], [{ r: [30, 30], size: 96 }]] },
  { id: "s6", from: 9.8, to: 12.4, lines: [[{ r: [31, 34], size: 60, dim: true }], [{ r: [35, 36], size: 104 }], [{ r: [37, 39], size: 60, dim: true }]] },
  { id: "s7", from: 12.44, to: 14.5, lines: [[{ r: [40, 41], size: 80, dim: true }], [{ r: [42, 42], size: 180, chip: true }], [{ r: [43, 44], size: 84 }], [{ r: [45, 46], size: 84 }]] },
  { id: "g1", from: 27.7, to: 29.95, lines: [[{ r: [86, 86], size: 60, dim: true }], [{ r: [87, 88], size: 104 }], [{ r: [89, 90], size: 60, dim: true }]] },
  { id: "g2", from: 29.95, to: 31.26, lines: [[{ r: [91, 91], size: 96 }], [{ r: [92, 92], size: 84 }]] },
  { id: "g3", from: 31.26, to: 32.7, lines: [[{ r: [93, 93], size: 96 }], [{ r: [94, 94], size: 120 }], [{ r: [95, 95], size: 120 }]] },
  { id: "h", from: 32.72, to: 36.0, lines: [[{ r: [96, 96], size: 150, chip: true }], [{ r: [97, 97], size: 112 }], [{ r: [98, 100], size: 64, dim: true }], [{ r: [101, 102], size: 104 }]] },
];

/** Keywords that sit above the product window ("agilidade, organização, eficiência"). */
export const FEATURE: Scene = {
  id: "feature",
  from: 23.12,
  to: 27.65,
  lines: [[{ r: [76, 78], size: 60, dim: true }], [{ r: [79, 81], size: 60, dim: true }], [{ r: [82, 82], size: 96 }], [{ r: [83, 83], size: 96 }], [{ r: [84, 85], size: 96 }]],
};

/** Product footage placement. `src` = seconds inside brum_produto.mp4 (top half = QUADRO CONCORRENTE, bottom half = QUADRO BRUM). */
export const COMPARE = { from: 14.53, to: 21.25, src: 1.0 }; // "Colocamos um quadro convencional lado a lado..."
export const RESULT = { from: 21.25, to: 23.12, src: 46.3 }; // "E o resultado fala por si só" (red X at 47 s, "montado em 47 segundos")
export const WINDOW = { src: 22.0 }; // Brum half only, assembly with drill: "agilidade, organização e eficiência"
export const OUTLINE = { top: { from: 15.26, to: 16.4 }, bottom: { from: 17.28, to: 18.4 } };

export const OUTRO = { at: 36.0, length: 2.0 };

export const SFX = [
  { file: "sfx/whoosh.wav", at: 12.36, volume: 0.04 },
  { file: "sfx/click.wav", at: 14.5, volume: 0.035 },
  { file: "sfx/pop.wav", at: 21.95, volume: 0.04 },
  { file: "sfx/whoosh.wav", at: 36.05, volume: 0.035 },
];
