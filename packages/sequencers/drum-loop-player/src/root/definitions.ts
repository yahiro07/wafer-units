import { BeatSourceItem } from "@/root/loop-player-engine";

type LoopSourceItem = {
  fileName: LoopKey;
  bars: number;
  bpm: number;
  gainFix?: number;
};

export const loopSourceItems: LoopSourceItem[] = [
  //
  { fileName: "125-puredance03.m4a", bars: 2, bpm: 125, gainFix: 0.9 },
  { fileName: "125-puredance04.m4a", bars: 2, bpm: 125, gainFix: 0.9 },
  { fileName: "125-puredance01.m4a", bars: 2, bpm: 125, gainFix: 0.8 },
  { fileName: "125-puredance02.m4a", bars: 2, bpm: 125, gainFix: 0.8 },
  //
  { fileName: "120-hydrosampler1.m4a", bars: 2, bpm: 120 },
  { fileName: "120-hydrosampler2.m4a", bars: 2, bpm: 120 },
  { fileName: "127-hydrosampler1.m4a", bars: 2, bpm: 127, gainFix: 0.9 },
  { fileName: "125-hydrosampler1.m4a", bars: 2, bpm: 125 },
  //
  { fileName: "120-funka.m4a", bars: 2, bpm: 120 },
  { fileName: "120-funku.m4a", bars: 2, bpm: 120 },
  { fileName: "120-funkb.m4a", bars: 2, bpm: 120 },
  { fileName: "135-funkless.m4a", bars: 2, bpm: 135, gainFix: 0.9 },
  //
  { fileName: "125-puredance05.m4a", bars: 2, bpm: 125, gainFix: 0.8 },
  { fileName: "90-breakbeat.m4a", bars: 2, bpm: 90 },
  { fileName: "120-zzbeatz.m4a", bars: 2, bpm: 120, gainFix: 0.9 },
  { fileName: "tech-005.m4a", bars: 2, bpm: 140, gainFix: 2.4 },
  //
  { fileName: "b-beat009.m4a", bars: 2, bpm: 144 },
  { fileName: "b-beat010.m4a", bars: 4, bpm: 144 },
  { fileName: "b-beat015.m4a", bars: 2, bpm: 144 },
  { fileName: "b-beat016.m4a", bars: 2, bpm: 144 },
  //
  {
    fileName: "drumloop-90-fd-more-1-bar-90-bpm-no-swing.m4a",
    bars: 1,
    bpm: 90,
  },
  {
    fileName: "drumloop-the-bigbeat-a-100-one-1-bar-100-bpm-no-swing.m4a",
    bars: 1,
    bpm: 100,
  },
  {
    fileName: "drumloop-a-basic-one-1-bar-98-bpm-no-swing.m4a",
    bars: 1,
    bpm: 98,
  },
  { fileName: "drumloop-basic-variation-8-bars-90-bpm.m4a", bars: 4, bpm: 90 },
  //
  {
    fileName: "drumloop-classic-breakbeat-3-funky-drummer-90-bpm.m4a",
    bars: 1,
    bpm: 90,
  },
  {
    fileName: "drumloop-classic-breakbeat-6-jungle-variant-100-bpm.m4a",
    bars: 1,
    bpm: 100,
  },
  {
    fileName: "drumloop-classic-breakbeat-5-jungle-tambourine.m4a",
    bars: 1,
    bpm: 120,
    gainFix: 0.8,
  },
  { fileName: "drumloop-classic-breakbeat-2.m4a", bars: 1, bpm: 144 },
  //
  {
    fileName: "drumloop-jungle-thought-2-bar-100-bpm-swing.m4a",
    bars: 2,
    bpm: 100,
  },
  {
    fileName: "drumloop-lo-fi-base-1-2-bar-70-bpm-swing.m4a",
    bars: 2,
    bpm: 70,
  },
  { fileName: "drumloop-free-try-1-90-bpm.m4a", bars: 2, bpm: 90 },
  { fileName: "ec-digi-014.m4a", bars: 2, bpm: 120, gainFix: 2 },
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
