export type PatternKey = "pattern1" | "pattern2" | "pattern3";

export const allPatternKeys: PatternKey[] = [
  "pattern1",
  "pattern2",
  "pattern3",
];

export type LoopBars = 1 | 2 | 4 | 8 | 16 | 32;

export const allLoopBars: LoopBars[] = [1, 2, 4, 8, 16, 32];

export const allRollSampleKeys = [
  "sd1",
  "sd2",
  "sd3",
  "sd4",
  "hc1",
  "hc2",
] as const;

export const allCrashSampleKeys = ["cc1", "cc2", "cc3"] as const;

export type SampleKey =
  | (typeof allRollSampleKeys)[number]
  | (typeof allCrashSampleKeys)[number];

export const allSampleKeys: SampleKey[] = [
  ...allRollSampleKeys,
  ...allCrashSampleKeys,
];

export type PartKey = "roll" | "crash";

export const allPartKeys: PartKey[] = ["roll", "crash"];

export type PartItem = {
  partKey: PartKey;
  sampleKey: SampleKey;
  pitchTweak: number; //-1~1, center 0
  volume: number; //0~1, center 0.5, mapped to 0~2
  enabled: boolean;
};

export type SceneEditState = {
  patternKey: PatternKey;
  loopBars: LoopBars;
  rollPartItem: PartItem;
  crashPartItem: PartItem;
  volumeSlopeUp: boolean;
  loopEnabled: boolean;
};

export const defaultSceneEditState: SceneEditState = {
  patternKey: "pattern1",
  loopBars: 4,
  rollPartItem: {
    partKey: "roll",
    sampleKey: "sd1",
    pitchTweak: 0,
    volume: 0.5,
    enabled: true,
  },
  crashPartItem: {
    partKey: "crash",
    sampleKey: "cc1",
    pitchTweak: 0,
    volume: 0.5,
    enabled: true,
  },
  volumeSlopeUp: false,
  loopEnabled: true,
};
