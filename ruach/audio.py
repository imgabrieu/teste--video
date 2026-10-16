"""Trilha: respiração, vento, drones, cordas, percussão, impactos + narração com reverb. Tudo sintetizado em numpy."""
import numpy as np, wave, os, json, sys
sys.path.insert(0, os.path.dirname(__file__))
from timeline import *
SR = 44100
HERE = os.path.dirname(__file__)
N = int(TOTAL * SR) + SR
t = np.arange(N, dtype=np.float64) / SR
I = INTENS(t).astype(np.float32); Wd = WIND(t).astype(np.float32)
f = np.fft.rfftfreq(N, 1 / SR)

def band(lo, hi, seed, pink=False):
    x = np.random.default_rng(seed).standard_normal(N)
    X = np.fft.rfft(x); H = np.ones_like(f)
    if lo: H *= 1 / (1 + (lo / np.maximum(f, 1e-3)) ** 4)
    if hi: H *= 1 / (1 + (f / hi) ** 4)
    if pink: H *= 1 / np.sqrt(np.maximum(f, 30) / 100)
    y = np.fft.irfft(X * H, N); return (y / y.std()).astype(np.float32)

def gust(seed):
    g = band(0, 0.35, seed); return (0.3 + 0.7 / (1 + np.exp(-1.6 * g))).astype(np.float32)

def seg(t0, t1, pad=0.0):
    return slice(max(0, int((t0 - pad) * SR)), min(N, int((t1 + pad) * SR)))

def smooth(x, sec):
    k = max(1, int(sec * SR)); xp = np.pad(x, (k // 2, k - k // 2 - 1), mode="edge")
    c = np.cumsum(np.insert(xp.astype(np.float64), 0, 0)); return ((c[k:] - c[:-k]) / k).astype(np.float32)

music_gate = np.clip((APEX - t) / 0.02, 0, 1).astype(np.float32)   # corte seco no ápice

# ---------- vento (L/R independentes)
wind = []
for ch, sd in enumerate((11, 12)):
    low = band(20, 200, sd, True); air = band(250, 1800, sd + 10, True); hiss = band(1800, 7000, sd + 20)
    g1, g2 = gust(sd + 30), gust(sd + 40)
    w = low * (0.012 + 0.5 * Wd * g1) + air * (0.008 + 0.38 * Wd ** 1.2 * g2) + hiss * (0.22 * Wd ** 2.2 * g1)
    wind.append(w * music_gate)
mid = [band(350, 3200, 51), band(350, 3200, 52)]
hs = [band(1500, 9000, 53), band(1500, 9000, 54)]

# ---------- respirações / sopros
breath_env = np.zeros(N, np.float32)
def breath(t0, inh=1.8, exh=2.4, amp=0.4):
    for (a, d, k) in ((t0, inh, 0.55), (t0 + inh + 0.35, exh, 1.0)):
        s = seg(a, a + d); x = (t[s] - a) / d
        breath_env[s] += (amp * k * np.sin(np.pi * x) ** 2 * (0.6 + 0.4 * x if k < 1 else 1.0 - 0.3 * x)).astype(np.float32)
breath(0.5, 1.9, 2.5, 0.5); breath(7.0, 1.7, 2.4, 0.45)
for dt, a in ((0.2, 0.4), (3.6, 0.5), (7.2, 0.6)): breath(S["s3"]["t0"] + dt, 1.3, 1.8, a)
for dt, a in ((0.0, 1.0), (2.0, 1.1), (4.3, 1.2)): breath(S["s7"]["t0"] + dt, 1.0, 1.4, a)
for dt, a in ((1.0, 0.5), (5.5, 0.55), (9.5, 0.6)): breath(S["s10"]["t0"] + dt, 1.5, 2.0, a)
breath_L = mid[0] * breath_env * 0.6 + hs[0] * breath_env * 0.25
breath_R = mid[1] * breath_env * 0.6 + hs[1] * breath_env * 0.25

# ---------- drones e cordas
def add(dst, s, x): dst[s] += x.astype(np.float32)
drone = (np.sin(2 * np.pi * 36.71 * t) + 0.5 * np.sin(2 * np.pi * 73.42 * t + 1) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.07 * t))
         + 0.25 * np.sin(2 * np.pi * 55 * t)).astype(np.float32)
drone *= (0.015 + 0.34 * I ** 1.6) * np.clip(t / 6.0, 0, 1) * music_gate

CH = {"s1": [146.8, 220.0], "s2": [73.4, 146.8, 220.0, 293.7], "s3": [146.8, 174.6, 220.0, 293.7],
      "s4": [73.4, 110.0, 146.8, 174.6], "s5": [116.5, 174.6, 233.1, 293.7],
      "s6": [98.0, 146.8, 196.0, 233.1, 293.7], "s7": [73.4, 110.0, 146.8, 185.0, 220.0, 293.7, 370.0],
      "s8": [123.5, 185.0, 246.9, 293.7], "s9": [98.0, 146.8, 196.0, 246.9, 293.7, 392.0],
      "s10": [146.8, 220.0, 293.7, 370.0, 440.0, 587.3]}
