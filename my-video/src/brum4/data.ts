import { WORDS } from "./words";

export const VOICE = "audio/locucao_volt.wav";
export const PRODUCT = "video/brum_produto.mp4";
export const w = (i: number) => WORDS[i].s;

/**
 * One line segment. `r` = run of spoken words (indices into WORDS), `words` = on-screen words with explicit onsets,
 * `logo` = show the official BRUM logo (instead of the typed word) at the onset of word r[0].
 */
export type Seg = { r?: [number, number]; words?: { t: string; s: number }[]; size: number; dim?: boolean; chip?: boolean; logo?: boolean };
export type Scene = { id: string; from: number; to: number; lines: Seg[][] };

export const SCENES: Scene[] = [
  { id: "s1", from: 0.0, to: 2.3, lines: [[{ r: [0, 2], size: 60, dim: true }], [{ r: [3, 4], size: 60, dim: true }], [{ r: [6, 6], size: 112 }], [{ r: [7, 7], size: 112 }]] },
  { id: "s2", from: 2.3, to: 4.3, lines: [[{ r: [8, 9], size: 60, dim: true }], [{ r: [10, 11], size: 84 }], [{ r: [12, 13], size: 84 }], [{ r: [14, 15], size: 112 }]] },
  { id: "s3", from: 4.32, to: 6.9, lines: [[{ r: [16, 17], size: 112 }], [{ r: [18, 19], size: 60, dim: true }], [{ r: [20, 22], size: 60, dim: true }], [{ r: [23, 23], size: 104, chip: true }]] },
  { id: "s4", from: 6.94, to: 9.7, lines: [[{ r: [24, 26], size: 60, dim: true }], [{ r: [27, 28], size: 96 }], [{ r: [29, 31], size: 80 }]] },
  { id: "s7", from: 15.17, to: 18.75, lines: [[{ r: [45, 46], size: 60, dim: true }], [{ r: [47, 48], size: 84 }], [{ r: [49, 50], size: 60, dim: true }], [{ r: [51, 52], size: 60, dim: true }], [{ r: [53, 53], size: 96, chip: true }]] },
  { id: "s8", from: 18.76, to: 21.9, lines: [[{ r: [54, 55], size: 80, dim: true }], [{ r: [56, 56], size: 150, logo: true }], [{ r: [57, 60], size: 60, dim: true }], [{ r: [61, 61], size: 112 }], [{ r: [62, 63], size: 72, dim: true }]] },
  { id: "g1", from: 38.41, to: 40.78, lines: [[{ r: [103, 103], size: 60, dim: true }], [{ r: [104, 105], size: 104 }], [{ r: [106, 107], size: 60, dim: true }]] },
  { id: "g2", from: 40.8, to: 41.78, lines: [[{ r: [108, 108], size: 96 }], [{ r: [109, 109], size: 84 }]] },
  { id: "final", from: 41.78, to: 44.92, lines: [[{ r: [110, 110], size: 130, logo: true }], [{ r: [111, 111], size: 112 }], [{ r: [112, 114], size: 64, dim: true }], [{ r: [115, 116], size: 104 }]] },
];

/** Text that sits above a footage window. */
export type Stage = Scene;
export type Clip = {
  from: number;
  to: number;
  src: number;
  half: "top" | "bottom";
  zoom?: [number, number];
  origin?: string;
  /** seconds of footage to play before holding the last frame */
  hold?: number;
  /** outline drawn around a product detail (window coordinates, zooms with the footage) */
  box?: { x: number; y: number; w: number; h: number; from: number; to: number };
};
export type WindowScene = { id: string; from: number; to: number; stages: Stage[]; clips: Clip[] };

/** "encaixar cada componente... fazer ajustes": the conventional board's barramento being assembled piece by piece. */
export const ASSEMBLY: WindowScene = {
  id: "assembly",
  from: 9.73,
  to: 15.15,
  stages: [
    { id: "a1", from: 9.73, to: 11.5, lines: [[{ r: [32, 32], size: 100 }], [{ r: [33, 33], size: 60, dim: true }], [{ r: [34, 34], size: 90 }]] },
    { id: "a2", from: 11.5, to: 15.15, lines: [[{ r: [35, 37], size: 56, dim: true }], [{ r: [38, 39], size: 88 }], [{ r: [40, 42], size: 56, dim: true }], [{ r: [43, 44], size: 72 }]] },
  ],
  clips: [{ from: 9.73, to: 15.15, src: 12.3, half: "top", zoom: [1.0, 1.06], origin: "50% 55%" }],
};

/** "Com a linha Volt, o barramento já vem montado, reduzindo etapas": assembled barramento, then the quick installation. */
export const SOLUTION: WindowScene = {
  id: "solution",
  from: 21.94,
  to: 27.4,
  stages: [
    { id: "v1", from: 21.94, to: 22.94, lines: [[{ r: [64, 66], size: 60, dim: true }], [{ r: [67, 67], size: 120, chip: true }]] },
    { id: "v2", from: 22.94, to: 24.64, lines: [[{ r: [69, 69], size: 100 }], [{ r: [70, 70], size: 92 }, { r: [72, 72], size: 92 }]] },
    {
      id: "v3",
      from: 24.64,
      to: 27.4,
      lines: [[{ words: [{ t: "Menos", s: 24.66 }], size: 96 }], [{ words: [{ t: "etapas", s: 25.41 }], size: 96 }], [{ words: [{ t: "na", s: 26.82 }, { t: "instalação.", s: 26.9 }], size: 72 }]],
    },
  ],
  clips: [
    { from: 22.0, to: 24.9, src: 1.5, hold: 1.9, half: "bottom", zoom: [1.0, 1.4], origin: "38% 70%", box: { x: 235, y: 535, w: 360, h: 320, from: 23.0, to: 24.8 } },
    { from: 24.9, to: 27.4, src: 39.0, half: "bottom", zoom: [1.0, 1.04], origin: "50% 0%" },
  ],
};

/** Benefits, tied back to the barramento. */
export const BENEFITS: WindowScene = {
  id: "benefits",
  from: 34.9,
  to: 38.3,
  stages: [
    {
      id: "b1",
      from: 34.9,
      to: 38.3,
      lines: [
        [{ words: [{ t: "Barramento já montado.", s: 34.95 }], size: 42, dim: true }],
        [{ words: [{ t: "Menos etapas na instalação.", s: 35.05 }], size: 40, dim: true }],
        [{ r: [98, 98], size: 60, dim: true }],
        [{ r: [99, 99], size: 96 }],
        [{ r: [100, 100], size: 96 }],
        [{ r: [101, 102], size: 96 }],
      ],
    },
  ],
  clips: [{ from: 34.9, to: 38.3, src: 40.5, half: "bottom", zoom: [1.0, 1.04], origin: "50% 0%" }],
};

/** Product footage placement. `src` = seconds inside brum_produto.mp4. */
export const COMPARE = { from: 27.42, to: 33.75, src: 2.86 };
export const RESULT = { from: 33.75, to: 34.9, src: 47.6 };
export const OUTLINE = { top: { from: 28.1, to: 29.25 }, bottom: { from: 30.26, to: 31.4 } };
export const OUTRO = { at: 44.95, length: 2.0 };

export const SFX = [
  { file: "sfx/whoosh.wav", at: 18.74, volume: 0.04 },
  { file: "sfx/click.wav", at: 22.94, volume: 0.035 },
  { file: "sfx/click.wav", at: 27.42, volume: 0.035 },
  { file: "sfx/pop.wav", at: 33.78, volume: 0.04 },
  { file: "sfx/whoosh.wav", at: 45.0, volume: 0.035 },
];
