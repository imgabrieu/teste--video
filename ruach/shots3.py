"""Cenas 7-10 e final: multidão em silhueta, igreja, corredor, mãos e a tipografia revelada pelo vento."""
from gfx import *
from shots1 import cloth, shot_chest, _PROF
from shots2 import valley, blit, add_dust, dof, ribbons
import shots2

# ---------------- pessoas (silhuetas)
def mk_person(var, seed=0):
    k = 3; Wp, Hp = 96 * k, 192 * k; c = np.zeros((Hp, Wp), np.float32); cx = 48 * k
    def L(p, q, th): cv2.line(c, (int(p[0] * k), int(p[1] * k)), (int(q[0] * k), int(q[1] * k)), 1, int(th * k), cv2.LINE_AA)
    bow = var in (4, 5)
    hy = 34 if bow else 26
    cv2.circle(c, (cx, int(hy * k)), int(14 * k), 1, -1, cv2.LINE_AA)
    if seed % 3 == 0: cv2.circle(c, (cx - 4 * k, int((hy - 2) * k)), int(15 * k), 1, -1, cv2.LINE_AA)   # cabelo
    L((48, hy + 8), (48, 54), 11)
    cv2.fillPoly(c, [(np.array([[20, 56], [76, 56], [70, 124], [26, 124]]) * k).astype(np.int32)], 1, cv2.LINE_AA)
    cv2.ellipse(c, (cx, 58 * k), (30 * k, 9 * k), 0, 180, 360, 1, -1, cv2.LINE_AA)
    L((34, 122), (33, 190), 15); L((62, 122), (63, 190), 15)
    if var == 0 or var == 4: L((22, 58), (15, 112), 10); L((74, 58), (81, 112), 10); cv2.circle(c, (15 * k, 114 * k), 5 * k, 1, -1)
    if var == 1: L((22, 58), (6, 84), 9); L((74, 58), (90, 84), 9); cv2.circle(c, (5 * k, 86 * k), 5 * k, 1, -1); cv2.circle(c, (91 * k, 86 * k), 5 * k, 1, -1)
    if var in (2, 5):
        L((22, 58), (9, 24), 9); L((74, 58), (87, 24), 9)
        for hx, hyy in ((8, 18), (88, 18)): cv2.circle(c, (hx * k, hyy * k), 6 * k, 1, -1)
    if var == 3: L((22, 58), (14, 112), 10); L((74, 58), (86, 16), 9); cv2.circle(c, (87 * k, 11 * k), 6 * k, 1, -1)
    return cv2.resize(c, (96, 192), interpolation=cv2.INTER_AREA)
PEOPLE = [mk_person(v, s) for v in range(6) for s in range(3)]   # index = v*3+s

def light_field(ls, cx=0.5, cy=0.40, strength=1.0, rays=1.0, col=(1.0, 0.8, 0.5), t=0.0, ramp=1.0):
    r2 = ((U - cx) * A) ** 2 + (V - cy) ** 2
    base = 0.05 + 0.5 * np.exp(-r2 / 0.09) + 0.22 * np.exp(-r2 / 0.6) + 0.14 * ss(0.2, 0.8, V) * (1 - V * 0.5)
    th = np.arctan2(V - cy, (U - cx) * A)
    rr = samp(T1, th * 0.9 + 0.3 * np.sin(t * 0.2), np.zeros_like(th) + 0.3 + 0.01 * ls, t * 0.01, 0) ** 2.0
    rr2 = samp(T3, th * 1.9, np.zeros_like(th) + 0.7, -t * 0.015, 0)
    rays_i = (rr * 1.4 + rr2 * 0.6) * np.exp(-np.sqrt(r2) * 1.4) * rays
    L = (base * 0.8 + rays_i * 0.75) * strength * ramp
    return colorize(L, [(0, (0.01, 0.008, 0.01)), (0.25, tuple(np.array(col) * 0.30)), (0.7, tuple(np.array(col) * 0.9)), (1.2, (1, 0.96, 0.88)), (3, (1, 1, 1))])

