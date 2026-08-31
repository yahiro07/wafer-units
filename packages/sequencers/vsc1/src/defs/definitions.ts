import { appEnvs } from "@/common/app-envs";
import { fillNumbers, seqNumbers } from "@/utils/helpers";

export type SequencerEditState = {
  pitchIndices: number[];
  stepNotes: number[];
  stepModifierFlags: number[];
  alterPatternsEnabled: boolean;
  twiddleKnobsEnabled: boolean;
};

export const defaultSequencerEditState: SequencerEditState = {
  pitchIndices: [0, 12, 24],
  stepNotes: fillNumbers(16, 0),
  stepModifierFlags: fillNumbers(16, 0),
  alterPatternsEnabled: false,
  twiddleKnobsEnabled: false,
};
if (0) {
  Object.assign(defaultSequencerEditState, {
    stepNotes: seqNumbers(16).map((i) => (i % 4) * 12),
    // stepModifierFlags: seqNumbers(16).map((i) => i % 3),
  });
}

export const pitchPresets = [
  [0, 12, 24],
  [0, 7, 12, 19, 24],
];
if (appEnvs.isDevelopment) {
  pitchPresets.push([0]);
}
