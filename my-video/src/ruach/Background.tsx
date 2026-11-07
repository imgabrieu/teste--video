import React, { useMemo } from "react";
import { staticFile } from "remotion";
import { RBEATS } from "./schedule";
import { FINALE } from "./timing";
import { HEIGHT, TOTAL_SECONDS, WIDTH } from "./theme";

/* ───────────── câmera virtual ───────────── */
export type Cam = { scale: number; x: number; y: number; bump: number };

const smooth = (x: number) => x * x * (3 - 2 * x);

/** Pequenos "pushes" de câmera nas entradas importantes (decaem suavemente). */
export const BUMPS: { at: number; strength: number }[] = [
  ...RBEATS.map((b) => ({ at: b.firstTime - 0.06, strength: b.beat.push })),
  { at: FINALE.carl - 0.05, strength: 0.085 },
  { at: FINALE.morgan - 0.05, strength: 0.05 },
  { at: FINALE.ptCarl - 0.04, strength: 0.03 },
  { at: FINALE.ptMorgan - 0.04, strength: 0.03 },
];

export const cameraAt = (t: number): Cam => {
  const k = t / TOTAL_SECONDS;
  let bump = 0;
  for (const b of BUMPS) {
    const dt = t - b.at;
    if (dt < 0) continue;
    // sobe em ~0,16 s e decai em ~0,9 s
    const up = smooth(Math.min(1, dt / 0.16));
    bump += b.strength * up * Math.exp(-Math.max(0, dt - 0.16) / 0.9);
  }
  return {
    scale: 1.035 + 0.06 * k + bump,
    x: Math.sin(t * 0.33) * 16 + Math.sin(t * 0.11) * 10,
    y: Math.cos(t * 0.27) * 9 - t * 0.9,
    bump,
  };
};

/* ───────────── ondas finas (traçado da referência, 1672×941) ───────────── */
const SX = WIDTH / 1672;
const WAVES = [
  // topo
  { d: "M -80 107 C 100 96 260 90 460 94 C 640 98 700 108 850 108 C 1050 108 1200 70 1450 36 C 1560 22 1650 20 1760 22", w: 1.3, o: 0.5, par: 0.55, ph: 0, sp: 0.5 },
  // meio
  { d: "M -80 330 C 60 322 160 316 330 320 C 520 326 600 346 760 347 C 960 347 1020 328 1180 328 C 1280 328 1330 338 1420 346 C 1520 356 1640 384 1760 412", w: 1.5, o: 0.62, par: 0.85, ph: 2.1, sp: 0.62 },
  // base
  { d: "M -80 422 C 60 414 160 410 330 412 C 520 415 600 436 740 435 C 900 434 1000 392 1160 363 C 1260 345 1330 340 1420 345 C 1540 352 1640 380 1760 402", w: 1.6, o: 0.72, par: 1.15, ph: 4.2, sp: 0.78 },
];

/* ───────────── partículas discretas ───────────── */
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const PARTICLES = Array.from({ length: 46 }, (_, i) => ({
  x: rand(i + 1) * WIDTH * 1.1 - WIDTH * 0.05,
  y: rand(i + 101) * HEIGHT * 1.2,
  r: 0.8 + rand(i + 201) * 2.1,
  o: 0.12 + rand(i + 301) * 0.4,
  v: 4 + rand(i + 401) * 12, // px/s subindo
  sway: 6 + rand(i + 501) * 22,
  ph: rand(i + 601) * 6.28,
  depth: 0.4 + rand(i + 701) * 1.3,
  warm: rand(i + 801) > 0.45,
}));

const layer = (cam: Cam, k: number): React.CSSProperties => ({
  position: "absolute",
  inset: 0,
  transform: `translate3d(${cam.x * k}px, ${cam.y * k}px, 0) scale(${1 + (cam.scale - 1) * k})`,
  transformOrigin: "50% 38%",
});

