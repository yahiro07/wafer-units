import { BeatSourceItem } from "@/root/loop-player-engine";

export const loopSourceItems = [
  { fileName: "xkicks-the-jokers-kick.m4a", bars: 1 },
  { fileName: "xkicks-lumberjack.m4a", bars: 1 },
  { fileName: "xkicks-focus-beam.m4a", bars: 1 },
  { fileName: "xkicks-world-expo-of-destruction.m4a", bars: 1 },
  { fileName: "125-puredance03.m4a", bars: 2 },
  { fileName: "125-puredance04.m4a", bars: 2 },
  { fileName: "120-funkb.m4a", bars: 2 },
  { fileName: "90-breakbeat.m4a", bars: 2 },
  { fileName: "tech-005.m4a", bars: 2 },
  { fileName: "wrd-006.m4a", bars: 2 },
  { fileName: "ec-digi-014.m4a", bars: 2 },
] as const;

export type LoopKey = (typeof loopSourceItems)[number]["fileName"];

export const beatSourceItems: BeatSourceItem[] = loopSourceItems.map(
  (item) => ({
    // id: item.fileName.replace(/\.[^.]+$/, ""),
    id: item.fileName,
    uri: `./loops/${item.fileName}`,
    barLength: item.bars,
  }),
);
