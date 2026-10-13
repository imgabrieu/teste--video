"""Person matte (Robust Video Matting, onnxruntime) -> RGBA PNG frames for the 'text behind person' effect.
usage: python3 matte_person.py rvm.onnx frames_dir out_dir [downsample]"""
import sys, glob, os, numpy as np, onnxruntime as ort
from PIL import Image
model, src, out = sys.argv[1:4]
ds = float(sys.argv[4]) if len(sys.argv) > 4 else 0.25
os.makedirs(out, exist_ok=True)
s = ort.InferenceSession(model, providers=["CPUExecutionProvider"])
rec = [np.zeros((1, 1, 1, 1), np.float32) for _ in range(4)]
for p in sorted(glob.glob(f"{src}/*.png")):
    im = Image.open(p).convert("RGB"); a = np.asarray(im, np.float32) / 255
    x = a.transpose(2, 0, 1)[None]
    fgr, pha, *rec = s.run(None, dict(src=x, r1i=rec[0], r2i=rec[1], r3i=rec[2], r4i=rec[3], downsample_ratio=np.array([ds], np.float32)))
    alpha = (np.clip(pha[0, 0], 0, 1) * 255).astype(np.uint8)
    rgba = np.dstack([(a * 255).astype(np.uint8), alpha])
    Image.fromarray(rgba, "RGBA").save(f"{out}/{os.path.basename(p)}")
