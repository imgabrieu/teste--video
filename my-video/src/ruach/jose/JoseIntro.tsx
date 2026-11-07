import { makeIntro } from "../Intro";
import { JOSE_BEATS, JOSE_SFX, NAME, OFFSET, TOTAL_SECONDS } from "./timing";

export const JoseIntro = makeIntro({
  beats: JOSE_BEATS,
  offset: OFFSET,
  total: TOTAL_SECONDS,
  audio: "ruach/jose-narracao.mp3",
  sfx: JOSE_SFX,
  name: { pre: "PR.", lines: ["JOSÉ", "SANTOS"], size: 336, times: { pre: NAME.pr, l1: NAME.jose, l2: NAME.santos } },
});
