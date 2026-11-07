/**
 * Roteiro sincronizado com a narração (`public/ruach/narration.mp3`, 41,22 s).
 *
 * Estrutura real do áudio (confirmada por energia + reconhecimento + SRT enviado):
 * a voz alterna trechos curtos EN → PT, sempre começando pelo inglês.
 *
 *   EN1  0,17–7,60   He is an American apostle, married to Ivone, ... international ministry
 *   PT1  7,70–13,05  Ele é apóstolo americano, casado com Ivone, ... alcance internacional
 *   EN2a 13,12–16,50 He was sent and ordained through City Gate in the United States
 *   PT2a 16,55–18,73 Foi enviado e ordenado pela City Gate, nos Estados Unidos,
 *   EN2b 19,01–22,40 and now serves in the leadership of House of Glory
 *   PT2b 22,45–25,20 e hoje integra a liderança da House of Glory,
 *   EN2c 25,44–27,40 an international apostolic ministry
 *   EN2d 27,70–29,40 that also has a hub in São Paulo
 *   PT2c 29,45–31,40 um ministério apostólico internacional
 *   PT2d 31,65–33,50 que também possui um hub em São Paulo
 *   EN3a 33,55–35,60 Please welcome with great affection,
 *   EN3b 36,10–37,65 Apostle Carl Morgan!
 *   PT3a 37,77–39,00 Recebam com muito carinho,
 *   PT3b 39,50–40,94 Apóstolo Carl Morgan!
 *
 * Os tempos por palavra vêm das âncoras do reconhecimento (pocketsphinx) e das pausas medidas
 * no áudio; onde não há âncora, as palavras são distribuídas por peso silábico dentro do trecho.
 */

export type Variant = "rise" | "slam" | "track" | "wipe" | "letters" | "slideH" | "zoom";

export type Part = {
  text: string;
  font: "anton" | "poppins";
  size: number;
  weight?: 500 | 600 | 700;
  /** espaçamento extra entre letras (em) */
  tracking?: number;
  /** animação própria desta parte (senão usa a do beat) */
  variant?: Variant;
};
export type Line = { parts: Part[]; gap?: number };

export type Row = {
  lines: Line[];
  /** tradução em inglês (opcional — vídeos só em português omitem) */
  en?: string;
  enSize?: number;
  /** janela da fala (s) */
  win: [number, number];
  /** idioma pronunciado neste trecho */
  spoken: "en" | "pt";
  /** tempos de início por palavra PT (achatadas, na ordem de leitura) */
  ptTimes?: number[];
  enTimes?: number[];
};

export type Beat = {
  id: string;
  variant: Variant;
  rows: Row[];
  /** intensidade do "push" de câmera na entrada */
  push: number;
  rowGap?: number;
  /** direção da entrada lateral/vertical */
  dir?: 1 | -1;
  /** espaçamento entre palavras proporcional ao tamanho de cada palavra */
  tight?: boolean;
  /** pushes de câmera adicionais em instantes específicos (s) */
  extraPush?: { at: number; strength: number }[];
};

const P = (text: string, size: number, weight: 500 | 600 | 700 = 700, tracking = 0): Part => ({
  text,
  font: "poppins",
  size,
  weight,
  tracking,
});
const A = (text: string, size: number, tracking = 0.005): Part => ({ text, font: "anton", size, tracking });
const L = (...parts: Part[]): Line => ({ parts });

