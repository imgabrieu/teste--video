import React, { createContext, useContext, useMemo } from "react";
import { COLORS } from "../config/theme";
import type { EditConfig, Palette } from "../edits/types";
import { createTimeline, Timeline } from "./timeline";

type Ctx = { cfg: EditConfig; tl: Timeline };
const EditCtx = createContext<Ctx | null>(null);

export const EditProvider: React.FC<{ cfg: EditConfig; children: React.ReactNode }> = ({ cfg, children }) => {
  const value = useMemo(() => ({ cfg, tl: createTimeline(cfg) }), [cfg]);
  return <EditCtx.Provider value={value}>{children}</EditCtx.Provider>;
};

export const useEdit = (): Ctx => {
  const v = useContext(EditCtx);
  if (!v) throw new Error("useEdit must be used inside <EditProvider>");
  return v;
};

const DEFAULT_PALETTE: Palette = { accent: COLORS.white, ink: COLORS.navy, highlightBg: "rgba(255,255,255,0.97)", highlightFg: COLORS.navy };

export const hexToRgba = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

export const usePalette = (): Palette => useEdit().cfg.palette ?? DEFAULT_PALETTE;

export const useLayout = () => {
  const l = useEdit().cfg.layout;
  return { motionTop: l?.motionTop, behindTop: l?.behindTop ?? 560 };
};
