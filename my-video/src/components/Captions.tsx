import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { CAPTION, COLORS, SAFE } from "../config/theme";
import { buildPages } from "../lib/captionPages";
import { hexToRgba, useEdit, usePalette } from "../lib/EditContext";
import { AnimatedCaption } from "./AnimatedCaption";

/** Soft navy scrim at the bottom keeps white captions legible over the bright window/coat; captions sit above the social-UI safe area. */
export const Captions: React.FC = () => {
  const { cfg, tl } = useEdit();
  const pal = usePalette();
  const { width: W } = useVideoConfig();
  const mL = cfg.layout?.captionMargin ?? SAFE.left;
  const mR = cfg.layout?.captionMargin ?? SAFE.right;
  const pages = useMemo(() => buildPages(cfg, tl), [cfg, tl]);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {cfg.caption?.scrim !== false && (
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: CAPTION.scrimHeight,
          background: `linear-gradient(to top, ${hexToRgba(pal.ink, CAPTION.scrimOpacity)} 0%, ${hexToRgba(pal.ink, CAPTION.scrimOpacity * 0.8)} 40%, ${hexToRgba(pal.ink, CAPTION.scrimOpacity * 0.5)} 62%, ${hexToRgba(pal.ink, 0)} 100%)`,
        }}
      />
      )}
      <div
        style={{
          position: "absolute",
          left: mL,
          right: mR,
          bottom: cfg.layout?.captionBottom ?? SAFE.bottom,
          width: W - mL - mR,
          height: 0,
          color: COLORS.white,
        }}
      >
        {pages.map((p, i) => (
          <Sequence key={i} from={p.from} durationInFrames={p.to - p.from} layout="none">
            <AnimatedCaption page={p} />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};
