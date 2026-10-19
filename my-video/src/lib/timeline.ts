import { LOGO } from "../config/theme";
import { EditConfig, FPS } from "../edits/types";

export type Segment = { index: number; srcStart: number; srcEnd: number; outStart: number; length: number };

const toFrame = (s: number) => Math.round(s * FPS);

/** Maps the original footage to the edited timeline (pauses tightened, everything else kept). */
export const createTimeline = (cfg: EditConfig) => {
  const cuts = cfg.pauseTrims.map((p) => ({ a: toFrame(p.from + p.keep / 2), b: toFrame(p.to - p.keep / 2) })).sort((x, y) => x.a - y.a);
  const segments: Segment[] = [];
  let cursor = toFrame(cfg.sourceIn);
  let outStart = 0;
  for (const c of cuts) {
    segments.push({ index: segments.length, srcStart: cursor, srcEnd: c.a, outStart, length: c.a - cursor });
    outStart += c.a - cursor;
    cursor = c.b;
  }
  const end = toFrame(cfg.sourceOut);
  segments.push({ index: segments.length, srcStart: cursor, srcEnd: end, outStart, length: end - cursor });

  const last = segments[segments.length - 1];
  const speechFrames = last.outStart + last.length;
  const outroFrames = cfg.outro?.type === "none" ? 0 : Math.round(((cfg.outro && "seconds" in cfg.outro ? cfg.outro.seconds : undefined) ?? LOGO.outroSeconds) * FPS);

  /** Source seconds -> output frame. Times inside a removed gap snap to the next kept frame. */
  const srcToOut = (sec: number): number => {
    const f = Math.round(sec * FPS);
    for (const s of segments) {
      if (f < s.srcStart) return s.outStart;
      if (f < s.srcEnd) return s.outStart + (f - s.srcStart);
    }
    return speechFrames;
  };

  return { segments, speechFrames, outroFrames, totalFrames: speechFrames + outroFrames, lastSourceFrame: last.srcEnd - 1, srcToOut };
};

export type Timeline = ReturnType<typeof createTimeline>;
