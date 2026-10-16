"""Cenas 1-3: água, mar aberto, montagem do sopro."""
from gfx import *

# ---------------- CENA 1: água escura em close
_r = np.random.default_rng(4)
_WV = [(_r.uniform(-1, 1) * 14, _r.uniform(0.5, 1) * 55 + 18, _r.uniform(1.0, 2.4), _r.uniform(0, 6.28), _r.uniform(0.7, 1.4) * 0.0065 / 3) for _ in range(9)]
_LIGHTS = [(0.18 * A, 0.12, (1.0, 0.62, 0.28), 1.0), (0.64 * A, 0.04, (0.95, 0.8, 0.6), 0.7), (0.88 * A, 0.03, (0.55, 0.7, 1.0), 0.8), (0.4 * A, 0.0, (0.9, 0.55, 0.3), 0.5)]

def water_close(ls):
    env_t = ss(4.5, 9.5, ls); front = -0.3 + (A + 0.6) * ss(4.8, 9.2, ls)
    env = env_t * ss(0, 1, (front - X) * 2.2 + 0.2) * 1.0
    h = np.zeros((H, W), np.float32); hx = h.copy(); hy = h.copy()
    for kx, ky, w, ph, amp in _WV:
        arg = kx * X + ky * V - w * ls * 1.4 + ph; c = np.cos(arg)
        hx += amp * kx * c; hy += amp * ky * c
    hx *= env; hy *= env
    drift = 0.004 * np.sin(ls * 0.6)
    base = 0.02 + 0.05 * (1 - V) ** 2 + 0.08 * samp(T3, X * 0.5, V * 0.9, ls * 0.002, drift) * (0.4 + 0.6 * env)
    L = np.zeros((H, W, 3), np.float32) + to3(base, (0.35, 0.55, 0.62))
    for xl, yl, col, ia in _LIGHTS:
        sig = 0.03 + 0.09 * V
        g = np.exp(-(((X - xl + 0.12 * hx) / sig) ** 2)) * np.exp(-np.maximum(V - yl, 0) * 2.4) * (V > yl)
        mod = np.clip(0.4 + 5.0 * np.abs(hy) + 0.8 * (0.5 + 0.5 * np.sin(V * 120 + hy * 300)) * env, 0, 2.5)
        L += to3(g * mod * ia * (0.55 + 0.45 * env) * 0.55, col)
    spec = np.clip(1 - np.abs(hy) * 14, 0, 1) ** 12 * env * 0.25 * samp(T1, X * 3, V * 3, ls * 0.01)
    L += to3(spec, (0.7, 0.85, 1.0))
    return L * float(ss(1.0, 4.8, ls))

# ---------------- CENA 2: águas profundas, névoa, luz distante
def water_wide(ls, dur):
    p = ls / dur; vh = 0.47 - 0.02 * p
    w = 0.25 + 0.5 * p; below = V > vh
    z = 1.0 / np.maximum(V - vh, 0.012)
    Xw = (U - 0.5) * z * 1.9; Zw = z + ls * 1.1
    h = np.sin(Xw * 2.1 + Zw * 0.9 + ls * 0.4) * 0.5 + np.sin(Xw * 1.3 - Zw * 1.7) * 0.3 + (samp(T1, Xw * 0.15, Zw * 0.12) - 0.5) * 1.2
    slope = np.clip(0.5 + 0.5 * h * (0.4 + w), 0, 1)
    glowx = np.exp(-(((U - 0.5) * A / (0.05 + 0.4 * (V - vh))) ** 2)) * np.exp(-(V - vh) * 3.0)
    gl = 0.12 + 0.88 * p ** 1.3
    wat = (0.012 + 0.03 * slope * ss(vh, 1.0, V)) + glowx * gl * slope ** 2 * 0.9
    sky = 0.01 + 0.04 * np.exp(-(vh - V) * 4.0) + gl * 0.5 * np.exp(-(((U - 0.5) * A) ** 2 / 0.12 + (vh - V) ** 2 / 0.012))
    sky += 0.03 * samp(T2, U * 2, V * 3, ls * 0.01) * np.exp(-(vh - V) * 3)
    L = np.where(below, wat, sky).astype(np.float32)
    fog = samp(T2, U * 2.0 + ls * 0.012, V * 7 + 0.3, ls * 0.007) * samp(T1, U * 3, V * 9, -ls * 0.02)
    fogm = np.exp(-np.abs(V - vh) * 7.0) * (0.45 + 0.9 * gl)
    L = L + fog * fogm * 0.22 * (0.2 + gl)
    # faixas de vento atravessando a superfície
    gust = samp(T3, U * 0.6 - ls * 0.05 * (1 + 2 * w), V * 14, 0, 0) ** 3 * ss(vh, vh + 0.1, V) * w * 0.12
    L = L + gust
    col = colorize(np.clip(L * 1.15, 0, 1.4), [(0, (0.008, 0.012, 0.02)), (0.12, (0.05, 0.1, 0.13)), (0.4, (0.45, 0.58, 0.62)), (0.8, (0.92, 0.9, 0.78)), (1.4, (1, 0.97, 0.9))])
    return col * float(ss(0, 1.6, ls))

