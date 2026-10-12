import { FPS, PAUSE_TRIMS, SOURCE_IN, SOURCE_OUT } from "../config/edit";
import { LOGO } from "../config/theme";

export type Segment = { index: number; srcStart: number; srcEnd: number; outStart: number; length: number };

const toFrame = (s: number) => Math.round(s * FPS);

const cuts = PAUSE_TRIMS.map((p) => ({ a: toFrame(p.from + p.keep / 2), b: toFrame(p.to - p.keep / 2) })).sort(
  (x, y) => x.a - y.a,
);

const build = (): Segment[] => {
  const out: Segment[] = [];
  let cursor = toFrame(SOURCE_IN);
  let outStart = 0;
  for (const c of cuts) {
    out.push({ index: out.length, srcStart: cursor, srcEnd: c.a, outStart, length: c.a - cursor });
    outStart += c.a - cursor;
    cursor = c.b;
  }
  const end = toFrame(SOURCE_OUT);
  out.push({ index: out.length, srcStart: cursor, srcEnd: end, outStart, length: end - cursor });
  return out;
};

export const SEGMENTS = build();
export const SPEECH_FRAMES = SEGMENTS[SEGMENTS.length - 1].outStart + SEGMENTS[SEGMENTS.length - 1].length;
export const OUTRO_FRAMES = Math.round(LOGO.outroSeconds * FPS);
export const TOTAL_FRAMES = SPEECH_FRAMES + OUTRO_FRAMES;
export const LAST_SOURCE_FRAME = SEGMENTS[SEGMENTS.length - 1].srcEnd - 1;

/** Source seconds -> output frame. Times inside a removed gap snap to the next kept frame. */
export const srcToOut = (sec: number): number => {
  const f = Math.round(sec * FPS);
  for (let i = 0; i < SEGMENTS.length; i++) {
    const s = SEGMENTS[i];
    if (f < s.srcStart) return s.outStart; // before this segment (inside a cut)
    if (f < s.srcEnd) return s.outStart + (f - s.srcStart);
  }
  return SPEECH_FRAMES;
};
