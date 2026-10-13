import React from "react";
import { AbsoluteFill, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { FONTS } from "../config/theme";
import { MOTIONS } from "./data";
import { BRAND, EASE, SAFE, W, sec } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(...EASE.out);
const easeIO = Easing.bezier(...EASE.inOut);
const prog = (frame: number, a: number, b: number) => interpolate(frame, [a, b], [0, 1], { ...clamp, easing: ease });
const progIO = (frame: number, a: number, b: number) => interpolate(frame, [a, b], [0, 1], { ...clamp, easing: easeIO });
const outFade = (frame: number, dur: number, len = 8) => interpolate(frame, [dur - len, dur], [1, 0], clamp);

const base: React.CSSProperties = { fontFamily: FONTS.family, fontWeight: FONTS.bold, textTransform: "uppercase" };

/** 1) "O MÊS DO / ELETRICISTA" — brand-blue band + type sit BEHIND the speaker (person cut-out is layered on top). */
const BehindBand: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const bandY = 300;
  const bandH = 190;
  const wipe = progIO(f, 0, 16);
  const text = prog(f, 8, 26);
  const kick = prog(f, 12, 28);
  const out = outFade(f, dur);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div style={{ position: "absolute", left: 0, top: bandY, height: bandH, width: W, background: BRAND.blue, clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)`, boxShadow: "0 18px 50px rgba(8,22,36,0.28)" }} />
      <div style={{ position: "absolute", left: 0, width: W, top: bandY - 66, textAlign: "center", ...base, fontWeight: FONTS.semiBold, fontSize: 38, letterSpacing: "0.34em", color: BRAND.white, textShadow: "0 2px 12px rgba(8,22,36,0.55)", opacity: kick, transform: `translateY(${(1 - kick) * 14}px)` }}>
        O mês do
      </div>
      <div style={{ position: "absolute", left: 0, width: W, top: bandY, height: bandH, display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
        <div style={{ ...base, fontSize: 124, letterSpacing: "0.005em", color: BRAND.white, lineHeight: 1, transform: `translateY(${(1 - text) * 120}px)`, opacity: text }}>Eletricista</div>
      </div>
    </AbsoluteFill>
  );
};

/** Person cut-out (alpha WebM from the matte) drawn above the band so the type reads as behind the speaker. */
export const PersonCutout: React.FC = () => (
  <OffthreadVideo src={staticFile("video/person3.webm")} transparent muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
);

const card: React.CSSProperties = { background: BRAND.white, color: BRAND.blue, borderRadius: 28, boxShadow: "0 20px 55px rgba(8,22,36,0.32)" };

/** 2) "ESCOLA E3" name card. */
const SchoolCard: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 20);
  const line = prog(f, 10, 34);
  return (
    <div style={{ position: "absolute", left: 0, width: W, top: SAFE.top, display: "flex", justifyContent: "center", opacity: Math.min(p, outFade(f, dur)), transform: `translateY(${(1 - p) * -22}px)` }}>
      <div style={{ ...card, ...base, padding: "30px 64px 34px", textAlign: "center" }}>
        <div style={{ fontWeight: FONTS.semiBold, fontSize: 24, letterSpacing: "0.3em", opacity: 0.75 }}>Nossos amigos da</div>
        <div style={{ fontSize: 88, lineHeight: 1.05, marginTop: 6, letterSpacing: "0.01em" }}>Escola E3</div>
        <div style={{ margin: "14px auto 0", height: 6, width: 220 * line, borderRadius: 3, background: BRAND.blue }} />
      </div>
    </div>
  );
};

/** 3) Three pillars, revealed on the beat of the spoken list. */
const Pillars: React.FC<{ dur: number; items: { frameAt: number; text: string }[] }> = ({ dur, items }) => {
  const f = useCurrentFrame();
  const out = outFade(f, dur);
  return (
    <div style={{ position: "absolute", left: SAFE.left, top: SAFE.top, display: "flex", flexDirection: "column", gap: 16, opacity: out }}>
      {items.map((it, i) => {
        const p = prog(f, it.frameAt - 2, it.frameAt + 14);
        return (
          <div key={it.text} style={{ ...card, borderRadius: 22, display: "flex", alignItems: "center", gap: 20, padding: "14px 40px 14px 14px", opacity: p, transform: `translateX(${(1 - p) * -60}px)`, ...base }}>
            <div style={{ width: 76, height: 76, borderRadius: 18, background: BRAND.blue, color: BRAND.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontVariantNumeric: "tabular-nums" }}>{`0${i + 1}`}</div>
            <div style={{ fontSize: 52, letterSpacing: "0.02em" }}>{it.text}</div>
          </div>
        );
      })}
    </div>
  );
};

/** 4) "MERCADO ELÉTRICO" — typographic reveal on a brand-blue block with an expanding line. */
const SectorBlock: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const reveal = progIO(f, 0, 18);
  const t1 = prog(f, 6, 24);
  const t2 = prog(f, 12, 30);
  const line = prog(f, 20, 44);
  return (
    <div style={{ position: "absolute", left: SAFE.left, top: SAFE.top, opacity: outFade(f, dur) }}>
      <div style={{ background: BRAND.blue, borderRadius: 24, padding: "28px 52px 30px", clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0 round 24px)`, boxShadow: "0 20px 55px rgba(8,22,36,0.32)" }}>
        {[["Mercado", t1], ["Elétrico", t2]].map(([txt, p]) => (
          <div key={txt as string} style={{ overflow: "hidden", lineHeight: 1.08 }}>
            <div style={{ ...base, fontSize: 92, color: BRAND.white, letterSpacing: "0.01em", transform: `translateY(${(1 - (p as number)) * 100}%)` }}>{txt as string}</div>
          </div>
        ))}
        <div style={{ marginTop: 14, height: 5, width: 300 * line, background: BRAND.white, borderRadius: 3 }} />
      </div>
    </div>
  );
};

