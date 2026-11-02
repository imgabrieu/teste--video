"""Som e trilha sintetizados (versão sem narração). 48 kHz estéreo, 120 s."""
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR = 48000
DUR = 120.0
N = int(SR * DUR)
t = np.arange(N) / SR
rng = np.random.default_rng(3)


def env(keys):
    k = np.array(keys, dtype=float)
    return np.interp(t, k[:, 0], k[:, 1], left=0.0, right=0.0)


def band(x, lo, hi, order=2):
    if lo is None:
        sos = butter(order, hi, 'low', fs=SR, output='sos')
    elif hi is None:
        sos = butter(order, lo, 'high', fs=SR, output='sos')
    else:
        sos = butter(order, [lo, hi], 'band', fs=SR, output='sos')
    return sosfilt(sos, x)


def noise():
    return rng.standard_normal(N).astype(np.float64)


def pan(x, p):
    """p em [-1,1] (pode ser array)"""
    a = (p + 1) * np.pi / 4
    return np.stack([x * np.cos(a), x * np.sin(a)])


L = np.zeros((2, N))

# ─────────── VENTO (4 bandas, estéreo, rajadas que atravessam L→R) ───────────
gust_lfo = 0.65 + 0.35 * np.sin(2 * np.pi * 0.11 * t) * np.sin(2 * np.pi * 0.037 * t + 1)
bands = [(60, 250), (250, 1200), (1500, 6000), (6000, 12000)]
K = [  # t, low, mid, high, air
    (0, 0, 0, 0, 0), (1, .01, .006, .003, .002), (8, .03, .015, .006, .004),
    (9, .09, .045, .012, .006), (19.5, .11, .06, .02, .01), (20, .07, .08, .05, .02),
    (27.9, .10, .10, .06, .025), (27.99, 0, 0, 0, 0),
    (44, 0, 0, 0, 0), (46, .01, .008, .004, .002), (51, .06, .04, .02, .01),
    (56, .20, .13, .06, .03), (62, .34, .22, .10, .05), (64, .22, .14, .07, .03),
    (67, .12, .08, .04, .02), (72.9, .06, .05, .03, .015),
    (73, .03, .04, .035, .02), (80.9, .06, .06, .05, .02), (84.7, .14, .12, .07, .03),
    (84.85, .48, .32, .16, .08), (94.5, .42, .30, .15, .07), (94.62, .06, .05, .02, .01),
    (98, .03, .025, .01, .006), (108.7, .008, .006, .003, .002), (108.8, 0, 0, 0, 0), (120, 0, 0, 0, 0)]
wind = np.zeros((2, N))
for bi, (lo, hi) in enumerate(bands):
    g = env([(k[0], k[1 + bi]) for k in K]) * gust_lfo
    for ch in range(2):
        wind[ch] += band(noise(), lo, hi) * g * (3.0 if bi == 0 else 1.6)
# rajadas viajando L→R (a cada ~4 s quando há vento)
for gt in np.arange(10, 108, 3.7):
    d = 1.6
    m = (t >= gt) & (t < gt + d)
    if not m.any():
        continue
    u = (t[m] - gt) / d
    sw = band(noise()[: m.sum()], 300, 2500) * np.sin(np.pi * u) ** 2
    L[:, m] += pan(sw, -1 + 2 * u) * 0.25 * np.interp(gt, [k[0] for k in K], [k[2] for k in K]) * 4
L += wind

# ─────────── ÁGUA (cena 01–02) ───────────
lap = band(noise(), 150, 900) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.35 * t) ** 8)
L += pan(lap * env([(0, 0), (1.5, .02), (9, .035), (14, .03), (20, .0)]), np.sin(t * 0.3) * 0.3)
ocean = band(noise(), 40, 500) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.12 * t))
L += pan(ocean * env([(8.9, 0), (9.0, .09), (19.5, .1), (20, 0)]), 0)


def drip(at, f0=1300, gain=0.08):
    m = (t >= at) & (t < at + 0.25)
    u = t[m] - at
    s = np.sin(2 * np.pi * (f0 * u - 900 * u * u)) * np.exp(-u * 28)
    L[:, m] += pan(s * gain, 0.2)


