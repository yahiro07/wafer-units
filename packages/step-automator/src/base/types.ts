export type PatternRange = 2 | 3 | 4 | 8 | 16;

export type AutomationLaneItem = {
  id: number;
  enabled: boolean;
  targetParameterId: string | null;
  stepValues: number[];
  patternRange: PatternRange;
};
