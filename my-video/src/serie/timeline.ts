import type { SeriePart } from "./types";
import { TIMING, toFrame } from "./config";

export type Segment = { index: number; srcStart: number; srcEnd: number; outStart: number; length: number };

/** Edit decision list -> output frames. */
export const createTimeline = (part: SeriePart) => {
  const segments: Segment[] = [];
  let outStart = 0;
  part.segments.forEach(([a, b], index) => {
    const srcStart = toFrame(a);
    const srcEnd = toFrame(b);
    segments.push({ index, srcStart, srcEnd, outStart, length: srcEnd - srcStart });
    outStart += srcEnd - srcStart;
  });
  const speechFrames = outStart;
  const srcToOut = (sec: number): number => {
    const f = Math.round(sec * 30);
    for (const s of segments) {
      if (f < s.srcStart) return s.outStart;
      if (f < s.srcEnd) return s.outStart + (f - s.srcStart);
    }
    return speechFrames;
  };
  return { segments, speechFrames, totalFrames: speechFrames + TIMING.outroFrames, srcToOut, lastSourceFrame: segments[segments.length - 1].srcEnd - 1 };
};
export type Timeline = ReturnType<typeof createTimeline>;
