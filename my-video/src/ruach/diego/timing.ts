/**
 * Pr. Diego Alves — roteiro sincronizado com a narração (`public/ruach/diego-narracao.mp3`, 18,7 s).
 * Tempos no relógio do ÁUDIO; o vídeo soma OFFSET segundos de abertura antes da voz e um tempo
 * de leitura do nome no final.
 *
 * Pausas medidas na energia do áudio + SRT enviado (ordem das palavras; seus tempos têm deslocamento):
 *   0,23–2,67  Ele é pastor da Igreja ADAI de São Bernardo do Campo
 *   2,70–4,44  e líder do Movimento Enraizados.
 *   4,86–5,96  Casado com Cacá Gerim   6,21–6,90 e pai do Bruno,
 *   7,15–7,88  é autor do livro   8,10–9,03 ‘Você Não é Tudo Isso’.
 *   9,38–11,52 Tem dedicado sua vida ao pastoreio,   11,82–12,82 ao cuidado de pessoas
 *  13,11–14,49 e à formação de uma geração   14,76–15,66 firmada em Deus.
 *  16,18–17,29 Recebam com muito carinho,   17,48–18,32 Pr. Diego Alves!
 */
import { distribute } from "../kinetic";
import type { Beat, Line, Part, Variant } from "../timing";

export const OFFSET = 0.8;
export const AUDIO_SECONDS = 18.7;
export const TOTAL_SECONDS = 23.6;

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

export const DIEGO_BEATS: Beat[] = [
  // ───────── Bloco 1 ─────────
  {
    id: "d01-igreja-adai",
    variant: "rise",
    push: 0.03,
    extraPush: [{ at: 1.23, strength: 0.06 }],
    rows: [
      {
        lines: [
          L(P("Ele é pastor da", 72)),
          L(A("IGREJA", 250, 0.01, "track"), A("ADAI", 250, 0.01, "slam")),
          L(P("de São Bernardo do Campo", 76)),
        ],
        win: [0.23, 2.67],
        spoken: "pt",
        ptTimes: [0.23, 0.38, 0.62, 0.85, 0.93, 1.23, ...d(["de", "São", "Bernardo", "do", "Campo"], 1.6, 2.67)],
      },
    ],
  },
  {
    id: "d02-movimento-enraizados",
    variant: "rise",
    push: 0.026,
    extraPush: [{ at: 3.86, strength: 0.075 }],
    rows: [
      {
        lines: [
          L(P("e líder do", 78)),
          L(A("MOVIMENTO", 215, 0.01, "slideH")),
          L(A("ENRAIZADOS", 300, 0.01, "zoom")),
        ],
        win: [2.7, 4.44],
        spoken: "pt",
        ptTimes: [2.7, 2.78, 3.1, 3.24, 3.86],
      },
    ],
  },
  // ───────── Bloco 2 ─────────
  {
    id: "d03-caca-gerim-bruno",
    variant: "rise",
    push: 0.024,
    extraPush: [{ at: 5.3, strength: 0.04 }, { at: 6.65, strength: 0.04 }],
    rows: [
      {
        lines: [
          L(P("Casado com", 80)),
          L(A("CACÁ GERIM", 250, 0.01, "wipe")),
          L(P("e pai do", 78), A("BRUNO", 200, 0.01, "slam")),
        ],
        win: [4.86, 6.9],
        spoken: "pt",
        ptTimes: [4.86, 5.18, 5.3, 5.63, 6.21, 6.4, 6.55, 6.65],
      },
    ],
  },
  {
    id: "d04-livro",
    variant: "rise",
    push: 0.02,
    extraPush: [{ at: 8.1, strength: 0.05 }],
    rows: [
      {
        lines: [
          L(P("é autor do livro", 78)),
          L(A("‘VOCÊ NÃO", 215, 0.01, "letters")),
          L(A("É TUDO ISSO’", 215, 0.01, "rise")),
        ],
        win: [7.15, 9.03],
        spoken: "pt",
        ptTimes: [7.15, 7.28, 7.55, 7.67, 8.1, 8.4, 8.55, 8.66, 8.82],
      },
    ],
  },
  // ───────── Bloco 3 ─────────
  {
    id: "d05-pastoreio",
    variant: "rise",
    push: 0.022,
    rows: [
      {
        lines: [L(P("Tem dedicado sua vida", 78)), L(P("ao", 80), A("PASTOREIO", 280, 0.01, "wipe"))],
        win: [9.38, 11.52],
        spoken: "pt",
        ptTimes: d(["Tem", "dedicado", "sua", "vida", "ao", "pastoreio"], 9.38, 11.52),
      },
    ],
  },
  {
    id: "d06-cuidado",
    variant: "rise",
    push: 0.024,
    rows: [
      {
        lines: [L(P("ao cuidado de", 80)), L(A("PESSOAS", 290, 0.01, "slam"))],
        win: [11.82, 12.9],
        spoken: "pt",
        ptTimes: d(["ao", "cuidado", "de", "pessoas"], 11.82, 12.82),
      },
    ],
  },
  {
    id: "d07-geracao-firmada",
    variant: "rise",
    push: 0.022,
    extraPush: [
      { at: 14.14, strength: 0.035 },
      { at: 14.76, strength: 0.045 },
      { at: 15.34, strength: 0.08 },
    ],
    rows: [
      {
        lines: [
          L(P("e à formação de", 70)),
          L(A("UMA", 190, 0.01, "rise"), A("GERAÇÃO", 190, 0.01, "track")),
          L(A("FIRMADA", 190, 0.01, "wipe"), A("EM", 190, 0.01, "wipe")),
          L(A("DEUS", 330, 0.015, "zoom")),
        ],
        win: [13.11, 15.66],
        spoken: "pt",
        ptTimes: [13.11, 13.26, 13.4, 13.8, 13.9, 14.14, 14.76, 15.2, 15.34],
      },
    ],
  },
  // ───────── Bloco 4 · boas-vindas (o nome entra na cena final) ─────────
  {
    id: "d08-boas-vindas",
    variant: "rise",
    push: 0.03,
    rows: [
      {
        lines: [L(P("Recebam com", 104, 700)), L(A("MUITO CARINHO", 270, 0.01))],
        win: [16.18, 17.0],
        spoken: "pt",
        ptTimes: [16.18, 16.5, 16.62, 16.93],
      },
    ],
  },
];

export const NAME = {
  pr: 17.48, // "Pastor"
  diego: 17.72, // "Diego"
  alves: 18.07, // "Alves"
};

/** Sons discretos, bem abaixo da voz. */
export const DIEGO_SFX: { at: number; file: string; volume: number }[] = [
  { at: 3.84, file: "sfx/whoosh.wav", volume: 0.08 },
  { at: 15.3, file: "sfx/whoosh.wav", volume: 0.08 },
  { at: 17.7, file: "sfx/impact.wav", volume: 0.15 },
];
