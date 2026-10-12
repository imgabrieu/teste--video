import React, { createContext, useContext, useMemo } from "react";
import type { EditConfig } from "../edits/types";
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
