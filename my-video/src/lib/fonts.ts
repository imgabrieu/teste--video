import { staticFile } from "remotion";
import { FONTS } from "../config/theme";

/** Loads the bundled Poppins files (no network needed). Resolves once all weights are ready. */
export const loadFonts = async (): Promise<void> => {
  const faces = FONTS.files.map(({ weight, file }) => {
    const face = new FontFace("Poppins", `url(${staticFile(file)}) format("woff2")`, { weight: String(weight) });
    document.fonts.add(face);
    return face.load();
  });
  await Promise.all(faces);
};
