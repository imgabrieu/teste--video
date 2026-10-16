import sys, wave, numpy as np, sherpa_onnx, subprocess, os
sys.path.insert(0, os.path.dirname(__file__))
from script import SCENES, FINAL
M = "/tmp/claude-0/-home-user-teste--video/b09736ff-549a-58ad-b8d4-166b6b1f591b/scratchpad/tts/vits-piper-pt_BR-faber-medium"
cfg = sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(vits=sherpa_onnx.OfflineTtsVitsModelConfig(
    model=f"{M}/pt_BR-faber-medium.onnx", tokens=f"{M}/tokens.txt", data_dir=f"{M}/espeak-ng-data", noise_scale=0.55, noise_scale_w=0.7, length_scale=1.0),
    num_threads=4))
tts = sherpa_onnx.OfflineTts(cfg)
out = os.path.join(os.path.dirname(__file__), "audio/lines"); os.makedirs(out, exist_ok=True)
for sc in SCENES + [FINAL]:
    for lid, text, gap, lvl in sc["lines"]:
        g = tts.generate(text, sid=0, speed=0.82)
        s = np.array(g.samples, dtype=np.float32)
        raw = f"{out}/{lid}_raw.wav"
        with wave.open(raw, "wb") as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(g.sample_rate)
            w.writeframes((np.clip(s, -1, 1) * 32767).astype(np.int16).tobytes())
        print(lid, round(len(s) / g.sample_rate, 2), "s", g.sample_rate)
