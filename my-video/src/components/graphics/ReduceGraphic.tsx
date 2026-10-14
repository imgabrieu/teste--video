import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../../config/theme";
import { usePalette } from "../../lib/EditContext";
import { Panel } from "./Panel";

type Item = { frameAt: number; text: string; to: number };

/** Three bars that start full and shrink on cue: temperature, frequency, contact time. */
export const ReduceGraphic: React.FC<{ items: Item[]; durationInFrames: number }> = ({ items, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = usePalette();
  return (
    <Panel durationInFrames={durationInFrames} padding="0 52px">
      <div style={{ display: "flex", flexDirection: "column", gap: 26, width: "100%" }}>
        {items.map((it, i) => {
          const p = spring({ frame: frame - (it.frameAt - 14), fps, config: { damping: 200, stiffness: 120 }, durationInFrames: 16 });
          const shrink = interpolate(frame, [it.frameAt, it.frameAt + 22], [1, it.to], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, opacity: p, transform: `translateX(${(1 - p) * -26}px)` }}>
              <div style={{ width: 360, flex: "none", fontFamily: FONTS.family, fontWeight: FONTS.semiBold, fontSize: 32, whiteSpace: "nowrap" }}>{it.text}</div>
              <div style={{ position: "relative", flex: 1, height: 14, borderRadius: 7, background: "rgba(255,255,255,0.16)" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${shrink * 100}%`, borderRadius: 7, background: pal.accent }} />
              </div>
              <svg width={30} height={30} viewBox="0 0 30 30" style={{ opacity: interpolate(frame, [it.frameAt + 10, it.frameAt + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                <path d="M15 5 V23 M7 16 L15 24 L23 16" stroke={pal.accent} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};
