// Renderiza stills de revisão: node tools/ruach_stills.mjs out/stills 1.2 3.6 ...
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
const [outDir, ...secs] = process.argv.slice(2);
const BR = "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const serveUrl = await bundle({ entryPoint: path.resolve("src/ruach/index.ts"), enableCaching: true });
const comp = await selectComposition({ serveUrl, id: process.env.COMP ?? "RuachIntro", browserExecutable: BR });
for (const s of secs) {
  const frame = Math.round(parseFloat(s) * comp.fps);
  await renderStill({ composition: comp, serveUrl, output: path.join(outDir, `${(process.env.COMP ?? "ruach")}_${s}.png`), frame, browserExecutable: BR, imageFormat: "png", scale: 0.5 });
  console.log("ok", s);
}
