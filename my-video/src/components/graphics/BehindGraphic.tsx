import React from "react";
import { AbsoluteFill, Easing, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CANVAS, FONTS, ZOOM } from "../../config/theme";
import { hexToRgba, useEdit, usePalette } from "../../lib/EditContext";
import { segmentScale } from "../../lib/zoom";

/**
 * "Text behind the person": the background is dimmed, a giant word + thin tech lines are drawn, and a transparent cut-out
 * of the person (WebM with alpha, same frames as the footage) is stacked back on top, following the same zoom as the footage.
 */
export const BehindGraphic: React.FC<{ word: string; person: string; startOut: number; durationInFrames: number }> = ({ word, person, startOut, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = usePalette();
  const { cfg, tl } = useEdit();
  const clip = cfg.personClips?.find((c) => c.id === person);

  const fade = Math.min(
    interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], { extrapolateLeft: "clamp" }),
  );
  const word_p = spring({ frame: frame - 3, fps, config: { damping: 200, stiffness: 90 }, durationInFrames: 30 });
  const line = interpolate(frame, [4, 30], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // footage segment at the start of this graphic (must lie inside ONE segment, so the cut-out maps linearly to the footage)
  const seg0 = tl.segments.find((sg) => startOut >= sg.outStart && startOut < sg.outStart + sg.length) ?? tl.segments[0];
  const src0 = seg0.srcStart + (startOut - seg0.outStart);
  const scale = segmentScale(seg0.index, startOut + frame - seg0.outStart, seg0.length);
  const clipStart = clip ? clip.fromFrame : 0;

  const size = 214;
  return (
    <AbsoluteFill style={{ opacity: fade }}>
      {/* 1. dim the background so the word reads on the bright wall / TV */}
      <AbsoluteFill style={{ background: hexToRgba(pal.ink, 0.52) }} />
      {/* 2. tech lines + giant word, behind the person */}
      <svg width={CANVAS.width} height={CANVAS.height} style={{ position: "absolute", inset: 0 }}>
        {[0.16, 0.5, 0.84].map((x, i) => (
          <line key={i} x1={CANVAS.width * x} x2={CANVAS.width * x} y1={300} y2={300 + 860 * line} stroke={pal.accent} strokeWidth={1.5} opacity={0.22} />
        ))}
        <line x1={70} x2={70 + (CANVAS.width - 140) * line} y1={1160} y2={1160} stroke={pal.accent} strokeWidth={3} opacity={0.7} />
        <line x1={70} x2={70 + (CANVAS.width - 140) * line} y1={372} y2={372} stroke={pal.accent} strokeWidth={1.5} opacity={0.45} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: CANVAS.width,
          top: 560,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontWeight: FONTS.bold,
          fontSize: size,
          lineHeight: 1,
          letterSpacing: "0.02em",
          color: pal.accent,
          opacity: word_p,
          transform: `translateY(${(1 - word_p) * 40}px) scale(${0.96 + 0.04 * word_p})`,
          textShadow: "0 8px 40px rgba(0,0,0,0.35)",
        }}
      >
        {word}
      </div>
      {/* 3. the person, on top */}
      {clip && (
        <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: ZOOM.origin }}>
          <Sequence from={0} layout="none">
            <OffthreadVideo src={staticFile(clip.file)} transparent muted trimBefore={src0 - clipStart} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
