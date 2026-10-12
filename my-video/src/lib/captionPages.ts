import { CAPTION } from "../config/theme";
import { FPS, EditConfig } from "../edits/types";
import type { Timeline } from "./timeline";

export type PageWord = { text: string; frame: number; hl: boolean };
export type CaptionPage = { from: number; to: number; words: PageWord[] };

const endsSentence = (t: string) => /[.?!]$/.test(t);
const endsClause = (t: string) => /[,;:]$/.test(t);
const isShort = (t: string) => t.replace(/[^\p{L}\p{N}%]/gu, "").length <= 2;

/** Groups words into short, readable pages (2-3 words), breaking on punctuation. */
export const buildPages = (cfg: EditConfig, tl: Timeline): CaptionPage[] => {
  const { srcToOut, speechFrames: SPEECH_FRAMES } = tl;
  const groups: { t: string; s: number; hl?: boolean }[][] = [];
  let cur: typeof groups[number] = [];
  for (const w of cfg.words) {
    cur.push(w);
    const chars = cur.map((x) => x.t).join(" ").length;
    const last = w.t;
    if (endsSentence(last) || (endsClause(last) && cur.length >= 2)) {
      groups.push(cur);
      cur = [];
    } else if (cur.length >= CAPTION.maxWordsPerPage || chars >= CAPTION.maxCharsPerPage) {
      // never end a page on a dangling article/preposition: carry it over to the next page
      const carry = isShort(last) && cur.length > 1 ? cur.pop() : undefined;
      groups.push(cur);
      cur = carry ? [carry] : [];
    }
  }
  if (cur.length) groups.push(cur);

  const hold = Math.round(CAPTION.holdSeconds * FPS);
  return groups.map((g, i) => {
    const words = g.map((w) => ({ text: w.t, frame: srcToOut(w.s), hl: !!w.hl }));
    const from = words[0].frame;
    const nextFrom = i + 1 < groups.length ? srcToOut(groups[i + 1][0].s) : SPEECH_FRAMES;
    const lastWord = words[words.length - 1].frame;
    const natural = lastWord + Math.max(hold, 12);
    // stay until the next page begins when the gap is small; otherwise linger `hold` frames then fade
    const to = Math.min(Math.max(natural, from + 10), nextFrom > natural ? natural : nextFrom);
    return { from, to: Math.max(to, from + 8), words };
  });
};
