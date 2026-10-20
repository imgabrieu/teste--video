"""Vertical position of the speaker's head top (hair) over time, in 1080x1920 coordinates, for framing the split-screen panel.
usage: serie_headtrack.py video t0 t1 out.json   -> [[t, top], ...] every 0.1 s, smoothed except across source cuts (jumps > 90 px)"""
import cv2, numpy as np, sys, json
from scipy.ndimage import gaussian_filter1d
src, t0, t1, out = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
cap = cv2.VideoCapture(src); fps = cap.get(cv2.CAP_PROP_FPS) or 30
ts = np.arange(t0, t1, 0.1); raw = []
for t in ts:
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(round(t * fps))); ok, f = cap.read()
    f = cv2.resize(f, (1080, 1920)); g = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY)
    m = (g[:1100, 230:870] < 80).astype(np.uint8)
    rows = np.where(m.sum(axis=1) > 25)[0]
    raw.append(int(rows.min()) if len(rows) else (raw[-1] if raw else 400))
raw = np.array(raw, float)
med = np.array([np.median(raw[max(0, i - 2):i + 3]) for i in range(len(raw))])
cuts = [0] + [i for i in range(1, len(med)) if abs(med[i] - med[i - 1]) > 90] + [len(med)]
sm = np.concatenate([gaussian_filter1d(med[a:b], 4, mode="nearest") for a, b in zip(cuts[:-1], cuts[1:])])
json.dump([[round(float(t), 2), int(round(v))] for t, v in zip(ts, sm)], open(out, "w"))
print("cuts at", [round(float(ts[i]), 1) for i in cuts[1:-1]], "top range", int(sm.min()), int(sm.max()))
