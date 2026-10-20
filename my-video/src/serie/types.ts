/** `f` = index of the source file in `videoFiles` (default 0) */
export type SerieWord = { t: string; s: number; f?: number; hl?: boolean; skip?: boolean };
export type SeriePart = {
  id: string;
  videoFiles: string[];
  /** kept spans of the source videos: [from, to, fileIndex?] in seconds */
  segments: [number, number, number?][];
  /** inclusive word-index ranges (keys of the words table) forming one caption page */
  pages: [number, number][];
};