def crowd(img, ls, t, R=6, start=0.0, rise=1.6, span=2.5, arms=(0.0, 0.4, 0.7), bow=0.0, horizon=0.60, wind_w=0.5,
          rim=(1.0, 0.82, 0.55), rim_amt=1.0, dark=(0.012, 0.01, 0.012), seed=3, density=1.0):
    rng = np.random.default_rng(seed)
    for r in range(R):
        f = (r + 1) / R
        ybase = (horizon + (1.04 - horizon) * f ** 1.5) * H; hp = (0.15 + 0.62 * f ** 1.6) * H; wp = hp * 0.5
        sp = wp * 0.82 / density; n = int(W / sp) + 3
        alpha = np.zeros((H, W), np.float32)
        for i in range(n):
            rr = rng.random(4)
            x = (i - 0.5 + rr[0] * 0.5) * sp + 3 * np.sin(t * 1.3 + i * 1.7 + r) * (0.3 + wind_w)
            a0 = start + rr[1] * span * (0.4 + f * 0.6) + 0.12 * (R - r)
            hs = float(ss(a0, a0 + rise, ls))
            if hs <= 0.02: continue
            ra = float(ss(arms[0], arms[1], ls - rr[2] * 1.2)) ; rb = float(ss(arms[1], arms[2], ls - rr[2] * 1.5))
            var = 2 if rb > 0.6 else (1 if ra > 0.5 else 0)
            if bow > 0.5 and rr[3] < 0.8: var = 5 if var == 2 else 4
            if var == 0 and rr[3] > 0.93: var = 3
            spr = PEOPLE[var * 3 + int(rr[3] * 3) % 3]
            hfull = hp * (0.92 + 0.15 * rr[1]); ww = max(2, int(wp * (0.9 + 0.2 * rr[0])))
            if hfull * hs < 3: continue
            sp_r = cv2.resize(spr, (ww, int(hfull)), interpolation=cv2.INTER_AREA)[:max(1, int(hfull * hs))]
            x0 = int(x - ww / 2); y1 = int(ybase); y0 = y1 - sp_r.shape[0]
            xa, xb = max(0, x0), min(W, x0 + ww); ya, yb = max(0, y0), min(H, y1)
            if xb <= xa or yb <= ya: continue
            sub = sp_r[ya - y0:yb - y0, xa - x0:xb - x0]
            alpha[ya:yb, xa:xb] = np.maximum(alpha[ya:yb, xa:xb], sub)
        # alturas: pés escondidos pelo próximo grupo
        a3 = alpha[..., None]
        haze = 0.25 * (1 - f) ; dk = np.array(dark, np.float32) * (1 - haze) + img.mean((0, 1)) * haze * 0.6
        rim_i = np.clip(alpha - np.roll(alpha, max(2, int(H * 0.005)), 0), 0, 1) + 0.5 * np.clip(alpha - np.roll(alpha, max(2, int(W * 0.003)), 1), 0, 1)
        rim_i = blur_tex(rim_i, 0.9)
        img = img * (1 - a3) + dk * a3 + rim_i[..., None] * np.array(rim, np.float32) * rim_amt * (0.35 + 0.65 * f)
    return img

def floaters(img, t, w, n=900, seed=7, amt=0.7, col=(1.0, 0.9, 0.7)):
    P = Parts(n, seed, sy=(0.0, 1.0), speed=(0.4, 1.8)); x, y = P.at(t, base=0.01)
    L = streaks(x, y, (0.004 + 0.08 * w) * np.ones(n), np.zeros(n), P.sz * (0.3 + 0.6 * w) * amt, ns=4, blur=0.8)
    return img + L[..., None] * np.array(col, np.float32)

# ---------------- CENA 7: VIDA
def foot_shot(ls, t):
    w = 0.4
    img = valley(t, ls, 2, hc=0.2, f=0.9, vh=0.2, camZ=7 + ls * 0.1, w=w, light=0.4, haze=0.35, extra=[(0.8, 2.4, 0, 1.2, 0.3), (-0.8, 1.9, 2, 1.1, 0.2)])
    d = float(ss(0.15, 0.55, ls)); fy = 0.72 - (1 - d) * 0.7
    m = np.zeros((H, W), np.float32)
    lx = 0.46 * W
    cv2.line(m, (int(lx), int((fy - 0.95) * H)), (int(lx + 0.01 * W), int((fy - 0.09) * H)), 1.0, int(0.11 * H), cv2.LINE_AA)
    cv2.ellipse(m, (int(lx + 0.07 * W), int((fy - 0.035) * H)), (int(0.10 * W), int(0.045 * H)), 0, 0, 360, 1.0, -1, cv2.LINE_AA)
    m = blur_tex(m, 0.8)
    q = max(0, ls - 0.5)
    puff = samp(T1, X * 5, V * 5, q * 0.4, -q * 0.3) * np.exp(-(((X - A * 0.47) / (0.1 + 0.55 * q)) ** 2)) * np.exp(-(((V - 0.78) / (0.04 + 0.12 * q)) ** 2)) * ss(0, 0.15, q) * (1 - ss(0.3, 1.1, q))
    img = img * (1 - m[..., None] * 0.97) + puff[..., None] * np.array((0.9, 0.78, 0.6), np.float32) * 0.9
    img = dof(img, 0.78, 1.0, 5)
    return img * float(ss(0, 0.1, ls))

def scene7(t, ls, dur):
    p = ls / dur; w = 1.0 - 0.2 * p
    bg = light_field(ls, 0.5, 0.42, strength=0.6 + 0.6 * ss(0, 6, ls) + 0.6 * ss(8, dur, ls), rays=0.7 + 0.8 * ss(2, 8, ls), t=t)
    # fumaça/poeira que sobe com a explosão de movimento
    img = crowd(bg, ls, t, R=6, start=0.2, rise=1.5, span=3.0, arms=(5.5, 6.5, 8.2), wind_w=w, rim_amt=1.0)
    img = floaters(img, t, 1.0, n=1400, amt=1.0)
    k = (ls / dur)
    segs = [(2.6, 4.0, lambda l: shot_chest(l * 0.9 + 0.3, 2.9) * 1.4 + 0.0), (4.7, 6.1, lambda l: foot_shot(l, t)),
            (6.8, 8.2, lambda l: cloth(l + 0.8, 1.5, ((0.02, 0.015, 0.01), (0.65, 0.5, 0.3), (1, 0.9, 0.7))))]
    for a, b, fn in segs:
        if a <= ls < b:
            l = ls - a; img = fn(l)
            e = min(l, b - ls) / 0.12
            if e < 1: img = lerp(crowd_stub(ls, t, dur), img, float(np.clip(e, 0, 1)))
    f = float(ss(0, 0.5, ls))
    return img * f

