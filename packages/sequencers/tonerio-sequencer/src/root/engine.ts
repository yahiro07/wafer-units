import {
  ClockHandlers,
  SongKeySpec,
  UnitInterface,
} from "wafer-host/unit-types";
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

function getScaleIntervals(isMinor: boolean): number[] {
  return isMinor ? minorScaleIntervals : majorScaleIntervals;
}

/** Scale degree index including octave: octave * 7 + degree (0–6). */
function absoluteToScaleIndex(noteNumber: number, key: string): number {
  const { root, isMinor } = parseKey(key);
  const scaleIntervals = getScaleIntervals(isMinor);
  const relativePc = ((((noteNumber % 12) - root) % 12) + 12) % 12;
  let degree = scaleIntervals.indexOf(relativePc);
  if (degree === -1) {
    degree = 0;
  }
  return Math.floor((noteNumber - root) / 12) * 7 + degree;
}

function createScaleNoteShifter() {
  let keyRoot = 0;
  let scaleIntervals = majorScaleIntervals;
  let indexInScale = 0;
  let octaveShift = 0;
  const self = {
    setKey(key: string) {
      const parsed = parseKey(key);
      keyRoot = parsed.root;
      scaleIntervals = getScaleIntervals(parsed.isMinor);
      return self;
    },
    fromScaleIndex(scaleIndex: number) {
      indexInScale = scaleIndex;
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
        scaleOctaves * 12 + keyRoot + scaleIntervals[degree] + octaveShift * 12,
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
    // C3 tonic under C major (absolute 48) → scale index 28
    rootScaleIndex: 28,
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
            .fromScaleIndex(state.rootScaleIndex)
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
      state.rootScaleIndex = absoluteToScaleIndex(noteNumber, state.key);
    },
    inputNoteOff(_noteNumber: number) {},
    setKey(keySpec: SongKeySpec) {
      state.key =
        ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][
          (keySpec.root + 120) % 12
        ] + (keySpec.mode === "minor" ? "m" : "");
    },
  };
}
