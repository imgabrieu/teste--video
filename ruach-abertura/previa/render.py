"""Monta a linha do tempo e renderiza o vídeo (sem áudio)."""
import math
import subprocess
import sys
import numpy as np
from PIL import Image, ImageFilter
from common import *
import scenes as S
import typo

B2 = {k: np.concatenate([v, [x]]) for (k, v), x in zip(S.BONES.items(), [0.06, 2.58, 0.25, 0.09])}


def base(t):
    """cena crua (meia resolução)"""
    if t < 9.0:
        return S.water_macro(t)
    if t < 14.5:
        return S.ocean(t, 0.36, 0.05)
    if t < 20.0:
        return S.ocean(t, 0.58, 0.012, pool=sms(14.6, 16.0, t), gap=sms(14.5, 15.6, t), lt=t - 14.5)
    if t < 22.0:
        return S.candle(t)
    if t < 24.0:
        return S.sand(t)
    if t < 26.0:
        return S.linen(t)
    if t < 28.0:
        return S.dust_beam(t)
    if t < 33.5:
        return S.valley(t, 0.30, 0.22, (t - 28) * 0.10, sat=0.35, cloud_speed=0.0)
    if t < 38.0:
        return S.valley(t, 0.40, 0.035, 2.0 + (t - 33.5) * 0.10, sat=0.35, cloud_speed=0.0, bones=B2)
    if t < 42.5:
        return S.bone_macro(t)
    if t < 47.0:
        return S.soil_macro(t)
    if t < 51.0:
        return S.valley(t, 0.55, 0.03, 5 + (t - 47) * 0.03, dust=sms(47.5, 50.5, t) * 0.5, wind=0.1, sat=0.55, cloud_speed=0.01)
    if t < 54.5:
        return S.valley(t, 0.42, 0.05, 7 + (t - 51) * 0.05, dust=0.95, wind=0.6, cloud_speed=0.06, sat=0.75, front=-0.15 + (t - 51) * 0.38)
    if t < 58.0:
        return S.linen_branch(t)
    if t < 64.0:
        return S.valley(t, 0.5, 0.04, 9 + (t - 58) * 0.04, dust=0.75, wind=1.0, cloud_speed=0.08, storm=0.7, slide=(t - 58) * 0.08, sat=0.8)
    if t < 67.0:
        return S.valley(t, 0.48, 0.04, 12.0, arcs=sms(64.0, 66.5, t), dust=0.3, wind=0.2, sat=0.95, cloud_speed=0.02, light=0.2)
    if t < 70.0:
        return S.soil_macro(t, water=sms(67.2, 69.6, t), grains=False)
    if t < 73.0:
        return S.sprout(t)
    if t < 76.5:
        return S.nave(t, push=(t - 73) * 0.012)
    if t < 79.0:
        return S.bible(t)
    if t < 81.0:
        return S.curtains(t)
    if t < 83.0:
        return S.corridor(t, slit=sms(81.0, 83.0, t))
    if t < 86.0:
        return S.corridor(t, slit=1.0, open_=sms(84.8, 85.4, t))
    if t < 89.0:
        return S.sky_storm(t)
    if t < 92.0:
        return S.curtains(t, amp=0.05, speed=3.0, violence=1.0, linens=1.0)
    if t < 95.0:
        return S.nave(t, push=0.05 + (t - 92) * 0.02, beams=1.8, dust=2.2, doors=1.0, violence=0.7)
    if t < 99.0:
        return S.nave(t, push=0.11, beams=max(0.0, 1 - (t - 95) / 3.5) * 0.6, dust=0.3, dim=0.35)
    if t < 116.0:
        return S.bokeh(t)
    return S.endcard_bg(t)


def wipe(a, b, p, edge=OURO):
    f = 0.7 * X + 0.3 * samp(TA, X * 1.5, Y * 1.5)
    e = p * 1.5 - 0.25
    m = sm(e + 0.08, e - 0.08, f)[..., None]
    rim = np.exp(-((f - e) / 0.04) ** 2)[..., None]
    return a * (1 - m) + b * m + rim * edge * 0.35


# transições de matéria: (início, fim, tempo de A, tempo de B)
WIPES = [(19.42, 20.0), (21.67, 22.0), (23.67, 24.0), (25.67, 26.0), (50.5, 51.0), (54.25, 54.5),
         (78.67, 79.0)]


