import { clampValue, isBitSet, linearInterpolate } from "mofur/ax";
import { ClockHandlers, UnitInterface } from "wafer-host/unit-types";
import { defaultSequencerState, SequencerState } from "@/common/defs";

function mapDutyToDuration(paramDuty: number): number {
  if (paramDuty < 0.5) {
    return linearInterpolate(paramDuty, 0, 0.5, 0.2, 1, true);
  } else {
    return linearInterpolate(paramDuty, 0.5, 1, 1, 4, true);
  }
}

// const subNotes = [0, 3, 5, 7, 10]; //la do re mi so
const subNotes = [0, 2, 4, 7, 9]; //do re mi so la
function yIndexToSubNote(yIndex: number) {
  return subNotes[yIndex % subNotes.length];
}

export function createEngine(unitInterface: UnitInterface | undefined) {
  const state = { ...defaultSequencerState };

  const clockHandlers: ClockHandlers = {
    processStep(inputStepIndex, time, unitDuration) {
      const stepIndex = inputStepIndex % 16;
      const { octave, duty, stepBits } = state;
      const durationSec = unitDuration * mapDutyToDuration(duty);
      for (let i = 0; i < 10; i++) {
        const isStepActive = isBitSet(stepBits[i], stepIndex);
        if (isStepActive) {
          const subNote = yIndexToSubNote(i);
          const noteNumber = clampValue(60 + octave * 12 + subNote, 0, 127);
          unitInterface?.noteOutputPort.noteOn(noteNumber, time, 1);
          unitInterface?.noteOutputPort.noteOff(noteNumber, time + durationSec);
        }
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
  };
}
