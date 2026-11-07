import React from "react";
import { Easing } from "remotion";
import { ANTON, COLORS, POPPINS } from "./theme";
import type { Part, Row, Variant } from "./timing";

/* ───────────── easing / helpers ───────────── */
export const OUT_EXPO = Easing.bezier(0.16, 1, 0.3, 1);
export const OUT_QUART = Easing.bezier(0.25, 1, 0.5, 1);
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
/** progresso 0→1 com easing, começando em `start` e durando `dur` segundos */
export const prog = (t: number, start: number, dur: number, ease: (x: number) => number = OUT_EXPO) =>
  ease(clamp01((t - start) / dur));

/* ───────────── distribuição de palavras por peso silábico ───────────── */
const syllables = (w: string) => {
  const s = w.toLowerCase().replace(/[^a-záàâãéêíóôõúüçñ]/g, "");
  if (!s) return 1;
  const groups = s.match(/[aeiouyáàâãéêíóôõúü]+/g) ?? [];
  let n = groups.length;
  if (/[^aeiouy]e$/.test(s) && n > 1 && !/(le|ne)$/.test(s)) n -= 1;
  return Math.max(1, n);
};

export const distribute = (words: string[], a: number, b: number): number[] => {
  const w = words.map((x) => syllables(x) + 0.35);
  const total = w.reduce((p, c) => p + c, 0);
  let acc = 0;
  return w.map((x) => {
    const s = a + (acc / total) * (b - a);
    acc += x;
    return s;
  });
};

/* ───────────── resolução de uma linha de roteiro em palavras com tempos ───────────── */
export type RWord = { text: string; part: Part; start: number; end: number; line: number };
export type RRow = {
  words: RWord[];
  lines: number;
  enWords: { text: string; start: number; end: number }[];
  enSize: number;
  row: Row;
  firstTime: number;
};

export const resolveRow = (row: Row): RRow => {
  const flat: { text: string; part: Part; line: number }[] = [];
  row.lines.forEach((ln, li) =>
    ln.parts.forEach((p) => p.text.split(/\s+/).filter(Boolean).forEach((t) => flat.push({ text: t, part: p, line: li }))),
  );
  const [a, b] = row.win;
  const ptStarts = row.ptTimes ?? distribute(flat.map((f) => f.text), a, b);
  if (ptStarts.length !== flat.length) throw new Error(`ptTimes mismatch (${flat.map((f) => f.text).join(" ")})`);
  const words: RWord[] = flat.map((f, i) => ({
    ...f,
    start: ptStarts[i],
    end: i + 1 < flat.length ? ptStarts[i + 1] : b,
  }));
  const enList = row.en.split(/\s+/).filter(Boolean);
  let enStarts: number[];
  if (row.spoken === "en") {
    enStarts = row.enTimes ?? distribute(enList, a, b);
    if (enStarts.length !== enList.length) throw new Error(`enTimes mismatch (${row.en})`);
  } else {
    // o inglês já foi dito: aparece junto da linha em português
    enStarts = enList.map((_, i) => a + i * 0.035);
  }
  const enWords = enList.map((text, i) => ({
    text,
    start: enStarts[i],
    end: i + 1 < enList.length ? enStarts[i + 1] : row.spoken === "en" ? b : a + 0.5,
  }));
  return {
    words,
    lines: row.lines.length,
    enWords,
    enSize: row.enSize ?? 50,
    row,
    firstTime: Math.min(words[0].start, enWords[0].start),
  };
};

/* ───────────── palavra cinética (PT) ───────────── */
const partFont = (p: Part): React.CSSProperties =>
  p.font === "anton"
    ? { fontFamily: ANTON, fontWeight: 400, lineHeight: 1.06, textTransform: "uppercase" }
    : { fontFamily: POPPINS, fontWeight: p.weight ?? 700, lineHeight: 1.3 };

const SHADOW_ANTON = "0 10px 60px rgba(4,9,20,0.55), 0 2px 12px rgba(4,9,20,0.35)";
const SHADOW_POPPINS = "0 4px 30px rgba(4,9,20,0.6), 0 1px 6px rgba(4,9,20,0.4)";

