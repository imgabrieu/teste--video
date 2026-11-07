/**
 * Pr. José Santos — roteiro sincronizado com a narração (`public/ruach/jose-narracao.mp3`, 21,05 s).
 * Tempos no relógio do ÁUDIO; o vídeo soma OFFSET segundos de abertura antes da voz e um tempo
 * de leitura do nome no final.
 *
 * Pausas medidas na energia do áudio + SRT enviado (ordem das palavras; tempos com deslocamento):
 *   0,12–2,58  Ele é pastor sênior da Família Cristã Nova Vida,
 *   2,87–3,88  em Santa Bárbara d’Oeste,
 *   4,20–5,63  plantador de igrejas e teólogo.
 *   5,99–7,07  Casado com Giselle Pelissari   7,17–8,31 e pai de Benjamym,
 *   8,59–9,17  há 15 anos   9,24–10,78 se dedica à plantação de igrejas,
 *  11,14–12,10 formação de discípulos   12,40–13,85 e desenvolvimento de lideranças,
 *  14,24–16,39 tendo servido em diferentes cidades do Brasil   16,68–18,05 e em 16 nações.
 *  18,38–19,61 Recebam com muito carinho,   19,82–20,77 Pr. José Santos!
 */
import { distribute } from "../kinetic";
import type { Beat, Line, Part, Variant } from "../timing";

export const OFFSET = 0.8;
export const AUDIO_SECONDS = 21.05;
export const TOTAL_SECONDS = 25.9;

const P = (text: string, size: number, weight: 500 | 600 | 700 = 600, variant?: Variant): Part => ({
  text,
  font: "poppins",
  size,
  weight,
  variant,
});
const A = (text: string, size: number, tracking = 0.008, variant?: Variant): Part => ({
  text,
  font: "anton",
  size,
  tracking,
  variant,
});
const L = (...parts: Part[]): Line => ({ parts });
const d = distribute;

