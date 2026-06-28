export type PatternRange = 2 | 3 | 4 | 8 | 16;

export type ClockDivision = 1 | 2 | 4;

export type AutomationLaneItem = {
  id: number;
  enabled: boolean;
  targetParameterId: string | null;
  stepValues: number[];
  patternRange: PatternRange;
  clockDivision: ClockDivision;
};
