import { BeatSourceItem } from "@/root/loop-player-engine";

type LoopSourceItem = {
  fileName: LoopKey;
  bars: number;
  bpm: number;
  gainFix?: number;
};

export const loopSourceItems: LoopSourceItem[] = [
  // { fileName: "xkicks-the-jokers-kick.m4a", bars: 0.25, bpm: 182 },
  // { fileName: "xkicks-lumberjack.m4a", bars: 0.5, bpm: 178 },
  // { fileName: "xkicks-focus-beam.m4a", bars: 0.25, bpm: 182 },
  // {
  //   fileName: "xkicks-world-expo-of-destruction.m4a",
  //   bars: 0.5,
  //   bpm: 178,
  // },
  { fileName: "125-puredance03.m4a", bars: 2, bpm: 125 },
  { fileName: "125-puredance04.m4a", bars: 2, bpm: 125 },
  { fileName: "120-funkb.m4a", bars: 2, bpm: 120 },
  { fileName: "90-breakbeat.m4a", bars: 2, bpm: 90 },
  { fileName: "tech-005.m4a", bars: 2, bpm: 140, gainFix: 2 },
  // { fileName: "wrd-006.m4a", bars: 2, bpm: 140 },
  // { fileName: "ec-digi-014.m4a", bars: 2, bpm: 120, gainFix: 2 },
] as const;

export type LoopKey = string;

export const beatSourceItems: BeatSourceItem[] = loopSourceItems.map(
  (item) => ({
    // id: item.fileName.replace(/\.[^.]+$/, ""),
    id: item.fileName,
    uri: `./loops/${item.fileName}`,
    barLength: item.bars,
    originalBpm: item.bpm,
    gainFix: item.gainFix,
  }),
);
