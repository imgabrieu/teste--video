"""Tipografia viva em resolução cheia: textos que nascem e morrem em matéria."""
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from common import *

FD = '/tmp/claude-0/-home-user-teste--video/8fef6ab4-58a7-5372-8d2c-e59528f81ec7/scratchpad/fonts/'
ANTON = FD + 'fontsource-anton-5.3.0/files/anton-latin-400-normal.woff'
BEBAS = FD + 'fontsource-bebas-neue-5.3.0/files/bebas-neue-latin-400-normal.woff'
HEB = FD + 'fontsource-noto-serif-hebrew-5.3.0/files/noto-serif-hebrew-hebrew-700-normal.woff'
LOGO = '/tmp/claude-0/-home-user-teste--video/8fef6ab4-58a7-5372-8d2c-e59528f81ec7/scratchpad/logo_mask.png'

GX, GY = np.meshgrid(np.arange(FW, dtype=F32), np.arange(FH, dtype=F32))


def font_cap(path, cap_px):
    f = ImageFont.truetype(path, 100)
    b = f.getbbox('H')
    return ImageFont.truetype(path, max(8, int(100 * cap_px / (b[3] - b[1]))))


def render_lines(lines, font, track=0, gap=1.15, rtl=False, shear=0.0):
    asc, desc = font.getmetrics()
    lh = int((asc + desc) * gap)
    widths = []
    for ln in lines:
        if rtl:
            widths.append(int(font.getlength(ln, direction='rtl')))
        else:
            widths.append(int(sum(font.getlength(c) + track for c in ln) - track))
    w = max(widths) + 40
    h = lh * len(lines) + 40
    im = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(im)
    for i, ln in enumerate(lines):
        x = 20 + (w - 40 - widths[i]) / 2
        y = 20 + i * lh
        if rtl:
            d.text((x, y), ln, font=font, fill=255, direction='rtl')
        else:
            for c in ln:
                d.text((x, y), c, font=font, fill=255)
                x += font.getlength(c) + track
    if shear:
        im = im.transform((w + int(abs(shear) * h), h), Image.AFFINE, (1, shear, -abs(shear) * h if shear > 0 else 0, 0, 1, 0), Image.BICUBIC)
    a = np.asarray(im).astype(F32) / 255
    ys, xs = np.nonzero(a > 0.02)
    a = a[max(0, ys.min() - 4):ys.max() + 5, max(0, xs.min() - 4):xs.max() + 5]
    return a


