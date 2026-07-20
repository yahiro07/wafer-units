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

const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
const minorScaleIntervals = [0, 2, 3, 5, 7, 8, 10];

const noteLetterToPitchClass: Record<string, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

function parseKey(key: string): { root: number; isMinor: boolean } {
  const match = /^([A-G])([#b]?)(m?)$/.exec(key);
  if (!match) {
    return { root: 0, isMinor: false };
  }
  const [, letter, accidental, minor] = match;
  let root = noteLetterToPitchClass[letter];
  if (accidental === "#") {
    root = (root + 1) % 12;
  } else if (accidental === "b") {
    root = (root + 11) % 12;
  }
  return { root, isMinor: minor === "m" };
}

function createScaleNoteShifter() {
  let keyRoot = 0;
  let scaleIntervals = majorScaleIntervals;
  let tonicMidi = 0;
  let indexInScale = 0;
  let octaveShift = 0;
  const self = {
    setKey(key: string) {
      const parsed = parseKey(key);
      keyRoot = parsed.root;
      scaleIntervals = parsed.isMinor
        ? minorScaleIntervals
        : majorScaleIntervals;
      return self;
    },
    fromAbsolute(noteNumber: number) {
      const relativePc = (((noteNumber % 12) - keyRoot) % 12 + 12) % 12;
      indexInScale = scaleIntervals.indexOf(relativePc);
      if (indexInScale === -1) {
        indexInScale = 0;
      }
      const snappedPc = (keyRoot + scaleIntervals[indexInScale]) % 12;
      const snappedNote = Math.floor(noteNumber / 12) * 12 + snappedPc;
      tonicMidi = snappedNote - scaleIntervals[indexInScale];
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
      const degree = ((indexInScale % 7) + 7) % 7;
      const scaleOctaves = Math.floor(indexInScale / 7);
      return clampValue(
        tonicMidi +
          scaleIntervals[degree] +
          scaleOctaves * 12 +
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
            .setKey(state.key)
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