for d in (3.0, 20.9, 67.3, 68.2, 69.0):
    drip(d)

# ─────────── AR MORTO DO VALE ───────────
dead = np.zeros((2, N))
dm = env([(27.99, 0), (28.0, 1), (43.5, 1), (46, 0)])
dead += pan(np.sin(2 * np.pi * 38 * t) * 0.012 * dm, 0)
clicks = (rng.random(N) > 0.99996) * rng.standard_normal(N)
dead += pan(band(clicks, 2000, 6000) * 0.3 * dm, 0.3)

# ─────────── MÚSICA ───────────
mus = np.zeros((2, N))


def saw(f, ph=0.0):
    x = (f * t + ph) % 1.0
    return 2 * x - 1


def pad(freqs, g, cutoff=900, trem=0.0, detune=0.004):
    s = np.zeros(N)
    for f in freqs:
        for d in (-detune, 0, detune):
            s += saw(f * (1 + d), rng.random())
    s = band(s, None, cutoff, 2) / (3 * len(freqs))
    if trem:
        s *= 1 - trem * (0.5 + 0.5 * np.sin(2 * np.pi * 7.5 * t))
    return s * g


D1, D2, A2, D3, E3, A3, D4, E4, D5 = 36.71, 73.42, 110.0, 146.83, 164.81, 220.0, 293.66, 329.63, 587.33
# drone (0:20) — corta em 0:28
mus += pan(pad([D2, A2], env([(20, 0), (22, .10), (27.9, .14), (27.99, 0)]), 500), -0.2)
mus += pan(np.sin(2 * np.pi * D1 * t) * env([(20, 0), (22, .05), (27.9, .06), (27.99, 0)]), 0)
# harmônico de cello (0:44)
vib = np.sin(2 * np.pi * (D4 * t + 0.6 * np.sin(2 * np.pi * 5 * t) / 5))
mus += pan(vib * env([(44, 0), (46, .012), (51, .02), (53, 0)]), 0.3)
# riser orgânico + tremolo (0:51)
mus += pan(pad([D2, A2, D3], env([(51, 0), (56, .12), (63.9, .22), (64.6, .05)]), 1200, trem=0.6), 0)
riser = band(noise(), 800, 4000) * env([(51, 0), (56, .02), (64.4, .07), (64.6, 0)])
mus += pan(riser, np.linspace(-1, 1, N) * 0 + np.sin(t * 0.8) * 0.5)
# ostinato D–A–D a partir de 0:56.3
seq = [D3, A3, D4, A3]
ost = np.zeros(N)
for k, st in enumerate(np.arange(56.3, 64.6, 0.5)):
    m = (t >= st) & (t < st + 0.5)
    u = t[m] - st
    f = seq[k % 4]
    ost[m] += (saw(f)[m]) * np.exp(-u * 3) * (1 - np.exp(-u * 60))
mus += pan(band(ost, None, 1500) * env([(56.3, .03), (64.4, .09), (64.6, 0)]), 0.25)
# acorde aberto (1:04.6) e nota única (1:10.5)
mus += pan(pad([D3, A3, E4], env([(64.6, 0), (64.8, .16), (70.2, .05), (70.4, 0)]), 1600), 0)
mus += pan(pad([D4], env([(70.4, 0), (70.5, 0), (71.2, .10), (73, .05), (74, 0)]), 2200, detune=0.002), 0.1)
# casa: pad quente (1:13) + tensão (1:21)
mus += pan(pad([D3, A3, D4], env([(73, 0), (74.5, .05), (80.9, .05), (81, .06), (84.7, .14), (84.8, 0)]), 900,
               trem=0.0), -0.1)
mus += pan(pad([D2, A2], env([(81, 0), (84.7, .12), (84.8, 0)]), 700, trem=0.7), 0.2)
# ÁPICE (1:24.8) → corta 1:34.6
mus += pan(pad([D2, A2, D3, E3, A3], env([(84.8, .30), (90, .34), (94.55, .36), (94.6, 0)]), 2000, trem=0.25), 0)
mus += pan(pad([D5], env([(86, 0), (88, .06), (94.55, .08), (94.6, 0)]), 3500, detune=0.002), 0.3)
mus += pan(np.sin(2 * np.pi * D1 * t) * env([(84.8, .16), (94.55, .16), (94.6, 0)]), 0)

