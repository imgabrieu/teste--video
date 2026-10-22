"""Neutralise the saturated blue/green TV in the background (hue-selective, soft edges) and lift exposure slightly.
The burned-in before/after photo (x 160-710, y 880-1160 of the 720x1280 source) is left untouched.
usage: dinho_grade.py src.mp4 out.mp4 [measured loudnorm args file]"""
import cv2, numpy as np, subprocess, sys, json
src, out = sys.argv[1], sys.argv[2]
cap = cv2.VideoCapture(src); W = int(cap.get(3)); H = int(cap.get(4)); N = int(cap.get(7))
keep = np.zeros((H, W), np.float32); keep[876:1166, 156:716] = 1; keep = cv2.GaussianBlur(keep, (0, 0), 6)[..., None]
def grade(bgr):
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV).astype(np.float32); h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    sel = np.clip((s - 60) / 60, 0, 1) * np.clip((h - 36) / 8, 0, 1) * np.clip((142 - h) / 8, 0, 1)
    sel = cv2.GaussianBlur(sel, (0, 0), 2.5)
    s2 = s * (1 - 0.85 * sel); v2 = v * (1 - 0.38 * sel)
    o = cv2.cvtColor(np.clip(np.stack([h, s2, v2], -1), 0, 255).astype(np.uint8), cv2.COLOR_HSV2BGR).astype(np.float32) / 255
    o = np.power(o, 0.94); o = np.clip((o - 0.5) * 1.02 + 0.5, 0, 1)
    return (o * 255 + 0.5).astype(np.uint8)
af = sys.argv[3] if len(sys.argv) > 3 else "anull"
enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", "30", "-i", "-", "-i", src,
    "-map", "0:v", "-map", "1:a", "-af", af, "-c:v", "libx264", "-crf", "19", "-preset", "medium", "-pix_fmt", "yuv420p", "-g", "15",
    "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-movflags", "+faststart", "-shortest", out], stdin=subprocess.PIPE)
for i in range(N):
    ok, f = cap.read()
    if not ok: break
    g = grade(f).astype(np.float32); o = f.astype(np.float32) * keep + g * (1 - keep)
    enc.stdin.write(o.astype(np.uint8).tobytes())
enc.stdin.close(); enc.wait(); print("done", N)
