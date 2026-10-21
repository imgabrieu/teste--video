// "Locução" edit: voice-over (public/audio/locucao_brum.wav, 15.7 s) + selected shots from the raw event footage.
// Every time is in seconds. `src` = position in the raw clip (public/video/brum_evento_raw.mov), `at` = position on the final timeline.
export const RAW = "video/brum_evento_raw.mov";
export const VOICE = "audio/locucao_brum.wav";

export type Shot = {
  id: string;
  src: number;
  at: number;
  dur: number;
  /** subtle push-in [from, to] */
  zoom: [number, number];
  /** crossfade-in length in seconds (0 = straight cut) */
  fade?: number;
  /** vertical focal point for the cover-fit crop (%) */
  note: string;
};

// Narration (Parakeet-TDT v3): "Essa semana foi a vez de Presidente Prudente(1.84)  | A Brum(3.28) esteve no evento da Eletrosul(4.56) |
// um dia inteiro(5.44) pra apresentar as novidades(6.16) e mostrar os produtos de perto(7.44) pra quem está no campo todo dia(8.80) |
// Conversa(10.72) dúvida tirada(11.44) e produto na mão(12.80) | Brum sempre presente(13.92)"
export const SHOTS: Shot[] = [
  { id: "hall", src: 19.0, at: 0, dur: 3.1, zoom: [1.0, 1.05], note: "Pavilhão amplo, estandes — 'Presidente Prudente'" },
  { id: "tent", src: 0.3, at: 3.1, dur: 1.4, zoom: [1.0, 1.04], note: "Tenda BRUM com painel — 'A Brum esteve'" },
  { id: "banner", src: 12.5, at: 4.5, dur: 1.3, zoom: [1.0, 1.03], note: "Painel '3ª Feira Eletrosul' — 'evento da Eletrosul'" },
  { id: "day", src: 105.0, at: 5.8, dur: 1.6, zoom: [1.0, 1.05], note: "Tenda + atendimento ao fundo — 'um dia inteiro'" },
  { id: "close", src: 48.2, at: 7.4, dur: 1.4, zoom: [1.0, 1.05], note: "Barramentos de cobre de perto — 'produtos de perto'" },
  { id: "field", src: 6.2, at: 8.8, dur: 1.8, zoom: [1.0, 1.04], note: "Atendimento no estande — 'quem está no campo'" },
  { id: "talk", src: 96.3, at: 10.6, dur: 1.9, zoom: [1.0, 1.04], note: "Conversa na mesa — 'conversa, dúvida tirada'" },
  { id: "hands", src: 99.3, at: 12.5, dur: 1.45, zoom: [1.0, 1.04], note: "Produtos nas mãos — 'produto na mão'" },
  { id: "brum", src: 167.2, at: 13.95, dur: 2.9, zoom: [1.0, 1.05], fade: 0.25, note: "Tenda BRUM — 'Brum sempre presente'" },
];

export const OUTRO = { at: 15.6, length: 2.4 };

export const MOTION = {
  place: { from: 1.75, to: 3.35 }, // "Presidente Prudente"
  day: { from: 5.5, to: 7.3 }, // "um dia inteiro"
  always: { from: 14.0, to: 15.6 }, // "Brum sempre presente"
};

export const SFX = [
  { file: "sfx/whoosh.wav", at: 1.55, volume: 0.045 },
  { file: "sfx/click.wav", at: 5.5, volume: 0.04 },
  { file: "sfx/pop.wav", at: 14.0, volume: 0.04 },
  { file: "sfx/whoosh.wav", at: OUTRO.at + 0.05, volume: 0.04 },
];
