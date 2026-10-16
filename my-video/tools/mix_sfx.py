"""Conservative SFX mix: for every effect, pick a gain so its loudness sits well BELOW the voice at that moment.
Usage: python3 tools/mix_sfx.py <source_video> <sfx_dir> '<json list [{"id","file","at"}]>' [margin_db=16]
Rule: effect RMS (first 0.4 s of the file x gain) <= local voice RMS - margin_db, effect peak <= voice RMS - 3 dB (voice peaks run ~12 dB above its RMS), gain <= 0.25.
Where the voice is silent at that moment (e.g. closing card) the clip-wide median speech level is used."""
import json, os, subprocess, sys, wave
import numpy as np

video, sfx_dir, items = sys.argv[1], sys.argv[2], json.loads(sys.argv[3])
margin = float(sys.argv[4]) if len(sys.argv) > 4 else 16.0
tmp = "/tmp/_mix_voice.wav"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", video, "-ac", "1", "-ar", "16000", tmp], check=True)
w = wave.open(tmp); v = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768; sr = 16000
dbf = lambda x: float(20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-9)) if len(x) else -99.0
frames = v[: len(v) // 160 * 160].reshape(-1, 160)
fr_db = 20 * np.log10(np.sqrt((frames ** 2).mean(1)) + 1e-9)
median_speech = float(np.median(fr_db[fr_db > -45]))
out = []
for it in items:
    s = wave.open(os.path.join(sfx_dir, os.path.basename(it["file"])))
    x = np.frombuffer(s.readframes(s.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    sr_s = s.getframerate(); seg = x[: int(0.4 * sr_s)]
    sfx_rms, sfx_peak = dbf(seg), float(20 * np.log10(np.abs(x).max() + 1e-9))
    a = int(max(0, it["at"] - 0.1) * sr); b = int((it["at"] + 0.5) * sr)
    voice = dbf(v[a:b])
    ref = voice if voice > -45 else median_speech
    g_rms = ref - margin - sfx_rms
    g_peak = ref - 3 - sfx_peak
    gain = min(10 ** (min(g_rms, g_peak) / 20), 0.25)
    out.append({"id": it["id"], "at": it["at"], "voice_rms_db": round(ref, 1), "gain": round(float(gain), 3),
                "sfx_rms_db": round(float(sfx_rms + 20 * np.log10(gain)), 1), "sfx_peak_db": round(float(sfx_peak + 20 * np.log10(gain)), 1)})
print(json.dumps({"median_speech_db": round(median_speech, 1), "effects": out}, indent=1))
