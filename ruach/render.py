"""Uso: RW=1920 python render.py a b out.mp4   (renderiza frames [a,b) a 24fps para out.mp4)"""
import os, sys, subprocess, json
import numpy as np, cv2
sys.path.insert(0, os.path.dirname(__file__))
FPS = 24
from timeline import SCENES_T, FT, APEX, TOTAL, S
import gfx
from gfx import W, H, U, V, lerp
import shots1, shots2, shots3
END = json.load(open(os.path.join(os.path.dirname(__file__), "audio/end.json")))["end"]
NFR = int(np.ceil(END * FPS))
HT = int(round(W * 9 / 16 / 2) * 2); OFF = (HT - H) // 2

FN = {
    "s1": lambda t, ls, d: shots1.water_close(ls), "s2": lambda t, ls, d: shots1.water_wide(ls, d),
    "s3": lambda t, ls, d: shots1.montage_sopro(ls, d), "s4": shots2.scene4, "s5": shots2.scene5, "s6": shots2.scene6,
    "s7": shots3.scene7, "s8": shots3.scene8, "s9": shots3.scene9, "s10": shots3.scene10}
XF = {"s1": 1.2, "s2": 1.0, "s3": 0.7, "s4": 1.0, "s5": 0.9, "s6": 0.0, "s7": 0.6, "s8": 0.0, "s9": 0.5, "s10": 0.0}

def scene_img(sc, t):
    ls = max(0.0, t - sc["t0"]); return FN[sc["id"]](t, ls, sc["t1"] - sc["t0"])

def raw(t):
    if t >= APEX:
        return shots3.scene_final(t, t - APEX) if t >= FT["gust"] - 0.0 else np.zeros((H, W, 3), np.float32)
    for i, sc in enumerate(SCENES_T):
        if sc["t0"] <= t < sc["t1"]:
            img = scene_img(sc, t); xf = XF[sc["id"]]
            if xf > 0 and i + 1 < len(SCENES_T) and t > sc["t1"] - xf:
                a = float(gfx.ss(sc["t1"] - xf, sc["t1"], t)); img = lerp(img, scene_img(SCENES_T[i + 1], t), a)
            return img
    return np.zeros((H, W, 3), np.float32)

_vig = (1 - 0.5 * (((U - 0.5) * 1.3) ** 2 + ((V - 0.5) * 1.6) ** 2)).clip(0.25, 1)[..., None].astype(np.float32)
def post(img, fi, t):
    img = np.nan_to_num(img, nan=0.0, posinf=1.0, neginf=0.0)
    if t >= APEX and t < FT["gust"]: return np.zeros((H, W, 3), np.float32)
    img = np.clip(img, 0, 8)
    br = np.clip(img - 0.7, 0, None); bl = cv2.GaussianBlur(br, (0, 0), W / 90) * 0.45 + cv2.GaussianBlur(br, (0, 0), W / 28) * 0.35
    img = img + bl
    img = img / (1 + 0.32 * img) * 1.32
    img = img * _vig
    rng = np.random.default_rng(fi)
    gr = cv2.GaussianBlur(rng.standard_normal((H, W)).astype(np.float32), (0, 0), 0.55)[..., None] * 0.9
    lum = img.mean(-1, keepdims=True)
    img = img + gr * 0.03 * (0.15 + np.clip(lum * 2.2, 0, 1)) * (1.0 if t < APEX else 0.8)
    img = img * (1 + 0.012 * np.sin(fi * 1.7) + 0.008 * rng.standard_normal())
    # fade final
    if t > END - 0.02: img = img * 0
    return np.clip(img, 0, 1)

def frame(fi):
    t = fi / FPS; img = post(raw(t), fi, t)
    out = np.zeros((HT, W, 3), np.uint8); out[OFF:OFF + H] = (img * 255 + 0.5).astype(np.uint8); return out

if __name__ == "__main__":
    a, b, path = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3]
    p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{HT}", "-r", str(FPS), "-i", "-",
                          "-c:v", "libx264", "-preset", "medium", "-crf", "15", "-pix_fmt", "yuv420p", "-g", "48", path], stdin=subprocess.PIPE)
    for fi in range(a, min(b, NFR)):
        p.stdin.write(frame(fi).tobytes())
    p.stdin.close(); p.wait()
