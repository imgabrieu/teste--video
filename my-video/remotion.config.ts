/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

// Cloud/sandbox: use the pre-installed headless shell when present (no download needed). The folder name carries a version, so look it up.
import { existsSync, readdirSync } from "node:fs";
const PW = "/opt/pw-browsers";
const findHeadless = (): string | null => {
  if (!existsSync(PW)) return null;
  for (const d of readdirSync(PW).filter((n) => n.startsWith("chromium_headless_shell-"))) {
    for (const rel of [`${d}/chrome-linux/headless_shell`, `${d}/chrome-headless-shell-linux64/chrome-headless-shell`]) {
      if (existsSync(`${PW}/${rel}`)) return `${PW}/${rel}`;
    }
  }
  return null;
};
const HEADLESS = findHeadless();
if (HEADLESS) Config.setBrowserExecutable(HEADLESS);
Config.setCodec("h264");
Config.setCrf(14);
Config.setPixelFormat("yuv420p");
Config.setAudioBitrate("256k");
