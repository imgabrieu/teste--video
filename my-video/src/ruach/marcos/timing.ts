/**
 * Pr. Marcos Rozenio — roteiro sincronizado com a narração (`public/ruach/marcos-narracao.mp3`, 27,5 s).
 * Todos os tempos abaixo estão no relógio do ÁUDIO; o vídeo adiciona OFFSET segundos de abertura
 * (fade-in do fundo) antes da voz e um tempo de leitura do nome no final.
 *
 * Pausas medidas na energia do áudio (fronteiras de frase) + SRT enviado (ordem das palavras):
 *   0,11–2,64  Ele é pastor sênior da Igreja O Brasil Para Cristo,
 *   2,86–4,03  em Vila Santa Terezinha,
 *   4,28–4,78  São Paulo,
 *   5,06–7,62  e há 25 anos exerce o ministério pastoral.
 *   8,06–8,46  Teólogo,   8,64–9,16 advogado   9,27–10,58 e capelão internacional,
 *  10,88–14,33 também atuou por mais de 20 anos como professor no IBBC.
 *  14,92–16,45 Casado com Rosângela Siqueira,  16,68–17,82 pai de três filhos e avô,
 *  18,09–22,07 desenvolve seu ministério com ênfase em libertação, avivamento e missões,
 *  22,07–24,16 levando a Palavra de Deus a diversas nações.
 *  24,55–25,77 Recebam com muito carinho,   26,08–27,40 Pr. Marcos Rozenio!
 */
import { distribute } from "../kinetic";
import type { Beat, Line, Part, Variant } from "../timing";

export const OFFSET = 0.8; // s de abertura antes da voz
export const AUDIO_SECONDS = 27.5;
export const TOTAL_SECONDS = 31.7;

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

