import { makeIntro } from "../Intro";
import { DIEGO_BEATS, DIEGO_SFX, NAME, OFFSET, TOTAL_SECONDS } from "./timing";

export const DiegoIntro = makeIntro({
  beats: DIEGO_BEATS,
  offset: OFFSET,
  total: TOTAL_SECONDS,
  audio: "ruach/diego-narracao.mp3",
  sfx: DIEGO_SFX,
  name: { pre: "PR.", lines: ["DIEGO", "ALVES"], size: 336, times: { pre: NAME.pr, l1: NAME.diego, l2: NAME.alves } },
});
