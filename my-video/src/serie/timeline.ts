import type { SeriePart } from "./types";
import { TIMING, toFrame } from "./config";

export type Segment = { index: number; file: number; srcStart: number; srcEnd: number; outStart: number; length: number };

/** Edit decision list -> output frames. */
export const createTimeline = (part: SeriePart) => {
  const segments: Segment[] = [];
  let outStart = 0;
  part.segments.forEach(([a, b, file = 0], index) => {
    const srcStart = toFrame(a);
    const srcEnd = toFrame(b);
    segments.push({ index, file, srcStart, srcEnd, outStart, length: srcEnd - srcStart });
    outStart += srcEnd - srcStart;
  });
  const speechFrames = outStart;
  const srcToOut = (sec: number, file = 0): number => {
    const f = Math.round(sec * 30);
    let after = speechFrames; // when `f` lies beyond this file's last kept frame: end of that file's last segment
    let seen = false;
    for (const s of segments) {
      if (s.file !== file) continue;
      if (f < s.srcStart) return s.outStart;
      if (f < s.srcEnd) return s.outStart + (f - s.srcStart);
      after = s.outStart + s.length;
      seen = true;
    }
    return seen ? after : speechFrames;
  };
  return { segments, speechFrames, totalFrames: speechFrames + TIMING.outroFrames, srcToOut, lastSourceFrame: segments[segments.length - 1].srcEnd - 1, lastFile: segments[segments.length - 1].file };
};
export type Timeline = ReturnType<typeof createTimeline>;
