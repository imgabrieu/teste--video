import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { useEdit } from "../lib/EditContext";

type Props = { file: string; volume?: number; durationInFrames?: number } & ({ at: number; frame?: never } | { frame: number; at?: never });

/** Plays a short effect at a SOURCE-video time (`at`, seconds) or at an absolute edited-timeline `frame`. */
export const SoundEffect: React.FC<Props> = ({ file, at, frame, volume = 0.3, durationInFrames = 60 }) => {
  const { tl } = useEdit();
  return (
  <Sequence from={frame ?? tl.srcToOut(at as number)} durationInFrames={durationInFrames} layout="none">
    <Audio src={staticFile(file)} volume={volume} />
  </Sequence>
  );
};
