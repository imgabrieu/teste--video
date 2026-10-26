import { interpolate } from "remotion";
import { ZOOM } from "../config/theme";

/** Scale of segment `index` at local frame `frame` — shared by the footage and any layer that must follow its zoom exactly. */
export const segmentScale = (index: number, frame: number, length: number, patterns: [number, number][] = ZOOM.patterns) => {
  const [a, b] = patterns[index % patterns.length];
  return interpolate(frame, [0, Math.max(1, length - 1)], [a, b], { extrapolateRight: "clamp" });
};
