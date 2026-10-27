import React, { useEffect, useState } from "react";
import { AbsoluteFill, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useDelayRender } from "remotion";
import { FONTS } from "../config/theme";
import { loadFonts } from "../lib/fonts";

type Page = { from: number; to: number; y: number; words: { t: string; f: number }[] };
export type CapData = { frames: number; pages: Page[] };

const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.out(Easing.cubic);
const SHADOW = "0 2px 14px rgba(0,0,0,0.55), 0 0 3px rgba(0,0,0,0.45)";

const Captions: React.FC<{ pages: Page[] }> = ({ pages }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {pages.map((p, i) => {
        if (frame < p.from || frame > p.to) return null;
        const local = frame - p.from;
        const len = p.to - p.from;
        const exit = interpolate(local, [len - 3, len], [1, 0], clampX);
        const chars = p.words.map((w) => w.t).join(" ").length;
        const size = Math.max(54, Math.min(74, Math.round(880 / (chars * 0.585))));
        return (
          <div key={i} style={{ position: "absolute", left: 70, width: 940, top: p.y - 60, height: 120, display: "flex", justifyContent: "center", alignItems: "center", gap: "0.27em", whiteSpace: "nowrap", fontFamily: FONTS.family, fontSize: size, lineHeight: 1.1, opacity: exit }}>
            {p.words.map((w, k) => {
              const t = frame - w.f;
              const o = interpolate(t, [-1, 4], [0, 1], { ...clampX, easing: ease });
              const rise = interpolate(t, [-1, 7], [14, 0], { ...clampX, easing: ease });
              const sc = interpolate(t, [-1, 8], [0.92, 1], { ...clampX, easing: ease });
              const bold = k === p.words.length - 1;
              return (
                <span key={k} style={{ opacity: o, transform: `translateY(${rise}px) scale(${sc})`, display: "inline-block", color: "#FFFFFF", fontWeight: bold ? FONTS.bold : FONTS.semiBold, textShadow: SHADOW }}>
                  {w.t}
                </span>
              );
            })}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** rotateFrom (frames): from there the source is filmed sideways -> rotated 90° CW, contained on black */
export const Cap: React.FC<{ file: string; data: CapData; rotateFrom?: number }> = ({ file, data, rotateFrom }) => {
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading Poppins"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle, continueRender]);
  const full = { width: "100%", height: "100%", objectFit: "cover" } as const;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {rotateFrom === undefined ? (
        <OffthreadVideo src={staticFile(file)} style={full} />
      ) : (
        <>
          <Sequence from={0} durationInFrames={rotateFrom}>
            <OffthreadVideo src={staticFile(file)} style={full} />
          </Sequence>
          <Sequence from={rotateFrom} durationInFrames={data.frames - rotateFrom}>
            <AbsoluteFill style={{ transform: "rotate(90deg) scale(0.5625)" }}>
              <OffthreadVideo src={staticFile(file)} trimBefore={rotateFrom} style={full} />
            </AbsoluteFill>
          </Sequence>
        </>
      )}
      <Captions pages={data.pages} />
    </AbsoluteFill>
  );
};
