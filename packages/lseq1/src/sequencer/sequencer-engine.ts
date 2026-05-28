import { clampValue } from "beams/ax/number-utils";
import { createNoteVoicingDurationAdapter } from "beams/mx-audio/note-voicing-adapter";
import { LoopBars, SpecialStep } from "@/types";

type SequencerState = {
  bpm: number;
  loopBars: LoopBars;
  allSteps: number[];
  octaveShift: number;
  stepDuty: number;
};

function getNoteNumberShifted(noteNumber: number, octaveShift: number) {
  return clampValue(noteNumber + octaveShift * 12, 0, 127);
}

export function createSequencerEngine(notePort: {
  noteOn(noteNumber: number): void;
  noteOff(noteNumber: number): void;
}) {
  const noteVoicingAdapter = createNoteVoicingDurationAdapter(notePort);

  const state: SequencerState = {
    bpm: 120,
    loopBars: 4,
    allSteps: Array(256).fill(0),
    octaveShift: 0,
    stepDuty: 0.5,
  };

  const processOnStep = (rawStepIndex: number) => {
    const loopSteps = state.loopBars * 16;
    const stepIndex = rawStepIndex % loopSteps;
    const stepValue = state.allSteps[stepIndex];

    if (stepValue === SpecialStep.rest || stepValue === SpecialStep.tie) {
      return;
    }
    const noteNumber = getNoteNumberShifted(stepValue, state.octaveShift);

    let tieCount = 0;
    for (let i = 1; i < loopSteps; i++) {
      const nextIndex = (stepIndex + i) % loopSteps;
      if (state.allSteps[nextIndex] === SpecialStep.tie) {
        tieCount++;
      } else {
        break;
      }
    }

    const stepDurationSec = 15 / state.bpm; // 16分音符の長さ (60 / bpm / 4)
    const durationSec = (tieCount + state.stepDuty) * stepDurationSec;

    noteVoicingAdapter.noteOn(noteNumber, durationSec);
  };

  return {
    processOnStep,
    allNotesOff() {
      noteVoicingAdapter.allNotesOff();
    },
    setAttributes(attrs: Partial<SequencerState>) {
      for (const key in attrs) {
        (state as any)[key] = (attrs as any)[key];
      }
    },
    setStepValue(index: number, value: number) {
      state.allSteps[index] = value;
    },
    previewNoteOn(noteNumber: number) {
      const ni = getNoteNumberShifted(noteNumber, state.octaveShift);
      noteVoicingAdapter.noteOn(ni);
    },
    previewNoteOff(noteNumber: number) {
      const ni = getNoteNumberShifted(noteNumber, state.octaveShift);
      noteVoicingAdapter.noteOff(ni);
    },
  };
}
