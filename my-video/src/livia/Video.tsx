import React from "react";
import { AbsoluteFill, Freeze, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { f, FPS, OUTRO_SECONDS, SOURCE_FILE, SOURCE_SECONDS } from "./config";
import { SCENE_CUTS, ZOOMS } from "./theme";

const fill: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };
const END = f(SOURCE_SECONDS);

/** Slow push-in per scene (100→104 %, 102→105 %…). The scale restarts on every picture cut, so the reset is never seen. */
const zoomAt = (frame: number): number => {
  const cuts = SCENE_CUTS.map(f);
  let i = cuts.length - 1;
  while (i > 0 && frame < cuts[i]) i--;
  const from = cuts[i];
  const to = i + 1 < cuts.length ? cuts[i + 1] : END;
  const [a, b] = ZOOMS[i];
  const t = interpolate(frame, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eased = t * t * (3 - 2 * t) * 0.35 + t * 0.65; // nearly linear, softened at the ends
  return a + (b - a) * eased;
};

export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  const src = staticFile(SOURCE_FILE);
  const outro = Math.round(OUTRO_SECONDS * FPS);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence from={0} durationInFrames={END}>
        <AbsoluteFill style={{ transform: `scale(${zoomAt(frame)})`, transformOrigin: "50% 38%" }}>
          <OffthreadVideo src={src} style={fill} />
        </AbsoluteFill>
      </Sequence>
      {/* last frame held (a warm smile) under the closing card */}
      <Sequence from={END} durationInFrames={outro}>
        <AbsoluteFill style={{ transform: `scale(${zoomAt(END - 1)})`, transformOrigin: "50% 38%" }}>
          <Freeze frame={0}>
            <OffthreadVideo src={src} trimBefore={END - 1} muted style={fill} />
          </Freeze>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
