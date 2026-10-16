import React from "react";
import { Img, staticFile } from "remotion";
import { FONTS } from "../config/theme";
import { PC } from "./config";
import { Pill } from "./Opener";

/** ANTES | DEPOIS side by side, two square photos, no distortion. Used on the split screen and the closing screen. */
export const PhotoPair: React.FC<{ width: number; labelScale?: number; shadow?: boolean }> = ({ width, labelScale = 1, shadow = true }) => {
  const gap = 8;
  const half = (width - gap) / 2;
  const item = (src: string, label: string) => (
    <div style={{ position: "relative", width: half, height: half, borderRadius: 6, overflow: "hidden", boxShadow: shadow ? "0 20px 50px rgba(70,52,34,0.10)" : undefined }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <Pill style={{ position: "absolute", left: 14, bottom: 14, fontSize: 17 * labelScale, padding: "8px 8px 8px 16px", fontFamily: FONTS.family }}>{label}</Pill>
    </div>
  );
  return (
    <div style={{ display: "flex", gap, width, color: PC.ink }}>
      {item("passoni2/antes.jpg", "ANTES")}
      {item("passoni2/depois.jpg", "DEPOIS")}
    </div>
  );
};
