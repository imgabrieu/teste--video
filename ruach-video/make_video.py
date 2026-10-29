"""Anima os 5 posters da Conference RUACH num vídeo vertical (1080x1920) em loop.

A câmera é contínua: o mesmo zoom/deslocamento vale para todas as camadas,
então o título, logo e data (idênticos nos 5 posters) nunca "pulam" na troca;
só a foto e o nome do palestrante se dissolvem, com motion blur e um pulso de luz.
"""
import subprocess, sys, math
import numpy as np, cv2

SRC = sys.argv[1]            # pasta com 1.webp..5.webp
OUT = sys.argv[2]
W, H, FPS = 1080, 1920, 30
HOLD, TRANS = 3.2, 1.0       # duração de cada slide / sobreposição
STEP = HOLD - TRANS
N = 5
TOTAL = N * STEP             # loop perfeito: o último dissolve no primeiro
SUB = 4                      # subamostras de motion blur

imgs = [cv2.cvtColor(cv2.imread(f"{SRC}/{i+1}.webp"), cv2.COLOR_BGR2RGB)
        .astype(np.float32) for i in range(N)]
imgs = [cv2.resize(i, (W, H), interpolation=cv2.INTER_LANCZOS4) if i.shape[:2] != (H, W) else i
        for i in imgs]

ease = lambda x: x * x * (3 - 2 * x)

def camera(u):
    # pico de zoom no centro de cada transição (u = m*STEP), relaxa no meio do slide
    s = 1.045 + 0.04 * math.cos(2 * math.pi * u / STEP)
    px = 9 * math.sin(2 * math.pi * u / TOTAL * 2)
    py = 12 * math.sin(math.pi * u / STEP + 1)
    return s, px, py

def warp(img, s, px, py):
    M = np.array([[s, 0, W / 2 * (1 - s) + px], [0, s, H / 2 * (1 - s) + py]], np.float32)
    return cv2.warpAffine(img, M, (W, H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)

# máscara da faixa do nome (sem a data, à direita): lá a troca é troca rápida,
# para os nomes não ficarem sobrepostos
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
MASK = (np.clip((yy - 1330) / 80, 0, 1) * np.clip((780 - xx) / 40, 0, 1))[..., None]

def weights(u, dip=False):
    """u = t + TRANS/2. A transição (m-1)→m é centrada em u = m*STEP (loop: 4→0)."""
    w = np.zeros(N)
    m = round(u / STEP)
    x = (u - m * STEP) / TRANS + 0.5
    if 0 <= x <= 1:
        if dip:
            e = ease(min(max((x - 0.4) / 0.2, 0), 1))   # troca rápida: ~0,2 s de sobreposição
            w[(m - 1) % N] += 1 - e; w[m % N] += e
        else:
            e = ease(x); w[(m - 1) % N] += 1 - e; w[m % N] += e
    else:
        w[int(u // STEP) % N] = 1
    return w

def frame(t):
    acc = np.zeros((H, W, 3), np.float32)
    for j in range(SUB):
        u = (t + (j / SUB - 0.5) * (0.5 / FPS) + TRANS / 2) % TOTAL
        w = weights(u); s, px, py = camera(u)
        wd = weights(u, dip=True)
        f = np.zeros((H, W, 3), np.float32)
        for k in np.nonzero(w)[0]:
            f += imgs[k] * (w[k] * (1 - MASK) + wd[k] * MASK)
        acc += warp(f, s, px, py)
    out = acc / SUB
    # pulso de luz quente no centro de cada transição
    u = t + TRANS / 2
    d = abs((u + STEP / 2) % STEP - STEP / 2)
    glow = max(0.0, 1 - d / (TRANS / 2)) ** 2 * 0.10
    out = out + glow * (255 - out) * np.array([1.0, 0.85, 0.55], np.float32)
    return np.clip(out, 0, 255).astype(np.uint8)

if __name__ == "__main__":
    n = int(TOTAL * FPS)
    p = subprocess.Popen(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
         "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-crf", "16",
         "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", OUT],
        stdin=subprocess.PIPE)
    for i in range(n):
        p.stdin.write(frame(i / FPS).tobytes())
    p.stdin.close(); p.wait()
