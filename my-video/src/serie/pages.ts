import type { SerieWord, SeriePart } from "./types";
import type { Timeline } from "./timeline";

export type PageWord = { text: string; frame: number; hl: boolean };
export type CaptionPage = { from: number; to: number; words: PageWord[] };
const HOLD = 18;

export const buildPages = (part: SeriePart, words: Record<number, SerieWord>, tl: Timeline): CaptionPage[] => {
  const raw = part.pages.map(([a, b]) => {
    const out: PageWord[] = [];
    for (let i = a; i <= b; i++) {
      const w = words[i];
      if (!w || w.skip) continue;
      out.push({ text: w.t, frame: tl.srcToOut(w.s, w.f ?? 0), hl: !!w.hl });
    }
    return out;
  });
  return raw.map((ws, i) => {
    const from = Math.max(0, ws[0].frame - 1);
    const nextFrom = i + 1 < raw.length ? Math.max(0, raw[i + 1][0].frame - 1) : tl.speechFrames;
    const last = ws[ws.length - 1].frame;
    const to = Math.max(from + 12, Math.min(nextFrom, last + HOLD));
    return { from, to, words: ws };
  });
};