def crowd_stub(ls, t, dur):
    bg = light_field(ls, 0.5, 0.42, strength=0.9, rays=1.0, t=t)
    return crowd(bg, ls, t, R=6, start=0.2, rise=1.5, span=3.0, arms=(5.5, 6.5, 8.2), wind_w=0.8)

# ---------------- CENA 8: IGREJA
def _proj(x, y, Z, cx=0.5, cy=0.47, f=0.95): return (cx + f * x / (Z * A)) * W, (cy + f * y / Z) * H
def quad(img, pts, col, a=1.0):
    m = np.zeros((H, W), np.float32); cv2.fillConvexPoly(m, np.array(pts, np.int32), 1.0, cv2.LINE_AA)
    img[...] = img * (1 - m[..., None] * a) + m[..., None] * np.array(col, np.float32) * a
    return m

def church_wide(ls, t, dur, ppl=0.0, raise_=0.0):
    p = ls / dur; amb = 0.06 + 0.5 * ss(1.0, 8.0, ls)
    img = np.zeros((H, W, 3), np.float32) + 0.012
    # parede do fundo + palco + cortina
    back = amb * 0.5 + 0.03
    quad(img, [_proj(-3, -1.2, 5.0), _proj(3, -1.2, 5.0), _proj(3, 0.9, 5.0), _proj(-3, 0.9, 5.0)], (back * 0.8, back * 0.6, back * 0.5))
    # cortina ondulante
    cx0, cx1, cy0, cy1 = 0.27, 0.73, 0.12, 0.47
    mx = (U > cx0) & (U < cx1) & (V > cy0) & (V < cy1)
    g = ss(1.0, 4.0, ls) * 0.9; uu = U * 24 + g * (1.2 * np.sin(V * 6 - ls * 3.2) + 0.7 * np.sin(V * 13 + ls * 4.5)) * (0.4 + V * 0.6)
    fold = 0.5 + 0.5 * np.sin(uu * 1.0 + 0.4 * np.sin(V * 4))
    cur = (0.08 + 0.55 * fold ** 1.5) * (0.35 + 0.65 * amb * 1.6) * (0.6 + 0.4 * (1 - np.abs(U - 0.5) * 2))
    img = np.where(mx[..., None], cur[..., None] * np.array((0.55, 0.12, 0.10), np.float32) * 1.2, img)
    # palco
    quad(img, [_proj(-1.6, 0.18, 4.2), _proj(1.6, 0.18, 4.2), _proj(1.6, 0.18, 5.0), _proj(-1.6, 0.18, 5.0)], (0.25 * amb, 0.17 * amb, 0.11 * amb))
    # piso
    fl = (V > 0.47)
    fz = 0.95 * 0.52 / np.maximum(V - 0.47, 0.01); aisle = np.exp(-(((U - 0.5) * A * fz / 0.95) ** 2) / 0.5)
    floor = (0.02 + 0.10 * amb * np.exp(-fz * 0.18)) * (0.4 + 0.9 * aisle) * (0.6 + 0.4 * samp(T1, (U - 0.5) * fz * 0.2, fz * 0.15))
    img = np.where(fl[..., None], colorize(floor, [(0, (0.01, 0.008, 0.008)), (0.2, (0.2, 0.12, 0.07)), (0.6, (0.8, 0.6, 0.4))]), img)
    # janelas nas paredes laterais
    for sgn in (-1, 1):
        for k in range(7):
            Z = 1.5 + 0.8 * k
            pts = [_proj(sgn * 1.9, -0.95, Z), _proj(sgn * 1.9, -0.95, Z + 0.45), _proj(sgn * 1.9, 0.0, Z + 0.45), _proj(sgn * 1.9, 0.0, Z)]
            quad(img, pts, (0.5 + 0.4 * amb, 0.42 + 0.4 * amb, 0.32 + 0.3 * amb), 0.5 * ss(0.5, 5, ls) + 0.1)
    # bancos (do fundo para a frente) e pessoas sentadas
    rng = np.random.default_rng(4)
    for k in range(10, -1, -1):
        Z = 1.3 + 0.62 * k
        for sgn in (-1, 1):
            x1, x2 = sgn * 0.32, sgn * 1.7
            top = _proj(0, 0.18, Z)[1]; fy = _proj(0, 0.52, Z)[1]
            xa, xb = sorted((_proj(x1, 0, Z)[0], _proj(x2, 0, Z)[0]))
            col = (0.025 + 0.05 * amb, 0.018 + 0.035 * amb, 0.014 + 0.025 * amb)
            quad(img, [(xa, top), (xb, top), (xb, fy), (xa, fy)], col)
            cv2.line(img, (int(xa), int(top)), (int(xb), int(top)), tuple(float(c) for c in (0.5 * amb, 0.34 * amb, 0.2 * amb)), 1, cv2.LINE_AA)
            # pessoas sentadas (cabeças e ombros)
            if ppl > 0:
                n = 5
                for j in range(n):
                    if rng.random() > ppl: continue
                    xw = sgn * (0.55 + 0.26 * j); px, py = _proj(xw, -0.05, Z); sc = 0.30 / Z * H
                    up = 1.0 if raise_ < 0.5 or rng.random() > raise_ else 1.0
                    cv2.circle(img, (int(px), int(py - sc * 0.15)), max(1, int(sc * 0.11)), (0.012, 0.01, 0.01), -1, cv2.LINE_AA)
                    cv2.ellipse(img, (int(px), int(py + sc * 0.12)), (max(1, int(sc * 0.2)), max(1, int(sc * 0.15))), 0, 180, 360, (0.012, 0.01, 0.01), -1, cv2.LINE_AA)
                    if raise_ > 0.5 and rng.random() < raise_:
                        cv2.line(img, (int(px + sc * 0.17), int(py + sc * 0.06)), (int(px + sc * 0.24), int(py - sc * 0.5)), (0.012, 0.01, 0.01), max(1, int(sc * 0.07)), cv2.LINE_AA)
                        cv2.circle(img, (int(px + sc * 0.245), int(py - sc * 0.53)), max(1, int(sc * 0.05)), (0.012, 0.01, 0.01), -1, cv2.LINE_AA)
    # lâmpadas acendendo
    glow = np.zeros((H, W), np.float32)
    for k in range(9):
        on = float(ss(1.2 + 0.45 * k, 2.4 + 0.45 * k, ls)); Z = 1.4 + 0.75 * k
        for sgn in (-1, 1):
            px, py = _proj(sgn * 0.8, -1.05, Z); r = (0.045 / Z) * H
            glow += on * np.exp(-(((_xx_ - px) ** 2 + (_yy_ - py) ** 2) / (r * r * 5)))
    glow = np.clip(glow, 0, 2.2)
    img = img + glow[..., None] * np.array((1.0, 0.72, 0.42), np.float32) * 0.5
    # luz do dia entrando pelas janelas + névoa de poeira
    img = img + samp(T2, U * 2 + t * 0.01, V * 2) [..., None] * np.array((0.8, 0.7, 0.5), np.float32) * 0.06 * amb
    return img

