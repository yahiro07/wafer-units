export type PatternKey = "pattern1" | "pattern2" | "pattern3";

export type LoopBars = 2 | 4 | 8 | 16 | 32;

export type HiHatSampleKey = "hc1" | "hc2" | "hc3" | "hc4" | "hc5";

export type CymbalSampleKey = "cc1" | "cc2" | "cc3";

export const allHatSampleKeys: HiHatSampleKey[] = [
  "hc1",
  "hc2",
  "hc3",
  "hc4",
  "hc5",
];

export const allCymbalSampleKeys: CymbalSampleKey[] = ["cc1", "cc2", "cc3"];

export type SampleKey = HiHatSampleKey | CymbalSampleKey;

export type PartKey = "hat" | "cymbal";

export type PartItem = {
  partKey: PartKey;
  sampleKey: SampleKey;
  pitchTweak: number; //-1~1, center 0
  volume: number; //0~1, center 0.5, mapped to 0~2
  enabled: boolean;
};

export type SceneParameters = {
  patternKey: PatternKey;
  loopBars: LoopBars;
  hatPartItem: PartItem;
  cymbalPartItem: PartItem;
  volumeSlopeUp: boolean;
};
