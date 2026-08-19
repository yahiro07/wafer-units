import {
  ClockHandlers,
  NoteInputPort,
  UnitInterface,
} from "wafer-host/unit-types";
import {
  defaultSequencerEditState,
  PatternRange,
  SequencerEditState,
  stepReferenceIndexMap,
} from "@/core/defs";
import { getStep } from "@/core/step-bits-helper";
import { clampValue, mapUnaryTo } from "@/utils/helpers";

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
    rootNoteNumber: 57,
  };
  const noteOutputPort = unitInterface?.createNoteOutputPort();

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
          state.rootNoteNumber - 12 + octave * 12,
          0,
          127,
        );
        noteOutputPort?.noteOn(noteNumber, time, 1);
        noteOutputPort?.noteOff(noteNumber, time + durationSec);
      }
    },
  };
  const noteInput: NoteInputPort = {
    noteOn(noteNumber: number) {
      state.rootNoteNumber = noteNumber;
    },
    noteOff(_noteNumber: number) {},
  };

  return {
    setState: (attrs: Partial<SequencerEditState>) => {
      Object.assign(state.editState, attrs);
    },
    clockHandlers,
    noteInput,
  };
}