PC = os.path.join(HERE, 'audio/pad_cache.npy')
if os.path.exists(PC):
    pad = list(np.load(PC))
else:
    pad = [np.zeros(N, np.float32), np.zeros(N, np.float32)]
    for sc in SCENES_T:
        fade = 3.0; a, b = sc["t0"] - fade, min(sc["t1"] + fade, APEX if sc["id"] == "s10" else sc["t1"] + fade)
        s = seg(a, b); tt = t[s]
        env = np.clip((tt - a) / (2 * fade), 0, 1) * np.clip((b - tt) / (2 * fade), 0, 1)
        env = np.minimum(1, env * 1.6) if sc["id"] != "s1" else np.clip(env * 1.6, 0, 1)
        cut = 260 + 3600 * INTENS(tt) ** 1.4
        amp = (0.01 + 0.30 * INTENS(tt) ** 1.3) * env
        for ch in range(2):
            acc = np.zeros(len(tt))
            for fr in CH[sc["id"]]:
                for dt in ((-0.0035, 0.004) if ch == 0 else (0.0045, -0.0028)):
                    ff = fr * (1 + dt); ph = 2 * np.pi * ff * (tt - 0.0016 * np.cos(2 * np.pi * 5.2 * tt) / (2 * np.pi * 5.2))
                    for k in range(1, 9):
                        wk = np.clip(1.25 - ff * k / cut, 0, 1)
                        if wk.max() <= 0: break
                        acc += np.sin(ph * k + k) / k * wk
            pad[ch][s] += (acc * amp / (len(CH[sc["id"]]) ** 0.55)).astype(np.float32)


    np.save(PC, np.stack(pad))

# ---------- percussão
perc = np.zeros(N, np.float32)
def drum(t0, amp=1.0, low=True):
    s = seg(t0, t0 + 1.4); x = t[s] - t0
    if len(x) == 0: return
    fr = (45 + 70 * np.exp(-x * 14)) if low else (90 + 120 * np.exp(-x * 20))
    ph = 2 * np.pi * np.cumsum(fr) / SR
    perc[s] += (amp * (np.sin(ph) * np.exp(-x * 5.5) + 0.25 * np.random.default_rng(int(t0 * 100) % 999).standard_normal(len(x)) * np.exp(-x * 60))).astype(np.float32)
beat = 60 / 66
def beats(s0, s1, step, amp0, amp1):
    n = int((s1 - s0) / step)
    for i in range(n):
        tt0 = s0 + i * step
        if tt0 < APEX - 0.05: drum(tt0, (amp0 + (amp1 - amp0) * i / max(1, n - 1)) * (1.0 if i % 4 == 0 else 0.7), i % 2 == 0)
beats(S["s6"]["t0"] + 1.0, S["s7"]["t0"], beat, 0.25, 0.8)
beats(S["s7"]["t0"], S["s8"]["t0"], beat / 2, 0.8, 0.9)
beats(S["s8"]["t0"] + 2.0, S["s9"]["t0"], beat * 2, 0.22, 0.4)
beats(S["s9"]["t0"], APEX, beat / 2, 0.55, 1.0)
perc *= music_gate

# ---------- risers e impactos
imp = np.zeros(N, np.float32)
def boom(t0, amp=1.0):
    s = seg(t0, t0 + 4.0); x = t[s] - t0
    ph = 2 * np.pi * np.cumsum(30 + 90 * np.exp(-x * 7)) / SR
    imp[s] += (amp * (np.sin(ph) * np.exp(-x * 1.1) + 0.35 * np.sin(2 * np.pi * 55 * x) * np.exp(-x * 2) )).astype(np.float32)
    n = np.random.default_rng(5).standard_normal(len(x)).astype(np.float32)
    imp[s] += 0.35 * amp * smooth(n, 0.0008)[: len(x)] * np.exp(-x * 2.2)
def riser(t0, t1, amp=0.5, f0=180, f1=1500):
    s = seg(t0, t1); x = (t[s] - t0) / (t1 - t0)
    ph = 2 * np.pi * np.cumsum(f0 * (f1 / f0) ** x) / SR
    imp[s] += (amp * x ** 2.2 * (0.5 * np.sin(ph) + 0.3 * np.sin(ph * 1.5) )).astype(np.float32)
    imp[s] += (amp * 0.9 * x ** 3 * hs[0][s]).astype(np.float32)
riser(S["s6"]["t1"] - 4.0, S["s6"]["t1"], 0.5); boom(S["s7"]["t0"], 1.0)
riser(S["s8"]["t1"] - 2.5, S["s8"]["t1"], 0.4); boom(S["s9"]["t0"], 0.75)
riser(APEX - 9.0, APEX, 0.75, 150, 2400)
boom(S["s3"]["t1"] - 0.1, 0.25); boom(S["s6"]["t0"], 0.45)
imp *= music_gate

