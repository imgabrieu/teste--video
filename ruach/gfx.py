"""Primitivas gráficas: ruído, partículas sem estado, colorização. Resolução via env RW."""
import numpy as np, cv2, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from timeline import WIND, TOTAL
cv2.setNumThreads(1)
W = int(os.environ.get("RW", 960)); H = int(round(W / 2.39 / 2) * 2); A = W / H
_yy, _xx = np.mgrid[0:H, 0:W].astype(np.float32)
U = (_xx + 0.5) / W; V = (_yy + 0.5) / H
X = U * A                                   # coordenada horizontal com aspecto (0..A)

def ss(a, b, x):
    t = np.clip((np.asarray(x, np.float32) - a) / max(b - a, 1e-6), 0, 1); return t * t * (3 - 2 * t)

def mk_tile(seed, size=256, base=4, octs=5, gain=0.5):
    rng = np.random.default_rng(seed); out = np.zeros((size, size), np.float32); amp = 1.0; tot = 0.0
    for o in range(octs):
        g = base * 2 ** o
        if g > size: break
        a = rng.random((g, g)).astype(np.float32); ap = np.pad(a, ((1, 2), (1, 2)), mode="wrap"); s = size // g
        up = cv2.resize(ap, ((g + 3) * s, (g + 3) * s), interpolation=cv2.INTER_CUBIC)[s:s + size, s:s + size]
        out += amp * up; tot += amp; amp *= gain
    out /= tot; out = (out - out.min()) / (out.max() - out.min()); return out

def samp(tl, u, v, ox=0.0, oy=0.0):
    n = tl.shape[0]
    mx = np.mod(u * n + ox * n, n).astype(np.float32); my = np.mod(v * n + oy * n, n).astype(np.float32)
    return cv2.remap(tl, mx, my, cv2.INTER_LINEAR, borderMode=cv2.BORDER_WRAP)

T1, T2, T3 = mk_tile(1), mk_tile(2, base=2), mk_tile(3, base=8, gain=0.6)

def colorize(L, stops):
    p = [s[0] for s in stops]; L = np.clip(L, p[0], p[-1]); out = np.empty(L.shape + (3,), np.float32)
    for c in range(3): out[..., c] = np.interp(L, p, [s[1][c] for s in stops])
    return out

_ts = np.linspace(0, TOTAL, int(TOTAL * 30) + 1); _wi = np.cumsum(WIND(_ts)) / 30.0
def wint(t): return float(np.interp(t, _ts, _wi))
def wind(t): return float(WIND(t))

def splat(x, y, w, h=H, ww=W):
    ix = np.round(x * ww).astype(np.int64); iy = np.round(y * h).astype(np.int64)
    ok = (ix >= 0) & (ix < ww) & (iy >= 0) & (iy < h)
    return np.bincount(iy[ok] * ww + ix[ok], weights=w[ok], minlength=h * ww).reshape(h, ww).astype(np.float32)

def streaks(x, y, vx, vy, w, ns=5, blur=0.7):
    """partículas com rastro (motion blur) — velocidades em uv por 'frame' de exposição"""
    acc = np.zeros((H, W), np.float32)
    for k in range(ns):
        f = k / max(1, ns - 1) - 0.5
        acc += splat(x + vx * f, y + vy * f, w / ns)
    return cv2.GaussianBlur(acc, (0, 0), blur) if blur > 0 else acc

class Parts:
    """campo de partículas sem estado: posição = origem + deriva * integral do vento"""
    def __init__(self, n, seed, sy=(0, 1), speed=(0.4, 1.6), size=(0.5, 1.0)):
        r = np.random.default_rng(seed); self.n = n
        self.x0 = r.random(n).astype(np.float32); self.y0 = (sy[0] + (sy[1] - sy[0]) * r.random(n)).astype(np.float32)
        self.sp = (speed[0] + (speed[1] - speed[0]) * r.random(n)).astype(np.float32)
        self.ph = (r.random(n) * 6.28).astype(np.float32); self.sz = (size[0] + (size[1] - size[0]) * r.random(n)).astype(np.float32)
    def at(self, t, wi=None, base=0.0, dirx=1.0, diry=0.0, wob=0.02):
        wi = wint(t) if wi is None else wi
        d = (wi * 0.55 + base * t) * self.sp
        x = np.mod(self.x0 + dirx * d + wob * np.sin(self.ph + t * 0.9 * self.sp), 1.0)
        y = np.mod(self.y0 + diry * d + wob * np.cos(self.ph * 1.3 + t * 0.7), 1.0)
        return x, y

def blur_tex(img, s): return cv2.GaussianBlur(img, (0, 0), s)
def rgb(*c): return np.array(c, np.float32)
def lerp(a, b, t): return a + (b - a) * t
def to3(L, c): return L[..., None] * np.asarray(c, np.float32)
