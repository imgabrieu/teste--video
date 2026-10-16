"""Gentle, premium grade: neutralise the saturated-blue TV, soften the olive wall cast, lift exposure slightly. No gradients/vignettes."""
import cv2, numpy as np

def grade(bgr):
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV).astype(np.float32)
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    # --- blue screen (hue ~ 95-135 in OpenCV units), soft-edged selection
    blue = np.clip((s - 45) / 50, 0, 1) * np.clip(1 - np.abs(h - 112) / 22, 0, 1)
    blue = cv2.GaussianBlur(blue, (0, 0), 3)
    s2 = s * (1 - 0.82 * blue)
    v2 = v * (1 - 0.30 * blue)
    # --- olive/yellow wall: calmer, slightly warmer-neutral
    wall = np.clip(1 - np.abs(h - 32) / 14, 0, 1) * np.clip(s / 60, 0, 1)
    wall = cv2.GaussianBlur(wall, (0, 0), 2)
    s2 = s2 * (1 - 0.35 * wall)
    hsv2 = np.stack([h, s2, v2], -1)
    out = cv2.cvtColor(np.clip(hsv2, 0, 255).astype(np.uint8), cv2.COLOR_HSV2BGR).astype(np.float32) / 255
    # --- exposure lift (gamma) + a touch of contrast in highlights
    out = np.power(out, 0.90)
    out = np.clip((out - 0.5) * 1.03 + 0.5 + 0.01, 0, 1)
    return (out * 255 + 0.5).astype(np.uint8)

if __name__ == "__main__":
    import sys
    a = cv2.imread(sys.argv[1]); b = grade(a)
    cv2.imwrite(sys.argv[2], np.hstack([cv2.resize(a, (540, 960)), cv2.resize(b, (540, 960))]))
