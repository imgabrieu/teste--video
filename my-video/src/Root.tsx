import React from "react";
import { Composition } from "remotion";
import { VideoComposition } from "./components/VideoComposition";
import { CANVAS } from "./config/theme";
import { EDIT1 } from "./edits/edit1";
import { EDIT2 } from "./edits/edit2";
import { EDIT3 } from "./edits/edit3";
import { EDIT4 } from "./edits/edit4";
import { FPS } from "./edits/types";
import { createTimeline } from "./lib/timeline";
import { Passoni } from "./passoni/Passoni";
import { TL as PASSONI_TL } from "./passoni/timeline";
import { Passoni2 } from "./passoni2/Passoni";
import { TL as PASSONI2_TL } from "./passoni2/timeline";
import { Serie } from "./serie/Serie";
import { SERIE1, SERIE1_FRAMES, SERIE2, SERIE2_FRAMES, SERIE3, SERIE3_FRAMES, SERIE4, SERIE4_FRAMES } from "./serie/parts";

const EDITS = [EDIT1, EDIT2, EDIT3, EDIT4];

export const RemotionRoot: React.FC = () => (
  <>
    {EDITS.map((edit) => (
      <Composition
        key={edit.id}
        id={edit.id}
        component={VideoComposition}
        defaultProps={{ edit }}
        durationInFrames={createTimeline(edit).totalFrames}
        fps={FPS}
        width={CANVAS.width}
        height={CANVAS.height}
      />
    ))}
    <Composition id="Passoni" component={Passoni} durationInFrames={PASSONI_TL.totalFrames} fps={FPS} width={CANVAS.width} height={CANVAS.height} />
    <Composition id="Passoni2" component={Passoni2} durationInFrames={PASSONI2_TL.totalFrames} fps={FPS} width={CANVAS.width} height={CANVAS.height} />
    <Composition id="Serie1" component={Serie} defaultProps={SERIE1} durationInFrames={SERIE1_FRAMES} fps={FPS} width={CANVAS.width} height={CANVAS.height} />
    <Composition id="Serie2" component={Serie} defaultProps={SERIE2} durationInFrames={SERIE2_FRAMES} fps={FPS} width={CANVAS.width} height={CANVAS.height} />
    <Composition id="Serie3" component={Serie} defaultProps={SERIE3} durationInFrames={SERIE3_FRAMES} fps={FPS} width={CANVAS.width} height={CANVAS.height} />
    <Composition id="Serie4" component={Serie} defaultProps={SERIE4} durationInFrames={SERIE4_FRAMES} fps={FPS} width={CANVAS.width} height={CANVAS.height} />
  </>
);
