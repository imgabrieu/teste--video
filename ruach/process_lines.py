"""Deixa a voz grave/lenta (pitch-down + tempo) e grava duração real de cada fala."""
import subprocess, json, os, wave, sys
sys.path.insert(0, os.path.dirname(__file__))
from script import SCENES, FINAL
D = os.path.join(os.path.dirname(__file__), "audio/lines")
durs = {}
for sc in SCENES + [FINAL]:
    for lid, *_ in sc["lines"]:
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", f"{D}/{lid}_raw.wav", "-af",
            "asetrate=22050*0.82,aresample=44100,atempo=0.93,highpass=f=55,"
            "bass=g=5:f=110:w=0.7,equalizer=f=3200:t=q:w=1.2:g=-3,"
            "acompressor=threshold=-24dB:ratio=3:attack=15:release=250:makeup=4,"
            "alimiter=limit=0.9", f"{D}/{lid}.wav"], check=True)
        with wave.open(f"{D}/{lid}.wav") as w:
            durs[lid] = w.getnframes() / w.getframerate()
json.dump(durs, open(os.path.join(D, "durs.json"), "w"), indent=1)
print({k: round(v, 2) for k, v in durs.items()})