class Card:
    def __init__(self, mask, cx, cy, t0, t1, style='mist', color=MARFIM, fin=0.7, fout=0.6,
                 opacity=1.0, glow=0.3, npart=2500, seed=0, delay=0.0):
        self.m = mask
        self.h, self.w = mask.shape
        self.x0 = int(cx * FW - self.w / 2)
        self.y0 = int(cy * FH - self.h / 2)
        self.t0, self.t1 = t0 + delay, t1
        self.style, self.color = style, color
        self.fin, self.fout = fin, fout
        self.op, self.glow = opacity, glow
        ly, lx = np.mgrid[0:self.h, 0:self.w].astype(F32)
        self.xn = lx / self.w
        self.noise = samp(TA, (lx + self.x0) / 420.0 + seed * 0.13, (ly + self.y0) / 420.0)
        self.crack = samp(VOR, lx / 300.0, ly / 300.0)
        r = np.random.default_rng(seed + 100)
        ys, xs = np.nonzero(mask > 0.5)
        k = min(npart, len(xs))
        idx = r.choice(len(xs), k, replace=False)
        self.px = xs[idx].astype(F32) + self.x0
        self.py = ys[idx].astype(F32) + self.y0
        self.pr = r.random((4, k)).astype(F32)
        self.pd = 0.6 * (xs[idx] / self.w) + 0.4 * self.noise[ys[idx], xs[idx]]

    def active(self, t):
        return self.t0 <= t <= self.t1

    def draw(self, t, frame, pbuf):
        if not self.active(t):
            return
        p_in = sms(self.t0, self.t0 + self.fin, t)
        p_out = sms(self.t1 - self.fout, self.t1, t) if self.fout > 0 else 0.0
        st = self.style
        if st == 'light':
            e = p_in * 1.4
            a_in = np.clip((e - self.xn) / 0.4, 0, 1)
            edge = np.exp(-((e - self.xn - 0.2) / 0.07) ** 2) * (p_in < 1)
        elif st == 'crack':
            a_in = np.clip((p_in * 1.4 - (1 - np.clip(self.crack * 25, 0, 1)) * 0.5 - self.noise * 0.5) / 0.25, 0, 1)
            edge = 0
        else:
            a_in = np.clip((p_in * 1.3 - self.noise) / 0.3, 0, 1)
            edge = 0
        d = 0.6 * self.xn + 0.4 * self.noise
        a_out = np.clip((d + 0.25 - p_out * 1.35) / 0.25, 0, 1) if p_out > 0 else 1.0
        shift = int((40 if st == 'still' else 90) * p_out ** 2)
        a = self.m * a_in * a_out * self.op
        x0, y0 = self.x0 + shift, self.y0
        x1, y1 = min(FW, x0 + self.w), min(FH, y0 + self.h)
        a = a[:y1 - y0, :x1 - x0]
        reg = frame[y0:y1, x0:x1]
        g = np.asarray(Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(9))).astype(F32) / 255
        breathe = 1 + 0.08 * math.sin(t * 2.2)
        reg[:] = reg * (1 - a[..., None]) + a[..., None] * self.color
        reg += g[..., None] * OURO * self.glow * breathe
        if st == 'light' and np.ndim(edge):
            reg += (self.m * edge)[:y1 - y0, :x1 - x0, None] * DEST * 0.8
        # partículas
        if st in ('still', 'crack', 'light') and p_out == 0:
            return
        r = self.pr
        if p_in < 1:
            q = np.clip((p_in * 1.6 - r[0] * 0.6), 0, 1)
            qe = 1 - (1 - q) ** 3
            if st == 'four':
                side = (np.arange(len(r[0])) % 4)
                sx = np.where(side == 0, -60, np.where(side == 1, FW + 60, self.px + (r[1] - 0.5) * 400))
                sy = np.where(side == 2, -60, np.where(side == 3, FH + 60, self.py + (r[1] - 0.5) * 300))
            elif st == 'gust':
                sx = self.px - 700 - 900 * r[1]
                sy = self.py + (r[2] - 0.5) * 500
            else:
                sx = self.px - 80 - 260 * r[1]
                sy = self.py + (r[2] - 0.5) * 140
            x = sx + (self.px - sx) * qe + np.sin(r[3] * 9 + t * 3) * 12 * (1 - qe)
            y = sy + (self.py - sy) * qe + np.cos(r[3] * 7 + t * 2) * 10 * (1 - qe)
            wgt = np.sin(np.pi * q) * 0.9
            splat(pbuf, x / FW, y / FH, wgt * self.op)
        if p_out > 0:
            k = np.clip((p_out * 1.35 - self.pd) / 0.3, 0, 1)
            sp = 160 if st == 'still' else 650
            x = self.px + shift + k ** 1.4 * sp * (0.6 + r[1])
            y = self.py + np.sin(r[3] * 8 + k * 4) * 25 * k + (k ** 2 * 40 if st == 'still' else 0)
            wgt = (k > 0) * (1 - k) * 1.2
            splat(pbuf, x / FW, y / FH, wgt * self.op)
        elif p_in >= 1 and st in ('particles', 'gust', 'four', 'sand', 'dust', 'smoke', 'mist'):
            tw = (np.sin(r[2] * 50 + t * 6) > 0.97) * 0.8
            splat(pbuf, self.px / FW, self.py / FH, tw * self.op)


