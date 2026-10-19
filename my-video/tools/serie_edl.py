"""Builds the cut list (EDL) of one series part from word ranges of the Parakeet transcript.
Cut points are placed in real silence (energy envelope); long inner pauses are tightened (never removed entirely).
usage: serie_edl.py words.json audio16k.wav out.json  (ranges are given in the script below via PART)"""
import json, sys, numpy as np, wave

def envelope(path):
    w = wave.open(path); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    hop = 160; n = len(x) // hop
    return np.array([20 * np.log10(np.sqrt((x[i * hop:(i + 1) * hop] ** 2).mean()) + 1e-5) for i in range(n)])  # 10 ms

def quietest(db, a, b, width=6):
    """centre (s) of the quietest `width`-frame window within [a,b] seconds"""
    i0, i1 = max(0, int(a * 100)), min(len(db) - width, int(b * 100))
    if i1 <= i0: return (a + b) / 2
    best = min(range(i0, i1 + 1), key=lambda i: db[i:i + width].mean())
    return (best + width / 2) / 100

def start_cut(db, words, k, pre=0.10):
    s = words[k]['s']
    prev = words[k - 1]['s'] if k > 0 else s - 1
    lo = max(prev + 0.12, s - 0.45)
    c = quietest(db, lo, max(lo, s - 0.03))
    return round(max(0.0, min(c, s - pre) if s - c < 0.45 else s - pre), 3)

def end_cut(db, words, k, tail=0.12):
    s = words[k]['s']; nxt = words[k + 1]['s'] if k + 1 < len(words) else s + 2
    i = int((s + 0.25) * 100); end = None
    while i < min(len(db) - 18, int((s + 1.8) * 100)):
        if db[i:i + 18].max() < -41: end = i / 100; break
        i += 1
    end = end if end is not None else s + 0.5
    return round(min(end + tail, nxt - 0.05), 3) if nxt - 0.05 > end else round(end, 3)

def tighten(db, a, b, max_pause=0.85, keep=0.4):
    """split [a,b] where an inner silence is longer than max_pause; returns list of (from,to)"""
    quiet = db < -41; out = []; cur = a; i = int(a * 100); iend = int(b * 100)
    while i < iend:
        if quiet[i]:
            j = i
            while j < iend and quiet[j]: j += 1
            if (j - i) / 100 > max_pause:
                cut_a, cut_b = i / 100 + keep / 2, j / 100 - keep / 2
                if cut_a - cur > 0.3: out.append((round(cur, 3), round(cut_a, 3))); cur = cut_b
            i = j
        else: i += 1
    out.append((round(cur, 3), round(b, 3)))
    return out

if __name__ == "__main__":
    wf, af, outf, ranges = sys.argv[1], sys.argv[2], sys.argv[3], json.loads(sys.argv[4])
    words = json.load(open(wf)); db = envelope(af); segs = []
    for a, b in ranges:
        s, e = start_cut(db, words, a), end_cut(db, words, b)
        segs += tighten(db, s, e)
    # merge segments that touch
    merged = []
    for s, e in segs:
        if merged and s - merged[-1][1] < 0.05: merged[-1] = (merged[-1][0], e)
        else: merged.append((s, e))
    json.dump(merged, open(outf, "w"))
    print(len(merged), "segments, total %.1fs" % sum(e - s for s, e in merged))
    for s, e in merged: print(f"  {s:7.2f} -> {e:7.2f}  ({e - s:5.2f}s)")