def scene(t):
    for (a, b) in WIPES:
        if a <= t < b:
            return wipe(base(t), base(b + 0.001), (t - a) / (b - a))
    img = base(t)
    if 72.67 <= t < 73.0:       # match cut de luz
        img = img * (1 - (t - 72.67) / 0.33) + base(73.001) * ((t - 72.67) / 0.33)
    if 99.0 <= t < 100.0:       # único dissolve do filme
        k = t - 99.0
        img = S.nave(t, push=0.11, beams=0.0, dust=0.3, dim=0.35) * (1 - k) + img * k
    return img


def exposure(t):
    e = sms(0.8, 2.2, t)
    e *= 1 - 0.96 * sms(94.4, 94.98, t) * (t < 95)
    if 95 <= t < 96:
        e *= 0.3 + 0.7 * sms(95, 96, t)
    if 64.0 <= t < 64.25:
        e *= 1 + 0.8 * (1 - (t - 64) / 0.25)
    if 84.8 <= t < 85.2:
        e *= 1 + 1.2 * (1 - (t - 84.8) / 0.4)
    return e


CARDS = typo.build_cards()
END = typo.EndCard()
VIG = None
GRAIN = None


def upscale(img):
    out = np.empty((FH, FW, 3), F32)
    for c in range(3):
        out[..., c] = np.asarray(Image.fromarray(np.ascontiguousarray(img[..., c], dtype=F32), 'F').resize((FW, FH), Image.BILINEAR))
    return out


def frame(i):
    global VIG, GRAIN
    if VIG is None:
        gx, gy = typo.GX / FW - 0.5, typo.GY / FH - 0.5
        VIG = (1 - 0.55 * (gx * gx * 1.3 + gy * gy * 1.8) * 1.6).clip(0.3, 1)[..., None].astype(F32)
        r = np.random.default_rng(5)
        GRAIN = [r.normal(0, 1, (FH // 2, FW // 2)).astype(F32) for _ in range(6)]
    t = i / FPS
    img = scene(t)
    if 64.0 <= t < 64.25:
        img = img + OSSO * 0.5 * (1 - (t - 64) / 0.25)
    if 116.0 <= t < 116.35:
        img = img + OURO * 0.35 * (1 - (t - 116) / 0.35)
    fr = upscale(img * exposure(t))
    pbuf = np.zeros((FH, FW), F32)
    for c in CARDS:
        c.draw(t, fr, pbuf)
    if t >= 116.0:
        END.draw(t, fr, pbuf)
    if pbuf.any():
        pb = Image.fromarray((np.clip(pbuf, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.3))
        p = np.asarray(pb).astype(F32) / 255 * 2.2
        fr += p[..., None] * (DEST * 0.85 + MARFIM * 0.15)
    fr *= VIG
    # grade: sombras azul-noite, altas luzes quentes, curva suave
    lum = fr.mean(axis=2, keepdims=True)
    fr = fr + (1 - np.clip(lum * 3, 0, 1)) * NOITE * 0.06
    fr = fr * 1.15 / (1 + 0.15 * fr)  # rolloff
    g = GRAIN[i % 6]
    g = np.repeat(np.repeat(g, 2, 0), 2, 1)[..., None]
    fr = fr + g * 0.018 * (0.4 + 0.6 * np.clip(1 - lum, 0, 1))
    return (np.clip(np.nan_to_num(fr), 0, 1) * 255 + 0.5).astype(np.uint8)


def render_range(a, b, out):
    p = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
                          '-s', f'{FW}x{FH}', '-r', str(FPS), '-i', '-', '-c:v', 'libx264', '-preset', 'medium',
                          '-crf', '17', '-pix_fmt', 'yuv420p', out], stdin=subprocess.PIPE)
    for i in range(a, b):
        p.stdin.write(frame(i).tobytes())
        if (i - a) % 120 == 0:
            print(f'[{out}] {i}/{b}', flush=True)
    p.stdin.close()
    p.wait()


if __name__ == '__main__':
    mode = sys.argv[1]
    if mode == 'stills':
        ts = [float(x) for x in sys.argv[3].split(',')]
        ims = [Image.fromarray(frame(int(t * FPS))).resize((640, 360)) for t in ts]
        cols = 4
        rows = math.ceil(len(ims) / cols)
        sheet = Image.new('RGB', (640 * cols, 360 * rows))
        for k, im in enumerate(ims):
            sheet.paste(im, ((k % cols) * 640, (k // cols) * 360))
        sheet.save(sys.argv[2])
    elif mode == 'one':
        Image.fromarray(frame(int(float(sys.argv[3]) * FPS))).save(sys.argv[2])
    elif mode == 'range':
        render_range(int(sys.argv[2]), int(sys.argv[3]), sys.argv[4])
