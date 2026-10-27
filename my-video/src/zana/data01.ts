// "zana_01" captions. Text: Whisper-small; times: Parakeet-TDT v3, first word after each pause snapped to the audio onset (energy).
import type { Page } from "./data";

const P = (words: string[], times: number[]): Page => ({
  lines: [{ words: words.map((t, i) => ({ t, s: times[i], z: "base" as const })) }],
});

export const PAGES_01: Page[] = [
  P(["Uma", "casa", "pode"], [0.0, 0.32, 0.64]),
  P(["impressionar"], [0.96]),
  P(["em", "segundos,"], [1.68, 1.84]),
  P(["mas", "uma", "grande"], [2.97, 3.12, 3.3]),
  P(["escolha", "é", "aquela"], [3.55, 3.95, 4.1]),
  P(["que", "continua"], [4.48, 4.64]),
  P(["fazendo", "sentido"], [5.12, 5.6]),
  P(["ao", "longo", "dos", "anos."], [6.3, 6.45, 6.65, 6.8]),
  P(["Na", "Zana", "Homes,"], [7.25, 7.4, 7.7]),
  P(["nós", "observamos"], [8.1, 8.3]),
  P(["muito", "além"], [8.9, 9.12]),
  P(["da", "estética."], [9.44, 9.68]),
  P(["Nós", "analisamos"], [10.32, 10.64]),
  P(["localização,"], [11.7]),
  P(["arquitetura,"], [12.8]),
  P(["funcionalidade,"], [14.05]),
  P(["potencial"], [15.45]),
  P(["e", "tudo", "aquilo"], [16.6, 16.75, 16.95]),
  P(["que", "transforma"], [17.2, 17.36]),
  P(["um", "imóvel"], [18.0, 18.16]),
  P(["em", "uma", "escolha"], [18.95, 19.15, 19.45]),
  P(["de", "valor."], [19.92, 20.08]),
  P(["Porque,", "para", "nós,"], [20.7, 21.1, 21.3]),
  P(["uma", "casa"], [21.76, 22.08]),
  P(["não", "representa"], [22.8, 23.0]),
  P(["apenas", "onde"], [23.7, 24.16]),
  P(["você", "vive,"], [24.4, 24.64]),
  P(["ela", "representa"], [25.04, 25.28]),
  P(["patrimônio,"], [25.84]),
  P(["experiência"], [26.72]),
  P(["e", "futuro."], [27.36, 27.68]),
  P(["Zana", "Homes."], [28.55, 28.96]),
  P(["Escolhas", "que"], [29.68, 30.24]),
  P(["vão", "além"], [30.32, 30.56]),
  P(["da", "chave."], [30.88, 31.12]),
];
