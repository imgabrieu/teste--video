import React from "react";
import { Composition } from "remotion";
import { VideoComposition } from "./components/VideoComposition";
import { CANVAS } from "./config/theme";
import { EDIT1 } from "./edits/edit1";
import { EDIT2 } from "./edits/edit2";
import { FPS } from "./edits/types";
import { createTimeline } from "./lib/timeline";
import { Brum, BRUM_TOTAL } from "./brum/Brum";
import { Brum2, BRUM2_TOTAL } from "./brum2/Brum2";

const EDITS = [EDIT1, EDIT2];

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
    <Composition id="Brum" component={Brum} durationInFrames={BRUM_TOTAL} fps={FPS} width={CANVAS.width} height={CANVAS.height} />
    <Composition id="BrumLocucao" component={Brum2} durationInFrames={BRUM2_TOTAL} fps={FPS} width={CANVAS.width} height={CANVAS.height} />
  </>
);
