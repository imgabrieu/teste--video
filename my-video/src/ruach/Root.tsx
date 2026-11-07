import React from "react";
import { Composition } from "remotion";
import { MarcosIntro } from "./marcos/MarcosIntro";
import { TOTAL_SECONDS as MARCOS_TOTAL } from "./marcos/timing";
import { RuachIntro } from "./RuachIntro";
import { FPS, HEIGHT, TOTAL_SECONDS, WIDTH } from "./theme";

export const RuachRoot: React.FC = () => (
  <>
    <Composition
      id="RuachIntro"
      component={RuachIntro}
      durationInFrames={Math.round(TOTAL_SECONDS * FPS)}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="MarcosIntro"
      component={MarcosIntro}
      durationInFrames={Math.round(MARCOS_TOTAL * FPS)}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  </>
);
