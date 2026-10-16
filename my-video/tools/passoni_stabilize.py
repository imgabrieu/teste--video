"""Light, natural stabilisation: keep the slow, human camera drift, remove sway/jitter (Gaussian low-pass of the camera path),
bake a small constant overscan so borders never show, apply the colour grade and re-encode (video x264 CRF 12, original audio -> AAC 320k).
usage: passoni_stabilize.py src.mov traj.json out.mp4 [sigma]"""
import cv2, numpy as np, json, subprocess, sys
from scipy.ndimage import gaussian_filter1d
sys.path.insert(0, __file__.rsplit("/", 1)[0])
from passoni_grade import grade

src, trajf, out = sys.argv[1:4]
SIGMA = float(sys.argv[4]) if len(sys.argv) > 4 else 110
cap = cv2.VideoCapture(src); W = int(cap.get(3)); H = int(cap.get(4)); N = int(cap.get(7))
traj = np.array(json.load(open(trajf)))[:N]
C = np.array([[1, 0, W / 2], [0, 1, H / 2], [0, 0, 1.0]]); Ci = np.linalg.inv(C)
tc = np.array([Ci @ T @ C for T in traj])                     # motion about the image centre
s = np.hypot(tc[:, 0, 0], tc[:, 1, 0]); th = np.arctan2(tc[:, 1, 0], tc[:, 0, 0]); tx = tc[:, 0, 2]; ty = tc[:, 1, 2]
sm = lambda v: gaussian_filter1d(v, SIGMA, mode="mirror")
def mat(s_, th_, tx_, ty_):
    return np.array([[s_ * np.cos(th_), -s_ * np.sin(th_), tx_], [s_ * np.sin(th_), s_ * np.cos(th_), ty_], [0, 0, 1]])
S = np.array([mat(a, b, c, d) for a, b, c, d in zip(np.exp(sm(np.log(s))), sm(th), sm(tx), sm(ty))])
M = np.array([S[i] @ np.linalg.inv(tc[i]) for i in range(len(tc))])      # source -> stabilised (about centre)
print("max correction: tx %.1f ty %.1f rot %.2f deg scale %.3f" % (np.abs(sm(tx) - tx).max(), np.abs(sm(ty) - ty).max(), np.degrees(np.abs(sm(th) - th)).max(), np.abs(sm(np.log(s)) - np.log(s)).max()))
# smallest constant zoom Z so every output pixel maps inside the source for every frame
pts = np.array([[x, y, 1] for x in np.linspace(-W / 2, W / 2, 9) for y in np.linspace(-H / 2, H / 2, 9)]).T
Minv = np.linalg.inv(M)                                       # stabilised -> source, all frames
Z = 1.0
while True:
    zs = np.diag([1 / Z, 1 / Z, 1.0])
    P = Minv @ zs @ pts                                       # (N,3,81)
    if (np.abs(P[:, 0]) <= W / 2 - 1).all() and (np.abs(P[:, 1]) <= H / 2 - 1).all(): break
    Z += 0.002
Z += 0.004
print("overscan zoom Z = %.3f" % Z)
enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", "30", "-i", "-", "-i", src,
    "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-crf", "12", "-preset", "slow", "-pix_fmt", "yuv420p", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv",
    "-c:a", "aac", "-b:a", "320k", "-movflags", "+faststart", "-shortest", out], stdin=subprocess.PIPE)
for i in range(N):
    ok, f = cap.read()
    if not ok: break
    A = C @ np.diag([Z, Z, 1]) @ M[i] @ Ci
    f = cv2.warpAffine(f, A[:2], (W, H), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REFLECT)
    enc.stdin.write(grade(f).tobytes())
enc.stdin.close(); enc.wait(); print("done", N)
