import React, { useMemo } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { CAPTION, CANVAS, COLORS, SAFE } from "../config/theme";
import { buildPages } from "../lib/captionPages";
import { hexToRgba, useEdit, usePalette } from "../lib/EditContext";
import { AnimatedCaption } from "./AnimatedCaption";

/** Soft navy scrim at the bottom keeps white captions legible over the bright window/coat; captions sit above the social-UI safe area. */
export const Captions: React.FC = () => {
  const { cfg, tl } = useEdit();
  const pal = usePalette();
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
          left: SAFE.left,
          right: SAFE.right,
          bottom: SAFE.bottom,
          width: CANVAS.width - SAFE.left - SAFE.right,
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
