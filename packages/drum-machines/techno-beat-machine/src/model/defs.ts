export type PartKey =
  | "BD"
  | "SN"
  | "HO"
  | "HC"
  | "CL"
  | "RD"
  | "BS"
  | "ST"
  | "PR";

export const allPartKeys: PartKey[] = [
  "BD",
  "SN",
  "HO",
  "HC",
  "CL",
  "RD",
  "BS",
  "ST",
  "PR",
];

export type PartStyle =
  | "fourByFour"
  | "offbeats"
  | "twoAndFour"
  | "randBusy"
  | "randSparse"
  | "occasional"
  | "broken";

export const allPartStyles: PartStyle[] = [
  "fourByFour",
  "offbeats",
  "twoAndFour",
  "randBusy",
  "randSparse",
  "occasional",
  "broken",
];

export type StepNote = {
  pitch: number;
  velocity: number; //0.5 or 1, 0.5 is mapped to weakVelocity
};

export type PartItem = {
  partKey: PartKey;
  sampleKey: string;
  pitchTweak: number;
  weakVelocity: number;
  volume: number;
  stepLength: number;
  notes: (StepNote | null)[];
  outputActive: boolean;
  style?: PartStyle; //for debug
};

export const sampleVariationCounts: Record<PartKey, number> = {
  BD: 5,
  BS: 3,
  CL: 3,
  HC: 4,
  HO: 6,
  PR: 6,
  RD: 3,
  SN: 2,
  ST: 6,
};

export const pitchTweakRangeMap: Record<
  PartKey,
  [number, number, "linear" | "integer"]
> = {
  BD: [-2, 2, "linear"],
  // BS: [-2, 6, "integer"], //for model
  BS: [-6, 6, "integer"], //for ui
  CL: [-2, 2, "linear"],
  HC: [-2, 2, "linear"],
  HO: [-2, 2, "linear"],
  PR: [-2, 2, "linear"],
  RD: [-2, 2, "linear"],
  SN: [-2, 2, "linear"],
  ST: [-6, 6, "integer"],
};
