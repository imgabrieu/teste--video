"""Renderizadores das cenas (meia resolução, float RGB). Tudo é função pura de t."""
import math
import numpy as np
from common import *


# ───────────────────────── ÁGUA (macro) ─────────────────────────
def water_macro(t):
    ax = (X - 0.3) * ASP
    ay = (Y - 0.62)
    r = np.sqrt(ax * ax + ay * ay)
    h = 0.02 * blur(samp(TB, X * 0.8 + t * 0.004, Y * 0.8), 2)
    # ondas concêntricas (primeiro toque do vento)
    if t > 2.0:
        lt = t - 2.0
        front = sm(lt * 0.16 + 0.02, lt * 0.16 - 0.06, r)
        h += 0.012 * np.sin(70 * r - 7 * lt) * np.exp(-r * 2.5) * front * sms(2.0, 3.2, t)
    # linha de ondas atravessando → (T01.2)
    if t > 5.0:
        lt = t - 5.0
        band = np.exp(-((X - (-0.2 + lt * 0.32)) / 0.35) ** 2)
        h += 0.010 * np.sin(55 * X - 6 * lt + 4 * Y) * band * sms(5.0, 6.0, t)
        h += 0.005 * np.sin(30 * X - 3 * lt) * sms(6, 8.5, t)
    gx = np.gradient(h, axis=1) * W
    gy = np.gradient(h, axis=0) * H
    spec = np.clip(-gx * 0.9 + gy * 0.5, 0, None) ** 2 * 0.35
    img = rgb(NOITE * 0.55, np.ones_like(X))
    img += rgb(OURO, np.clip(spec, 0, 1.2) * 0.9 * (0.35 + 0.65 * sm(1.0, 0.2, np.abs(Y - 0.6))))
    # ponto âmbar refletido (deslocado pelo relevo)
    dxp = X - 0.3 + gx * 0.004
    dyp = Y - 0.62 + gy * 0.004
    img += rgb(DEST, np.exp(-((dxp * ASP / 0.012) ** 2 + (dyp / 0.008) ** 2)) * 1.4)
    img += rgb(OURO, np.exp(-((dxp * ASP / 0.06) ** 2 + (dyp / 0.03) ** 2)) * 0.15)
    # névoa →
    mist = samp(TA, X * 0.7 - t * 0.03, Y * 1.2)
    img += rgb(MARFIM, sm(0.55, 0.9, mist) * 0.06)
    # horizonte difuso no fim de T01.2 (ilusão de escala)
    hz = sms(7.3, 9.0, t)
    if hz > 0:
        img += rgb(BRASA * 0.6 + OURO * 0.2, np.exp(-((Y - 0.06) / 0.05) ** 2) * hz * 0.6)
    return img


# ───────────────────────── OCEANO ─────────────────────────
def ocean(t, hy, speed, pool=0.0, gap=0.0, lt=0.0):
    img = np.zeros((H, W, 3), F32)
    st = np.clip((hy - Y) / hy, 0, 1)
    sky = rgb(NOITE * 1.25, st ** 0.5) + rgb(BRASA * 0.55 + OURO * 0.12, (1 - st) ** 3)
    cl = samp(TA, X * 1.2 + t * 0.006, Y * 2.2 + 0.3)
    cl2 = samp(TA, X * 2.4 + t * 0.012 + 0.5, Y * 4.0)
    sky *= (0.55 + 0.7 * (0.6 * cl + 0.4 * cl2))[..., None]
    img += sky * (Y < hy)[..., None]
    # brilho do horizonte
    hn = samp(TB, X * 3 + 0.2, np.full_like(X, 0.5))
    img += rgb(OURO, np.exp(-((Y - hy) / 0.01) ** 2) * (0.35 + 0.65 * hn) * 0.9)
    img += rgb(BRASA * 0.8, np.exp(-((Y - hy) / 0.06) ** 2) * 0.35)
    # abertura nas nuvens + coluna de luz
    if gap > 0:
        gxp = 0.58
        g = np.exp(-(((X - gxp) * ASP / 0.12) ** 2 + ((Y - 0.12) / 0.07) ** 2)) * (0.5 + 0.8 * cl)
        img += rgb(DEST * 0.9 + MARFIM * 0.1, g * gap * (Y < hy))
        py = hy + 0.10
        img += rgb(OURO, beam(gxp, 0.13, gxp + lt * 0.02, py, 0.05, 0.10) * gap * 0.35)
    # mar
    d = np.clip(Y - hy, 1e-3, None)
    z = 0.035 / d
    wx = (X - 0.5) * z * 2.2
    wz = z + t * speed
    w1 = samp(TB, wx * 0.5 + t * 0.01, wz * 0.35)
    w2 = samp(TA, wx * 1.6 + t * 0.03, wz * 1.2)
    wave = 0.6 * w1 + 0.4 * w2
    paws = samp(TB, wx * 0.25 - t * 0.05, wz * 0.18 + 0.4)   # rajadas que correm →
    sea = rgb(NOITE * 0.85, np.ones_like(X)) * (0.65 + 0.5 * paws)[..., None]
    glint = np.clip((wave - 0.58) * 7, 0, 1) ** 2 * np.exp(-d * 6)
    sea += rgb(OURO, glint * 0.6 * (0.4 + 0.6 * np.exp(-np.abs(X - 0.5) * 2)))
    sea += rgb(NOITE * 0.6 + GRAF * 0.4, (wave - 0.5) * 0.4)
    if pool > 0:
        px = 0.58 + lt * 0.02
        pyy = hy + 0.10
        pm = np.exp(-(((X - px) * ASP / 0.16) ** 2 + ((Y - pyy) / 0.035) ** 2))
        sea += rgb(DEST, pm * pool * (0.45 + 1.6 * glint + 0.4 * wave))
    haze = np.exp(-d * 30)
    sea = sea * (1 - haze[..., None]) + rgb(BRASA * 0.5 + NOITE * 0.6, haze)
    img += sea * (Y >= hy)[..., None]
    mist = samp(TA, X * 0.6 - t * 0.02, Y * 1.5)
    img += rgb(MARFIM * 0.5 + OURO * 0.2, sm(0.5, 0.95, mist) * np.exp(-((Y - hy) / 0.08) ** 2) * 0.22)
    return img


