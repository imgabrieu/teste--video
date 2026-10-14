import React from "react";
import { useCurrentFrame } from "remotion";

const PATH = "M12 0 C12.8 7 17 11.2 24 12 C17 12.8 12.8 17 12 24 C11.2 17 7 12.8 0 12 C7 11.2 11.2 7 12 0Z";

/** Four-point sparkle that twinkles softly. `delay` offsets the twinkle phase (frames). */
export const Sparkle: React.FC<{ x: number; y: number; size: number; color: string; delay?: number; opacity?: number }> = ({ x, y, size, color, delay = 0, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const tw = 0.5 + 0.5 * Math.sin((frame + delay) / 6);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ position: "absolute", left: x - size / 2, top: y - size / 2, opacity: opacity * (0.45 + 0.55 * tw), transform: `scale(${0.8 + 0.25 * tw}) rotate(${tw * 8}deg)`, filter: `drop-shadow(0 0 6px ${color})` }}>
      <path d={PATH} fill={color} />
    </svg>
  );
};

export const HEART_PATH = "M12 21 C12 21 3 14.5 3 8.6 C3 5.6 5.3 3.5 8 3.5 C9.8 3.5 11.2 4.4 12 5.8 C12.8 4.4 14.2 3.5 16 3.5 C18.7 3.5 21 5.6 21 8.6 C21 14.5 12 21 12 21Z";
