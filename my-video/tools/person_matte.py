"""Person cut-out for "text behind the person" moments.
Usage: python3 tools/person_matte.py <video> <start_frame> <end_frame> <out.webm> [fps=30]
Segments every frame with rembg (u2net_human_seg), tightens/feathers the matte and writes a VP9 WebM with alpha
(same resolution/fps as the source) that Remotion overlays above the graphics layer.
Model: set U2NET_HOME to a folder containing u2net_human_seg.onnx."""
import os, subprocess, sys, tempfile
import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove

video, a, b, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
fps = float(sys.argv[5]) if len(sys.argv) > 5 else 30
sess = new_session("u2net_human_seg")
tmp = tempfile.mkdtemp()
fr, rgba = os.path.join(tmp, "f"), os.path.join(tmp, "r")
os.makedirs(fr); os.makedirs(rgba)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", video, "-vf", f"select='between(n,{a},{b - 1})'", "-vsync", "0", os.path.join(fr, "%04d.png")], check=True)
files = sorted(os.listdir(fr))
prev = None
for i, f in enumerate(files):
    im = Image.open(os.path.join(fr, f)).convert("RGB")
    m = remove(im, session=sess, only_mask=True).convert("L")
    m = np.asarray(m, dtype=np.float32) / 255.0
    m = np.clip((m - 0.35) / 0.4, 0, 1)                      # tighten the soft edge
    if prev is not None: m = 0.65 * m + 0.35 * prev            # temporal smoothing (less flicker)
    prev = m
    alpha = Image.fromarray((m * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(1.2))
    o = im.convert("RGBA"); o.putalpha(alpha); o.save(os.path.join(rgba, f))
    if i % 10 == 0: print(i, "/", len(files), flush=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(fps), "-i", os.path.join(rgba, "%04d.png"), "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "22", "-auto-alt-ref", "0", "-row-mt", "1", out], check=True)
print("wrote", out, len(files), "frames")
