// Caption pages. Times = seconds of the narration (Parakeet-TDT v3 + Whisper-small cross-check,
// first word after each pause snapped to the audio onset by energy; first sentence corrected by ear-of-energy).
// size: "key" = big Bold keyword · "base" = SemiBold · "small" = Medium, light grey (articles / connectors)
export type Size = "key" | "base" | "small";
export type W = { t: string; s: number; z?: Size };
export type Line = { words: W[]; chip?: boolean };
export type Page = { lines: Line[] };

const w = (t: string, s: number, z: Size = "base"): W => ({ t, s, z });

export const PAGES: Page[] = [
  { lines: [{ words: [w("Uma", 0.1, "small"), w("boa", 0.4)] }, { words: [w("escolha", 0.8, "key")] }] },
  { lines: [{ words: [w("começa", 1.35), w("no", 1.88, "small")] }, { words: [w("olhar,", 2.12, "key")] }] },
  { lines: [{ words: [w("em", 3.08, "small"), w("perceber", 3.36)] }] },
  { lines: [{ words: [w("aquilo", 4.0), w("que", 4.4, "small"), w("vai", 4.56, "small")] }, { words: [w("além", 4.8, "key")] }] },
  { lines: [{ words: [w("da", 5.2, "small"), w("estética.", 5.44, "key")] }] },

  { lines: [{ words: [w("A", 6.52, "small"), w("localização,", 6.72, "key")] }] },
  { lines: [{ words: [w("a", 7.92, "small"), w("arquitetura,", 8.08, "key")] }] },
  { lines: [{ words: [w("a", 9.12, "small"), w("luz,", 9.36, "key")] }] },
  { lines: [{ words: [w("a", 10.0, "small"), w("distribuição", 10.16, "key")] }] },
  { lines: [{ words: [w("dos", 10.88, "small"), w("ambientes", 11.12, "key")] }] },
  { lines: [{ words: [w("e", 12.0, "small"), w("o", 12.24, "small")] }, { words: [w("potencial", 12.48, "key")] }] },
  { lines: [{ words: [w("de", 13.12, "small"), w("cada", 13.28)] }, { words: [w("imóvel.", 13.6, "key")] }] },

  { lines: [{ words: [w("Na", 14.85, "small")] }, { words: [w("Zana", 15.05, "key"), w("Homes", 15.4, "key")], chip: true }] },
  { lines: [{ words: [w("cada", 16.2), w("detalhe", 16.4, "key")] }] },
  { lines: [{ words: [w("faz", 16.96), w("parte", 17.28), w("de", 17.52, "small"), w("uma", 17.68, "small")] }] },
  { lines: [{ words: [w("análise", 17.84)] }, { words: [w("completa,", 18.48, "key")] }] },

  { lines: [{ words: [w("porque", 19.55, "small"), w("escolher", 19.84)] }] },
  { lines: [{ words: [w("um", 20.32, "small"), w("imóvel", 20.48, "key")] }] },
  { lines: [{ words: [w("também", 21.2), w("é", 21.52, "small")] }] },
  { lines: [{ words: [w("escolher", 21.84, "key")] }] },
  { lines: [{ words: [w("como", 22.64, "small"), w("você", 22.96), w("quer", 23.28)] }, { words: [w("viver", 23.6, "key")] }] },
  { lines: [{ words: [w("e", 24.35, "small"), w("onde", 24.48), w("quer", 24.88)] }] },
  { lines: [{ words: [w("construir", 25.2)] }, { words: [w("patrimônio.", 25.68, "key")] }] },

  { lines: [{ words: [w("Zana", 26.62, "key"), w("Homes", 27.04, "key")], chip: true }] },
  { lines: [{ words: [w("Imóveis", 27.92), w("pensados", 28.64)] }] },
  { lines: [{ words: [w("para", 29.28, "small"), w("viver", 29.52, "key")] }] },
  { lines: [{ words: [w("e", 30.0, "small"), w("investir", 30.24, "key")] }] },
  { lines: [{ words: [w("melhor.", 30.8, "key")] }] },
];
