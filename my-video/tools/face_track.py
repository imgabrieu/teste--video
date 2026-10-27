"""Face boxes per time (YuNet) -> json: [[t, [[x,y,w,h,score],...]], ...] in 1080x1920 coordinates, every `step` seconds.
usage: face_track.py video yunet.onnx out.json [step]"""
import cv2, sys, json, numpy as np
src, model, out = sys.argv[1], sys.argv[2], sys.argv[3]; step = float(sys.argv[4]) if len(sys.argv) > 4 else 0.25
cap = cv2.VideoCapture(src); fps = cap.get(5) or 30; n = int(cap.get(7)); W = int(cap.get(3)); H = int(cap.get(4))
det = cv2.FaceDetectorYN.create(model, "", (W, H), 0.55, 0.3, 5000)
res = []; t = 0.0
while t * fps < n:
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(round(t * fps))); ok, f = cap.read()
    if not ok: break
    _, faces = det.detect(f)
    boxes = [] if faces is None else [[int(v) for v in fc[:4]] + [round(float(fc[14]), 2)] for fc in faces]
    sx, sy = 1080.0 / W, 1920.0 / H
    res.append([round(t, 2), [[int(b[0] * sx), int(b[1] * sy), int(b[2] * sx), int(b[3] * sy), b[4]] for b in boxes]]); t += step
json.dump(res, open(out, "w")); print(len(res), "samples; with faces:", sum(1 for r in res if r[1]))
