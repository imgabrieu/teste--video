import React from "react";
import { Composition } from "remotion";
import { VideoComposition } from "./components/VideoComposition";
import { CANVAS } from "./config/theme";
import { EDIT1 } from "./edits/edit1";
import { EDIT2 } from "./edits/edit2";
import { FPS } from "./edits/types";
import { createTimeline } from "./lib/timeline";

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
  </>
);
