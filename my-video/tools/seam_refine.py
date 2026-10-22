"""Move every cut into REAL silence so no word end / onset is chopped.
 - segment END:   keep the whole falling edge of the last sound, then PAD seconds of silence.
 - segment START: keep PAD seconds of silence, then the whole rising edge of the next sound.
Silence = 10 ms RMS below (noise floor + QUIET dB) for >= RUN seconds; "sound" = above floor + SOUND dB.
A cut that cannot be placed in silence (continuous speech on both sides) is REPORTED, never silently forced.
library: refine(db, segs) -> (segs', report, floor)"""
import numpy as np, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from seam_audit import env

QUIET, SOUND, RUN, PAD, FPS = 11.0, 16.0, 0.14, 0.10, 100

def floor_of(db): return float(np.percentile(db[db > -90], 10))

def transitions(db):
    """(offsets, onsets) in frames: offset = last sound frame before a quiet run >= RUN; onset = first non-quiet frame after a quiet run >= RUN"""
    fl = floor_of(db); n = int(RUN * FPS); L = len(db)
    qt = (db < fl + QUIET) | (db < -90)
    off, on = [], []; i = 0
    while i < L:
        if qt[i]:
            j = i
            while j < L and qt[j]: j += 1
            if j - i >= n:
                if i > 0: off.append(i)        # first quiet frame (sound ended just before)
                if j < L: on.append(j)         # first non-quiet frame (sound begins)
            i = j
        else: i += 1
    return off, on, fl

def refine(db, segs, verbose=True):
    off, on, fl = transitions(db); rep = []; out = []
    for k, seg in enumerate(segs):
        s, e = seg[0], seg[1]; rest = list(seg[2:]); s2, e2 = s, e
        # END: nearest "sound ends, silence follows" transition in [e-0.4, e+1.0]
        cand = [o for o in off if e - 0.4 <= o / FPS <= e + 1.0]
        if cand:
            o = min(cand, key=lambda o: abs(o / FPS - e)); e2 = round(o / FPS + PAD, 3)
        else: rep.append(f"seg {k}: no silence to end at near {e:.2f}s (kept)")
        # START: nearest "silence ends, sound begins" transition in [s-1.0, s+0.6]
        if k > 0:
            cand = [o for o in on if s - 1.0 <= o / FPS <= s + 0.6]
            if cand:
                o = min(cand, key=lambda o: abs(o / FPS - s)); s2 = round(max(0.0, (o - 3) / FPS - PAD), 3)
            else: rep.append(f"seg {k}: no silence before start near {s:.2f}s (kept)")
        out.append([s2, e2] + rest)
    return out, rep, fl

if __name__ == "__main__":
    new, rep, fl = refine(env(sys.argv[1]), json.loads(sys.argv[2]))
    print(json.dumps(new)); print('\n'.join(rep), file=sys.stderr)

def auto_cuts(db, start, end, min_run=0.45, keep=0.26, quiet=None, margin=None):
    """Cut list for tightening pauses: only inside real silence, always keeping `keep` seconds of it (split before/after) so
    falling edges / onsets are untouched. Returns [[from, to, keep], ...] in the timeline.ts `trims` convention (removed middle = [from+keep/2, to-keep/2])."""
    fl = floor_of(db); thr = fl + (QUIET if quiet is None else quiet)
    q = (db < thr) | (db < -90); L = len(db); i = int(start * FPS); iend = int(end * FPS); trims = []
    while i < iend:
        if q[i]:
            j = i
            while j < iend and q[j]: j += 1
            run = (j - i) / FPS
            if run >= min_run: trims.append([round(i / FPS, 2), round(j / FPS, 2), keep])
            i = j
        else: i += 1
    return trims, fl, thr