def ref_card(text, cx, cy, t0, t1, seed):
    m = render_lines([text], ImageFont.truetype(BEBAS, 30), track=7)
    return Card(m, cx, cy, t0, t1, style='mist', color=DEST, opacity=0.9, glow=0.15, npart=400, seed=seed, delay=0.35)


def build_cards():
    C = []
    B = lambda s: ImageFont.truetype(BEBAS, s)
    A = lambda s: ImageFont.truetype(ANTON, s)
    def add(lines, font, cx, cy, t0, t1, style, track=0, ref=None, **kw):
        rtl = kw.pop('rtl', False)
        m = render_lines(lines if isinstance(lines, list) else [lines], font, track=track, rtl=rtl)
        C.append(Card(m, cx, cy, t0, t1, style=style, seed=len(C) * 7 + 1, **kw))
        if ref:
            C.append(ref_card(ref, cx, cy + m.shape[0] / FH / 2 + 0.045, t0, t1, len(C) * 7 + 3))
    add('ANTES DA FORMA…', B(64), 0.42, 0.45, 2.5, 5.0, 'mist', track=18, opacity=0.8)
    add('ELE JÁ SE MOVIA.', B(64), 0.5, 0.55, 6.0, 8.6, 'mist', track=14, opacity=0.85)
    add('O ESPÍRITO DE DEUS PAIRAVA SOBRE AS ÁGUAS.', B(64), 0.5, 0.28, 14.6, 19.2, 'light', track=8, ref='GÊNESIS 1:2', fin=1.2)
    add('VENTO', A(210), 0.40, 0.40, 20.15, 21.85, 'smoke', track=10, fin=0.5, fout=0.5)
    add('SOPRO', A(210), 0.50, 0.33, 22.15, 23.85, 'sand', track=10, fin=0.5, fout=0.5)
    add('ESPÍRITO', A(190), 0.50, 0.50, 24.15, 25.85, 'light', track=8, fin=0.5, fout=0.5, color=MARFIM * 0.95)
    add('רוּחַ', ImageFont.truetype(HEB, 260), 0.50, 0.45, 26.4, 27.9, 'particles', rtl=True, fin=0.6, fout=0.45, color=DEST, glow=0.5, npart=4000)
    add('E O VALE ESTAVA CHEIO DE OSSOS.', B(66), 0.5, 0.17, 30.4, 34.6, 'still', track=8, ref='EZEQUIEL 37:1', fin=1.2, fout=1.0, color=MARFIM * 0.92)
    add('SECOS.', A(150), 0.5, 0.30, 36.0, 38.0, 'crack', track=14, fin=0.8, fout=0.0)
    add('PODERÃO ESTES OSSOS VIVER?', B(76), 0.5, 0.20, 40.0, 44.5, 'sand', track=8, ref='EZEQUIEL 37:3', fin=1.0, fout=0.8)
    add('PROFETIZA AO ESPÍRITO.', B(76), 0.5, 0.25, 52.4, 55.5, 'dust', track=8, ref='EZEQUIEL 37:9', fin=0.6)
    add(['VEM DOS', 'QUATRO VENTOS'], A(150), 0.5, 0.40, 56.3, 61.85, 'four', track=8, fin=1.8, fout=0.5, glow=0.45, npart=6000)
    add('E O SOPRO ENTROU.', B(76), 0.5, 0.22, 64.5, 67.0, 'dust', track=8, ref='EZEQUIEL 37:10')
    add('VIVEU.', A(170), 0.5, 0.32, 70.4, 72.7, 'light', track=14, fin=0.9, glow=0.5)
    add('O VENTO SOPRA ONDE QUER.', B(76), 0.5, 0.20, 74.0, 77.6, 'dust', track=8, ref='JOÃO 3:8')
    add('E, DE REPENTE, VEIO DO CÉU UM SOM…', B(76), 0.5, 0.82, 85.0, 89.5, 'dust', track=8, ref='ATOS 2:2', fin=0.4)
    add('E ENCHEU TODA A CASA.', B(86), 0.5, 0.50, 90.0, 93.4, 'dust', track=10, glow=0.45)
    add('SOPRA OUTRA VEZ.', B(80), 0.5, 0.50, 99.6, 102.6, 'mist', track=12)
    add('SOPRA SOBRE NÓS.', B(80), 0.5, 0.50, 105.3, 108.6, 'mist', track=12)
    add('רוּחַ', ImageFont.truetype(HEB, 430), 0.50, 0.46, 110.7, 115.95, 'gust', rtl=True, fin=2.5, fout=0.65, color=MARFIM, glow=0.75, npart=9000)
    return C


