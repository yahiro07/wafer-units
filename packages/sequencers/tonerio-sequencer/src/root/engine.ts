import { ClockHandlers, UnitInterface } from "wafer-host/unit-types";
import { defaultSequencerEditState, SequencerEditState } from "@/common/defs";
import { clampValue, isBitSet, linearInterpolate } from "@/utils/helpers";

function mapDutyToDuration(paramDuty: number): number {
  if (paramDuty < 0.5) {
    return linearInterpolate(paramDuty, 0, 0.5, 0.2, 1, true);
  } else {
    return linearInterpolate(paramDuty, 0.5, 1, 1, 4, true);
  }
}

const cMajorNotes = [0, 2, 4, 5, 7, 9, 11];

function createScaleNoteShifter() {
  let originalNoteNumber = 0;
  let indexInScale = 0;
  let octaveShift = 0;
  const self = {
    fromAbsolute(noteNumber: number) {
      originalNoteNumber = noteNumber;
      indexInScale = cMajorNotes.indexOf(noteNumber % 12);
      if (indexInScale === -1) {
        indexInScale = 0;
      }
      return self;
    },
    shiftInScale(amount: number) {
      indexInScale += amount;
      return self;
    },
    shiftOctave(amount: number) {
      octaveShift += amount;
      return self;
    },
    toAbsolute() {
      return clampValue(
        Math.floor(originalNoteNumber / 12) * 12 +
          Math.floor(indexInScale / 7) * 12 +
          cMajorNotes[indexInScale % 7] +
          octaveShift * 12,
        0,
        127,
      );
    },
  };
  return self;
}

export function createEngine(unitInterface: UnitInterface | undefined) {
  const state = {
    editState: { ...defaultSequencerEditState },
    rootNoteNumber: 48,
    key: "C",
  };

  const noteOutputPort = unitInterface?.createNoteOutputPort();

  const shiftAmountsInScale = [0, 2, 4, 6, 7, 9, 11, 13];

  const clockHandlers: ClockHandlers = {
    processStep(inputStepIndex, time, unitDuration) {
      const stepIndex = inputStepIndex % 16;
      const { octave: octaveShift, duty, stepBits } = state.editState;
      const durationSec = unitDuration * mapDutyToDuration(duty);
      for (let i = 0; i < 8; i++) {
        const isStepActive = isBitSet(stepBits[i], stepIndex);
        if (isStepActive) {
          const noteNumber = createScaleNoteShifter()
            .fromAbsolute(state.rootNoteNumber)
            .shiftInScale(shiftAmountsInScale[i])
            .shiftOctave(octaveShift)
            .toAbsolute();
          noteOutputPort?.noteOn(noteNumber, time, 1);
          noteOutputPort?.noteOff(noteNumber, time + durationSec);
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
    setKey(key: string) {
      state.key = key;
    },
  };
}