type KWordProps = {
  w: RWord;
  t: number;
  variant: Variant;
  /** a fala em português está acontecendo agora nesta palavra */
  spokenPt: boolean;
  dir: 1 | -1;
};

const LEAD = 0.06; // a animação começa um pouco antes da voz para que o "impacto" caia junto da fala

export const KWord: React.FC<KWordProps> = ({ w, t, variant, spokenPt, dir }) => {
  const s = w.start - LEAD;
  const isAnton = w.part.font === "anton";
  const base: React.CSSProperties = {
    ...partFont(w.part),
    fontSize: w.part.size,
    color: COLORS.white,
    textShadow: isAnton ? SHADOW_ANTON : SHADOW_POPPINS,
    whiteSpace: "nowrap",
    display: "inline-block",
    letterSpacing: `${w.part.tracking ?? 0}em`,
  };
  const active = spokenPt && t >= w.start && t < w.end;
  const settled = spokenPt && t >= w.end ? 0.9 : 1;
  const glow = active
    ? { textShadow: `${isAnton ? SHADOW_ANTON : SHADOW_POPPINS}, 0 0 38px rgba(255,236,190,0.55)` }
    : null;

  if (t < s) return <span style={{ ...base, opacity: 0, visibility: "hidden" }}>{w.text}</span>;

  switch (variant) {
    case "rise": {
      const p = prog(t, s, 0.62);
      return (
        <span style={{ display: "inline-block", clipPath: "inset(-0.5em -0.3em 0 -0.3em)" }}>
          <span
            style={{
              ...base,
              ...glow,
              opacity: Math.min(1, p * 2.6) * settled,
              transform: `translateY(${(1 - p) * 112}%)`,
            }}
          >
            {w.text}
          </span>
        </span>
      );
    }
    case "letters": {
      const chars = Array.from(w.text);
      return (
        <span style={{ display: "inline-block", clipPath: "inset(-0.5em -0.3em 0 -0.3em)", whiteSpace: "nowrap" }}>
          {chars.map((c, i) => {
            const p = prog(t, s + i * 0.032, 0.5);
            return (
              <span
                key={i}
                style={{
                  ...base,
                  ...glow,
                  opacity: Math.min(1, p * 3),
                  transform: `translateY(${(1 - p) * 118}%)`,
                  whiteSpace: "pre",
                }}
              >
                {c}
              </span>
            );
          })}
        </span>
      );
    }
    case "slam": {
      const p = prog(t, s, 0.5, OUT_QUART);
      return (
        <span
          style={{
            ...base,
            ...glow,
            opacity: Math.min(1, p * 4),
            transform: `scale(${1 + (1 - p) * 0.55})`,
            filter: `blur(${(1 - p) * 16}px)`,
            letterSpacing: `${(w.part.tracking ?? 0) + (1 - p) * 0.05}em`,
          }}
        >
          {w.text}
        </span>
      );
    }
    case "zoom": {
      const p = prog(t, s, 0.55, OUT_QUART);
      return (
        <span
          style={{
            ...base,
            ...glow,
            opacity: Math.min(1, p * 3.5),
            transform: `scale(${1 + (1 - p) * 1.0}) translateY(${(1 - p) * 20}px)`,
            filter: `blur(${(1 - p) * 20}px) brightness(${1 + (1 - p) * 0.9})`,
          }}
        >
          {w.text}
        </span>
      );
    }
    case "track": {
      const p = prog(t, s, 0.75, OUT_EXPO);
      return (
        <span
          style={{
            ...base,
            ...glow,
            opacity: Math.min(1, p * 2.4),
            letterSpacing: `${(w.part.tracking ?? 0) + (1 - p) * (isAnton ? 0.3 : 0.14)}em`,
            filter: `blur(${(1 - p) * 10}px)`,
            transform: `translateY(${(1 - p) * 14}px)`,
          }}
        >
          {w.text}
        </span>
      );
    }
    case "wipe": {
      const p = prog(t, s, 0.6, OUT_QUART);
      const barOp = p > 0.001 && p < 0.985 ? 1 : 0;
      return (
        <span style={{ position: "relative", display: "inline-block" }}>
          <span
            style={{
              ...base,
              ...glow,
              clipPath: `inset(-0.4em ${(1 - p) * 104}% -0.2em -0.1em)`,
              transform: `translateX(${(1 - p) * -34}px)`,
            }}
          >
            {w.text}
          </span>
          <span
            style={{
              position: "absolute",
              left: `${p * 100}%`,
              top: "10%",
              bottom: "8%",
              width: Math.max(3, w.part.size * 0.022),
              marginLeft: -2,
              background: `linear-gradient(180deg, transparent, ${COLORS.yellow}, transparent)`,
              opacity: barOp * 0.9,
              boxShadow: `0 0 24px ${COLORS.yellow}`,
            }}
          />
        </span>
      );
    }
    case "slideH": {
      const p = prog(t, s, 0.62, OUT_EXPO);
      return (
        <span style={{ display: "inline-block", clipPath: "inset(-0.5em -0.1em -0.2em -0.1em)" }}>
          <span
            style={{
              ...base,
              ...glow,
              opacity: Math.min(1, p * 2.5),
              transform: `translateX(${dir * -(1 - p) * 105}%)`,
            }}
          >
            {w.text}
          </span>
        </span>
      );
    }
  }
};

