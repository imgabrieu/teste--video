import React from "react";
import { Sequence } from "remotion";
import type { MotionSpec } from "../edits/types";
import { useEdit } from "../lib/EditContext";
import { BubbleGraphic } from "./graphics/BubbleGraphic";
import { BehindGraphic } from "./graphics/BehindGraphic";
import { DevicesGraphic } from "./graphics/DevicesGraphic";
import { FibersGraphic } from "./graphics/FibersGraphic";
import { MatrixGraphic } from "./graphics/MatrixGraphic";
import { ReduceGraphic } from "./graphics/ReduceGraphic";
import { CleanKeyword, CleanList } from "./graphics/CleanCard";
import { ChipsGraphic } from "./graphics/ChipsGraphic";
import { GrowthGraphic } from "./graphics/GrowthGraphic";
import { KeywordGraphic } from "./graphics/KeywordGraphic";
import { SpreadGraphic } from "./graphics/SpreadGraphic";
import { TangleGraphic } from "./graphics/TangleGraphic";
import { VerdictGraphic } from "./graphics/VerdictGraphic";
import { StatGraphic } from "./graphics/StatGraphic";
import { StepperGraphic } from "./graphics/StepperGraphic";
import { ThinningGraphic } from "./graphics/ThinningGraphic";
import { TitleGraphic } from "./graphics/TitleGraphic";

/** Places one motion graphic on the edited timeline from its SOURCE-time spec. */
export const MotionGraphic: React.FC<{ spec: MotionSpec }> = ({ spec }) => {
  const { srcToOut } = useEdit().tl;
  const from = srcToOut(spec.from);
  const duration = Math.max(12, srcToOut(spec.to) - from);
  return (
    <Sequence from={from} durationInFrames={duration} layout="none">
      {spec.kind === "title" && <TitleGraphic text={spec.text} logo={spec.logo} durationInFrames={duration} />}
      {spec.kind === "stat" && <StatGraphic a={spec.a} b={spec.b} suffix={spec.suffix} label={spec.label} durationInFrames={duration} />}
      {spec.kind === "thinning" && <ThinningGraphic label={spec.label} durationInFrames={duration} />}
      {spec.kind === "growth" && <GrowthGraphic label={spec.label} durationInFrames={duration} />}
      {spec.kind === "spread" && <SpreadGraphic label={spec.label} durationInFrames={duration} />}
      {spec.kind === "keyword" && <KeywordGraphic kicker={spec.kicker} text={spec.text} durationInFrames={duration} />}
      {spec.kind === "tangle" && <TangleGraphic label={spec.label} durationInFrames={duration} />}
      {spec.kind === "bubble" && <BubbleGraphic who={spec.who} text={spec.text} durationInFrames={duration} />}
      {spec.kind === "verdict" && (
        <VerdictGraphic durationInFrames={duration} rows={spec.rows.map((r) => ({ frameAt: srcToOut(r.at) - from, ok: r.ok, text: r.text }))} />
      )}
      {spec.kind === "chips" && (
        <ChipsGraphic label={spec.label} compact={spec.compact} durationInFrames={duration} items={spec.items.map((i) => ({ frameAt: srcToOut(i.at) - from, text: i.text }))} />
      )}
      {spec.kind === "behind" && <BehindGraphic word={spec.word} person={spec.person} startOut={from} durationInFrames={duration} />}
      {spec.kind === "fibers" && <FibersGraphic label={spec.label} calmFrame={srcToOut(spec.calmAt) - from} durationInFrames={duration} />}
      {spec.kind === "devices" && (
        <DevicesGraphic label={spec.label} durationInFrames={duration} items={spec.items.map((i) => ({ frameAt: srcToOut(i.at) - from, text: i.text, icon: i.icon }))} />
      )}
      {spec.kind === "reduce" && (
        <ReduceGraphic durationInFrames={duration} items={spec.items.map((i) => ({ frameAt: srcToOut(i.at) - from, text: i.text, to: i.to }))} />
      )}
      {spec.kind === "matrix" && (
        <MatrixGraphic
          cols={spec.cols}
          durationInFrames={duration}
          rows={spec.rows.map((r) => ({ label: r.label, cells: r.cells.map((c) => (c ? { frameAt: srcToOut(c.at) - from, ok: c.ok } : null)) }))}
        />
      )}
      {spec.kind === "cleanKeyword" && <CleanKeyword kicker={spec.kicker} text={spec.text} durationInFrames={duration} />}
      {spec.kind === "cleanList" && (
        <CleanList label={spec.label} durationInFrames={duration} items={spec.items.map((i) => ({ frameAt: srcToOut(i.at) - from, text: i.text }))} />
      )}
      {spec.kind === "stepper" && (
        <StepperGraphic durationInFrames={duration} steps={spec.steps.map((s) => ({ frameAt: srcToOut(s.at) - from, label: s.label, weight: s.weight }))} />
      )}
    </Sequence>
  );
};