export const BEATS: Beat[] = [
  // ───────────── Bloco 1 · inglês (hero) ─────────────
  {
    id: "b01-apostolo-americano",
    variant: "rise",
    push: 0.03,
    rows: [
      {
        lines: [L(P("Ele é", 78, 600)), L(A("APÓSTOLO", 272)), L(A("AMERICANO", 272))],
        en: "He is an American apostle,",
        win: [0.17, 2.55],
        spoken: "en",
        ptTimes: [0.17, 0.34, 0.58, 1.0],
        enTimes: [0.17, 0.3, 0.39, 0.48, 1.55],
      },
    ],
  },
  {
    id: "b02-ivone",
    variant: "slideH",
    push: 0.016,
    dir: 1,
    rows: [
      {
        lines: [L(P("casado com", 92, 700)), L(A("IVONE", 340))],
        en: "married to Ivone,",
        win: [2.55, 4.4],
        spoken: "en",
        ptTimes: [2.62, 2.95, 3.5],
        enTimes: [2.62, 3.12, 3.5],
      },
    ],
  },
  {
    id: "b03-brasil",
    variant: "track",
    push: 0.022,
    rows: [
      {
        lines: [L(P("e atualmente serve no", 86, 700)), L(A("BRASIL", 350, 0.01))],
        en: "and currently serves in Brazil",
        win: [4.47, 6.12],
        spoken: "en",
        ptTimes: [4.47, 4.6, 5.1, 5.45, 5.64],
        enTimes: [4.47, 4.57, 5.09, 5.52, 5.64],
      },
    ],
  },
  {
    id: "b04-internacional",
    variant: "wipe",
    push: 0.02,
    rows: [
      {
        lines: [L(P("com uma atuação ministerial de alcance", 68, 700)), L(A("INTERNACIONAL", 250))],
        en: "through an international ministry",
        win: [6.17, 7.65],
        spoken: "en",
        ptTimes: [6.17, 6.27, 6.36, 6.46, 6.56, 6.62, 6.72],
        enTimes: [6.17, 6.37, 6.48, 7.25],
      },
    ],
  },
  // ───────────── Bloco 1 · português (recap sincronizado com a voz PT) ─────────────
  {
    id: "b05-recap-pt1",
    variant: "rise",
    push: 0.012,
    rowGap: 26,
    rows: [
      {
        lines: [L(P("Ele é", 58, 600), A("APÓSTOLO AMERICANO", 88))],
        en: "He is an American apostle,",
        enSize: 34,
        win: [7.7, 8.92],
        spoken: "pt",
      },
      {
        lines: [L(P("casado com", 58, 600), A("IVONE,", 88))],
        en: "married to Ivone,",
        enSize: 34,
        win: [8.92, 9.78],
        spoken: "pt",
      },
      {
        lines: [L(P("e atualmente serve no", 58, 600), A("BRASIL", 88))],
        en: "and currently serves in Brazil",
        enSize: 34,
        win: [9.9, 11.0],
        spoken: "pt",
      },
      {
        lines: [L(P("com uma atuação ministerial de alcance", 50, 600), A("INTERNACIONAL", 80))],
        en: "through an international ministry",
        enSize: 34,
        win: [11.05, 13.05],
        spoken: "pt",
      },
    ],
  },
  // ───────────── Bloco 2 · City Gate ─────────────
  {
    id: "b06-enviado",
    variant: "zoom",
    push: 0.026,
    rows: [
      {
        lines: [L(A("FOI ENVIADO", 250)), L(A("E ORDENADO", 250))],
        en: "He was sent and ordained",
        win: [13.12, 14.5],
        spoken: "en",
        ptTimes: [13.12, 13.4, 13.88, 13.98],
        enTimes: [13.12, 13.3, 13.5, 13.8, 13.95],
      },
    ],
  },
  {
    id: "b07-city-gate",
    variant: "slam",
    push: 0.05,
    rows: [
      {
        lines: [L(P("pela", 84, 600)), L(A("CITY GATE", 410, 0.01)), L(P("nos Estados Unidos", 88, 700))],
        en: "through City Gate in the United States",
        win: [14.73, 16.5],
        spoken: "en",
        ptTimes: [14.76, 14.98, 15.25, 15.58, 15.8, 16.1],
        enTimes: [14.76, 14.98, 15.25, 15.5, 15.58, 15.68, 16.1],
      },
    ],
  },
  {
    id: "b08-recap-city-gate",
    variant: "rise",
    push: 0.012,
    rows: [
      {
        lines: [L(P("Foi enviado e ordenado pela", 76, 600)), L(A("CITY GATE", 240, 0.01)), L(P("nos Estados Unidos,", 76, 600))],
        en: "He was sent and ordained through City Gate in the United States",
        enSize: 36,
        win: [16.55, 18.73],
        spoken: "pt",
      },
    ],
  },
  // ───────────── Bloco 2 · House of Glory ─────────────
  {
    id: "b09-house-of-glory",
    variant: "zoom",
    push: 0.06,
    rows: [
      {
        lines: [L(P("e hoje integra a liderança da", 70, 600)), L(A("HOUSE", 330, 0.01)), L(A("OF GLORY", 330, 0.01))],
        en: "and now serves in the leadership of House of Glory",
        enSize: 38,
        win: [19.04, 22.4],
        spoken: "en",
        ptTimes: [19.04, 19.3, 19.9, 20.5, 20.75, 21.26, 21.38, 21.69, 21.82],
        enTimes: [19.04, 19.3, 19.9, 20.45, 20.6, 20.75, 21.26, 21.38, 21.69, 21.82],
      },
    ],
  },
  {
    id: "b10-recap-house",
    variant: "slideH",
    push: 0.014,
    dir: -1,
    rows: [
      {
        lines: [L(P("e hoje integra a liderança da", 72, 600)), L(A("HOUSE OF GLORY", 250, 0.01))],
        en: "and now serves in the leadership of House of Glory",
        enSize: 38,
        win: [22.42, 25.2],
        spoken: "pt",
      },
    ],
  },
  // ───────────── Bloco 2 · ministério / São Paulo ─────────────
  {
    id: "b11-ministerio",
    variant: "letters",
    push: 0.026,
    rows: [
      {
        lines: [L(P("um", 80, 600)), L(A("MINISTÉRIO APOSTÓLICO", 164, 0.01)), L(A("INTERNACIONAL", 164, 0.01))],
        en: "an international apostolic ministry",
        enSize: 40,
        win: [25.44, 27.42],
        spoken: "en",
        ptTimes: [25.44, 25.54, 26.26, 26.8],
        enTimes: [25.44, 25.52, 26.26, 26.85],
      },
    ],
  },
  {
    id: "b12-sao-paulo",
    variant: "wipe",
    push: 0.02,
    rows: [
      {
        lines: [L(P("que também possui um hub em", 72, 600)), L(A("SÃO PAULO", 290, 0.012))],
        en: "that also has a hub in São Paulo",
        enSize: 42,
        win: [27.71, 29.4],
        spoken: "en",
        ptTimes: [27.71, 27.95, 28.2, 28.42, 28.52, 28.9, 29.0, 29.2],
        enTimes: [27.71, 27.95, 28.2, 28.4, 28.52, 28.9, 29.0, 29.2],
      },
    ],
  },
  {
    id: "b13-recap-ministerio",
    variant: "rise",
    push: 0.01,
    rowGap: 34,
    rows: [
      {
        lines: [L(P("um", 58, 600), A("MINISTÉRIO APOSTÓLICO INTERNACIONAL", 96))],
        en: "an international apostolic ministry",
        enSize: 36,
        win: [29.45, 31.45],
        spoken: "pt",
      },
      {
        lines: [L(P("que também possui um hub em", 58, 600), A("SÃO PAULO", 96))],
        en: "that also has a hub in São Paulo",
        enSize: 36,
        win: [31.65, 33.5],
        spoken: "pt",
      },
    ],
  },
  // ───────────── Bloco 3 · boas-vindas (o nome entra na cena final) ─────────────
  {
    id: "b14-boas-vindas",
    variant: "rise",
    push: 0.03,
    rows: [
      {
        lines: [L(P("Recebam com", 104, 700)), L(A("MUITO CARINHO", 270, 0.01))],
        en: "Please welcome with great affection,",
        enSize: 46,
        win: [33.55, 35.6],
        spoken: "en",
        ptTimes: [33.56, 34.05, 34.4, 34.96],
        enTimes: [33.54, 33.83, 34.33, 34.56, 34.96],
      },
    ],
  },
];

/** Tempos da cena final. */
export const FINALE = {
  apostle: 36.17, // "Apostle"
  carl: 36.62, // "Carl"
  morgan: 37.14, // "Morgan"
  welcomePt: [37.77, 39.0] as [number, number], // "Recebam com muito carinho,"
  ptApostolo: 39.63,
  ptCarl: 40.1,
  ptMorgan: 40.41,
};

/** Sons discretos (volume bem abaixo da voz). */
export const SFX: { at: number; file: string; volume: number }[] = [
  { at: 14.7, file: "sfx/whoosh.wav", volume: 0.1 },
  { at: 18.98, file: "sfx/whoosh.wav", volume: 0.1 },
  { at: 36.6, file: "sfx/impact.wav", volume: 0.16 },
];
