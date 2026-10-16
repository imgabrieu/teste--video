import { PAGES, WORDS } from "./words";
import { TL } from "./timeline";

export type PageWord = { text: string; frame: number; hl: boolean };
export type CaptionPage = { from: number; to: number; words: PageWord[] };

const HOLD = 20; // frames a page lingers after its last word when nothing follows immediately

export const buildPages = (): CaptionPage[] => {
  const raw = PAGES.map(([a, b]) => WORDS.slice(a, b + 1).map((w) => ({ text: w.t, frame: TL.srcToOut(w.s), hl: !!w.hl })));
  return raw.map((words, i) => {
    const from = Math.max(0, words[0].frame - 1);
    const nextFrom = i + 1 < raw.length ? Math.max(0, raw[i + 1][0].frame - 1) : TL.speechFrames;
    const lastWord = words[words.length - 1].frame;
    const to = Math.max(from + 12, Math.min(nextFrom, lastWord + HOLD));
    return { from, to, words };
  });
};

export const PAGE_LIST = buildPages();
