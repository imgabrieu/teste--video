import React from "react";
import { Composition } from "remotion";
import { RuachIntro } from "./RuachIntro";
import { FPS, HEIGHT, TOTAL_SECONDS, WIDTH } from "./theme";

export const RuachRoot: React.FC = () => (
  <Composition
    id="RuachIntro"
    component={RuachIntro}
    durationInFrames={Math.round(TOTAL_SECONDS * FPS)}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
