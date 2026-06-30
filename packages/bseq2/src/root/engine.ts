import { clampValue, mapUnaryTo } from "mofur/ax";
import { ClockHandlers, UnitInterface } from "wafer-host/unit-types";
import {
  defaultSequencerState,
  PatternRange,
  SequencerState,
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
  const state = { ...defaultSequencerState };

  const clockHandlers: ClockHandlers = {
    processStep(inputStepIndex, time, unitDuration) {
      const { octave, duty, stepBits, patternRange } = state;

      const xi = inputStepIndex % 16;
      const si = stepReferenceIndexMap[patternRange][xi];
      const stepValue = getStep(stepBits, si);
      if (stepValue === 1) {
        const duration = resolveDuration(stepBits, si, patternRange);
        const dutyRate = mapUnaryTo(duty, 0.1, 1);
        const durationSec = unitDuration * duration * dutyRate;
        const noteNumber = clampValue(36 + octave * 12, 0, 127);
        unitInterface?.noteOutputPort.noteOn(noteNumber, time, 1);
        unitInterface?.noteOutputPort.noteOff(noteNumber, time + durationSec);
      }
    },
  };

  return {
    setup() {},
    teardown() {},
    setState: (attrs: Partial<SequencerState>) => {
      Object.assign(state, attrs);
    },
    clockHandlers,
    inputNoteOn(noteNumber: number) {
      unitInterface?.noteOutputPort.noteOn(noteNumber);
    },
    inputNoteOff(noteNumber: number) {
      unitInterface?.noteOutputPort.noteOff(noteNumber);
    },
  };
}
