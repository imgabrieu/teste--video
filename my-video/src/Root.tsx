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
import { Zana01, Z01 } from "./zana/Zana01";
import { ZanaVideo } from "./zana/ZanaVideo";
import { TOTAL_FRAMES } from "./zana/tokens";

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
    <Composition id="Zana" component={ZanaVideo} durationInFrames={TOTAL_FRAMES} fps={FPS} width={CANVAS.width} height={CANVAS.height} />
    <Composition id="Zana01" component={Zana01} durationInFrames={Math.round(Z01.totalSec * FPS)} fps={FPS} width={CANVAS.width} height={CANVAS.height} />
  </>
);
