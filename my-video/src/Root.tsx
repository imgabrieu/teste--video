import React from "react";
import { Composition } from "remotion";
import { VideoComposition } from "./components/VideoComposition";
import { FPS } from "./config/edit";
import { CANVAS } from "./config/theme";
import { TOTAL_FRAMES } from "./lib/timeline";

export const RemotionRoot: React.FC = () => (
  <Composition id="Edit" component={VideoComposition} durationInFrames={TOTAL_FRAMES} fps={FPS} width={CANVAS.width} height={CANVAS.height} />
);
