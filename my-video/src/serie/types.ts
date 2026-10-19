export type SerieWord = { t: string; s: number; hl?: boolean; skip?: boolean };
export type SeriePart = {
  id: string;
  videoFile: string;
  /** kept spans of the source video, seconds [from, to] */
  segments: [number, number][];
  /** inclusive word-index ranges (keys of the words table) forming one caption page */
  pages: [number, number][];
};
