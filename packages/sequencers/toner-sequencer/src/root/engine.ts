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
const degreePattern = [0, 2, 4, 6];
function yIndexToSubNote(yIndex: number, rootNoteNumber: number) {
  const rootPitch = rootNoteNumber % 12;
  const rootDegree = cMajorNotes.indexOf(rootPitch);
  if (rootDegree === -1) return 0;
  const patternDegree = degreePattern[yIndex % degreePattern.length];
  const targetDegree = rootDegree + patternDegree;
  const octaveOffset = Math.floor(targetDegree / cMajorNotes.length) * 12;
  const targetPitch = cMajorNotes[targetDegree % cMajorNotes.length];
  return targetPitch + octaveOffset - rootPitch;
}

export function createEngine(unitInterface: UnitInterface | undefined) {
  const state = {
    editState: { ...defaultSequencerEditState },
    rootNoteNumber: 48,
  };

  const clockHandlers: ClockHandlers = {
    processStep(inputStepIndex, time, unitDuration) {
      const stepIndex = inputStepIndex % 16;
      const { octave: octaveShift, duty, stepBits } = state.editState;
      const durationSec = unitDuration * mapDutyToDuration(duty);
      for (let i = 0; i < 10; i++) {
        const isStepActive = isBitSet(stepBits[i], stepIndex);
        if (isStepActive) {
          const octave = (i / 4) >>> 0;
          const subNote = yIndexToSubNote(i, state.rootNoteNumber);
          const noteNumber = clampValue(
            state.rootNoteNumber + (octave + octaveShift) * 12 + subNote,
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
