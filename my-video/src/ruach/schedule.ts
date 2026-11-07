import { resolveRow, type RRow } from "./kinetic";
import { BEATS, type Beat } from "./timing";

export type RBeat = {
  beat: Beat;
  rows: RRow[];
  /** primeiro instante de fala/animação */
  firstTime: number;
  /** quando começa a sair de cena (s) */
  exitAt: number;
  /** até quando fica em tela (s) */
  until: number;
};

const EXIT_DUR = 0.24;
export const BEAT_EXIT = EXIT_DUR;

export const RBEATS: RBeat[] = (() => {
  const raw = BEATS.map((beat) => {
    const rows = beat.rows.map(resolveRow);
    return { beat, rows, firstTime: Math.min(...rows.map((r) => r.firstTime)) };
  });
  return raw.map((b, i) => {
    const next = raw[i + 1];
    const lastWordEnd = Math.max(...b.rows.map((r) => r.row.win[1]));
    const exitAt = next ? Math.min(next.firstTime - 0.08, lastWordEnd + 0.4) : lastWordEnd + 0.4;
    return { ...b, exitAt, until: exitAt + EXIT_DUR };
  });
})();
