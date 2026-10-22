"""Calm the saturated blue TV (narrow hue band, soft edges) and keep the lavender photo on the screen untouched.
usage: tv_grade.py src.mov out.mp4 "<ffmpeg audio filter>" """
import cv2, numpy as np, subprocess, sys
src, out, af = sys.argv[1], sys.argv[2], sys.argv[3]
cap = cv2.VideoCapture(src); W = int(cap.get(3)); H = int(cap.get(4)); N = int(cap.get(7))
def grade(bgr):
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV).astype(np.float32); h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    sel = np.clip((s - 90) / 50, 0, 1) * np.clip((h - 102) / 4, 0, 1) * np.clip((122 - h) / 3, 0, 1)   # pure screen-blue only (photo is hue ~129)
    sel = cv2.GaussianBlur(sel, (0, 0), 2)
    s2 = s * (1 - 0.5 * sel); v2 = v * (1 - 0.14 * sel)
    o = cv2.cvtColor(np.clip(np.stack([h, s2, v2], -1), 0, 255).astype(np.uint8), cv2.COLOR_HSV2BGR)
    return o
enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", "30", "-i", "-", "-i", src,
    "-map", "0:v", "-map", "1:a", "-af", af, "-c:v", "libx264", "-crf", "14", "-preset", "medium", "-pix_fmt", "yuv420p", "-g", "15",
    "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-movflags", "+faststart", "-shortest", out], stdin=subprocess.PIPE)
for i in range(N):
    ok, f = cap.read()
    if not ok: break
    enc.stdin.write(grade(f).tobytes())
enc.stdin.close(); enc.wait(); print("done", N)
