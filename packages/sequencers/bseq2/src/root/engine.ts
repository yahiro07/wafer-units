import { clampValue, mapUnaryTo } from "mofur/ax";
import { ClockHandlers, UnitInterface } from "wafer-host/unit-types";
import {
  defaultSequencerEditState,
  PatternRange,
  SequencerEditState,
  stepReferenceIndexMap,
} from "@/common/defs";
import { getStep } from "@/common/step-bits-helper";

function resolveDuration(
  stepBits: number,
  stepIndexFrom: number,
  patternRange: PatternRange,
) {
  let duration = 1;
  for (let i = stepIndexFrom + 1; i < patternRange; i++) {
    const stepValue = getStep(stepBits, i);
    if (stepValue === 2) {
      duration++;
    } else {
      break;
    }
  }
  return duration;
}

export function createEngine(unitInterface: UnitInterface | undefined) {
  const state = {
    editState: { ...defaultSequencerEditState },
    rootNoteNumber: 60,
  };

  const clockHandlers: ClockHandlers = {
    processStep(inputStepIndex, time, unitDuration) {
      const { octave, duty, stepBits, patternRange } = state.editState;

      const xi = inputStepIndex % 16;
      const si = stepReferenceIndexMap[patternRange][xi];
      const stepValue = getStep(stepBits, si);
      if (stepValue === 1) {
        const duration = resolveDuration(stepBits, si, patternRange);
        const dutyRate = mapUnaryTo(duty, 0.1, 1);
        const durationSec = unitDuration * duration * dutyRate;
        const noteNumber = clampValue(
          state.rootNoteNumber - 24 + octave * 12,
          0,
          127,
        );
        unitInterface?.noteOutputPort.noteOn(noteNumber, time, 1);
        unitInterface?.noteOutputPort.noteOff(noteNumber, time + durationSec);
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
      // unitInterface?.noteOutputPort.noteOn(noteNumber);
    },
    inputNoteOff(noteNumber: number) {
      // unitInterface?.noteOutputPort.noteOff(noteNumber);
    },
  };
}