_yy_, _xx_ = np.mgrid[0:H, 0:W].astype(np.float32)

def bible_shot(ls, t, dur=2.6):
    img = np.zeros((H, W, 3), np.float32) + 0.008
    spot = np.exp(-((((U - 0.5) * A) ** 2) / 0.28 + ((V - 0.62) ** 2) / 0.18)) * (0.4 + 0.6 * ss(0, 0.6, ls))
    img += spot[..., None] * np.array((1.0, 0.72, 0.4), np.float32) * 0.22
    # estante / púlpito
    quad(img, [(0.1 * W, 0.86 * H), (0.9 * W, 0.86 * H), (0.96 * W, H), (0.04 * W, H)], (0.07, 0.04, 0.025))
    flut = ss(0.1, 2.2, ls); lift = 0.04 * flut * np.sin(ls * 9) + 0.1 * flut
    # páginas
    cx = 0.5 * W; y0 = 0.30 * H; y1 = 0.84 * H
    quad(img, [(cx - 0.02 * W, y0 + 8), (cx - 0.33 * W, y0 - 6), (cx - 0.35 * W, y1 - 12), (cx - 0.02 * W, y1)], (0.78, 0.7, 0.55))
    rp = [(cx + 0.02 * W, y0 + 8), (cx + 0.33 * W, y0 - 6 - lift * H * 0.9), (cx + 0.35 * W, y1 - 12 - lift * H * 0.1), (cx + 0.02 * W, y1)]
    m = quad(img, rp, (0.82, 0.74, 0.58))
    for side in (-1, 1):
        for ln in range(14):
            yy = y0 + 0.07 * H + ln * 0.033 * H
            xa = cx + side * 0.06 * W; xb = cx + side * (0.30 * W - 0.01 * W * (ln % 3))
            cv2.line(img, (int(xa), int(yy)), (int(xb), int(yy - (lift * H * 0.5 * (ln / 14) if side > 0 else 0))), (0.35, 0.3, 0.22), 1, cv2.LINE_AA)
    shade = (1 - ss(0.0, 0.5, np.abs(U - 0.5) * 2 * 0.0 + (V - 0.3)) * 0.0)
    img = img * (0.75 + 0.45 * spot[..., None] * 3)
    # poeira no feixe + folhas
    P = Parts(500, 21, sy=(0.1, 0.9), speed=(0.5, 1.5)); x, y = P.at(t, base=0.01)
    L = streaks(x, y, (0.01 + 0.05 * flut) * np.ones(500), np.zeros(500), P.sz * 0.7 * (0.3 + spot.max()), ns=3, blur=0.7)
    img += L[..., None] * np.array((1, 0.85, 0.6), np.float32) * 0.8 * spot[..., None] * 3
    return np.clip(img, 0, 1.6) * float(ss(0, 0.2, ls))

