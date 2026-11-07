/** RUACH Conference — identidade visual (cores amostradas da imagem de referência). */
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Duração da narração (s) e do vídeo (s). O nome fica em tela após o fim da voz. */
export const AUDIO_SECONDS = 41.22;
export const TOTAL_SECONDS = 44.4;

export const COLORS = {
  white: "#FFF9EE",
  yellow: "#FFD23F",
  yellowSoft: "#F3C53A",
  gold: "#C9B27C",
  navyDeep: "#0A1424",
} as const;

export const ANTON = "'Anton', 'Impact', sans-serif";
export const POPPINS = "'Poppins', 'Helvetica Neue', Arial, sans-serif";

export const FONT_FILES = [
  { family: "Anton", weight: "400", file: "ruach/fonts/anton-400.woff2" },
  { family: "Poppins", weight: "500", file: "ruach/fonts/poppins-500.woff2" },
  { family: "Poppins", weight: "600", file: "ruach/fonts/poppins-600.woff2" },
  { family: "Poppins", weight: "700", file: "ruach/fonts/poppins-700.woff2" },
] as const;
