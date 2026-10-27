import React, { useEffect, useState } from "react";
import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useDelayRender } from "remotion";
import { Captions } from "./Captions";
import { PAGES_01 } from "./data01";
import { Outro } from "./Outro";
import { f } from "./tokens";

export const Z01 = { veilFrom: 32.2, logoIn: 32.8, videoSec: 33.93, totalSec: 35.4 } as const;

const loadFonts = async () => {
  await Promise.all(
    [500, 600, 700].map((w) => {
      const face = new FontFace("Poppins", `url(${staticFile(`fonts/poppins-latin-${w}-normal.woff2`)}) format("woff2")`, { weight: String(w) });
      document.fonts.add(face);
      return face.load();
    }),
  );
};

/** Captions only (white Poppins Bold over a soft foot-scrim) + the black Zana logo as the last element. */
export const Zana01: React.FC = () => {
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading Poppins"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle, continueRender]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      <OffthreadVideo
        src={staticFile("video/zana_01.mov")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        volume={(fr) => interpolate(fr, [f(Z01.veilFrom), f(Z01.logoIn)], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      <Captions pages={PAGES_01} plain />
      <Outro veilFrom={Z01.veilFrom} logoIn={Z01.logoIn} />
    </AbsoluteFill>
  );
};