# ───────────────── tela final ─────────────────
class EndCard:
    def __init__(self):
        self.ruach = render_lines(['RUACH'], font_cap(ANTON, 452), track=18)
        self.conf = render_lines(['CONFERENCE'], font_cap(ANTON, 82), track=6)
        lg = Image.open(LOGO)
        lw = 250
        self.logo = np.asarray(lg.resize((lw, int(lg.height * lw / lg.width)), Image.LANCZOS)).astype(F32) / 255
        q = '“VEM DOS QUATRO VENTOS, Ó ESPÍRITO, E ASSOPRA SOBRE ESTES MORTOS, PARA QUE VIVAM.”'
        self.quote = render_lines([q], font_cap(BEBAS, 30), track=1, shear=-0.18)
        self.ref = render_lines(['EZEQUIEL 37:9'], font_cap(BEBAS, 19), track=7)
        self.anos = render_lines(['19 ANOS OBPC LIMEIRA'], font_cap(BEBAS, 30), track=5)
        self.cards = [
            Card(self.conf, 0.5, 0.205, 116.5, 999, 'light', fin=0.45, fout=0, glow=0.25, seed=901),
            Card(self.logo, 0.5, 0.095, 116.83, 999, 'mist', fin=0.4, fout=0, glow=0.1, seed=902),
            Card(self.quote, 0.5, 0.745, 117.0, 999, 'dust', fin=0.4, fout=0, glow=0.12, seed=903, npart=1500),
            Card(self.ref, 0.5, 0.79, 117.1, 999, 'mist', color=DEST, fin=0.35, fout=0, glow=0.15, seed=904),
            Card(self.anos, 0.5, 0.90, 117.25, 999, 'light', color=OURO, fin=0.4, fout=0, glow=0.15, seed=905),
        ]
        r = np.random.default_rng(77)
        self.ring = r.random((3, 2500)).astype(F32)

    def draw(self, t, frame, pbuf):
        lt = t - 116.0
        sc = 1.0 + 0.08 * (1 - sms(0, 0.25, lt))
        m = self.ruach
        if sc != 1.0:
            im = Image.fromarray((m * 255).astype(np.uint8))
            im = im.resize((int(m.shape[1] * sc), int(m.shape[0] * sc)), Image.BICUBIC)
            m = np.asarray(im).astype(F32) / 255
        h, w = m.shape
        x0, y0 = int(FW / 2 - w / 2), int(0.47 * FH - h / 2)
        reg = frame[y0:y0 + h, x0:x0 + w]
        g = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(28))).astype(F32) / 255
        breathe = 1 + 0.04 * math.sin(t * 1.7)
        reg += g[..., None] * OURO * (0.55 + 0.6 * (1 - sms(0, 0.6, lt))) * breathe
        reg[:] = reg * (1 - m[..., None]) + m[..., None] * MARFIM
        # anel de poeira (onda de choque)
        if lt < 0.9:
            rr = self.ring
            rad = (0.05 + lt * (0.8 + 1.4 * rr[0])) * FW * 0.5
            a = rr[1] * 2 * math.pi
            x = FW / 2 + np.cos(a) * rad
            y = 0.47 * FH + np.sin(a) * rad * 0.55
            splat(pbuf, x / FW, y / FH, (1 - lt / 0.9) * 1.5)
        for c in self.cards:
            c.draw(t, frame, pbuf)
