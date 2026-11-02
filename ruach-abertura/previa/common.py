"""Utilitários compartilhados: paleta, texturas procedurais, primitivas."""
import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import gaussian_filter
from scipy.spatial import cKDTree

F32 = np.float32
W, H = 960, 540          # resolução interna das cenas
FW, FH = 1920, 1080      # resolução de saída
FPS = 24
DUR = 120.0
NFRAMES = int(DUR * FPS)

yy, xx = np.mgrid[0:H, 0:W].astype(F32)
X = xx / W
Y = yy / H
ASP = W / H


def col(h):
    return np.array([int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)], F32)


NOITE = col('#0A1220'); GRAF = col('#1C2230'); BRASA = col('#6A4020')
OURO = col('#D6AA5A'); DEST = col('#F5C562'); MARFIM = col('#F5EEDF')
AREIA = col('#B89B6A'); OCRE = col('#8A6A45'); OSSO = col('#D9CBB0')
LINHO = col('#E8DFC9')


def sm(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def sms(a, b, x):
    """smoothstep escalar"""
    t = min(max((x - a) / (b - a), 0.0), 1.0)
    return t * t * (3 - 2 * t)


def mix(a, b, t):
    return a + (b - a) * t


def rgb(c, m):
    """cor (3,) * máscara (H,W) -> (H,W,3)"""
    return m[..., None] * c


def fractal(n, octaves, seed, base=4):
    r = np.random.default_rng(seed)
    acc = np.zeros((n, n), F32)
    amp, tot = 1.0, 0.0
    for o in range(octaves):
        s = base * 2 ** o
        if s > n:
            break
        g = r.random((s, s)).astype(F32)
        g3 = np.tile(g, (3, 3))
        im = Image.fromarray(g3, 'F').resize((3 * n, 3 * n), Image.BICUBIC)
        acc += np.asarray(im)[n:2 * n, n:2 * n] * amp
        tot += amp
        amp *= 0.55
    acc /= tot
    acc = (acc - acc.min()) / (acc.max() - acc.min())
    return acc.astype(F32)


def voronoi(n, npts, seed):
    r = np.random.default_rng(seed)
    p = r.random((npts, 2))
    tiles = np.concatenate([p + [dx, dy] for dx in (-1, 0, 1) for dy in (-1, 0, 1)])
    tree = cKDTree(tiles)
    g = (np.mgrid[0:n, 0:n].reshape(2, -1).T + 0.5) / n
    d, _ = tree.query(g, k=2)
    e = (d[:, 1] - d[:, 0]).reshape(n, n)
    return e.astype(F32)


print("gerando texturas…", flush=True)
TA = fractal(1024, 7, 1)          # névoa / nuvens
TB = fractal(512, 6, 2)           # ondas
TC = fractal(512, 7, 3, base=16)  # grão / porosidade
VOR = voronoi(1024, 260, 4)        # rachaduras
CRACK = 1 - sm(0.0, 0.012, VOR)   # 1 na fenda
CRACK_BIG = 1 - sm(0.0, 0.02, voronoi(512, 18, 5))


def samp(tex, u, v):
    n = tex.shape[0]
    return tex[(v * n).astype(np.int32) % n, (u * n).astype(np.int32) % n]


def blur(img, s):
    if img.ndim == 3:
        return gaussian_filter(img, (s, s, 0))
    return gaussian_filter(img, s)


def beam(x0, y0, x1, y1, w0, w1):
    """feixe volumétrico de (x0,y0) a (x1,y1), larguras normalizadas"""
    dx, dy = (x1 - x0) * ASP, (y1 - y0)
    L2 = dx * dx + dy * dy
    px, py = (X - x0) * ASP, (Y - y0)
    s = (px * dx + py * dy) / L2
    d = np.abs(px * dy - py * dx) / np.sqrt(L2)
    w = w0 + (w1 - w0) * np.clip(s, 0, 1)
    return np.exp(-(d / w) ** 2) * sm(-0.05, 0.08, s) * sm(1.1, 0.85, s)


def splat(buf, x, y, w):
    """soma pontos (coordenadas normalizadas) num buffer escalar"""
    hh, ww = buf.shape
    ix = (x * ww).astype(np.int32)
    iy = (y * hh).astype(np.int32)
    ok = (ix >= 0) & (ix < ww) & (iy >= 0) & (iy < hh)
    np.add.at(buf, (iy[ok], ix[ok]), w[ok] if np.ndim(w) else w)
    return buf


def prand(seed, n, k=1):
    r = np.random.default_rng(seed)
    return r.random((k, n)).astype(F32) if k > 1 else r.random(n).astype(F32)


def pil_layer(draw_fn, mode='L'):
    im = Image.new(mode, (W, H), 0)
    from PIL import ImageDraw
    draw_fn(ImageDraw.Draw(im))
    return np.asarray(im).astype(F32) / 255.0


def to_px(pts):
    return [(float(a) * W, float(b) * H) for a, b in pts]