export const MARCOS_BEATS: Beat[] = [
  // ───────── Bloco 1 ─────────
  {
    id: "m01-igreja",
    variant: "rise",
    push: 0.03,
    rows: [
      {
        lines: [L(P("Ele é pastor sênior da", 70)), L(A("IGREJA", 116, 0.3, "track")), L(A("O BRASIL", 250)), L(A("PARA CRISTO", 250))],
        win: [0.11, 2.64],
        spoken: "pt",
        ptTimes: d(["Ele", "é", "pastor", "sênior", "da", "Igreja", "O", "Brasil", "Para", "Cristo"], 0.11, 2.64),
      },
    ],
  },
  {
    id: "m02-vila",
    variant: "slideH",
    push: 0.016,
    dir: 1,
    rows: [
      {
        lines: [L(P("em", 70)), L(A("VILA SANTA", 205)), L(A("TEREZINHA", 205))],
        win: [2.86, 4.03],
        spoken: "pt",
        ptTimes: d(["em", "Vila", "Santa", "Terezinha"], 2.86, 4.03),
      },
    ],
  },
  {
    id: "m03-sao-paulo",
    variant: "zoom",
    push: 0.034,
    rows: [{ lines: [L(A("SÃO PAULO", 300, 0.012))], win: [4.28, 4.78], spoken: "pt", ptTimes: [4.28, 4.5] }],
  },
  {
    id: "m04-25-anos",
    variant: "rise",
    push: 0.02,
    extraPush: [{ at: 5.3, strength: 0.07 }],
    rows: [
      {
        lines: [
          L(P("e há", 76)),
          L(A("25", 540, 0.0, "zoom"), A("ANOS", 280, 0.01, "slam")),
          L(P("exerce o ministério pastoral", 76)),
        ],
        win: [5.06, 7.62],
        spoken: "pt",
        ptTimes: [5.06, 5.2, 5.32, 5.9, 6.2, 6.55, 6.65, 7.25],
      },
    ],
  },
  // ───────── Bloco 2 ─────────
  {
    id: "m05-teologo",
    variant: "rise",
    push: 0.022,
    extraPush: [
      { at: 8.64, strength: 0.018 },
      { at: 9.36, strength: 0.018 },
    ],
    rows: [
      {
        lines: [
          L(A("TEÓLOGO", 200, 0.01, "letters")),
          L(A("ADVOGADO", 200, 0.01, "slideH")),
          L(P("e", 74), A("CAPELÃO", 200, 0.01, "rise")),
          L(A("INTERNACIONAL", 138, 0.1, "track")),
        ],
        win: [8.06, 10.58],
        spoken: "pt",
        ptTimes: [8.06, 8.64, 9.27, 9.36, 9.82],
      },
    ],
  },
  {
    id: "m06-20-anos-ibbc",
    variant: "rise",
    push: 0.02,
    extraPush: [
      { at: 12.2, strength: 0.05 },
      { at: 13.62, strength: 0.034 },
    ],
    rows: [
      {
        lines: [
          L(P("também atuou por", 70)),
          L(P("mais de", 84), A("20", 360, 0.0, "zoom"), A("ANOS", 220, 0.01, "slam")),
          L(P("como professor no", 70)),
          L(A("IBBC", 210, 0.03, "slam")),
        ],
        win: [10.88, 14.33],
        spoken: "pt",
        ptTimes: [10.88, ...d(["atuou", "por", "mais", "de", "vinte", "anos", "como", "professor", "no"], 11.37, 13.37), 13.62],
      },
    ],
  },
  // ───────── Bloco 3 ─────────
  {
    id: "m07-rosangela",
    variant: "rise",
    push: 0.022,
    rows: [
      {
        lines: [L(P("Casado com", 80)), L(A("ROSÂNGELA", 235, 0.01, "wipe")), L(A("SIQUEIRA", 235, 0.01, "wipe"))],
        win: [14.92, 16.45],
        spoken: "pt",
        ptTimes: d(["Casado", "com", "Rosângela", "Siqueira"], 14.92, 16.45),
      },
    ],
  },
  {
    id: "m08-filhos",
    variant: "rise",
    push: 0.026,
    rows: [
      {
        lines: [L(P("pai de", 86)), L(A("TRÊS FILHOS", 260, 0.01, "zoom")), L(P("e avô", 86))],
        win: [16.68, 17.82],
        spoken: "pt",
        ptTimes: d(["pai", "de", "três", "filhos", "e", "avô"], 16.68, 17.82),
      },
    ],
  },
  {
    id: "m09-libertacao-avivamento-missoes",
    variant: "rise",
    push: 0.02,
    extraPush: [
      { at: 19.92, strength: 0.055 },
      { at: 20.66, strength: 0.055 },
      { at: 21.58, strength: 0.07 },
    ],
    rows: [
      {
        lines: [
          L(P("desenvolve seu ministério com ênfase em", 64)),
          L(A("LIBERTAÇÃO", 238, 0.01, "zoom")),
          L(A("AVIVAMENTO", 238, 0.01, "track")),
          L(P("e", 74), A("MISSÕES", 238, 0.01, "slam")),
        ],
        win: [18.09, 22.07],
        spoken: "pt",
        ptTimes: [...d(["desenvolve", "seu", "ministério", "com", "ênfase", "em"], 18.09, 19.88), 19.92, 20.66, 21.36, 21.58],
      },
    ],
  },
  {
    id: "m10-palavra-nacoes",
    variant: "rise",
    push: 0.022,
    extraPush: [{ at: 23.27, strength: 0.034 }, { at: 23.98, strength: 0.04 }],
    rows: [
      {
        lines: [
          L(P("levando a", 74)),
          L(A("PALAVRA", 215, 0.01, "track"), A("DE", 215, 0.01, "track"), A("DEUS", 215, 0.01, "zoom")),
          L(P("a diversas", 80)),
          L(A("NAÇÕES", 300, 0.012, "slam")),
        ],
        win: [22.07, 24.16],
        spoken: "pt",
        ptTimes: [22.07, 22.4, 22.5, 22.95, 23.27, 23.52, 23.6, 23.98],
      },
    ],
  },
  // ───────── Bloco 4 · boas-vindas (o nome entra na cena final) ─────────
  {
    id: "m11-boas-vindas",
    variant: "rise",
    push: 0.03,
    rows: [
      {
        lines: [L(P("Recebam com", 104, 700)), L(A("MUITO CARINHO", 270, 0.01))],
        win: [24.55, 25.65],
        spoken: "pt",
        ptTimes: d(["Recebam", "com", "muito", "carinho"], 24.55, 25.65),
      },
    ],
  },
];

export const NAME = {
  pr: 26.08, // "Pastor"
  marcos: 26.52, // "Marcos"
  rozenio: 26.93, // "Rozenio"
};

/** Sons discretos, bem abaixo da voz. */
export const MARCOS_SFX: { at: number; file: string; volume: number }[] = [
  { at: 5.28, file: "sfx/whoosh.wav", volume: 0.08 },
  { at: 19.86, file: "sfx/whoosh.wav", volume: 0.08 },
  { at: 26.5, file: "sfx/impact.wav", volume: 0.15 },
];
