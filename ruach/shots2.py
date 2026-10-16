"""Cenas 4-6: o vale de ossos (câmera em perspectiva, ossos como sprites, vento crescente)."""
from gfx import *

# ---------- terra rachada (tile)
def mk_crack(size=512, n=150, seed=9):
    r = np.random.default_rng(seed); P = r.random((n, 2)).astype(np.float32)
    ys, xs = np.mgrid[0:size, 0:size].astype(np.float32); xs /= size; ys /= size
    d1 = np.full((size, size), 9, np.float32); d2 = d1.copy(); idx = np.zeros((size, size), np.int32)
    for i, (px, py) in enumerate(P):
        dx = np.abs(xs - px); dx = np.minimum(dx, 1 - dx); dy = np.abs(ys - py); dy = np.minimum(dy, 1 - dy)
        d = np.sqrt(dx * dx + dy * dy)
        m1 = d < d1; d2 = np.where(m1, d1, np.minimum(d2, d)); idx = np.where(m1, i, idx); d1 = np.where(m1, d, d1)
    crack = np.clip((d2 - d1) / 0.016, 0, 1); tone = r.random(n).astype(np.float32)[idx]
    n1 = mk_tile(21, size, base=8); n2 = mk_tile(22, size, base=32, gain=0.7)
    tex = (0.50 + 0.22 * tone + 0.25 * n1 + 0.15 * n2) * (0.42 + 0.58 * crack ** 0.8)
    return tex.astype(np.float32)
CRACK = mk_crack()