# ---------- final: sopro, hush, impacto
fin = [np.zeros(N, np.float32), np.zeros(N, np.float32)]
def gustfx(t0, amp, att=0.35, dec=1.9):
    s = seg(t0, t0 + att + dec * 2.5); x = t[s] - t0
    env = np.where(x < att, (x / att) ** 2, np.exp(-(x - att) / dec)).astype(np.float32)
    for ch in range(2):
        fin[ch][s] += amp * env * (mid[ch][s] * 0.55 + hs[ch][s] * 0.3 + wind[ch][s] * 0)
        fin[ch][s] += amp * env * band(60, 400, 70 + ch)[s] * 0.5
gustfx(FT["gust"], 1.0, 0.30, 1.6)
gustfx(FT["hebrew"] - 0.4, 0.25); gustfx(FT["ruach"] - 0.4, 0.35); gustfx(FT["conf"] - 0.4, 0.4)
hush = (np.sin(2 * np.pi * 36.71 * t) + 0.4 * np.sin(2 * np.pi * 55 * t)).astype(np.float32)
hush *= np.clip((t - FT["ruach"]) / 4, 0, 1) * 0.12 * (t > APEX)
fe = [l for l in LINES_T if l["id"] == "fe"][0]
gustfx(fe["t"] - 0.15, 0.9, 0.3, 1.2); boom(fe["t"] + 0.0, 1.0)
END = fe["t"] + fe["dur"] + 0.25
endgate = np.clip((END - t) / 0.02, 0, 1).astype(np.float32)

# ---------- narração
narr = np.zeros(N, np.float32); send = np.zeros(N, np.float32)
def readwav(p):
    with wave.open(p) as w: return np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
for L in LINES_T:
    x = readwav(f"{HERE}/audio/lines/{L['id']}.wav"); lvl = L["lvl"]
    s0 = int(L["t"] * SR); env = smooth(np.abs(x), 0.04)
    nz = band(500, 6500, 90 + hash(L["id"]) % 50)[s0:s0 + len(x)] if True else 0
    nz = nz[: len(x)] if len(nz) >= len(x) else np.pad(nz, (0, len(x) - len(nz)))
    y = x * (0.34 + 0.66 * lvl) + nz * env * (0.55 * (1 - lvl) ** 1.5)
    y *= np.minimum(1, np.minimum(np.arange(len(y)) / 800, np.arange(len(y))[::-1] / 1500))
    e = min(N, s0 + len(y)); narr[s0:e] += y[: e - s0]
    send[s0:e] += y[: e - s0] * (0.18 + 0.55 * lvl)
narr_env = smooth(np.abs(narr), 0.35)

# ---------- reverb sintético
def make_ir(sec, seed, decay):
    n = int(sec * SR); x = np.random.default_rng(seed).standard_normal(n)
    X = np.fft.rfft(x); ff = np.fft.rfftfreq(n, 1 / SR); x = np.fft.irfft(X / (1 + (ff / 3800) ** 2), n)
    ir = x * np.exp(-np.arange(n) / SR / decay); ir[: int(0.035 * SR)] *= 0
    return (ir / np.sqrt((ir ** 2).sum())).astype(np.float32)
def conv(x, ir):
    n = 1 << int(np.ceil(np.log2(len(x) + len(ir))))
    return np.fft.irfft(np.fft.rfft(x, n) * np.fft.rfft(ir, n), n)[: len(x)].astype(np.float32)
IR = [make_ir(3.6, 1, 0.95), make_ir(3.6, 2, 0.95)]

duck = 1 - 0.45 * np.clip(narr_env * 8, 0, 1)
musicL = (drone + pad[0] + perc + imp + breath_L) * music_gate
musicR = (drone + pad[1] + perc + imp + breath_R) * music_gate
musicL = musicL * duck; musicR = musicR * duck
outs = []
for ch, (mus, IRc) in enumerate(((musicL, IR[0]), (musicR, IR[1]))):
    wet_m = conv(mus * 0.35, IRc) * music_gate if False else conv(mus * 0.35, IRc)
    wet_n = conv(send, IRc)
    final_ch = mus * 0.9 + wet_m * 0.9 + wind[ch] * duck * 0.55 + narr * 1.9 + wet_n * 0.8 + (fin[ch] + hush) * endgate
    outs.append(final_ch)
out = np.stack(outs, 1)
def r(x,a,b): return round(float(np.sqrt((x[int(a*SR):int(b*SR)]**2).mean())),4)
for nm,x in (("drone",drone),("pad",pad[0]),("perc",perc),("imp",imp),("breath",breath_L),("wind",wind[0]),("narr",narr),("wetn",conv(send,IR[0])),("mus",musicL),("final",outs[0])):
    print(nm, [r(x,a,a+6) for a in (0,30,66,100)])
out = np.tanh(out * 0.95) ; out *= 0.9 / np.abs(out).max()
out = out[: int(END * SR)]
with wave.open(os.path.join(HERE, "audio/mix.wav"), "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
json.dump(dict(end=END), open(os.path.join(HERE, "audio/end.json"), "w"))
print("ok", round(END, 1), "peak/rms", float(np.abs(out).max()), float(np.sqrt((out ** 2).mean())))
