"""Audit every cut: is the audio really silent where we cut? A cut is SAFE when the audio just removed after a segment end, and just removed before the next
segment start, is near the noise floor (no word tail / onset being chopped).
usage: seam_audit.py audio16k.wav '[[start,end],...]' [fade_s]   (source seconds)"""
import sys, json, wave, numpy as np
def env(path):
    w = wave.open(path); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    hop = 160; n = len(x) // hop
    return np.array([20 * np.log10(np.sqrt((x[i * hop:(i + 1) * hop] ** 2).mean()) + 1e-5) for i in range(n)])
def audit(path, segs, fade=0.067, verbose=True):
    db = env(path); floor = float(np.percentile(db[db > -90], 10)); bad = 0
    for k, (s, e) in enumerate(segs[:-1] if False else segs):
        ne = int(e * 100); ns = int(s * 100)
        # tail we keep right before the cut (must be quiet for at least the fade), and what we throw away right after
        keep_tail = db[max(0, ne - int(fade * 100) - 2):ne]; thrown_after = db[ne:ne + 12] if k < len(segs) - 1 else np.array([])
        lead_in = db[ns:ns + int(fade * 100) + 2]; thrown_before = db[max(0, ns - 12):ns] if k > 0 else np.array([])
        flags = []
        if True:
            if len(keep_tail) and keep_tail.max() > floor + 14: flags.append(f"end {e:.2f}: sound inside the fade ({keep_tail.max():.0f} dB)")
            if k < len(segs) - 1 and len(thrown_after) and thrown_after[:8].mean() > floor + 14: flags.append(f"end {e:.2f}: tail continues after cut ({thrown_after[:8].mean():.0f} dB vs floor {floor:.0f})")
        if k > 0:
            if len(lead_in) and lead_in.max() > floor + 14: flags.append(f"start {s:.2f}: sound inside the fade ({lead_in.max():.0f} dB)")
            if len(thrown_before) and thrown_before[-8:].mean() > floor + 14: flags.append(f"start {s:.2f}: onset chopped ({thrown_before[-8:].mean():.0f} dB vs floor {floor:.0f})")
        if flags: bad += 1; verbose and print(f"  seg {k}: " + '; '.join(flags))
    print(f"floor {floor:.0f} dB; {bad} of {len(segs)} segments with a risky boundary")
    return bad
if __name__ == "__main__":
    audit(sys.argv[1], json.loads(sys.argv[2]), float(sys.argv[3]) if len(sys.argv) > 3 else 0.067)