# ---------------- CENA 3: o sopro (4 planos)
_vap = Parts(0, 0)
_PROF = np.array([(-0.35,-0.45),(-0.1,-0.56),(0.2,-0.5),(0.37,-0.32),(0.42,-0.16),(0.44,-0.08),(0.43,0.0),(0.56,0.12),(0.46,0.165),(0.49,0.2),
    (0.45,0.235),(0.48,0.262),(0.44,0.34),(0.38,0.44),(0.22,0.46),(0.18,0.56),(0.2,0.9),(0.3,1.05),(0.8,1.18),(1.3,1.35),(1.6,2.6),(-1.7,2.6),(-1.0,1.3),(-0.45,0.95),(-0.33,0.55),(-0.36,0.2)], np.float32)
def shot_chest(ls, dur=2.9):
    b = 0.5 - 0.5 * np.cos(2 * np.pi * ls / 3.0 - 0.3)
    ex = ss(0.8, 1.5, ls) * (1 - ss(1.9, 2.9, ls))
    sc = 0.48; cx = A * 0.42; cy = 0.46 + 0.012 * (1 - ls / dur)
    pts = _PROF.copy(); pts[:, 1] = np.where(pts[:, 1] > 0.8, pts[:, 1] - 0.025 * b * (pts[:, 1] - 0.8), pts[:, 1])
    px = ((cx + pts[:, 0] * sc) / A * W).astype(np.float32); py = ((cy + pts[:, 1] * sc) * H).astype(np.float32)
    m = np.zeros((H, W), np.float32); cv2.fillPoly(m, [np.stack([px, py], 1).astype(np.int32)], 1.0, lineType=cv2.LINE_AA)
    m = blur_tex(m, 0.8)
    M = np.float32([[1, 0, -W * 0.012], [0, 1, -H * 0.02]]); ms = cv2.warpAffine(m, M, (W, H))
    rim = blur_tex(np.clip(m - ms, 0, 1), 1.2); rim[-6:] = 0; rim[:, :6] = 0; rim[:, -6:] = 0
    nx = samp(T1, X * 2.5, V * 4.0)
    body = m * (0.018 + 0.03 * nx) + rim * 0.95 * (0.7 + 0.3 * nx)
    bg = 0.01 + 0.035 * np.exp(-(((X - A * 0.18) ** 2) / 0.12 + ((V - 0.3) ** 2) / 0.1))
    vp = 0.0
    if ex > 0:
        mx = cx + 0.47 * sc; my = cy + 0.235 * sc
        dn = samp(T2, X * 1.3 - ls * 0.05, V * 1.6, ls * 0.05, -ls * 0.06) * samp(T1, X * 2.4, V * 2.8, -ls * 0.05, -ls * 0.12)
        spread = 0.06 + 0.26 * ex
        pm = np.exp(-(((X - mx - 0.28 * ex) / (spread * 1.6)) ** 2)) * np.exp(-(((V - my + 0.08 * ex) / spread) ** 2))
        vp = np.clip(dn * 1.8 - 0.3, 0, 1) * pm * ex * 0.8
    L = bg * (1 - m) + body + vp
    return colorize(L, [(0, (0.006, 0.01, 0.016)), (0.2, (0.12, 0.17, 0.2)), (0.6, (0.7, 0.8, 0.85)), (1.2, (1, 1, 1))]) * float(ss(0, 0.5, ls))

_sand = Parts(5000, 11, sy=(0.1, 1.0), speed=(0.6, 2.2))
def shot_sand(ls, dur=2.9):
    ridge = 0.72 + 0.04 * np.sin(X * 3.1 + 0.4) + 0.025 * np.sin(X * 7.7 + 1.2) - 0.03 * ss(0, A, X)
    gl = np.exp(-(((X - A * 0.15) ** 2) / 0.35 + ((V - 0.62) ** 2) / 0.05))
    sky = 0.05 + 0.55 * gl
    ground = np.where(V > ridge, 0.015 + 0.02 * samp(T1, X * 4, V * 6), sky)
    # lâmina de areia rasante
    sheet = samp(T3, X * 0.7 - ls * 1.4, V * 9, 0, 0) ** 2 * np.exp(-np.abs(V - ridge - 0.04) * 8) * 0.55 * (0.4 + 0.6 * ss(0, 1.2, ls))
    x, y = _sand.at(ls * 1.6, wi=ls * 1.9 + 0.4)
    st = streaks(x, y, 0.025 * np.ones_like(x), 0.0 * x, _sand.sz * 0.55 * np.exp(-((y - ridge.mean()) ** 2) * 0.0), ns=4, blur=0.6)
    L = ground + sheet * (0.6 + 0.4 * gl) + st * 0.55 * (0.3 + 1.1 * gl)
    return colorize(L, [(0, (0.01, 0.007, 0.006)), (0.2, (0.25, 0.14, 0.07)), (0.6, (0.85, 0.6, 0.33)), (1.2, (1, 0.92, 0.75))]) * float(ss(0, 0.4, ls))

