import React from "react";
import { AbsoluteFill, Freeze, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { ZOOM } from "../config/theme";
import { useEdit } from "../lib/EditContext";

const FADE = 2; // frames of audio micro-fade at every cut (cuts sit in silences) to avoid clicks
const fill: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };

const patternFor = (index: number) => ZOOM.patterns[index % ZOOM.patterns.length];

const SegmentClip: React.FC<{ src: string; index: number; trimBefore: number; trimAfter: number; length: number }> = ({ src, index, trimBefore, trimAfter, length }) => {
  const frame = useCurrentFrame();
  const [a, b] = patternFor(index);
  const scale = interpolate(frame, [0, Math.max(1, length - 1)], [a, b], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: ZOOM.origin }}>
      <OffthreadVideo
        src={src}
        trimBefore={trimBefore}
        trimAfter={trimAfter}
        style={fill}
        volume={(f) => Math.max(0, Math.min(1, f / FADE, (length - 1 - f) / FADE))}
      />
    </AbsoluteFill>
  );
};

/** The original footage cut into segments, each with a slow, subtle punch-in that alternates per cut (this also masks the jump cuts). */
export const SpeechVideo: React.FC = () => {
  const { cfg, tl } = useEdit();
  const { segments: SEGMENTS, speechFrames: SPEECH_FRAMES, outroFrames: OUTRO_FRAMES, lastSourceFrame: LAST_SOURCE_FRAME } = tl;
  const src = staticFile(cfg.videoFile);
  const last = SEGMENTS[SEGMENTS.length - 1];
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {SEGMENTS.map((s) => (
        <Sequence key={s.index} from={s.outStart} durationInFrames={s.length} premountFor={30}>
          <SegmentClip src={src} index={s.index} trimBefore={s.srcStart} trimAfter={s.srcEnd} length={s.length} />
        </Sequence>
      ))}
      {/* final frame held under the logo outro */}
      <Sequence from={SPEECH_FRAMES} durationInFrames={OUTRO_FRAMES}>
        <AbsoluteFill style={{ transform: `scale(${patternFor(last.index)[1]})`, transformOrigin: ZOOM.origin }}>
          <Freeze frame={0}>
            <OffthreadVideo src={src} trimBefore={LAST_SOURCE_FRAME} muted style={fill} />
          </Freeze>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