def scene8(t, ls, dur):
    A_end, B_end = 0.42 * dur, 0.66 * dur
    ppl = float(ss(0.5 * dur, 0.95 * dur, ls)) * 0.8; rs = float(ss(0.85 * dur, dur, ls))
    if ls < A_end:
        img = church_wide(ls, t, dur)
    elif ls < B_end:
        img = bible_shot(ls - A_end, t)
        if ls - A_end < 0.15: img = lerp(church_wide(ls, t, dur), img, (ls - A_end) / 0.15)
    else:
        img = church_wide(ls, t, dur, ppl=ppl, raise_=rs)
        if ls - B_end < 0.15: img = lerp(bible_shot(B_end - A_end, t), img, (ls - B_end) / 0.15)
    return img * float(ss(0, 0.5, ls))

# ---------------- CENA 9: SOM COMO DE UM VENTO
def corridor(ls, t, dur):
    f = 0.62; cx, cy = 0.5, 0.5
    img = np.zeros((H, W, 3), np.float32) + 0.01
    cam = ls * 1.2; amb = 0.1 + 0.4 * ss(0, 4, ls)
    # piso e teto (gradiente)
    zf = f * 0.55 / np.maximum(np.abs(V - cy), 0.004)
    flo = np.exp(-zf * 0.12) * (0.07 + 0.5 * amb) * (0.5 + 0.5 * samp(T1, (U - 0.5) * zf * 0.2, zf * 0.2 + cam * 0.2))
    img = np.where((V > cy)[..., None], colorize(flo, [(0, (0.01, 0.008, 0.008)), (0.3, (0.25, 0.17, 0.1)), (1, (0.9, 0.7, 0.45))]), colorize(flo * 0.55, [(0, (0.01, 0.01, 0.012)), (0.3, (0.14, 0.11, 0.09)), (1, (0.6, 0.5, 0.4))]))
    img = img.astype(np.float32)
    # paredes + portas (do fundo para a frente)
    ZP = 1.35; nrow = 9
    for k in range(nrow - 1, -1, -1):
        Z0 = (k * ZP - (cam % ZP)) + 1.0
        if Z0 < 0.45: continue
        for sgn in (-1, 1):
            idx = int(np.floor(cam / ZP)) + k
            op = float(ss(idx * 0.55 + 0.6, idx * 0.55 + 1.5, ls * 1.1 + 3.0 * (idx > 0) + 0.0)) if idx >= 0 else 1.0
            op = float(ss(0.3 + 0.18 * (nrow - k), 1.4 + 0.18 * (nrow - k), ls + 0.8 * (idx % 3) * 0)) if True else op
            th = op * 1.25 * (1 if idx % 2 else 0.8)
            x = sgn * 1.0; Zd = Z0; dw = 0.62
            hinge_top = _proj(x, -0.62, Zd, cx, cy, f); hinge_bot = _proj(x, 0.58, Zd, cx, cy, f)
            Zf = Zd + dw * np.cos(th); xf = x - sgn * dw * np.sin(th) * 0.0 + sgn * -dw * np.sin(th) * (-1) * 0.0
            xf = x - sgn * dw * np.sin(th) * 0.0
            # porta aberta: batente luminoso + folha
            fr_t = _proj(x, -0.62, Zd + dw, cx, cy, f); fr_b = _proj(x, 0.58, Zd + dw, cx, cy, f)
            lit = 0.15 + 1.2 * op
            quad(img, [hinge_top, fr_t, fr_b, hinge_bot], (0.9 * lit * 0.6, 0.72 * lit * 0.6, 0.45 * lit * 0.6), 0.95)
            if th > 0.05:
                free_t = _proj(x - sgn * dw * np.sin(th) * (-1), -0.62, Zd + dw * np.cos(th), cx, cy, f)
                free_b = _proj(x - sgn * dw * np.sin(th) * (-1), 0.58, Zd + dw * np.cos(th), cx, cy, f)
                quad(img, [hinge_top, free_t, free_b, hinge_bot], (0.045, 0.028, 0.018), 1.0)
    # raios radiais de vento e partículas
    th_ = np.arctan2(V - cy, (U - cx) * A); rad = np.sqrt(((U - cx) * A) ** 2 + (V - cy) ** 2)
    streak = samp(T3, th_ * 2.2, rad * 0.0 + 0.5, 0, 0) ** 3 * np.clip(rad * 1.6, 0, 1) * (0.3 + 0.7 * wind(t)) * 0.25
    img = img + streak[..., None] * np.array((1.0, 0.85, 0.6), np.float32) * (0.4 + amb)
    n = 900; r = np.random.default_rng(9); ang = r.uniform(0, 2 * np.pi, n); sp = r.uniform(0.5, 1.4, n); ph = r.random(n)
    rr = ((ph + t * 0.6 * sp) % 1.0) ** 1.6 * 0.9
    px = cx + np.cos(ang) * rr / A * 1.0; py = cy + np.sin(ang) * rr
    L = streaks(px, py, np.cos(ang) * rr * 0.09 / A, np.sin(ang) * rr * 0.09, rr * 0.9 * r.uniform(0.4, 1, n), ns=4, blur=0.7)
    img = img + L[..., None] * np.array((1, 0.9, 0.7), np.float32) * 1.1
    # tecidos voando pelo corredor (fitas radiais)
    m = np.zeros((H, W), np.float32)
    for i in range(8):
        a0 = r.uniform(0, 2 * np.pi); sp_ = r.uniform(0.5, 0.9); ph_ = r.random()
        pts = []
        for s in np.linspace(0, 1, 16):
            q = ((ph_ + t * 0.5 * sp_ - s * 0.25) % 1.0) ** 1.4 * 0.8
            a = a0 + 0.35 * np.sin(s * 8 + t * 3 + i)
            pts.append(((cx + np.cos(a) * q / A) * W, (cy + np.sin(a) * q) * H))
        pts = np.array(pts, np.int32)
        for k in range(15):
            q = np.hypot(*(pts[k] - [cx * W, cy * H])) / H
            cv2.line(m, tuple(pts[k]), tuple(pts[k + 1]), 1.0, int(max(1, q * 0.12 * H * (1 - k / 15))), cv2.LINE_AA)
    m = blur_tex(m, 2.0) * (0.3 + 0.3 * ss(0, 3, ls))
    img = img * (1 - m[..., None] * 0.6) + m[..., None] * np.array((0.8, 0.65, 0.45), np.float32) * 0.28
    return img