def cloth(ls, strength=1.0, tint=((0.01, 0.012, 0.018), (0.55, 0.62, 0.7), (1, 0.9, 0.78)), t_off=0.0):
    g = ss(0.4, 1.6, ls + t_off) * (1 - 0.5 * ss(2.2, 3.4, ls + t_off)) * strength
    front = (ls + t_off) * 1.1 - 0.2 - X * 0.5
    sweep = ss(0, 1, front * 3) * g
    uu = X * 0.9 + sweep * (0.22 * np.sin(V * 5.0 + ls * 7) + 0.15 * np.sin(V * 11 - ls * 9 + X * 3)) * (0.3 + V)
    folds = np.sin(uu * 9.0 + 0.8 * np.sin(V * 3 + X) + sweep * 2.6 * np.sin(V * 4 - ls * 6)) * 0.5 + 0.5
    folds2 = np.sin(uu * 22 + V * 4) * 0.5 + 0.5
    shade = 0.15 + 0.7 * folds ** 1.6 + 0.12 * folds2 * folds
    rim = ss(0.3, 1.0, X / A) * 0.5 + 0.5
    L = shade * rim * (0.45 + 0.35 * ss(0.1, 1, 1 - V)) + 0.04 * samp(T1, X * 6, V * 6, 0, 0)
    return colorize(L * 0.95, [(0, tint[0]), (0.55, tint[1]), (1.0, tint[2])])

def shot_cloth(ls, dur=2.9): return cloth(ls) * float(ss(0, 0.3, ls))

def shot_flame(ls, dur=2.9):
    g = ss(0.9, 1.35, ls) * (1 - ss(1.7, 2.7, ls))              # rajada
    hf = 0.52 * (1 - 0.8 * g) + 0.03 * np.sin(ls * 23) ; hf = max(hf, 0.05)
    bend = 0.28 * g + 0.012 * np.sin(ls * 17)
    base_y = 0.86; s = np.clip((base_y - V) / hf, -0.2, 1.3)
    cx = A / 2 + bend * s ** 2 * hf * 4 + 0.006 * np.sin(ls * 31 + s * 5) * s
    wf = 0.03 * np.sqrt(np.clip(s, 0, 1)) * (1 - np.clip(s, 0, 1)) ** 0.55 * 2.4 + 0.0015
    fl = np.exp(-(((X - cx) / wf) ** 2)) * ((s > 0) & (s < 1.0)) * (1 - 0.3 * s)
    core = np.exp(-(((X - cx) / (wf * 0.35)) ** 2)) * ((s > 0) & (s < 0.55))
    halo = np.exp(-(((X - A / 2) ** 2 + (V - base_y + hf * 0.5) ** 2 * 1.4) / (0.045 + 0.1 * hf)))
    wick = np.exp(-(((X - A / 2) / 0.003) ** 2)) * ((V > base_y) & (V < base_y + 0.03)) * 0.4
    smoke = samp(T2, X * 4 - ls * 0.2, V * 4 + ls * 0.6) * np.exp(-(((X - A / 2 - 0.05 * np.sin(V * 12 + ls * 3)) / 0.04) ** 2)) * ss(base_y - 0.25, base_y - 0.02, V) * (V < base_y) * g * 0.3
    L = fl * 0.9 + core * 0.8 + halo * 0.28 * (0.4 + 0.6 * (hf / 0.52)) + wick + smoke * 0.4
    col = colorize(np.clip(L, 0, 1.4), [(0, (0.006, 0.004, 0.004)), (0.15, (0.28, 0.07, 0.02)), (0.5, (0.95, 0.45, 0.1)), (0.9, (1, 0.82, 0.45)), (1.4, (1, 1, 0.85))])
    return col * float(ss(0, 0.35, ls))

def montage_sopro(ls, dur):
    shots = [shot_chest, shot_sand, shot_cloth, shot_flame]; n = len(shots); seglen = dur / n; x = 0.35
    i = min(n - 1, int(ls // seglen)); l = ls - i * seglen
    img = shots[i](l, seglen + x)
    if l > seglen - x and i < n - 1:
        a = float(ss(seglen - x, seglen, l)); img = lerp(img, shots[i + 1](l - seglen, seglen + x), a)
    return img
