export type PatternKey = "pattern1" | "pattern2" | "pattern3";

export type LoopBars = 2 | 4 | 8 | 16 | 32;

export const allHatSampleKeys = ["hc1", "hc2", "hc3", "hc4", "hc5"] as const;

export const allCymbalSampleKeys = ["cc1", "cc2", "cc3", "cc4", "cc5"] as const;

export type SampleKey =
  | (typeof allHatSampleKeys)[number]
  | (typeof allCymbalSampleKeys)[number];

export const allSampleKeys: SampleKey[] = [
  ...allHatSampleKeys,
  ...allCymbalSampleKeys,
];

export type PartKey = "hat" | "cymbal";

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
  hatPartItem: PartItem;
  cymbalPartItem: PartItem;
  volumeSlopeUp: boolean;
  loopEnabled: boolean;
};

export const defaultSceneEditState: SceneEditState = {
  patternKey: "pattern1",
  loopBars: 4,
  hatPartItem: {
    partKey: "hat",
    sampleKey: "hc1",
    pitchTweak: 0,
    volume: 0.5,
    enabled: true,
  },
  cymbalPartItem: {
    partKey: "cymbal",
    sampleKey: "cc1",
    pitchTweak: 0,
    volume: 0.5,
    enabled: true,
  },
  volumeSlopeUp: false,
  loopEnabled: true,
};
