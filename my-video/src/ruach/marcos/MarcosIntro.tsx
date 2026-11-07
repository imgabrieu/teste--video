import { makeIntro } from "../Intro";
import { MARCOS_BEATS, MARCOS_SFX, NAME, OFFSET, TOTAL_SECONDS } from "./timing";

export const MarcosIntro = makeIntro({
  beats: MARCOS_BEATS,
  offset: OFFSET,
  total: TOTAL_SECONDS,
  audio: "ruach/marcos-narracao.mp3",
  sfx: MARCOS_SFX,
  name: { pre: "PR.", lines: ["MARCOS", "ROZENIO"], size: 322, times: { pre: NAME.pr, l1: NAME.marcos, l2: NAME.rozenio } },
});