# ───────────────────────── VALE ─────────────────────────
BONES = None


def _bones():
    r = np.random.default_rng(11)
    n = 160
    return dict(wx=(r.random(n) - 0.5) * 3.0, wz=r.random(n) * 9.0,
                ang=r.random(n) * math.pi, ln=0.05 + r.random(n) * 0.06)


BONES = _bones()


def valley(t, hy, ch, z0, wind=0.0, dust=0.0, cloud_speed=0.004, sat=1.0,
           storm=0.0, bones=None, arcs=0.0, light=0.0, slide=0.0, front=None):
    img = np.zeros((H, W, 3), F32)
    # céu
    st = np.clip((hy - Y) / hy, 0, 1)
    sky = mix(rgb(OURO * 0.75 + AREIA * 0.2, np.ones_like(X)), rgb(NOITE * 1.6 + GRAF * 0.3, np.ones_like(X)), (st ** 0.7)[..., None])
    cl = samp(TA, X * 1.4 + t * cloud_speed, Y * 2.5)
    sky *= (0.8 + 0.35 * cl)[..., None]
    if storm > 0:
        sky = mix(sky, sky * 0.35, storm)
        rift = sm(0.68, 0.85, samp(TA, X * 1.8 + t * cloud_speed * 1.3 + 0.3, Y * 3 + 0.2))
        sky += rgb(DEST * 0.9, rift * storm * 0.8 * (Y < hy * 0.9))
    if light > 0:
        sky += rgb(DEST, light * np.exp(-(((X - 0.55) * ASP / 0.35) ** 2 + ((Y - 0.05) / 0.25) ** 2)) * 0.8)
    img += sky * (Y < hy)[..., None]
    # cumes em névoa
    for k, (amp, off, c) in enumerate([(0.06, 0.0, 0.55), (0.035, 0.4, 0.4)]):
        ridge = hy - amp * (0.3 + samp(TB, X * 0.9 + off + k, np.full_like(X, 0.3 + k * 0.2)))
        m = (Y > ridge) & (Y < hy + 0.002)
        img = np.where(m[..., None], rgb(mix(OURO * 0.55, AREIA * 0.55, 0.5) * c + NOITE * 0.3, np.ones_like(X)), img)
    # chão em perspectiva
    d = np.clip(Y - hy, 1e-3, None)
    z = ch / d
    wx = (X - 0.5) * z * 1.6
    wzz = z + z0
    cr = samp(CRACK, wx * 0.22, wzz * 0.22)
    gn = samp(TC, wx * 0.5, wzz * 0.5)
    lit = 0.82 + 0.3 * (gn - 0.5)
    ground = rgb(mix(OCRE, AREIA, 0.55), lit) * (1 - 0.55 * cr * np.exp(-d * 0.0))[..., None]
    if arcs > 0 or light > 0:
        ground *= (1 + 0.35 * light)
    haze = 1 - np.exp(-z * 0.45)
    hazec = mix(OURO * 0.6, AREIA * 0.7, 0.5)
    ground = ground * (1 - haze[..., None]) + rgb(hazec, haze)
    img += ground * (Y >= hy)[..., None]
    # ossos
    bm, sh = _draw_bones(t, hy, ch, z0, bones or BONES, arcs, slide)
    img *= (1 - 0.45 * sh)[..., None]
    bm = blur(bm, 0.7)
    btex = 0.7 + 0.3 * samp(TC, X * 9, Y * 9)
    img = img * (1 - bm[..., None]) + rgb(OSSO * 0.82, bm * btex) * (0.7 + 0.3 * (1 - haze))[..., None]
    # poeira
    if dust > 0:
        dn = samp(TA, X * 0.9 - t * (0.08 + wind * 0.35), Y * 1.6 + 0.1)
        dn2 = samp(TA, X * 2.2 - t * (0.15 + wind * 0.6), Y * 3.0 + 0.4)
        dm = sm(0.35, 0.85, 0.6 * dn + 0.4 * dn2) * dust
        if front is not None:
            dm = dm * sm(front + 0.05, front - 0.25, X)
        img = img * (1 - dm[..., None] * 0.75) + rgb(OURO * 0.85 + AREIA * 0.2, dm * 0.85)
    # saturação
    if sat != 1.0:
        g = img.mean(axis=2, keepdims=True)
        img = g + (img - g) * sat
    return img


