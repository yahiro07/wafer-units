import { clampValue, isBitSet, linearInterpolate } from "mofur/ax";
import { ClockHandlers, UnitInterface } from "wafer-host/unit-types";
import { defaultSequencerEditState, SequencerEditState } from "@/common/defs";

function mapDutyToDuration(paramDuty: number): number {
  if (paramDuty < 0.5) {
    return linearInterpolate(paramDuty, 0, 0.5, 0.2, 1, true);
  } else {
    return linearInterpolate(paramDuty, 0.5, 1, 1, 4, true);
  }
}

type KeyType = "major" | "minor";

const subNotes = {
  major: [0, 2, 4, 7, 9], //do re mi so la for C
  minor: [0, 2, 3, 7, 10], //la si do mi so for Am
};
function yIndexToSubNote(yIndex: number, keyType: KeyType) {
  return subNotes[keyType][yIndex % subNotes[keyType].length];
}

const keyTypeMap: Record<number, KeyType> = {
  [0]: "major",
  [2]: "minor",
  [4]: "minor",
  [5]: "major",
  [7]: "major",
  [9]: "minor",
  [11]: "minor",
};

function getKeyType(rootNoteNumber: number): KeyType {
  const idx = rootNoteNumber % 12;
  return keyTypeMap[idx as keyof typeof keyTypeMap] ?? ("major" as KeyType);
}

export function createEngine(unitInterface: UnitInterface | undefined) {
  const state = {
    editState: { ...defaultSequencerEditState },
    rootNoteNumber: 60,
  };

  const clockHandlers: ClockHandlers = {
    processStep(inputStepIndex, time, unitDuration) {
      const stepIndex = inputStepIndex % 16;
      const { octave, duty, stepBits } = state.editState;
      const durationSec = unitDuration * mapDutyToDuration(duty);
      for (let i = 0; i < 10; i++) {
        const isStepActive = isBitSet(stepBits[i], stepIndex);
        if (isStepActive) {
          const keyType = getKeyType(state.rootNoteNumber);
          const subNote = yIndexToSubNote(i, keyType);
          const noteNumber = clampValue(
            state.rootNoteNumber + octave * 12 + subNote,
            0,
            127,
          );
          unitInterface?.noteOutputPort.noteOn(noteNumber, time, 1);
          unitInterface?.noteOutputPort.noteOff(noteNumber, time + durationSec);
        }
      }
    },
  };

  return {
    setup() {},
    teardown() {},
    setState: (attrs: Partial<SequencerEditState>) => {
      Object.assign(state.editState, attrs);
    },
    clockHandlers,
    inputNoteOn(noteNumber: number) {
      state.rootNoteNumber = noteNumber;
    },
    inputNoteOff(_noteNumber: number) {},
  };
}
