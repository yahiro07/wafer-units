import { appEnvs } from "@/common/app-envs";

export type BaseStep = "16th" | "8th";

export type PatternLength = 16 | 32 | 64 | 128 | 256;

export type Note = {
  id: number;
  pitch: number;
  position: number;
  duration: number;
};

export type SequencerEditState = {
  baseStep: BaseStep;
  octaveShift: number;
  stepDuty: number;
  shiftEnabled: boolean;
  patternLength: PatternLength;
  notes: Note[];
};

export const defaultSequencerEditState: SequencerEditState = {
  baseStep: "16th",
  octaveShift: 0,
  stepDuty: 1,
  shiftEnabled: true,
  patternLength: 16,
  notes: [],
};

if (appEnvs.isDevelopment) {
  Object.assign(defaultSequencerEditState, {
    patternLength: 128,
    notes: [
      { id: 0, position: 0, duration: 2, pitch: 0 },
      { id: 1, position: 2, duration: 2, pitch: 9 },
      { id: 2, position: 4, duration: 2, pitch: 11 },
      { id: 3, position: 6, duration: 2, pitch: 13 },
      { id: 4, position: 8, duration: 2, pitch: 14 },
      { id: 5, position: 10, duration: 2, pitch: 24 },
    ],
  });
}