# ---------- sprites de ossos
def _bone_sprites():
    S = 128; k = 4; out = []; r = np.random.default_rng(3)
    def fin(a, seed):
        a = cv2.resize(a, (S, S), interpolation=cv2.INTER_AREA)
        bl = cv2.GaussianBlur(a, (0, 0), 3.0); g = bl - np.roll(bl, 3, 0)         # luz vinda de cima
        rr = np.random.default_rng(seed); spk = cv2.resize(rr.random((S // 4, S // 4)).astype(np.float32), (S, S))
        tone = np.clip(0.62 + 2.2 * g + 0.15 * spk - 0.25 * (1 - bl) * a, 0.2, 1.0)
        col = np.stack([tone * 0.86, tone * 0.80, tone * 0.66], -1) * a[..., None]
        sh = np.roll(cv2.GaussianBlur(a, (0, 0), 4.5), 6, 0) * 0.65
        return np.concatenate([col, a[..., None]], -1).astype(np.float32), sh.astype(np.float32)
    def canvas(): return np.zeros((S * k, S * k), np.float32)
    # 0: osso longo reto
    c = canvas(); cv2.line(c, (22 * k, 64 * k), (106 * k, 64 * k), 1, 9 * k)
    for x in (20, 108):
        for dy in (-6, 6): cv2.circle(c, (x * k, (64 + dy) * k), 8 * k, 1, -1)
    out.append(fin(c, 1))
    # 1: osso longo curvo
    c = canvas(); pts = np.array([[24 + i * 80 / 12, 70 - 14 * np.sin(i / 12 * np.pi)] for i in range(13)]) * k
    cv2.polylines(c, [pts.astype(np.int32)], False, 1, 8 * k)
    for (x, y, d) in ((22, 70, 1), (104, 70, -1)):
        for dy in (-5, 5): cv2.circle(c, (x * k, (y + dy) * k), 7 * k, 1, -1)
    out.append(fin(c, 2))
    # 2: costela
    c = canvas(); cv2.ellipse(c, (64 * k, 90 * k), (48 * k, 52 * k), 0, 195, 345, 1, 7 * k); cv2.circle(c, (18 * k, 80 * k), 5 * k, 1, -1)
    out.append(fin(c, 3))
    # 3: vértebras
    c = canvas()
    for i in range(5):
        x = 24 + i * 20; y = 64 + 4 * np.sin(i)
        cv2.circle(c, (int(x * k), int(y * k)), 10 * k, 1, -1); cv2.line(c, (int(x * k), int((y - 12) * k)), (int(x * k), int((y - 22) * k)), 1, 4 * k)
    out.append(fin(c, 4))
    # 4: costelas em par
    c = canvas(); cv2.ellipse(c, (50 * k, 92 * k), (40 * k, 46 * k), 0, 200, 340, 1, 6 * k); cv2.ellipse(c, (78 * k, 90 * k), (38 * k, 50 * k), 0, 200, 340, 1, 6 * k)
    cv2.circle(c, (12 * k, 80 * k), 5 * k, 1, -1); cv2.circle(c, (40 * k, 76 * k), 5 * k, 1, -1)
    out.append(fin(c, 5))
    # 5: pequenos ossos
    c = canvas()
    for (x, y, l, a) in ((40, 44, 30, 0.3), (74, 82, 36, -0.5), (60, 64, 20, 1.2)):
        dx, dy = np.cos(a) * l / 2, np.sin(a) * l / 2
        cv2.line(c, (int((x - dx) * k), int((y - dy) * k)), (int((x + dx) * k), int((y + dy) * k)), 1, 5 * k)
        for sgn in (-1, 1): cv2.circle(c, (int((x + sgn * dx) * k), int((y + sgn * dy) * k)), 5 * k, 1, -1)
    out.append(fin(c, 6))
    return out
BONES = _bone_sprites()

def blit(img, spr, cx, cy, wpx, ang=0.0, sq=1.0, alpha=1.0, mul=1.0, shadow=False):
    sh, sw = spr.shape[:2]; s = wpx / sw; ca, sa = np.cos(ang) * s, np.sin(ang) * s
    L = np.array([[ca, -sa], [sa * sq, ca * sq]], np.float32); c0 = np.array([sw / 2, sh / 2], np.float32)
    corners = np.array([[0, 0], [sw, 0], [0, sh], [sw, sh]], np.float32) - c0; pc = corners @ L.T + [cx, cy]
    x0 = int(max(0, np.floor(pc[:, 0].min()))); x1 = int(min(W, np.ceil(pc[:, 0].max()) + 1))
    y0 = int(max(0, np.floor(pc[:, 1].min()))); y1 = int(min(H, np.ceil(pc[:, 1].max()) + 1))
    if x1 - x0 < 2 or y1 - y0 < 2: return
    t = np.array([cx, cy], np.float32) - L @ c0 - [x0, y0]
    M = np.concatenate([L, t[:, None]], 1).astype(np.float32)
    o = cv2.warpAffine(spr, M, (x1 - x0, y1 - y0), flags=cv2.INTER_LINEAR, borderValue=0)
    roi = img[y0:y1, x0:x1]
    if shadow:
        roi *= (1 - o[..., None] * alpha)
    else:
        a = o[..., 3:4] * alpha; roi[...] = roi * (1 - a) + o[..., :3] * alpha * mul

_rb = np.random.default_rng(12)
NB = 330; ZP = 30.0
B_X = _rb.uniform(-8, 8, NB).astype(np.float32); B_Z = _rb.uniform(0, ZP, NB).astype(np.float32)
B_T = _rb.integers(0, 6, NB); B_L = _rb.uniform(0.9, 2.1, NB).astype(np.float32); B_A = _rb.uniform(-3.14, 3.14, NB).astype(np.float32)
B_P = _rb.uniform(0, 6.28, NB).astype(np.float32)

def sky_ridges(vh, light, haze, w, t, ridge_h=0.13):
    sky = 0.16 + 0.34 * ss(0, vh, V) ** 1.4
    cl = samp(T2, U * 1.3 + wint(t) * 0.02, V * 1.4, wint(t) * 0.01, 0) * samp(T3, U * 2.0 - wint(t) * 0.035, V * 2.2)
    sky = sky * (0.65 + 0.7 * cl) + light * np.exp(-(((U - 0.32) * A) ** 2 / 0.35 + (V - vh * 0.55) ** 2 / 0.06)) * 0.5
    L = sky.astype(np.float32)
    xs = (np.arange(W, dtype=np.float32) + 0.5) / W
    for k, (shade, amp, sc) in enumerate(((0.55, 1.0, 1.6), (0.38, 0.8, 2.6), (0.24, 0.55, 4.1))):
        prof = np.interp(xs * sc * 256 % 256, np.arange(256), T1[int(60 + k * 50), :]) - 0.5
        hr = vh - (ridge_h * amp * (0.35 + 1.3 * np.abs(xs - 0.5) ** 1.3) + 0.03 * prof * amp)
        m = (V > hr[None, :]).astype(np.float32); m = cv2.GaussianBlur(m, (0, 0), 0.8)
        col = shade * 0.75 * (0.6 + 0.4 * haze) + 0.35 * haze * (1 - shade) * 0.5
        L = L * (1 - m) + m * col
    return L

def valley(t, ls, dur, hc=1.0, f=0.6, vh=0.46, camZ=0.0, w=0.0, light=0.3, haze=0.5, lift=0.0, trees=False, extra=None, tight=False):
    ex = extra or []
    wi = wint(t)
    L = sky_ridges(vh, light, haze, w, t)
    below = V > vh
    z = f * hc / np.maximum(V - vh, 0.004)
    Xg = (U - 0.5) * A * z / f
    tx = Xg * 0.62; ty = (z + camZ) * 0.62
    tex = samp(CRACK, tx, ty)
    dist = ss(6, 34, z)
    tex = tex * (1 - dist) + 0.5 * dist
    fogz = 1 - np.exp(-z * 0.055 * (0.6 + haze))
    gr = tex * 0.78 * (0.55 + 0.6 * light * np.exp(-((U - 0.35) ** 2) / 0.35)) 
    gr = gr * (1 - fogz) + (0.38 * haze + 0.12) * fogz
    L = np.where(below, gr, L).astype(np.float32)
    img = colorize(L * 1.0, [(0, (0.015, 0.014, 0.014)), (0.25, (0.17, 0.15, 0.13)), (0.55, (0.52, 0.47, 0.4)), (0.85, (0.85, 0.8, 0.7)), (1.1, (1, 0.97, 0.9))])
    # ----- ossos (do fundo para a frente)
    dz = np.mod(B_Z - camZ, ZP) + 0.45
    bx = np.concatenate([B_X, [e[0] for e in ex]]).astype(np.float32); dz = np.concatenate([dz, [e[1] for e in ex]]).astype(np.float32)
    bt = np.concatenate([B_T, [e[2] for e in ex]]).astype(int); bl = np.concatenate([B_L, [e[3] for e in ex]]).astype(np.float32)
    ba = np.concatenate([B_A, [e[4] for e in ex]]).astype(np.float32); bp = np.concatenate([B_P, np.zeros(len(ex))]).astype(np.float32)
    order = np.argsort(-dz)
    shadows = np.zeros((H, W, 1), np.float32) + 1  # reservado
    for i in order:
        d = dz[i]
        if d > 30: continue
        v = vh + f * hc / d; u = 0.5 + f * bx[i] / (d * A)
        if v > 1.25 or u < -0.35 or u > 1.35: continue
        wpx = f * bl[i] / (d * A) * W
        if wpx < 3: continue
        sq = float(np.clip((v - vh) * 2.0, 0.1, 1.0)); fog = float(np.exp(-d * 0.05 * (0.6 + haze)))
        pl = lift * (0.25 + 0.9 * (0.5 + 0.5 * np.sin(bp[i] + t * 2.1))) * (1.0 if bp[i] > 1.5 else 0.5)
        ang = ba[i] + lift * 0.55 * np.sin(bp[i] * 3 + t * 3.2) + w * 0.9 * np.sin(t * 5 + bp[i]) * lift
        cxp = u * W + (lift * 6 * np.sin(t * 17 + bp[i]) + wi * 0 ) ; cyp = v * H
        blit(img, BONES[bt[i]][1], cxp, cyp + 0.02 * wpx, wpx * 1.05, ang, sq, 0.7 * fog, shadow=True)
        blit(img, BONES[bt[i]][0], cxp, cyp - pl * f / d * H, wpx, ang, sq if lift < 0.2 else lerp(sq, 0.9, min(1, lift)), 1.0, mul=0.5 + 0.5 * fog)
    return img

_dust = Parts(1800, 31, sy=(0.3, 1.0), speed=(0.5, 2.0))
def dust_layer(t, w, tint=(1.0, 0.92, 0.78), amt=1.0, base=0.0, big=False, vy0=0.3):
    x, y = _dust.at(t, base=base, diry=-0.12)
    yy = vy0 + (1 - vy0) * y
    L = streaks(x, yy, (0.004 + 0.07 * w) * np.ones_like(x), -0.002 * np.ones_like(x), _dust.sz * (0.35 + 0.5 * w) * amt, ns=4, blur=0.7 if not big else 1.4)
    return L

def add_dust(img, t, w, amt=1.0, base=0.0):
    d = dust_layer(t, w, amt=amt, base=base)
    return img + d[..., None] * np.array((1.0, 0.9, 0.72), np.float32) * 0.6

# ----- árvores secas
def _mk_tree(seed, depth=6):
    r = np.random.default_rng(seed); segs = [(-1, 0.0, 1.0, 1.0, 0)]
    stack = [(0, 0)]
    for _ in range(40):
        pass
    br = []
    def grow(parent, d):
        if d >= depth: return
        for _ in range(2 if d > 0 else 1):
            a = r.uniform(-0.6, 0.6) if d else r.uniform(-0.1, 0.1); l = (0.62 + 0.15 * r.random()) ** (d)
            br.append((parent, a, l * (0.55 if d else 1.0), 1.0 / (1 + d * 0.9), d)); grow(len(br) - 1, d + 1)
    grow(-1, 0); return br
TREES = [(_mk_tree(s), x, y, h) for s, x, y, h in ((1, 0.12, 0.47, 0.20), (2, 0.78, 0.46, 0.16), (3, 0.9, 0.47, 0.24), (4, 0.33, 0.455, 0.10), (5, 0.62, 0.45, 0.09))]
def draw_trees(img, t, w, vh):
    m = np.zeros((H, W), np.float32)
    for br, x0, y0, h in TREES:
        pos = [(x0 * W, (vh + 0.012) * H)]; ang = [-np.pi / 2]
        for i, (par, a, l, th, d) in enumerate(br):
            pa = ang[par] if par >= 0 else -np.pi / 2; p0 = pos[par + 1] if par >= 0 else pos[0]
            sway = w * 0.5 * np.sin(t * (2.2 + 0.4 * d) + x0 * 9) * (0.15 + 0.2 * d) + w * 0.18 * d
            an = pa + a + sway; ang.append(an)
            e = (p0[0] + np.cos(an) * l * h * H * 0.55, p0[1] + np.sin(an) * l * h * H * 0.55); pos.append(e)
            cv2.line(m, (int(p0[0]), int(p0[1])), (int(e[0]), int(e[1])), 1.0, max(1, int(th * h * H * 0.045)), cv2.LINE_AA)
    return img * (1 - m[..., None] * 0.92) + m[..., None] * np.array((0.015, 0.014, 0.013), np.float32) * 0.92

# ----- fitas de tecido voando
def ribbons(img, t, w, n=7, seed=5):
    r = np.random.default_rng(seed); m = np.zeros((H, W), np.float32); hi = np.zeros((H, W), np.float32)
    wi = wint(t)
    for i in range(n):
        y0 = r.uniform(0.25, 0.85); sp = r.uniform(0.35, 0.8); ph = r.uniform(0, 6.28); amp = r.uniform(0.04, 0.1); ln = r.uniform(0.3, 0.55)
        xh = (r.uniform(0, 1.6) + wi * sp * 0.45) % 1.6 - 0.3
        pts = []
        for k in range(24):
            s = k / 23; x = xh - s * ln; y = y0 + amp * np.sin(s * 9 + t * 4 + ph) * (0.4 + s) + 0.03 * np.sin(t * 2 + ph) - s * 0.0
            pts.append((x * W, y * H))
        pts = np.array(pts, np.int32)
        for k in range(23):
            th = int(max(1, (1 - k / 23) * 0.012 * H * (1 + 0.8 * np.sin(k * 0.8 + ph))))
            cv2.line(m, tuple(pts[k]), tuple(pts[k + 1]), 1.0, th, cv2.LINE_AA)
            if k % 2: cv2.line(hi, tuple(pts[k]), tuple(pts[k + 1]), 0.6, 1, cv2.LINE_AA)
    m = blur_tex(m, 0.8) * min(1, w * 1.6); hi = blur_tex(hi, 0.7) * min(1, w * 1.6)
    return img * (1 - m[..., None] * 0.85) + (m * 0.10 + hi * 0.5)[..., None] * np.array((0.9, 0.85, 0.75), np.float32)

def dof(img, focus, strength, sigma=7):
    bl = blur_tex(img, sigma); m = ss(0, 1, np.abs(V - focus) * strength)[..., None]
    return img * (1 - m) + bl * m

# ================= cenas
def scene4(t, ls, dur):
    cam = 0.55 * ls * ss(0, 3, ls) ** 0.5
    img = valley(t, ls, dur, camZ=cam, w=0.0, light=0.25 + 0.2 * ls / dur, haze=0.55)
    img = add_dust(img, t, 0.0, amt=0.35, base=0.012)
    return img * float(ss(0, 1.5, ls))

def scene5(t, ls, dur):
    w = wind(t)
    cam = 3.0 + 0.30 * ls
    img = valley(t, ls, dur, hc=0.32, f=0.9, vh=0.24 + 0.01 * ls, camZ=cam, w=w, light=0.3, haze=0.4, lift=0.0, extra=[(-0.25, 1.15, 0, 1.5, 0.15), (0.55, 1.9, 2, 1.4, 0.4), (-0.9, 1.5, 5, 1.1, -0.3), (0.2, 2.8, 1, 1.6, 0.0), (-0.6, 3.2, 3, 1.4, 0.2)])
    # solo levantando: motes saindo da terra
    r = np.random.default_rng(8); n = 700
    x0 = r.random(n); y0 = r.uniform(0.35, 1.0, n); sp = r.uniform(0.4, 1.5, n)
    rise = ss(8, dur, ls) * 0.12 * sp * (ls - 8 if ls > 8 else 0) * 0.08
    xp = (x0 + wint(t) * 0.5 * sp * 0.3 + 0.01 * np.sin(sp * 20 + ls)) % 1; yp = y0 - rise * 3 - wint(t) * 0.03 * sp
    L = streaks(xp, yp, (0.002 + 0.06 * w) * np.ones(n), -0.003 * np.ones(n), r.uniform(0.3, 1, n) * (0.2 + 2.0 * w), ns=3, blur=1.2)
    img = img + L[..., None] * np.array((1, 0.88, 0.7), np.float32) * 0.9
    img = dof(img, 0.78, 1.4, 6)
    return img * float(ss(0, 0.6, ls))

def scene6(t, ls, dur):
    w = wind(t); p = ls / dur
    cam = 4.0 + 0.9 * ls
    img = valley(t, ls, dur, camZ=cam, w=w, light=0.3 + 0.5 * p, haze=0.55 + 0.3 * w, lift=ss(0.08, 0.7, p) * 0.9)
    img = draw_trees(img, t, w, 0.46)
    d = dust_layer(t, 0.4 + 0.6 * w, amt=2.2, vy0=0.2); d2 = dust_layer(t * 1.3 + 3, 0.5 + 0.5 * w, amt=1.6, vy0=0.0, big=True)
    img = img + (d + d2 * 0.7)[..., None] * np.array((1, 0.9, 0.72), np.float32) * 0.8
    img = ribbons(img, t, w)
    # tempestade de poeira: véu de névoa em movimento
    veil = samp(T3, U * 1.2 - wint(t) * 0.12, V * 2.5, 0, 0) * samp(T2, U * 0.8 - wint(t) * 0.07, V * 1.5) * (w * 0.55)
    img = img + veil[..., None] * np.array((0.8, 0.7, 0.55), np.float32) * 0.55
    return img
