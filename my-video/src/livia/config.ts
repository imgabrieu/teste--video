// Edit "Livia" — Dia do Neurologista / Mês do Médico. All times are seconds of the SOURCE file (no cuts: the speech is already fluid
// and the pauses are where the b-roll breathes).
export const FPS = 30;
export const SOURCE_FILE = "video/livia.mov";
export const SOURCE_SECONDS = 23.73;
export const OUTRO_SECONDS = 2.4;

export type Word = { t: string; s: number; hl?: boolean };
export type Page = Word[];

/** Transcription: Parakeet-TDT v3 (analysis/livia/asr.parakeet.json); onset times snapped to the audio energy after each pause. */
export const PAGES: Page[] = [
  [{ t: "Na", s: 0.72 }, { t: "medicina,", s: 0.88, hl: true }],
  [{ t: "a", s: 1.7 }, { t: "gente", s: 1.84 }, { t: "não", s: 2.16 }, { t: "sai", s: 2.4 }],
  [{ t: "do", s: 2.72 }, { t: "consultório", s: 2.88 }],
  [{ t: "ou", s: 3.52 }, { t: "do", s: 3.68 }, { t: "hospital,", s: 3.92 }],
  [{ t: "chega", s: 4.74 }, { t: "em", s: 5.28 }, { t: "casa", s: 5.44 }],
  [{ t: "e", s: 5.84 }, { t: "desliga", s: 6.08 }, { t: "o", s: 6.72 }, { t: "botão.", s: 6.8 }],
  [{ t: "Isso,", s: 7.92 }],
  [{ t: "pelo", s: 9.04 }, { t: "menos", s: 9.3 }],
  [{ t: "para", s: 9.68 }, { t: "mim,", s: 9.92 }],
  [{ t: "eu", s: 10.78 }, { t: "não", s: 11.04 }, { t: "consigo", s: 11.28 }],
  [{ t: "separar.", s: 12.08 }],
  [{ t: "A", s: 12.96 }, { t: "gente", s: 13.2 }],
  [{ t: "sofre", s: 14.32 }, { t: "com", s: 14.96 }],
  [{ t: "as", s: 15.2 }, { t: "famílias,", s: 15.36, hl: true }],
  [{ t: "a", s: 16.16 }, { t: "gente", s: 16.4 }],
  [{ t: "quer", s: 17.3 }, { t: "ver", s: 17.6 }, { t: "o", s: 17.84 }, { t: "melhor", s: 18.0 }],
  [{ t: "para", s: 18.76 }, { t: "o", s: 18.9 }, { t: "paciente.", s: 19.04, hl: true }],
  [{ t: "O", s: 20.08 }, { t: "sucesso", s: 20.24 }],
  [{ t: "do", s: 20.88 }, { t: "paciente", s: 21.12 }],
  [{ t: "é", s: 22.3 }, { t: "o", s: 22.48 }, { t: "nosso", s: 22.64, hl: true }, { t: "sucesso.", s: 23.04, hl: true }],
];

export const MOTION = {
  title: { from: 0.3, to: 3.5 },
  rings: { from: 10.7, to: 13.4 }, // "eu não consigo separar" — casa and hospital, inseparable
  heart: { from: 14.95, to: 17.0 }, // "as famílias"
  together: { from: 20.1, to: 23.65 }, // "o sucesso do paciente é o nosso sucesso"
};

export const SFX: { id: string; file: string; at: number; volume: number }[] = [
  { id: "title-swipe", file: "sfx/swipe.wav", at: 0.3, volume: 0.24 },
  { id: "title-chime", file: "sfx/chime.wav", at: 0.62, volume: 0.2 },
  { id: "rings", file: "sfx/swipe.wav", at: 10.7, volume: 0.2 },
  { id: "rings-join", file: "sfx/pop.wav", at: 12.05, volume: 0.16 },
  { id: "heart", file: "sfx/chime.wav", at: 15.2, volume: 0.22 },
  { id: "together-a", file: "sfx/swipe.wav", at: 20.1, volume: 0.2 },
  { id: "together-b", file: "sfx/swipe.wav", at: 22.3, volume: 0.2 },
  { id: "together-join", file: "sfx/shimmer.wav", at: 23.05, volume: 0.28 },
];

export const f = (sec: number) => Math.round(sec * FPS);
