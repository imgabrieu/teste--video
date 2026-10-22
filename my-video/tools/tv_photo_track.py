"""Bottom edge (px, 1080x1920) of the lavender photo shown on the TV, every 0.1 s, to place captions below it.
usage: tv_photo_track.py src.mov out.json"""
import cv2, numpy as np, sys, json
from scipy.ndimage import gaussian_filter1d
cap = cv2.VideoCapture(sys.argv[1]); fps = cap.get(5) or 30; n = int(cap.get(7) / fps * 10)
ys = []
for k in range(n):
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(round(k * 0.1 * fps))); ok, f = cap.read()
    if not ok: break
    hsv = cv2.cvtColor(f, cv2.COLOR_BGR2HSV); h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    m = ((h >= 123) & (h <= 150) & (s > 35) & (s < 150) & (v > 170)).astype(np.uint8)
    rows = np.where(m.sum(axis=1) > 14)[0]
    ys.append(float(rows.max()) * (1920.0 / f.shape[0]) if len(rows) else (ys[-1] if ys else 1000.0))
ys = np.array(ys); sm = gaussian_filter1d(np.maximum.accumulate(ys[:1]).tolist() and ys, 2, mode="nearest")
json.dump([[round(k * 0.1, 1), int(v)] for k, v in enumerate(sm)], open(sys.argv[2], "w"))
print("photo bottom range", int(sm.min()), int(sm.max()))
