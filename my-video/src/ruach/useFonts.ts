import { useEffect, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";
import { FONT_FILES } from "./theme";

/** Carrega Anton + Poppins (500/600/700) empacotadas em /public — sem rede. */
export const useFonts = () => {
  const [handle] = useState(() => delayRender("ruach-fonts"));
  useEffect(() => {
    Promise.all(
      FONT_FILES.map(({ family, weight, file }) => {
        const face = new FontFace(family, `url(${staticFile(file)}) format("woff2")`, { weight });
        document.fonts.add(face);
        return face.load();
      }),
    )
      .then(() => continueRender(handle))
      .catch((e) => {
        console.error(e);
        continueRender(handle);
      });
  }, [handle]);
};
