import sys, os, cv2, numpy as np
os.environ.setdefault("RW", "640")
from timeline import *
import importlib
def grab(fn, times, out):
    imgs = [np.clip(fn(t), 0, 1) for t in times]
    row = np.concatenate(imgs, 0)
    cv2.imwrite(out, cv2.cvtColor((row ** (1 / 1.0) * 255).astype(np.uint8), cv2.COLOR_RGB2BGR))
