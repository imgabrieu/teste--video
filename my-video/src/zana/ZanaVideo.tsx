import React, { useEffect, useState } from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useDelayRender } from "remotion";
import { Captions } from "./Captions";
import { BrandMoment, CompleteRing, Counter, GrowthBars, Viewfinder } from "./Motions";
import { Outro } from "./Outro";
import { f, SPEECH_END } from "./tokens";

const loadFonts = async () => {
  const faces = [500, 600, 700].map((w) => {
    const face = new FontFace("Poppins", `url(${staticFile(`fonts/poppins-latin-${w}-normal.woff2`)}) format("woff2")`, { weight: String(w) });
    document.fonts.add(face);
    return face.load();
  });
  await Promise.all(faces);
};

export const ZanaVideo: React.FC = () => {
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading Poppins"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle, continueRender]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      <Sequence from={0} durationInFrames={f(SPEECH_END) + 1}>
        <OffthreadVideo src={staticFile("video/zana.mov")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Sequence>
      <BrandMoment />
      <Viewfinder />
      <Counter />
      <CompleteRing />
      <GrowthBars />
      <Captions />
      <Outro />
    </AbsoluteFill>
  );
};
