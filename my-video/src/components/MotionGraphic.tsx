import React from "react";
import { Sequence } from "remotion";
import type { MotionSpec } from "../config/edit";
import { srcToOut } from "../lib/timeline";
import { StatGraphic } from "./graphics/StatGraphic";
import { StepperGraphic } from "./graphics/StepperGraphic";
import { ThinningGraphic } from "./graphics/ThinningGraphic";
import { TitleGraphic } from "./graphics/TitleGraphic";

/** Places one motion graphic on the edited timeline from its SOURCE-time spec. */
export const MotionGraphic: React.FC<{ spec: MotionSpec }> = ({ spec }) => {
  const from = srcToOut(spec.from);
  const duration = Math.max(12, srcToOut(spec.to) - from);
  return (
    <Sequence from={from} durationInFrames={duration} layout="none">
      {spec.kind === "title" && <TitleGraphic text={spec.text} durationInFrames={duration} />}
      {spec.kind === "stat" && <StatGraphic a={spec.a} b={spec.b} suffix={spec.suffix} label={spec.label} durationInFrames={duration} />}
      {spec.kind === "thinning" && <ThinningGraphic label={spec.label} durationInFrames={duration} />}
      {spec.kind === "stepper" && (
        <StepperGraphic durationInFrames={duration} steps={spec.steps.map((s) => ({ frameAt: srcToOut(s.at) - from, label: s.label, weight: s.weight }))} />
      )}
    </Sequence>
  );
};