const Wrap: React.FC<{ from: number; to: number; children: (dur: number) => React.ReactNode }> = ({ from, to, children }) => {
  const a = sec(from);
  const dur = sec(to) - a;
  return (
    <Sequence from={a} durationInFrames={dur} layout="none">
      {children(dur)}
    </Sequence>
  );
};

/** Graphics that sit above the video but below captions. */
export const Motions: React.FC = () => {
  const M = MOTIONS;
  const pFrom = sec(M.pillars.from);
  return (
    <>
      <Wrap from={M.school.from} to={M.school.to}>{(d) => <SchoolCard dur={d} />}</Wrap>
      <Wrap from={M.pillars.from} to={M.pillars.to}>
        {(d) => <Pillars dur={d} items={M.pillars.items.map((i) => ({ frameAt: sec(i.at) - pFrom, text: i.text }))} />}
      </Wrap>
      <Wrap from={M.sector.from} to={M.sector.to}>{(d) => <SectorBlock dur={d} />}</Wrap>
    </>
  );
};

/** The band that goes BEHIND the speaker, plus the cut-out that goes on top of it. */
export const BehindLayer: React.FC = () => (
  <Wrap from={MOTIONS.behind.from} to={MOTIONS.behind.to}>{(d) => <BehindBand dur={d} />}</Wrap>
);
export const BehindCutout: React.FC = () => {
  const a = sec(MOTIONS.behind.from);
  const d = sec(MOTIONS.behind.to) - a;
  // cut-out is aligned to source frames 0.. so mount it on the same absolute frames
  return (
    <Sequence from={a} durationInFrames={d} layout="none">
      <AbsoluteFill>
        <Sequence from={-a} layout="none">
          <PersonCutout />
        </Sequence>
      </AbsoluteFill>
    </Sequence>
  );
};
