import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { srcToOut } from "../lib/timeline";

type Props = { file: string; volume?: number; durationInFrames?: number } & ({ at: number; frame?: never } | { frame: number; at?: never });

/** Plays a short effect at a SOURCE-video time (`at`, seconds) or at an absolute edited-timeline `frame`. */
export const SoundEffect: React.FC<Props> = ({ file, at, frame, volume = 0.3, durationInFrames = 60 }) => (
  <Sequence from={frame ?? srcToOut(at as number)} durationInFrames={durationInFrames} layout="none">
    <Audio src={staticFile(file)} volume={volume} />
  </Sequence>
);