def scene9(t, ls, dur):
    cut = 0.62 * dur
    if ls < cut:
        img = corridor(ls, t, dur)
        if ls > cut - 0.35: img = lerp(img, crowd_light(ls, t, 0.0), float(ss(cut - 0.35, cut, ls)))
    else:
        img = crowd_light(ls, t, ls - cut)
    return img * float(ss(0, 0.25, ls))

def crowd_light(ls, t, q):
    bg = light_field(ls, 0.5, 0.40, strength=0.9 + 0.7 * ss(0, 3, q), rays=1.1 + 0.6 * ss(0, 3, q), t=t)
    img = crowd(bg, 99.0, t, R=7, start=0, rise=0.01, span=0.01, arms=(0.0, 0.0, 0.0), wind_w=0.9, rim_amt=1.3, seed=11, density=1.15)
    return floaters(img, t, 1.0, n=1500, amt=1.1)

# ---------------- CENA 10: HOJE
def hands_shot(ls, t, dur):
    p = ls / dur
    bg = light_field(ls, 0.5, 0.55, strength=1.3 + 0.8 * p, rays=1.4, t=t)
    m = np.zeros((H, W), np.float32)
    r = np.random.default_rng(31)
    for i in range(7):
        x = 0.1 + 0.8 * (i + r.random() * 0.4) / 7; sc = 0.6 + 0.7 * r.random(); rise = float(ss(0, 1.4 + 0.2 * i, ls * 1.2 + r.random() * 0.5))
        base = H * 1.05; top = H * (0.95 - 0.55 * sc * rise); sway = np.sin(t * 1.6 + i * 2) * 0.01 * W
        cxp = x * W + sway
        arm_w = max(3, int(0.10 * H * sc))
        cv2.fillPoly(m, [np.array([[cxp - arm_w * 1.1, base], [cxp + arm_w * 1.1, base], [cxp + sway * 0.5 + arm_w * 0.45, top + arm_w * 1.5], [cxp + sway * 0.5 - arm_w * 0.45, top + arm_w * 1.5]], np.int32)], 1.0, cv2.LINE_AA)
        # mão: palma + dedos
        pw = 0.05 * H * sc * 1.4; palm_c = (cxp + sway * 0.5, top)
        cv2.ellipse(m, (int(palm_c[0]), int(palm_c[1])), (int(pw), int(pw * 1.15)), 0, 0, 360, 1.0, -1, cv2.LINE_AA)
        for fng in range(5):
            a = -np.pi / 2 + (fng - 2) * 0.32 + 0.05 * np.sin(t * 2 + fng + i); ln = pw * (1.5 + 0.2 * (fng in (1, 2, 3)))
            ex_ = palm_c[0] + np.cos(a) * ln; ey_ = palm_c[1] + np.sin(a) * ln - pw * 0.5
            cv2.line(m, (int(palm_c[0] + (fng - 2) * pw * 0.35), int(palm_c[1] - pw * 0.5)), (int(ex_), int(ey_)), 1.0, max(1, int(pw * 0.34)), cv2.LINE_AA)
        # polegar
        cv2.line(m, (int(palm_c[0] - pw * 0.8), int(palm_c[1])), (int(palm_c[0] - pw * 1.6), int(palm_c[1] - pw * 0.6)), 1.0, max(1, int(pw * 0.34)), cv2.LINE_AA)
    m = blur_tex(m, 0.9)
    rim = blur_tex(np.clip(m - np.roll(m, 3, 1), 0, 1), 1.0)
    img = bg * (1 - m[..., None]) + np.array((0.012, 0.01, 0.01), np.float32) * m[..., None] + rim[..., None] * np.array((1.0, 0.85, 0.6), np.float32) * 0.9
    # tecido / mangas ao vento: faixas translúcidas
    img = floaters(img, t, 0.9, n=1100, amt=1.0)
    return img