def _draw_bones(t, hy, ch, z0, B, arcs, slide):
    from PIL import ImageDraw, Image
    im = Image.new('L', (W, H), 0)
    sh = Image.new('L', (W, H), 0)
    dr, ds = ImageDraw.Draw(im), ImageDraw.Draw(sh)
    n = len(B['wx'])
    order = np.argsort(-B['wz'])
    for i in order:
        bx, bz, a, ln = B['wx'][i], B['wz'][i], B['ang'][i], B['ln'][i]
        if slide > 0:
            bx = bx + slide * (0.4 + 0.6 * ((i * 37) % 10) / 10)
            a = a + slide * 1.5 * (((i * 13) % 7) - 3) / 3
        if arcs > 0:
            k = i % 5
            s = ((i // 5) % 32) / 31.0
            ax_ = -1.4 + 2.8 * s
            az_ = z0 + 1.0 + k * 0.55 + 0.25 * ax_ * ax_
            aa = math.atan2(0.5 * ax_ * 0.25, 1) + math.pi / 2 * 0  # alinhado ao arco
            bx = bx + (ax_ - bx) * arcs
            bz = bz + (az_ - bz) * arcs
            a = a + (aa - a) * arcs
        rz = bz - z0
        if rz < 0.08 or rz > 9:
            continue
        sy = hy + ch / rz
        if sy > 1.25:
            continue
        def P(wx_, wz_):
            rr = wz_ - z0
            return ((0.5 + wx_ / (rr * 1.6)) * W, (hy + ch / rr) * H)
        dx, dz = math.cos(a) * ln, math.sin(a) * ln * 0.6
        p1, p2 = P(bx - dx, bz - dz), P(bx + dx, bz + dz)
        th = max(1.0, 0.007 * W / (rz * 1.6))
        _capsule(dr, p1, p2, th, 200)
        _capsule(ds, (p1[0] + th * 1.2, p1[1] + th * 0.4), (p2[0] + th * 1.2, p2[1] + th * 0.4), th * 1.1, 200)
    bm = np.asarray(im).astype(F32) / 255
    shm = blur(np.asarray(sh).astype(F32) / 255, 1.2)
    return bm, shm


def _capsule(dr, p1, p2, th, v):
    dr.line([p1, p2], fill=v, width=int(max(1, th)))
    r = th * 0.55
    for p in (p1, p2):
        dr.ellipse([p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=v)


# ───────────────────────── MATÉRIA (cena 03) ─────────────────────────
def candle(t):
    lt = t - 20
    img = rgb(NOITE * 0.25, np.ones_like(X))
    lean = 0.35 + 0.25 * math.sin(lt * 11) * 0.5 + 0.15 * math.sin(lt * 23)
    cx, cy = 0.64, 0.5
    img += rgb(BRASA * 0.9 + OURO * 0.2, np.exp(-(((X - cx) * ASP / 0.25) ** 2 + ((Y - cy) / 0.3) ** 2)) * 0.35)
    body = (np.abs(X - cx) < 0.018) & (Y > cy + 0.04)
    rim = np.clip(1 - (X - (cx - 0.018)) / 0.036, 0, 1)
    img = np.where(body[..., None], rgb(LINHO * 0.35 + OURO * 0.25, 0.4 + 0.6 * rim) * np.exp(-(Y - cy - 0.04) * 2.5)[..., None], img)
    dy = Y - cy
    dx = (X - cx) * ASP - lean * np.clip(-dy, 0, None) * 1.4
    f = np.exp(-((dx / 0.010) ** 2 + ((dy + 0.012) / 0.030) ** 2))
    f2 = np.exp(-((dx / 0.022) ** 2 + ((dy + 0.02) / 0.05) ** 2))
    img += rgb(MARFIM, f * 1.6) + rgb(OURO, f2 * 0.7) + rgb(BRASA, f2 * 0.3)
    smk = samp(TA, X * 0.6 - lt * 0.3, Y * 7)
    reg = sm(cx - 0.05, cx + 0.05, X) * np.exp(-((Y - 0.38) / 0.12) ** 2)
    img += rgb(LINHO * 0.5, sm(0.6, 0.9, smk) * reg * 0.12)
    return img


def sand(t):
    lt = t - 22
    crest = 0.62 - (X - 0.5) * 0.28
    above = Y < crest
    sky = rgb(OURO * 0.9 + DEST * 0.15, np.exp(-np.clip(crest - Y, 0, None) * 4)) + rgb(BRASA * 0.4, np.ones_like(X))
    rip = 0.5 + 0.5 * np.sin((X * 0.28 + Y) * 140 + samp(TB, X, Y) * 6)
    dune = rgb(BRASA * 0.55 + OCRE * 0.35, (0.55 + 0.25 * rip) * np.exp(-(Y - crest) * 1.5))
    img = np.where(above[..., None], sky, dune)
    img += rgb(DEST, np.exp(-((Y - crest) / 0.006) ** 2) * 0.8)
    veil = samp(TA, X * 1.5 - lt * 0.6, (Y - crest) * 6)
    vm = sm(0.45, 0.85, veil) * np.exp(-np.clip(crest - Y, 0, None) * 9) * above
    img += rgb(DEST * 0.8 + MARFIM * 0.2, vm * 0.55)
    # grãos em saltação
    n = 2500
    r = prand(31, n, 3)
    xs = (r[0] + lt * (0.35 + 0.5 * r[1])) % 1.3 - 0.15
    ys = 0.62 - (xs - 0.5) * 0.28 - r[2] * 0.08
    b = np.zeros((H, W), F32)
    for k in range(3):
        splat(b, xs - k * 0.004, ys, 0.25)
    img += rgb(DEST, blur(b, 0.8) * 0.9)
    return img


def linen(t, x0=0.25, x1=0.75, top=0.08, amp=0.03, speed=3.0, warm=1.0):
    lt = t
    img = rgb(NOITE * 0.3, np.ones_like(X))
    mist = samp(TA, X * 0.8 - lt * 0.03, Y)
    img += rgb(OURO * 0.4, sm(0.5, 0.9, mist) * 0.15)
    xr = x1 + amp * np.sin(Y * 6 - lt * speed) * (Y - top) * 1.5
    xl = x0 + amp * 0.4 * np.sin(Y * 5 - lt * speed + 1) * (Y - top)
    inside = (X > xl) & (X < xr) & (Y > top) & (Y < 0.95)
    ph = X * 26 - lt * speed * 1.4 + 2.2 * np.sin(Y * 3 + lt * 0.8)
    fold = 0.5 + 0.5 * np.sin(ph)
    tex = samp(TC, X * 3, Y * 3)
    cloth = rgb(LINHO * 0.28, 0.6 + 0.4 * fold) + rgb(OURO * warm, fold ** 3 * 0.45 * (0.9 + 0.2 * tex))
    cloth *= (0.9 + 0.1 * np.sin(X * 900) * np.sin(Y * 900))[..., None]
    img = np.where(inside[..., None], cloth, img)
    img += rgb(GRAF * 1.5, (np.abs(Y - top) < 0.006) * (X > x0 - 0.04) * (X < x1 + 0.06))
    return img


def dust_beam(t, density=1.0, leaves=True):
    lt = t
    img = rgb(NOITE * 0.35, np.ones_like(X))
    bm = beam(0.15, -0.1, 0.78, 1.1, 0.06, 0.16)
    img += rgb(OURO * 0.8 + BRASA * 0.2, bm * 0.45)
    n = int(5000 * density)
    r = prand(41, n, 4)
    xs = (r[0] + lt * (0.05 + 0.12 * r[2])) % 1.0
    ys = (r[1] + 0.02 * np.sin(lt * 0.7 + r[3] * 6)) % 1.0
    inb = bm[(np.clip(ys, 0, 0.999) * H).astype(int), (np.clip(xs, 0, 0.999) * W).astype(int)]
    b = np.zeros((H, W), F32)
    splat(b, xs, ys, 0.15 + 2.2 * inb)
    img += rgb(DEST, blur(b, 0.9) * 0.9)
    if leaves:
        r2 = prand(42, 7, 3)
        def dl(d):
            for i in range(7):
                x = ((r2[0][i] + lt * (0.1 + 0.08 * r2[1][i])) % 1.2 - 0.1) * W
                y = (r2[2][i] * 0.8 + 0.1 + 0.03 * math.sin(lt * 2 + i)) * H
                a = lt * 3 + i
                L, Wd = 14, 5
                pts = [(x + L * math.cos(a), y + L * math.sin(a)), (x + Wd * math.cos(a + 1.57), y + Wd * math.sin(a + 1.57)),
                       (x - L * math.cos(a), y - L * math.sin(a)), (x - Wd * math.cos(a + 1.57), y - Wd * math.sin(a + 1.57))]
                d.polygon(pts, fill=255)
        lm = blur(pil_layer(dl), 0.7)
        img = img * (1 - lm[..., None] * 0.85) + rgb(col('#4a4a2a') * 0.6, lm)
    return img


# ───────────────────────── MACROS DO VALE ─────────────────────────
def bone_macro(t):
    lt = t - 38
    s = 1.0 - lt * 0.008
    u, v = (X - 0.5) * s + 0.5 + lt * 0.003, (Y - 0.5) * s + 0.5
    hgt = 0.5 * samp(TB, u * 2.0, v * 2.0) + 0.3 * samp(TA, u * 1.5, v * 1.5) + 0.2 * samp(TC, u * 1.2, v * 1.2) - 0.10 * samp(CRACK, u * 0.9, v * 0.9)
    hgt = blur(hgt, 1.5)
    gx = np.gradient(hgt, axis=1) * W * 0.04
    lit = np.clip(0.62 + gx * 0.5, 0.35, 1.05)
    bone_m = sm(0.25, 0.32, Y + 0.08 * np.sin(X * 3)) * sm(0.92, 0.84, Y + 0.05 * np.sin(X * 4 + 1))
    img = rgb(BRASA * 0.35, np.ones_like(X))
    img = img * (1 - bone_m[..., None]) + rgb(OSSO * 0.9, lit * bone_m)
    r = prand(51, 60, 2)
    b = np.zeros((H, W), F32)
    splat(b, r[0], 0.35 + r[1] * 0.45, 1.0)
    img += rgb(DEST, blur(b, 0.8) * 1.5)
    bl = blur(img, 5)
    dof = sm(0.12, 0.45, np.abs(Y - 0.58))[..., None]
    return img * (1 - dof) + bl * dof


def soil_macro(t, water=0.0, grains=True):
    lt = t
    u, v = X * 1.4 + 0.2, Y * 0.8 + 0.1
    cr = samp(CRACK_BIG, u * 0.8, v * 0.8)
    gn = samp(TC, u * 3, v * 3)
    img = rgb(mix(OCRE, AREIA, 0.5), 0.7 + 0.3 * gn) * (1 - 0.8 * cr)[..., None]
    if water > 0:
        reach = samp(TA, u * 0.6, v * 0.6)
        wm = cr * sm(reach - 0.05, reach + 0.05, water * 1.15)
        wet = blur(wm, 10) * 2.5
        img *= (1 - np.clip(wet, 0, 0.55))[..., None]
        img = img * (1 - wm[..., None]) + rgb(MARFIM * 0.3 + DEST * 0.6, wm * (0.7 + 0.6 * samp(TB, X * 4 - lt * 0.2, Y * 4)))
    if grains:
        r = prand(61, 120, 3)
        xs = r[0]; ys = r[1]
        if t > 43.5:
            mv = np.clip(t - 43.5 - r[2] * 1.5, 0, None)
            sel = r[2] < 0.35
            xs = xs + sel * mv * 0.04
            ys = ys + sel * (mv ** 2) * 0.01
        b = np.zeros((H, W), F32)
        splat(b, xs, ys, 1.0)
        img += rgb(DEST, blur(b, 0.9) * 1.6)
    img += rgb(OURO, sm(0.0, 1.0, X) * 0.12)
    bl = blur(img, 4)
    dof = sm(0.18, 0.5, np.abs(Y - 0.5))[..., None]
    return img * (1 - dof) + bl * dof


def sprout(t):
    lt = t - 70
    bgv = valley(t, 0.52, 0.03, 60 + lt * 0.05, light=sms(70.2, 72.5, t), sat=1.1)
    bgv += rgb(DEST, beam(0.6, -0.1, 0.45, 0.6, 0.05, 0.15) * sms(70.3, 72.5, t) * 0.5)
    bgv += rgb(DEST, beam(0.75, -0.1, 0.65, 0.6, 0.04, 0.12) * sms(70.6, 72.8, t) * 0.4)
    sig = 9 - 6 * sms(71.0, 72.6, t)
    img = blur(bgv, sig)
    gm = sm(0.74, 0.78, Y)
    soil = rgb(OCRE * 0.8, 0.6 + 0.4 * samp(TC, X * 4, Y * 4))
    img = img * (1 - gm[..., None]) + soil * gm[..., None]
    grow = sms(70.0, 70.9, t)
    opn = sms(70.4, 71.4, t)
    def dr(d):
        bx, by = 0.5 * W, 0.78 * H
        top = by - grow * 0.14 * H
        d.line([(bx, by), (bx + 3, (by + top) / 2), (bx, top)], fill=255, width=5)
        for s in (-1, 1):
            a = -math.pi / 2 + s * (0.25 + 1.0 * opn)
            L = 6 + 40 * opn
            tip = (bx + L * math.cos(a), top + L * math.sin(a))
            mid = (bx + 0.5 * L * math.cos(a) - s * 6 * opn, top + 0.5 * L * math.sin(a) - 7 * opn)
            mid2 = (bx + 0.5 * L * math.cos(a) + s * 6 * opn, top + 0.5 * L * math.sin(a) + 7 * opn)
            d.polygon([(bx, top), mid, tip, mid2], fill=255)
    sm_ = blur(pil_layer(dr), 0.6)
    green = col('#6f8a3a')
    img = img * (1 - sm_[..., None]) + rgb(green * 0.9, sm_) + rgb(DEST, sm_ * 0.15)
    return img


# ───────────────────────── IGREJA ─────────────────────────
def nave(t, beams=1.0, dust=1.0, push=0.0, doors=0.0, violence=0.0, dim=1.0):
    s = 1 + push
    vx, vy = 0.5, 0.46
    def P(x, y):
        return ((vx + (x - vx) * s) * W, (vy + (y - vy) * s) * H)
    def dr(d):
        pass
    img = rgb(NOITE * 0.5, np.ones_like(X))
    from PIL import Image, ImageDraw
    geo = Image.new('RGB', (W, H), (0, 0, 0))
    g = ImageDraw.Draw(geo)
    def c(v):
        return tuple(int(255 * np.clip(x, 0, 1)) for x in v)
    # piso, paredes, fundo
    g.polygon([P(0, 1), P(1, 1), P(0.58, 0.58), P(0.42, 0.58)], fill=c(GRAF * 0.9))
    g.polygon([P(0, 0), P(0.42, 0.30), P(0.42, 0.58), P(0, 1)], fill=c(GRAF * 0.7))
    g.polygon([P(1, 0), P(0.58, 0.30), P(0.58, 0.58), P(1, 1)], fill=c(GRAF * 0.55))
    g.polygon([P(0.42, 0.30), P(0.58, 0.30), P(0.58, 0.58), P(0.42, 0.58)], fill=c(GRAF * 0.6))
    # portas no fundo
    dw = 0.035 + 0.0 * doors
    g.rectangle([P(0.5 - dw, 0.38), P(0.5 + dw, 0.58)], fill=c(BRASA * 0.35))
    # janelas na parede esquerda
    for k in range(5):
        zf = k / 5.0
        x = 0.06 + zf * 0.33
        hw = 0.012 * (1 - zf * 0.8)
        top = 0.10 + zf * 0.18
        bot = 0.42 + zf * 0.08
        g.polygon([P(x - hw, top + 0.01), P(x + hw, top + 0.02), P(x + hw, bot - 0.01), P(x - hw, bot)], fill=c(OURO * (0.55 * beams + 0.08)))
    # bancos
    for k in range(9):
        zf = (k / 9.0) ** 1.4
        yb = 0.95 - zf * 0.36
        hb = 0.035 * (1 - zf * 0.85)
        xl0, xl1 = 0.05 + zf * 0.39, 0.40 + zf * 0.08
        xr0, xr1 = 0.60 - zf * 0.08, 0.95 - zf * 0.39
        g.rectangle([P(xl0, yb - hb), P(xl1, yb)], fill=c(BRASA * 0.25))
        g.rectangle([P(xr0, yb - hb), P(xr1, yb)], fill=c(BRASA * 0.25))
    img = np.asarray(geo).astype(F32) / 255
    img = img * dim
    # feixes
    for k in range(5):
        zf = k / 5.0
        x = 0.06 + zf * 0.33
        x0 = vx + (x - vx) * s
        y0 = vy + (0.25 + zf * 0.12 - vy) * s
        img += rgb(OURO * 0.9 + DEST * 0.1, beam(x0, y0, x0 + 0.32 * s, min(1.05, y0 + 0.55 * s), 0.01, 0.06) * 0.30 * beams)
    # portas abertas: luz do fundo
    if doors > 0:
        dx0 = vx
        dy0 = vy + (0.48 - vy) * s
        glow = np.exp(-(((X - dx0) * ASP / (0.05 + 0.25 * doors)) ** 2 + ((Y - dy0) / (0.08 + 0.2 * doors)) ** 2))
        img += rgb(DEST * 0.8 + MARFIM * 0.2, glow * doors * 1.6)
        ang = np.arctan2(Y - dy0, (X - dx0) * ASP)
        rays = samp(TB, ang * 0.3 + 0.5, np.full_like(X, 0.2)) ** 3
        img += rgb(OURO, rays * glow ** 0.25 * doors * 0.6)
    # poeira
    n = int(3500 * dust)
    r = prand(71, n, 4)
    spd = 0.02 + violence * 0.45
    xs = (r[0] + t * spd * (0.4 + r[2])) % 1.0
    ys = (r[1] + 0.03 * np.sin(t * 0.5 + r[3] * 6) + violence * 0.05 * np.sin(t * 3 + r[3] * 9)) % 1.0
    bsum = np.zeros((H, W), F32)
    bb = sum(beam(vx + (0.06 + k / 5 * 0.33 - vx) * s, vy + (0.25 + k / 5 * 0.12 - vy) * s,
                  vx + (0.06 + k / 5 * 0.33 - vx) * s + 0.32 * s, 0.9, 0.01, 0.06) for k in range(5))
    inb = bb[(ys * H).astype(int) % H, (xs * W).astype(int) % W]
    splat(bsum, xs, ys, 0.1 + 1.5 * inb * beams + doors * 0.6)
    if violence > 0:
        for k in range(1, 4):
            splat(bsum, xs - k * 0.006 * violence, ys, 0.3 * violence)
    img += rgb(DEST, blur(bsum, 0.9) * 0.8)
    return img


def bible(t, turn0=76.8, turn1=78.4):
    lt = t
    img = rgb(NOITE * 0.35, np.ones_like(X))
    img += rgb(OURO * 0.5, beam(0.2, -0.1, 0.65, 1.1, 0.05, 0.12) * 0.4)
    from PIL import Image, ImageDraw
    pm = Image.new('L', (W, H), 0); pd = ImageDraw.Draw(pm)
    tl = Image.new('L', (W, H), 0); td = ImageDraw.Draw(tl)
    sx, sy = 0.5 * W, 0.62 * H
    pw, ph = 0.26 * W, 0.30 * H
    for s in (-1, 1):
        pts = []
        for i in range(21):
            u = i / 20
            pts.append((sx + s * pw * u, sy - ph / 2 + 10 * math.sin(u * math.pi) * -1 + 12 * u))
        for i in range(20, -1, -1):
            u = i / 20
            pts.append((sx + s * pw * u, sy + ph / 2 + 6 * math.sin(u * math.pi) + 8 * u))
        pd.polygon(pts, fill=230 if s < 0 else 215)
        for k in range(16):
            yy_ = sy - ph / 2 + 18 + k * (ph - 30) / 16
            td.line([(sx + s * 14, yy_ + 4), (sx + s * (pw - 16), yy_ + 9)], fill=255, width=2)
    th = math.pi * sms(turn0, turn1, t) + 0.04 * math.sin(lt * 2)
    cx = sx + pw * math.cos(th)
    lift = pw * 0.25 * math.sin(th)
    pd.polygon([(sx, sy - ph / 2), (cx, sy - ph / 2 - lift), (cx, sy + ph / 2 - lift), (sx, sy + ph / 2)], fill=245)
    p = np.asarray(pm).astype(F32) / 255
    tx = blur(np.asarray(tl).astype(F32) / 255, 2.2)
    page = rgb(LINHO * 0.85, p) * (1 - 0.25 * tx)[..., None]
    img = img * (1 - p[..., None]) + page * (0.55 + 0.6 * beam(0.2, -0.1, 0.65, 1.1, 0.05, 0.12))[..., None]
    img = np.where((Y > 0.8)[..., None], rgb(BRASA * 0.25, np.ones_like(X)), img)
    img += dust_beam(t, 0.4, leaves=False) * 0.35
    bl = blur(img, 4)
    dof = sm(0.2, 0.45, np.abs(Y - 0.6))[..., None]
    return img * (1 - dof) + bl * dof


def curtains(t, amp=0.02, speed=1.0, violence=0.0, linens=0.0):
    img = rgb(NOITE * 0.3, np.ones_like(X))
    img = np.where((Y > 0.72)[..., None], rgb(GRAF * 0.6, np.ones_like(X)), img)
    for side in (-1, 1):
        edge = 0.5 + side * (0.22 + amp * np.sin(Y * 5 - t * speed * 2) + violence * 0.12 * np.sin(Y * 3 - t * 7))
        m = (X < edge) if side < 0 else (X > edge)
        fold = 0.5 + 0.5 * np.sin(X * 90 + 1.5 * np.sin(Y * 3 - t * speed * 1.5) + violence * 3 * np.sin(Y * 2 - t * 6))
        cur = rgb(BRASA * 0.35 + GRAF * 0.4, 0.35 + 0.65 * fold)
        img = np.where(m[..., None], cur, img)
        img += rgb(DEST, np.exp(-((X - edge) * ASP / 0.006) ** 2) * 0.5 * (Y < 0.72))
    img += rgb(OURO, beam(0.5, -0.1, 0.5, 0.75, 0.04, 0.12) * 0.15)
    if linens > 0:
        r = prand(81, 9, 4)
        def dl(d):
            for i in range(9):
                x = ((r[0][i] + t * (0.25 + 0.2 * r[1][i])) % 1.4 - 0.2) * W
                y = (0.15 + r[2][i] * 0.6 + 0.05 * math.sin(t * 3 + i)) * H
                a = t * (2 + r[3][i] * 2) + i
                L, Wd = 50, 22
                ca, sa = math.cos(a), math.sin(a)
                pts = [(x + L * ca - Wd * sa * 0.4, y + L * sa * 0.5), (x + Wd * sa, y - Wd * ca * 0.5),
                       (x - L * ca + Wd * sa * 0.3, y - L * sa * 0.5), (x - Wd * sa, y + Wd * ca * 0.5)]
                d.polygon(pts, fill=255)
        lm = blur(pil_layer(dl), 1.5) * linens
        img = img * (1 - lm[..., None]) + rgb(LINHO * 0.8, lm)
    n = 2500
    r = prand(82, n, 3)
    xs = (r[0] + t * (0.03 + violence * 0.5) * (0.5 + r[2])) % 1
    ys = r[1]
    b = np.zeros((H, W), F32)
    splat(b, xs, ys, 0.25 + violence * 0.5)
    img += rgb(DEST, blur(b, 0.9) * 0.6)
    return img


def corridor(t, slit=0.0, open_=0.0):
    img = rgb(NOITE * 0.35, np.ones_like(X))
    from PIL import Image, ImageDraw
    geo = Image.new('RGB', (W, H), (0, 0, 0)); g = ImageDraw.Draw(geo)
    s = 1 + (t % 200) * 0.0
    def c(v):
        return tuple(int(255 * np.clip(x, 0, 1)) for x in v)
    g.polygon([(0, 0), (0.38 * W, 0.22 * H), (0.38 * W, 0.70 * H), (0, H)], fill=c(GRAF * 0.6))
    g.polygon([(W, 0), (0.62 * W, 0.22 * H), (0.62 * W, 0.70 * H), (W, H)], fill=c(GRAF * 0.5))
    g.polygon([(0, H), (W, H), (0.62 * W, 0.70 * H), (0.38 * W, 0.70 * H)], fill=c(GRAF * 0.8))
    g.polygon([(0, 0), (W, 0), (0.62 * W, 0.22 * H), (0.38 * W, 0.22 * H)], fill=c(NOITE * 0.8))
    g.rectangle([(0.38 * W, 0.22 * H), (0.62 * W, 0.70 * H)], fill=c(BRASA * 0.30))
    img = np.asarray(geo).astype(F32) / 255
    gap = 0.002 + slit * 0.006 + open_ * 0.12
    dm = (np.abs(X - 0.5) < gap) & (Y > 0.22) & (Y < 0.70)
    img = np.where(dm[..., None], rgb(DEST * 0.9 + MARFIM * 0.3, np.ones_like(X)), img)
    edge = ((np.abs(Y - 0.22) < 0.004) | (np.abs(Y - 0.70) < 0.004)) & (np.abs(X - 0.5) < 0.12)
    img += rgb(OURO, edge * (0.4 + slit))
    glow = np.exp(-(((X - 0.5) * ASP / (0.03 + 0.4 * open_ + 0.02 * slit)) ** 2 + ((Y - 0.46) / (0.25 + 0.3 * open_)) ** 2))
    img += rgb(OURO * 0.8 + DEST * 0.2, glow * (0.3 + slit * 0.4 + open_ * 2.0))
    if open_ > 0:
        ang = np.arctan2(Y - 0.46, (X - 0.5) * ASP)
        rays = samp(TB, ang * 0.35 + 0.1, np.full_like(X, 0.6)) ** 3
        img += rgb(DEST, rays * open_ * 0.9 * np.exp(-np.hypot((X - 0.5) * ASP, Y - 0.46) * 1.2))
        n = 4000
        r = prand(91, n, 3)
        lt = max(0.0, t - 84.8)
        rad = (r[0] * 0.05 + lt * (0.2 + 0.5 * r[1])) % 1.2
        a = r[2] * 2 * math.pi
        xs = 0.5 + np.cos(a) * rad / ASP
        ys = 0.46 + np.sin(a) * rad * 0.8
        b = np.zeros((H, W), F32)
        splat(b, xs, ys, 0.6 * open_)
        img += rgb(DEST, blur(b, 1.0) * 1.2)
    else:
        n = 1500
        r = prand(92, n, 3)
        k = (r[0] + t * 0.08 * (0.5 + r[2])) % 1
        xs = mix(r[1], 0.5 + (r[1] - 0.5) * 0.1, k)
        ys = mix(r[2], 0.46, k)
        b = np.zeros((H, W), F32)
        splat(b, xs, ys, 0.3)
        img += rgb(DEST, blur(b, 0.9) * 0.7)
    return img


def sky_storm(t):
    lt = t - 86
    img = rgb(NOITE * 1.1, np.ones_like(X))
    for k, (sc, sp, a) in enumerate([(1.2, 0.12, 0.6), (2.4, 0.25, 0.4), (4.5, 0.45, 0.25)]):
        n = samp(TA, X * sc - lt * sp + k * 0.3, Y * sc * 1.2 + lt * sp * 0.15)
        img *= (0.7 + a * n)[..., None]
    tear = np.exp(-(((X - 0.55) + (Y - 0.4) * 0.6) / (0.06 + lt * 0.02)) ** 2) * sm(0.85, 0.2, Y)
    rift = sm(0.5, 0.8, samp(TA, X * 1.5 - lt * 0.15, Y * 2))
    img += rgb(DEST * 0.9 + MARFIM * 0.1, tear * (0.5 + rift) * 0.9)
    img += rgb(OURO, beam(0.55, 0.35, 0.35, 1.1, 0.03, 0.12) * 0.25)
    img = np.where((Y > 0.93 - 0.02 * samp(TB, X, np.full_like(X, 0.1)))[..., None], rgb(NOITE * 0.3, np.ones_like(X)), img)
    return img


# ───────────────────────── PARTÍCULAS FINAIS ─────────────────────────
def bokeh(t, dens=1.0):
    img = rgb(NOITE * 0.12, np.ones_like(X))
    img += rgb(OURO * 0.5, beam(0.3, -0.1, 0.6, 1.1, 0.10, 0.22) * 0.18)
    # tempo efetivo: desacelera até congelar em 108.8; rajada em 110.5
    if t < 106.0:
        tau = t
    elif t < 108.8:
        u = t - 106.0
        tau = 106.0 + u - u * u / (2 * 2.8)
    else:
        tau = 106.0 + 2.8 / 2
    gust = max(0.0, t - 110.5)
    for layer, (n, sg, br, sd) in enumerate([(220, 7, 0.5, 101), (500, 3.5, 0.6, 102), (1500, 1.0, 0.9, 103)]):
        r = prand(sd, int(n * dens), 3)
        xs = (r[0] + tau * 0.004 * (1 + layer)) % 1.0 + gust ** 2 * (0.5 + r[2]) * 0.8
        ys = (r[1] + tau * 0.002) % 1.0
        b = np.zeros((H, W), F32)
        splat(b, xs, ys, br * (0.6 + 0.8 * r[2]) * (6 if sg > 3 else 1))
        img += rgb(DEST * 0.8 + MARFIM * 0.2, blur(b, sg) * (2.0 if sg > 3 else 1.0))
    return img


def endcard_bg(t):
    lt = t - 116
    g = np.clip(Y, 0, 1) ** 1.6
    img = mix(rgb(NOITE * 1.2, np.ones_like(X)), rgb(BRASA * 0.95, np.ones_like(X)), g[..., None])
    for k in range(4):
        yl = 0.1 + k * 0.17 + 0.03 * np.sin(X * 3 + k * 2 + lt * 0.1)
        img += rgb(MARFIM, np.exp(-((Y - yl) / 0.0015) ** 2) * 0.05)
    img += rgb(OURO * 0.8, np.exp(-(((X - 0.5) * ASP / 0.6) ** 2 + ((Y - 0.47) / 0.3) ** 2)) * 0.18)
    img += bokeh(105, 0.4) * 0.25
    return img


def linen_branch(t):
    bg = valley(t, 0.45, 0.05, 8.0, dust=0.8, wind=0.8, cloud_speed=0.05, sat=0.7)
    img = blur(bg, 6) * 0.8
    cl = linen(t, x0=0.36, x1=0.66, top=0.38, amp=0.10, speed=8.0, warm=1.3)
    lt = t
    xr = 0.66 + 0.10 * np.sin(Y * 6 - lt * 8.0) * (Y - 0.38) * 1.5
    m = (X > 0.36) & (X < xr) & (Y > 0.38) & (Y < 0.72 + 0.05 * np.sin(X * 8 - lt * 6))
    img = np.where(m[..., None], cl, img)
    def dr(d):
        d.line([(0.05 * W, 1.0 * H), (0.25 * W, 0.62 * H), (0.36 * W, 0.40 * H), (0.42 * W, 0.30 * H)], fill=255, width=7)
        d.line([(0.25 * W, 0.62 * H), (0.18 * W, 0.45 * H)], fill=255, width=4)
        d.line([(0.36 * W, 0.40 * H), (0.30 * W, 0.28 * H)], fill=255, width=3)
    br = blur(pil_layer(dr), 0.8)
    img = img * (1 - br[..., None] * 0.9)
    dn = samp(TA, X * 1.2 - t * 0.5, Y * 2)
    img += rgb(OURO * 0.8, sm(0.5, 0.9, dn) * 0.25)
    return img