export const Background: React.FC<{ t: number; frame: number; cam: Cam; dim: number }> = ({ t, frame, cam, dim }) => {
  const breathe = 0.5 + 0.5 * Math.sin(t * 0.8);
  const glowOpacity = (0.92 + 0.08 * breathe) * (1 - dim * 0.1);
  const glowScale = 1 + 0.035 * Math.sin(t * 0.55) + cam.bump * 0.9;
  const gx = 50 + Math.sin(t * 0.21) * 1.4;
  const gy = 34 + Math.cos(t * 0.17) * 1.1;

  const wavePaths = useMemo(() => WAVES, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0b1829" }}>
      {/* L0 · gradiente base (cores amostradas da referência) */}
      <div
        style={{
          ...layer(cam, 0.5),
          inset: "-12%",
          background:
            "linear-gradient(180deg, rgb(13,27,43) 0%, rgb(15,29,48) 12%, rgb(16,31,51) 22%, rgb(21,35,55) 34%, rgb(30,39,54) 48%, rgb(39,42,52) 60%, rgb(50,44,49) 70%, rgb(72,52,46) 80%, rgb(96,63,44) 90%, rgb(124,75,38) 100%)",
        }}
      />
      {/* L1 · halo amplo + luz principal */}
      <div style={{ ...layer(cam, 0.75), inset: "-12%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: glowOpacity,
            transform: `scale(${glowScale})`,
            transformOrigin: `${gx}% ${gy}%`,
            background: `
              radial-gradient(ellipse 40% 52% at ${gx}% ${gy + 10}%, rgba(128,108,74,0.40) 0%, rgba(96,84,66,0.20) 38%, transparent 74%),
              radial-gradient(ellipse 21% 29% at ${gx}% ${gy}%, rgba(176,160,120,0.98) 0%, rgba(166,150,112,0.82) 20%, rgba(130,116,88,0.46) 50%, transparent 88%)`,
          }}
        />
      </div>
      {/* L2 · ondas finas com brilho viajante (parallax) */}
      {wavePaths.map((w, i) => (
        <svg
          key={i}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width={WIDTH}
          height={HEIGHT}
          style={{
            ...layer(cam, w.par),
            transform: `translate3d(${cam.x * w.par + Math.sin(t * 0.22 * w.sp + w.ph) * 38}px, ${cam.y * w.par + Math.sin(t * 0.3 * w.sp + w.ph) * 9}px, 0) scale(${1 + (cam.scale - 1) * w.par})`,
            overflow: "visible",
          }}
        >
          <defs>
            <linearGradient
              id={`wg${i}`}
              gradientUnits="userSpaceOnUse"
              x1={((t * 0.05 * w.sp + w.ph) % 1.6) * WIDTH - WIDTH * 0.6}
              x2={((t * 0.05 * w.sp + w.ph) % 1.6) * WIDTH + WIDTH * 0.4}
              y1="0"
              y2="0"
            >
              <stop offset="0" stopColor="#D9D2BE" stopOpacity={w.o * 0.45} />
              <stop offset="0.5" stopColor="#F2E8C8" stopOpacity={Math.min(1, w.o * 1.5)} />
              <stop offset="1" stopColor="#D9D2BE" stopOpacity={w.o * 0.45} />
            </linearGradient>
          </defs>
          <g transform={`scale(${SX})`}>
            <path d={w.d} fill="none" stroke={`url(#wg${i})`} strokeWidth={w.w} strokeLinecap="round" />
          </g>
        </svg>
      ))}
      {/* L3 · partículas discretas (poeira de luz) */}
      <div style={{ ...layer(cam, 1.0) }}>
        {PARTICLES.map((p, i) => {
          const y = (((p.y - t * p.v * p.depth) % (HEIGHT * 1.2)) + HEIGHT * 1.2) % (HEIGHT * 1.2) - HEIGHT * 0.1;
          const x = p.x + Math.sin(t * 0.4 + p.ph) * p.sway;
          const tw = 0.55 + 0.45 * Math.sin(t * (0.7 + p.depth * 0.5) + p.ph);
          // mais brilhantes perto da luz central
          const dx = (x - WIDTH * 0.5) / WIDTH;
          const dy = (y - HEIGHT * 0.34) / HEIGHT;
          const near = Math.exp(-(dx * dx * 6 + dy * dy * 8));
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: p.r * 2 * p.depth,
                height: p.r * 2 * p.depth,
                borderRadius: "50%",
                background: p.warm ? "rgb(245,222,160)" : "rgb(200,214,235)",
                opacity: p.o * tw * (0.6 + near * 0.9),
                filter: p.r * p.depth > 2.1 ? "blur(1.2px)" : undefined,
              }}
            />
          );
        })}
      </div>
      {/* L4 · grão de filme */}
      <div
        style={{
          position: "absolute",
          inset: -64,
          backgroundImage: `url(${staticFile("ruach/grain.png")})`,
          backgroundSize: "256px 256px",
          opacity: 0.075,
          mixBlendMode: "overlay",
          transform: `translate(${(frame * 37) % 64}px, ${(frame * 53) % 64}px)`,
        }}
      />
      {/* L5 · vinheta + escurecimento para leitura do texto */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 75% 70% at 50% 48%, rgba(5,10,20,${0.04 + dim * 0.06}) 0%, rgba(5,10,20,0.0) 50%, rgba(4,8,16,0.5) 100%)`,
        }}
      />
    </div>
  );
};