def head_shot(ls, t, dur):
    bg = light_field(ls, 0.70, 0.42, strength=1.5, rays=1.3, t=t)
    sc = 0.78; cxh = A * 0.40; cyh = 0.56 - 0.01 * ls
    pts = _PROF.copy(); c, s_ = np.cos(0.12), np.sin(0.12); pts = np.stack([pts[:, 0] * c - pts[:, 1] * s_, pts[:, 0] * s_ + pts[:, 1] * c], 1)
    px = ((cxh + pts[:, 0] * sc) / A * W); py = ((cyh + pts[:, 1] * sc) * H)
    m = np.zeros((H, W), np.float32); cv2.fillPoly(m, [np.stack([px, py], 1).astype(np.int32)], 1, cv2.LINE_AA); m = blur_tex(m, 0.8)
    rim = blur_tex(np.clip(m - np.roll(np.roll(m, 3, 1), -1, 0), 0, 1), 1.0)
    img = bg * (1 - m[..., None]) + np.array((0.012, 0.01, 0.01), np.float32) * m[..., None] + rim[..., None] * np.array((1.0, 0.86, 0.6), np.float32) * 1.0
    return floaters(img, t, 0.9, n=1000, amt=1.0)

def scene10(t, ls, dur):
    a1, a2, a3 = 0.28 * dur, 0.5 * dur, 0.72 * dur
    ramp = 1.0 + 7.0 * float(ss(0.9 * dur, dur, ls)) ** 2
    def wide(bowed, l):
        bg = light_field(l, 0.5, 0.40, strength=1.0 + 0.6 * ss(0, dur, l), rays=1.1, t=t, ramp=ramp)
        img = crowd(bg, 99.0 if not bowed else 0.0, t, R=7, start=0, rise=0.01, span=0.01, arms=(2.0, 4.0, 6.0) if bowed else (0, 0, 0), bow=1.0 if bowed else 0.0,
                    wind_w=0.8, rim_amt=1.4, seed=17, density=1.1)
        return floaters(img, t, 1.0, n=1500, amt=1.1)
    # arms raise through the first wide shot
    if ls < a1: img = wide(True, ls)
    elif ls < a2: img = hands_shot(ls - a1, t, a2 - a1)
    elif ls < a3: img = head_shot(ls - a2, t, a3 - a2)
    else: img = wide(False, ls)
    for edge in (a1, a2, a3):
        if edge <= ls < edge + 0.25:
            u = (ls - edge) / 0.25
            prev = wide(True, ls) if edge == a1 else (hands_shot(ls - a1, t, a2 - a1) if edge == a2 else head_shot(ls - a2, t, a3 - a2))
            img = lerp(prev, img, u)
    if ls > 0.88 * dur: img = lerp(img, np.ones_like(img), float(ss(0.88 * dur, dur - 0.05, ls)) ** 1.6)
    return img * float(ss(0, 0.4, ls))

# ---------------- FINAL: tipografia
from PIL import Image, ImageDraw, ImageFont
F_LAT = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
F_LATB = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
F_HEB = "/usr/share/fonts/truetype/freefont/FreeSerif.ttf"
def text_mask(txt, font, size_px, track=0.0, cx=0.5, cy=0.5):
    f = ImageFont.truetype(font, size_px); im = Image.new("L", (W, H), 0); d = ImageDraw.Draw(im)
    ws = [d.textlength(ch, font=f) for ch in txt]; tot = sum(ws) + track * size_px * (len(txt) - 1)
    x = cx * W - tot / 2
    asc, desc = f.getmetrics(); y = cy * H - (asc + desc) / 2
    for ch, wd in zip(txt, ws):
        d.text((x, y), ch, font=f, fill=255); x += wd + track * size_px
    return np.asarray(im, np.float32) / 255.0

def mk_final_layers():
    hb = lambda s: int(H * s)
    L = {}
    L["heb_big"] = text_mask("חור", F_HEB, hb(0.62), 0.0, 0.5, 0.5)
    L["heb_small"] = text_mask("חור", F_HEB, hb(0.20), 0.0, 0.5, 0.115)
    L["ruach"] = text_mask("RUACH", F_LAT, hb(0.34), 0.20, 0.5, 0.40)
    L["conf"] = text_mask("CONFERENCE", F_LAT, hb(0.092), 0.62, 0.5, 0.60)
    L["date"] = text_mask("14–15 NOVEMBRO", F_LAT, hb(0.062), 0.34, 0.5, 0.735)
    L["anos"] = text_mask("19 ANOS  ·  OBPC LIMEIRA", F_LAT, hb(0.062), 0.34, 0.5, 0.82)
    L["verse"] = text_mask("EZEQUIEL 37:9", F_LAT, hb(0.045), 0.5, 0.5, 0.935)
    return L