export const JOSE_BEATS: Beat[] = [
  // ───────── Bloco 1 ─────────
  {
    id: "j01-familia-crista-nova-vida",
    variant: "rise",
    push: 0.03,
    extraPush: [{ at: 2.0, strength: 0.05 }],
    rows: [
      {
        lines: [
          L(P("Ele é pastor sênior da", 70)),
          L(A("FAMÍLIA CRISTÃ", 200, 0.01, "track")),
          L(A("NOVA VIDA", 290, 0.012, "zoom")),
        ],
        win: [0.12, 2.58],
        spoken: "pt",
        ptTimes: [
          ...d(["Ele", "é", "pastor", "sênior", "da"], 0.12, 1.06),
          ...d(["Família", "Cristã"], 1.25, 1.86),
          ...d(["Nova", "Vida"], 2.0, 2.58),
        ],
      },
    ],
  },
  {
    id: "j02-santa-barbara",
    variant: "slideH",
    push: 0.02,
    dir: 1,
    rows: [
      {
        lines: [L(P("em", 72)), L(A("SANTA BÁRBARA", 200)), L(A("D’OESTE", 200))],
        win: [2.87, 3.88],
        spoken: "pt",
        ptTimes: d(["em", "Santa", "Bárbara", "d’Oeste"], 2.87, 3.88),
      },
    ],
  },
  {
    id: "j03-plantador-teologo",
    variant: "rise",
    push: 0.036,
    rows: [
      {
        lines: [
          L(A("PLANTADOR", 235, 0.01, "wipe")),
          L(P("de", 72), A("IGREJAS", 235, 0.01, "slam")),
          L(P("e", 72), A("TEÓLOGO", 170, 0.01, "rise")),
        ],
        win: [4.2, 5.63],
        spoken: "pt",
        ptTimes: [4.2, 4.58, 4.7, 5.21, 5.28],
      },
    ],
  },
  // ───────── Bloco 2 ─────────
  {
    id: "j04-giselle-benjamym",
    variant: "rise",
    push: 0.022,
    extraPush: [{ at: 7.62, strength: 0.045 }],
    rows: [
      {
        lines: [
          L(P("Casado com", 78)),
          L(A("GISELLE", 210, 0.01, "rise")),
          L(A("PELISSARI", 210, 0.01, "wipe")),
          L(P("e pai de", 70), A("BENJAMYM", 190, 0.01, "slam")),
        ],
        win: [5.99, 8.31],
        spoken: "pt",
        ptTimes: [...d(["Casado", "com", "Giselle", "Pelissari"], 5.99, 7.07), 7.17, 7.25, 7.33, 7.62],
      },
    ],
  },
  {
    id: "j05-15-anos",
    variant: "rise",
    push: 0.02,
    extraPush: [{ at: 8.71, strength: 0.075 }],
    rows: [
      {
        lines: [
          L(P("há", 76)),
          L(A("15", 520, 0.0, "zoom"), A("ANOS", 260, 0.01, "slam")),
          L(P("se dedica à plantação de igrejas,", 72)),
        ],
        win: [8.59, 10.78],
        spoken: "pt",
        ptTimes: [8.59, 8.71, 8.95, ...d(["se", "dedica", "à", "plantação", "de", "igrejas"], 9.24, 10.78)],
      },
    ],
  },
  {
    id: "j06-formacao-discipulos",
    variant: "rise",
    push: 0.026,
    extraPush: [{ at: 11.64, strength: 0.05 }],
    rows: [
      {
        lines: [L(A("FORMAÇÃO", 235, 0.01, "zoom")), L(P("de", 76), A("DISCÍPULOS", 235, 0.01, "letters"))],
        win: [11.14, 12.1],
        spoken: "pt",
        ptTimes: [11.14, 11.55, 11.64],
      },
    ],
  },
  {
    id: "j07-lideranca",
    variant: "rise",
    push: 0.022,
    rows: [
      {
        lines: [
          L(P("e", 76)),
          L(A("DESENVOLVIMENTO", 170, 0.01, "wipe")),
          L(P("de", 76), A("LIDERANÇAS", 245, 0.01, "slam")),
        ],
        win: [12.4, 13.85],
        spoken: "pt",
        ptTimes: [12.4, 12.5, 13.25, 13.33],
      },
    ],
  },
  {
    id: "j08-cidades-brasil",
    variant: "rise",
    push: 0.022,
    extraPush: [{ at: 16.06, strength: 0.05 }],
    rows: [
      {
        lines: [
          L(P("tendo servido em", 74)),
          L(A("DIFERENTES", 175, 0.01, "track"), A("CIDADES", 175, 0.01, "track")),
          L(P("do", 74), A("BRASIL", 300, 0.012, "zoom")),
        ],
        win: [14.24, 16.39],
        spoken: "pt",
        ptTimes: [...d(["tendo", "servido", "em"], 14.24, 15.1), 15.21, 15.68, 15.98, 16.06],
      },
    ],
  },
  {
    id: "j09-16-nacoes",
    variant: "rise",
    push: 0.024,
    extraPush: [
      { at: 17.17, strength: 0.11 },
      { at: 17.84, strength: 0.05 },
    ],
    rows: [
      {
        lines: [L(P("e em", 82)), L(A("16", 600, 0.0, "zoom"), A("NAÇÕES", 300, 0.01, "slam"))],
        win: [16.68, 18.1],
        spoken: "pt",
        ptTimes: [16.68, 16.82, 17.17, 17.84],
      },
    ],
  },
  // ───────── Bloco 3 · boas-vindas (o nome entra na cena final) ─────────
  {
    id: "j10-boas-vindas",
    variant: "rise",
    push: 0.03,
    rows: [
      {
        lines: [L(P("Recebam com", 104, 700)), L(A("MUITO CARINHO", 270, 0.01))],
        win: [18.38, 19.3],
        spoken: "pt",
        ptTimes: [18.38, 18.8, 18.93, 19.2],
      },
    ],
  },
];

export const NAME = {
  pr: 19.82, // "Pastor"
  jose: 20.15, // "José"
  santos: 20.45, // "Santos"
};

/** Sons discretos, bem abaixo da voz. */
export const JOSE_SFX: { at: number; file: string; volume: number }[] = [
  { at: 8.68, file: "sfx/whoosh.wav", volume: 0.08 },
  { at: 17.14, file: "sfx/whoosh.wav", volume: 0.09 },
  { at: 20.13, file: "sfx/impact.wav", volume: 0.15 },
];
