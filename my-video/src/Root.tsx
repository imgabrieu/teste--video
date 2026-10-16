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
  </>
);
