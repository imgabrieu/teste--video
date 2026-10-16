"""Estimate per-frame camera motion (similarity transform vs frame 0) from BACKGROUND features only (person region masked out)."""
import cv2, numpy as np, sys, json
src, out = sys.argv[1], sys.argv[2]
cap = cv2.VideoCapture(src)
W = int(cap.get(3)); H = int(cap.get(4))
ok, prev = cap.read()
mask = np.zeros((H, W), np.uint8)
# background = TV/wall area above shoulders on both sides + wall strip; exclude the speaker (centre-left) & moving hands
mask[60:700, :] = 255            # TV + wall above the head
mask[700:1150, 0:140] = 255      # left wall strip
mask[700:1150, 960:1080] = 255   # right chair edge strip
mask[1150:1500, 0:120] = 255
g0 = cv2.cvtColor(prev, cv2.COLOR_BGR2GRAY)
pts = cv2.goodFeaturesToTrack(g0, 600, 0.01, 12, mask=mask)
T = np.eye(3); traj = [np.eye(3).tolist()]
prevg = g0
n = 0
while True:
    ok, f = cap.read()
    if not ok: break
    g = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY)
    if pts is None or len(pts) < 80:
        pts = cv2.goodFeaturesToTrack(prevg, 600, 0.01, 12, mask=mask)
    nxt, st, _ = cv2.calcOpticalFlowPyrLK(prevg, g, pts, None, winSize=(31, 31), maxLevel=4)
    good = st.ravel() == 1
    a, b = pts[good], nxt[good]
    M, inl = cv2.estimateAffinePartial2D(a, b, method=cv2.RANSAC, ransacReprojThreshold=1.5)
    if M is None: M = np.array([[1, 0, 0], [0, 1, 0]], float)
    step = np.vstack([M, [0, 0, 1]])
    T = step @ T            # cumulative motion of content: frame0 coords -> frame n coords
    traj.append(T.tolist())
    prevg = g
    pts = b.reshape(-1, 1, 2) if len(b) > 80 else None
    n += 1
json.dump(traj, open(out, "w"))
tr = np.array(traj)
tx, ty = tr[:, 0, 2], tr[:, 1, 2]
sc = np.hypot(tr[:, 0, 0], tr[:, 1, 0]); rot = np.degrees(np.arctan2(tr[:, 1, 0], tr[:, 0, 0]))
print("frames", len(traj), "tx range", tx.min().round(1), tx.max().round(1), "ty range", ty.min().round(1), ty.max().round(1),
      "scale", sc.min().round(4), sc.max().round(4), "rot", rot.min().round(2), rot.max().round(2))
d = np.hypot(np.diff(tx), np.diff(ty)); print("frame-to-frame px: mean", d.mean().round(2), "p95", np.percentile(d, 95).round(2), "max", d.max().round(2))