/* ───────────── linha em inglês (secundária, Poppins amarelo) ───────────── */
export const EnglishLine: React.FC<{ r: RRow; t: number }> = ({ r, t }) => {
  const spokenEn = r.row.spoken === "en";
  const first = r.enWords[0].start - LEAD;
  const tick = prog(t, first - 0.05, 0.6);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: Math.round(r.enSize * 0.42), marginTop: Math.round(r.enSize * 0.5) }}>
      <div
        style={{
          height: 3,
          width: 84 * tick,
          background: `linear-gradient(90deg, transparent, ${COLORS.yellow}, transparent)`,
          opacity: tick,
        }}
      />
      <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "center", gap: `0 ${Math.round(r.enSize * 0.3)}px` }}>
        {r.enWords.map((w, i) => {
          const p = prog(t, w.start - LEAD, 0.45, OUT_QUART);
          const active = spokenEn && t >= w.start && t < w.end;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontFamily: POPPINS,
                fontWeight: active ? 600 : 500,
                fontSize: r.enSize,
                lineHeight: 1.3,
                color: active ? "#FFE27A" : COLORS.yellow,
                opacity: p * (spokenEn ? (t >= w.end ? 0.92 : 1) : 0.82),
                transform: `translateY(${(1 - p) * 18}px)`,
                filter: `blur(${(1 - p) * 5}px)`,
                textShadow: active
                  ? "0 0 26px rgba(255,214,90,0.6), 0 2px 14px rgba(4,9,20,0.8)"
                  : "0 2px 16px rgba(4,9,20,0.8), 0 1px 4px rgba(4,9,20,0.6)",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/* ───────────── linha de roteiro completa (PT grande + EN abaixo) ───────────── */
export const RowView: React.FC<{ r: RRow; t: number; variant: Variant; dir: 1 | -1 }> = ({ r, t, variant, dir }) => {
  const spokenPt = r.row.spoken === "pt";
  let idx = 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {r.row.lines.map((ln, li) => {
        const items: React.ReactNode[] = [];
        ln.parts.forEach((p, pi) => {
          p.text
            .split(/\s+/)
            .filter(Boolean)
            .forEach((_, wi) => {
              const w = r.words[idx++];
              items.push(
                <KWord key={`${pi}-${wi}`} w={w} t={t} variant={variant} spokenPt={spokenPt} dir={dir} />,
              );
            });
        });
        const maxSize = Math.max(...ln.parts.map((p) => p.size));
        return (
          <div
            key={li}
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: `0 ${Math.round(maxSize * 0.2)}px`,
              marginTop: li === 0 ? 0 : -Math.round(maxSize * (ln.parts[0].font === "anton" ? 0.02 : 0.1)),
            }}
          >
            {items}
          </div>
        );
      })}
      <EnglishLine r={r} t={t} />
    </div>
  );
};
