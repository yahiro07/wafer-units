export enum LfoWave {
  Sine = 0,
  Triangle,
  Saw,
  Rect,
  SampleHold,
}

export enum XStep {
  None = 0,
  div16,
  div8,
  div4,
}

export enum YStep {
  None = 0,
  step3,
  step4,
  step8,
}

export type LfoSlot = {
  id: number;
  enabled: boolean;
  targetParameterId: string | null;
  wave: LfoWave;
  centerValue: number;
  rate: number;
  rateStepped: boolean;
  depth: number;
  xStep: XStep;
  yStep: YStep;
};
