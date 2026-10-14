import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../../config/theme";
import { usePalette } from "../../lib/EditContext";
import { Panel } from "./Panel";

type Icon = "dryer" | "flat" | "curler";

const Glyph: React.FC<{ icon: Icon; color: string }> = ({ icon, color }) => (
  <svg width={96} height={96} viewBox="0 0 96 96" fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
    {icon === "dryer" && (
      <>
        <path d="M14 30 h46 a16 16 0 0 1 0 32 h-46 z" />
        <path d="M36 62 l-6 24 h14 l5 -24" />
        <path d="M68 38 h14 M68 46 h18 M68 54 h14" opacity={0.7} />
      </>
    )}
    {icon === "flat" && (
      <>
        <path d="M30 10 h14 v52 l-7 8 l-7 -8 z" />
        <path d="M52 10 h14 v52 l-7 8 l-7 -8 z" />
        <path d="M37 70 v18 M59 70 v18" />
      </>
    )}
    {icon === "curler" && (
      <>
        <rect x={34} y={8} width={26} height={62} rx={13} />
        <path d="M34 54 h-8 a6 6 0 0 0 0 12 h8" />
        <path d="M47 70 v18" />
      </>
    )}
  </svg>
);

/** Heat tools named in the speech (secador, chapinha, babyliss) as minimalist line icons popping in on cue. */
export const DevicesGraphic: React.FC<{ label: string; items: { frameAt: number; text: string; icon: Icon }[]; durationInFrames: number }> = ({ label, items, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = usePalette();
  return (
    <Panel durationInFrames={durationInFrames} padding="0 30px">
      <div style={{ fontWeight: FONTS.semiBold, fontSize: 26, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.75, marginBottom: 14 }}>{label}</div>
      <div style={{ display: "flex", gap: 46, alignItems: "flex-start" }}>
        {items.map((it, i) => {
          const p = spring({ frame: frame - it.frameAt, fps, config: { damping: 13, stiffness: 170 }, durationInFrames: 20 });
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 210, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 18}px) scale(${0.8 + 0.2 * p})` }}>
              <Glyph icon={it.icon} color={pal.accent} />
              <div style={{ fontFamily: FONTS.family, fontWeight: FONTS.semiBold, fontSize: 32 }}>{it.text}</div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};