LAYERS = mk_final_layers()
_fp = {k: np.argwhere(v > 0.5) for k, v in LAYERS.items()}
_fr = np.random.default_rng(2)
_fs = {k: _fp[k][_fr.choice(len(_fp[k]), min(5000, len(_fp[k])), replace=False)] for k in _fp}
_fpar = {k: (_fr.uniform(0.4, 1.6, len(_fs[k])), _fr.uniform(-1, 1, len(_fs[k])), _fr.uniform(0.3, 1, len(_fs[k]))) for k in _fs}

def reveal(key, ls, dur=2.4, away=False):
    """ls: segundos desde o início; revela a máscara como poeira soprada. away=True dissolve."""
    q = float(ss(0, 1, ls / dur)); 
    if away: q = 1 - q
    if q <= 0: return np.zeros((H, W), np.float32), np.zeros((H, W), np.float32)
    m = LAYERS[key]
    amp = (1 - q) ** 2 * 0.18
    nx = samp(T1, U * 2.5, V * 2.5, ls * 0.05, 0) - 0.5; ny = samp(T3, U * 2.5, V * 2.5, 0.3, ls * 0.04) - 0.5
    dx = (amp * (1.2 + 3 * nx)) * W; dy = (amp * ny * 1.2) * H
    mx = (_xx_ - dx).astype(np.float32); my = (_yy_ - dy).astype(np.float32)
    sh = cv2.remap(m, mx, my, cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT)
    sh = blur_tex(sh, 0.6 + 7.0 * (1 - q) ** 2 * (W / 960))
    front = ss(-0.25, 0.15, q * 1.45 - U)
    shim = 1.0 + 0.04 * np.sin(ls * 1.7 + U * 6) * (q > 0.95)
    out = sh * front * np.clip(q * 1.6, 0, 1) * shim
    # grãos soprados
    pts = _fs[key]; sp, off, br = _fpar[key]
    px = (pts[:, 1] / W - (1 - q) * 0.55 * sp * (1.0 + off * 0.3) - 0.02 * (1 - q) ** 2); py = pts[:, 0] / H + (1 - q) * 0.12 * off * sp
    gr = streaks(px, py, 0.05 * (1 - q) * np.ones(len(pts)), 0.0 * px, br * (1 - q) ** 0.7 * 1.2 * (q > 0.0), ns=3, blur=0.9)
    return out, gr

def scene_final(t, ls):
    """ls: segundos desde o corte para o preto. ls<0: preto absoluto"""
    from timeline import FT
    img = np.zeros((H, W, 3), np.float32)
    g = max(0.0, t - FT["gust"])
    img += (0.012 + 0.03 * np.exp(-((((U - 0.5) * A) ** 2) / 0.3 + ((V - 0.5) ** 2) / 0.12)))[..., None] * np.array((0.8, 0.65, 0.4), np.float32) * float(ss(0.2, 3.0, g))
    # rajada: grãos e névoa atravessando
    if g > 0:
        gv = float(ss(0, 0.35, g)) * float(1 - ss(0.5, 3.5, g)) + 0.08
        P = Parts(1800, 41, sy=(0.0, 1.0), speed=(0.6, 2.4)); x, y = P.at(g * 1.5 + 0.2, wi=g * 2.2 * gv + 0.0)
        L = streaks(x, y, (0.01 + 0.12 * gv) * np.ones(1800), np.zeros(1800), P.sz * (0.2 + 1.2 * gv), ns=4, blur=0.8)
        fog = samp(T3, U * 1.3 - g * 0.6, V * 2.0, 0, 0) * samp(T2, U * 0.9 - g * 0.3, V * 1.3) * gv
        img += L[..., None] * np.array((1, 0.85, 0.6), np.float32) * 0.9 + fog[..., None] * np.array((0.8, 0.7, 0.55), np.float32) * 0.25
    gold = np.array((0.98, 0.80, 0.50), np.float32); pale = np.array((0.97, 0.94, 0.88), np.float32); silver = np.array((0.78, 0.8, 0.84), np.float32)
    def add(key, t0, col, dur=2.4, strength=1.0, away_at=None, away_dur=1.6):
        nonlocal img
        l = t - t0
        if l <= 0: return
        if away_at is not None and t > away_at: m, gr = reveal(key, t - away_at, away_dur, away=True)
        else: m, gr = reveal(key, l, dur)
        halo = blur_tex(m, 10 * W / 960) * 0.35
        img = img + (m * strength + gr * 0.5)[..., None] * col + halo[..., None] * col * 0.5
    add("heb_big", FT["hebrew"], gold, 2.8, 1.0, away_at=FT["ruach"] - 0.3)
    add("heb_small", FT["ruach"] + 0.4, gold, 2.4, 0.9)
    add("ruach", FT["ruach"], pale, 2.8, 1.0)
    add("conf", FT["conf"], silver * 1.1, 2.4, 0.95)
    add("date", FT["info"], gold, 2.0, 0.9); add("anos", FT["info"] + 0.5, pale * 0.9, 2.0, 0.9)
    add("verse", FT["verse"], silver, 2.0, 0.85)
    return img
