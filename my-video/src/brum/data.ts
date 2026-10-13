// Words: Parakeet-TDT v3 transcript (pt-BR), onsets snapped to audio energy. Times = seconds of the original clip.
export type W = { t: string; s: number };

export const WORDS: W[] = [
  { t: "O", s: 0.04 }, { t: "mês", s: 0.1 }, { t: "do", s: 0.36 }, { t: "eletricista", s: 0.47 }, { t: "da", s: 1.03 },
  { t: "Brum", s: 1.2 }, { t: "começou", s: 1.62 }, { t: "na", s: 2.08 }, { t: "sala", s: 2.16 }, { t: "de", s: 2.27 },
  { t: "aula,", s: 2.4 }, { t: "em", s: 2.8 }, { t: "contato", s: 3.04 }, { t: "com", s: 3.29 }, { t: "profissionais", s: 3.45 },
  { t: "para", s: 4.04 }, { t: "falar", s: 4.22 }, { t: "sobre", s: 4.45 }, { t: "novidades,", s: 4.77 }, { t: "mercado", s: 5.52 },
  { t: "e", s: 5.92 }, { t: "soluções.", s: 6.08 }, { t: "Nossos", s: 6.72 }, { t: "amigos", s: 6.99 }, { t: "da", s: 7.28 },
  { t: "Escola", s: 7.44 }, { t: "E3", s: 7.9 }, { t: "prepararam", s: 8.3 }, { t: "um", s: 8.88 }, { t: "encontro", s: 9.08 },
  { t: "com", s: 9.54 }, { t: "profissionais", s: 9.69 }, { t: "para", s: 10.34 }, { t: "falar", s: 10.56 }, { t: "sobre", s: 10.96 },
  { t: "mercado,", s: 11.2 }, { t: "novidades", s: 11.76 }, { t: "e", s: 12.32 }, { t: "soluções.", s: 12.49 }, { t: "Para", s: 13.15 },
  { t: "desenvolver", s: 13.31 }, { t: "soluções,", s: 13.94 }, { t: "queremos", s: 14.61 }, { t: "estar", s: 15.06 }, { t: "perto", s: 15.33 },
  { t: "de", s: 15.59 }, { t: "quem", s: 15.76 }, { t: "transforma", s: 16.0 }, { t: "o", s: 16.48 }, { t: "mercado", s: 16.56 },
  { t: "elétrico", s: 16.96 }, { t: "todos", s: 17.54 }, { t: "os", s: 17.92 }, { t: "dias.", s: 18.16 },
];

/** Caption pages: each line is a [from, to] inclusive index range into WORDS; `hl` are highlighted word indices (brand blue chip). */
export type Page = { lines: [number, number][]; hl?: number[] };

export const PAGES: Page[] = [
  { lines: [[0, 2], [3, 3]] }, // O MÊS DO / ELETRICISTA
  { lines: [[4, 5], [6, 6]], hl: [5] }, // DA BRUM / COMEÇOU
  { lines: [[7, 8], [9, 10]] }, // NA SALA / DE AULA,
  { lines: [[11, 13], [14, 14]], hl: [14] }, // EM CONTATO COM / PROFISSIONAIS
  { lines: [[15, 17]] }, // PARA FALAR SOBRE
  { lines: [[18, 19]] }, // NOVIDADES, MERCADO
  { lines: [[20, 21]] }, // E SOLUÇÕES.
  { lines: [[22, 23]] }, // NOSSOS AMIGOS
  { lines: [[24, 26]] }, // DA ESCOLA E3
  { lines: [[27, 28], [29, 29]] }, // PREPARARAM UM / ENCONTRO
  { lines: [[30, 31]] }, // COM PROFISSIONAIS
  { lines: [[32, 34]] }, // PARA FALAR SOBRE
  { lines: [[35, 36]] }, // MERCADO, NOVIDADES
  { lines: [[37, 38]] }, // E SOLUÇÕES.
  { lines: [[39, 40], [41, 41]], hl: [41] }, // PARA DESENVOLVER / SOLUÇÕES,
  { lines: [[42, 43], [44, 44]] }, // QUEREMOS ESTAR / PERTO
  { lines: [[45, 46], [47, 47]], hl: [47] }, // DE QUEM / TRANSFORMA
  { lines: [[48, 50]] }, // O MERCADO ELÉTRICO
  { lines: [[51, 53]] }, // TODOS OS DIAS.
];

/** Motion graphics (seconds of the original clip). */
export const MOTIONS = {
  behind: { from: 0.2, to: 2.95 }, // "O mês do ELETRICISTA" — type behind the speaker
  school: { from: 7.3, to: 9.15 }, // "Escola E3"
  pillars: { from: 11.1, to: 13.2, items: [{ at: 11.2, text: "Mercado" }, { at: 11.76, text: "Novidades" }, { at: 12.49, text: "Soluções" }] },
  sector: { from: 16.45, to: 18.55 }, // "Mercado elétrico"
};

export const SFX = [
  { file: "sfx/whoosh.wav", at: 0.2, volume: 0.26 },
  { file: "sfx/click.wav", at: 7.3, volume: 0.24 },
  { file: "sfx/pop.wav", at: 11.2, volume: 0.2 },
  { file: "sfx/pop.wav", at: 11.76, volume: 0.2 },
  { file: "sfx/pop.wav", at: 12.49, volume: 0.2 },
  { file: "sfx/whoosh.wav", at: 16.45, volume: 0.2 },
];
