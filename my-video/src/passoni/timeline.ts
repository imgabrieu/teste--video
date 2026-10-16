import { SRC, TIMING, toFrame } from "./config";

export type Segment = { index: number; srcStart: number; srcEnd: number; outStart: number; length: number };

/** Maps the original footage to the edited timeline (pauses tightened, everything else kept). */
export const createTimeline = () => {
  const cuts = SRC.trims.map((p) => ({ a: toFrame(p.from + p.keep / 2), b: toFrame(p.to - p.keep / 2) })).sort((x, y) => x.a - y.a);
  const segments: Segment[] = [];
  let cursor = toFrame(SRC.sourceIn);
  let outStart = 0;
  for (const c of cuts) {
    segments.push({ index: segments.length, srcStart: cursor, srcEnd: c.a, outStart, length: c.a - cursor });
    outStart += c.a - cursor;
    cursor = c.b;
  }
  const end = toFrame(SRC.sourceOut);
  segments.push({ index: segments.length, srcStart: cursor, srcEnd: end, outStart, length: end - cursor });
  const last = segments[segments.length - 1];
  const speechFrames = last.outStart + last.length;

  /** Source seconds -> output frame (times inside a removed gap snap to the next kept frame). */
  const srcToOut = (sec: number): number => {
    const f = Math.round(sec * 30);
    for (const s of segments) {
      if (f < s.srcStart) return s.outStart;
      if (f < s.srcEnd) return s.outStart + (f - s.srcStart);
    }
    return speechFrames;
  };

  return { segments, speechFrames, totalFrames: speechFrames + TIMING.outroFrames, lastSourceFrame: last.srcEnd - 1, srcToOut, openerEnd: srcToOut(TIMING.openerEndSrc) };
};

export type Timeline = ReturnType<typeof createTimeline>;
export const TL = createTimeline();