# reverb no barramento de música
ir_n = int(SR * 2.4)
ir_t = np.arange(ir_n) / SR
ir = rng.standard_normal((2, ir_n)) * np.exp(-ir_t * 2.6)
ir[:, 0] = 1.0
mus_w = np.stack([fftconvolve(mus[c], ir[c])[:N] for c in range(2)]) * 0.06
L += mus + mus_w

# ─────────── PERCUSSÃO GRAVE ───────────
perc = np.zeros(N)


def drum(at, g):
    m = (t >= at) & (t < at + 1.2)
    u = t[m] - at
    f = 45 + 50 * np.exp(-u * 18)
    ph = 2 * np.pi * np.cumsum(f) / SR
    perc[m] += (np.sin(ph) * np.exp(-u * 4.5) + 0.25 * band(rng.standard_normal(m.sum()), None, 400) * np.exp(-u * 30)) * g


for k, at in enumerate(np.arange(55.0, 64.5, 1.0)):
    drum(at, 0.10 + 0.025 * k)
for at in np.arange(85.8, 94.5, 1.0):
    drum(at, 0.33)
L += pan(perc, 0)

# ─────────── IMPACTOS ───────────


def impact(at, g, length=2.5, wood=0.0):
    m = (t >= at) & (t < at + length)
    u = t[m] - at
    f = 35 + 40 * np.exp(-u * 6)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * np.exp(-u * (3.0 / length * 2)) * g
    s += band(rng.standard_normal(m.sum()), None, 300) * np.exp(-u * 12) * g * 0.6
    if wood:
        s += band(rng.standard_normal(m.sum()), 150, 2500) * np.exp(-u * 9) * wood
    L[:, m] += pan(s, 0)


impact(9.0, 0.10, 2.0)
impact(64.6, 0.35, 3.0)
impact(84.8, 0.75, 3.5, wood=0.35)
impact(116.0, 0.85, 3.8)
# sub-pulso do glifo
impact(113.0, 0.12, 1.2)

# ─────────── RAJADA ÚNICA (1:50.5) ───────────
m = (t >= 110.5) & (t < 112.6)
u = t[m] - 110.5
g = np.minimum(u / 0.08, 1) * np.exp(-u * 2.2)
gs = band(rng.standard_normal(m.sum()), 120, 5000) * g * 0.55
L[:, m] += pan(gs, np.clip(-1 + 2 * u / 0.7, -1, 1))
# cauda do vento sob a tela final
L += pan(band(noise(), 200, 3000) * env([(112.5, .0), (113, .03), (119.9, .02)]), 0.2)

# ─────────── SOM DE MATÉRIA NAS PALAVRAS ───────────
WORDS = [2.5, 6.0, 14.6, 20.15, 22.15, 24.15, 26.4, 30.4, 36.0, 40.0, 52.4, 56.3, 64.5, 70.4, 74.0, 85.0, 90.0,
         99.6, 105.3, 116.5, 117.0]
for wt in WORDS:
    m = (t >= wt) & (t < wt + 0.8)
    u = (t[m] - wt) / 0.8
    s = band(rng.standard_normal(m.sum()), 1500, 7000) * np.sin(np.pi * u) ** 2 * 0.035
    L[:, m] += pan(s, -0.8 + 1.6 * u)

# ─────────── GATES (silêncios reais e corte seco) ───────────
gate = np.ones(N)
gate[(t >= 28.0) & (t < 43.9)] = 0
fade = (t >= 43.9) & (t < 44.5)
gate[fade] = (t[fade] - 43.9) / 0.6
L *= gate
L += dead
L[:, (t >= 108.8) & (t < 110.5)] = 0
# soft limiter + normalização
pk = np.abs(L).max()
L = L / pk * 1.15
L = np.tanh(L) / np.tanh(1.15) * 0.89   # pico ≈ -1 dBFS
L[:, t >= 119.999] = 0
wavfile.write('trilha.wav', SR, (L.T * 32767).astype(np.int16))
rms = np.sqrt((L ** 2).mean())
print('ok', 20 * np.log10(rms), 'dBFS RMS')
