"""Synthesises the small, original sound-effect set used by the edit (no external assets).
Run: python3 tools/make_sfx.py   -> writes public/sfx/*.wav (44.1 kHz, 16-bit, mono)"""
import numpy as np, wave, os
SR = 44100
rng = np.random.default_rng(7)
out = os.path.join(os.path.dirname(__file__), "..", "public", "sfx")
os.makedirs(out, exist_ok=True)

def t(d): return np.arange(int(SR * d)) / SR
def env(n, a, r):  # attack/release in seconds, smooth
    e = np.ones(n); na, nr = int(a * SR), int(r * SR)
    e[:na] = np.sin(np.linspace(0, np.pi / 2, na)) ** 2
    e[-nr:] = np.cos(np.linspace(0, np.pi / 2, nr)) ** 2
    return e
def lowpass(x, fc):  # one-pole
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); s = 0.0
    for i, v in enumerate(x): s = (1 - a) * v + a * s; y[i] = s
    return y
def norm(x, peak): return x / (np.abs(x).max() + 1e-9) * peak
def save(name, x):
    x = np.clip(x, -1, 1); w = wave.open(os.path.join(out, name + ".wav"), "wb")
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((x * 32767).astype("<i2").tobytes()); w.close()

# whoosh: band-passed noise whose cutoff sweeps up then down
d = 0.55; n = int(SR * d); noise = rng.standard_normal(n)
fc = 300 + 3200 * np.sin(np.linspace(0, np.pi, n)) ** 1.5
y = np.zeros(n); lp = 0.0; hp = 0.0
for i in range(n):
    a = np.exp(-2 * np.pi * fc[i] / SR); lp = (1 - a) * noise[i] + a * lp
    hp = 0.995 * hp + 0.005 * lp; y[i] = lp - hp
save("whoosh", norm(y * env(n, 0.18, 0.3), 0.8))

# pop: short sine drop with fast decay
x = t(0.14); f = 520 * np.exp(-x * 14) + 180
save("pop", norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-x * 30), 0.8))

# click / tick: very short filtered noise burst + tiny tone
x = t(0.06); c = rng.standard_normal(len(x)) * np.exp(-x * 140)
c = lowpass(c, 6000) + 0.5 * np.sin(2 * np.pi * 1800 * x) * np.exp(-x * 90)
save("click", norm(c, 0.7))

# riser: filtered noise + soft rising tone, 1.2 s, swelling to the end
d = 1.2; n = int(SR * d); x = t(d); noise = rng.standard_normal(n)
fcr = 400 + 5000 * (x / d) ** 2; y = np.zeros(n); lp = 0.0
for i in range(n):
    a = np.exp(-2 * np.pi * fcr[i] / SR); lp = (1 - a) * noise[i] + a * lp; y[i] = lp
tone = np.sin(2 * np.pi * np.cumsum(220 + 440 * (x / d) ** 2) / SR) * 0.25
r = (y * 0.8 + tone) * (x / d) ** 2.2 * env(n, 0.01, 0.03)
save("riser", norm(r, 0.7))

# impact: soft sub thump with tiny air tail
d = 0.9; x = t(d); f = 70 * np.exp(-x * 5) + 38
th = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-x * 5.5)
air = lowpass(rng.standard_normal(len(x)), 2500) * np.exp(-x * 9) * 0.15
save("impact", norm((th + air) * env(len(x), 0.004, 0.2), 0.85))
print("sfx written to", os.path.abspath(out))

# --- soft, feminine accents for the Livia edit ---
def bell(freqs, d, decay, amps=None):
    x = t(d); amps = amps or [1.0] * len(freqs)
    return sum(a * np.sin(2 * np.pi * f * x) * np.exp(-x * decay * (1 + i * 0.35)) for i, (f, a) in enumerate(zip(freqs, amps)))

# chime: gentle glassy bell (A5 + soft overtones), long tail
c = bell([880, 1318.5, 1760, 2637], 1.4, 3.2, [1, 0.5, 0.3, 0.12])
save("chime", norm(c * env(len(c), 0.004, 0.5), 0.7))

# shimmer: three quick rising sparkles
d = 0.9; sh = np.zeros(int(SR * d))
for k, (st, f) in enumerate([(0.0, 2093), (0.09, 2637), (0.18, 3136)]):
    b = bell([f, f * 2.01], d - st, 7.0, [1, 0.35]); sh[int(st * SR):int(st * SR) + len(b)] += b * (0.8 ** k)
save("shimmer", norm(sh * env(len(sh), 0.002, 0.3), 0.6))

# soft swipe: very light, airy whoosh (quieter, shorter than whoosh)
d = 0.4; n = int(SR * d); noise = rng.standard_normal(n)
fc = 900 + 2600 * np.sin(np.linspace(0, np.pi, n)); y = np.zeros(n); lp = 0.0; hp = 0.0
for i in range(n):
    a = np.exp(-2 * np.pi * fc[i] / SR); lp = (1 - a) * noise[i] + a * lp
    hp = 0.99 * hp + 0.01 * lp; y[i] = lp - hp
save("swipe", norm(y * env(n, 0.14, 0.22), 0.6))
