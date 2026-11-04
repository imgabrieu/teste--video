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
  const maxWords = cfg.caption?.maxWords ?? CAPTION.maxWordsPerPage;
  const maxChars = cfg.caption?.maxChars ?? CAPTION.maxCharsPerPage;
  const minSec = cfg.caption?.minSeconds ?? 0; // 0 = classic quick paging
  const groups: { t: string; s: number; hl?: boolean }[][] = [];
  let cur: typeof groups[number] = [];
  for (const w of cfg.words) {
    // slow mode: never let a page run past maxChars (it would wrap to two lines) — start a new page before the word instead
    if (minSec > 0 && cur.length > 0 && cur.map((x) => x.t).join(" ").length + 1 + w.t.length > maxChars) {
      groups.push(cur);
      cur = [];
    }
    cur.push(w);
    const chars = cur.map((x) => x.t).join(" ").length;
    const last = w.t;
    const span = w.s - cur[0].s + 0.35; // seconds this page has been on screen if it ended here
    const slowOk = minSec === 0 || span >= minSec;
    if ((endsSentence(last) && (minSec === 0 || span >= minSec * 0.7)) || (endsClause(last) && cur.length >= 2 && slowOk)) {
      groups.push(cur);
      cur = [];
    } else if (cur.length >= maxWords || chars >= maxChars) {
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
    if (minSec > 0) {
      // slower reading: a page stays until the next one replaces it (small gaps), else lingers 0.6 s after its last word
      const linger = lastWord + Math.round(0.6 * FPS);
      const to = nextFrom - from <= Math.round(0.8 * FPS) ? nextFrom : Math.min(nextFrom, linger);
      return { from, to: Math.max(to, from + Math.round(minSec * FPS * 0.8)), words };
    }
    const natural = lastWord + Math.max(hold, 12);
    // stay until the next page begins when the gap is small; otherwise linger `hold` frames then fade
    const to = Math.min(Math.max(natural, from + 10), nextFrom > natural ? natural : nextFrom);
    return { from, to: Math.max(to, from + 8), words };
  });
};
