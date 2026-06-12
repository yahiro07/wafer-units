import { queryUnitInterfaceForModule } from "wus-unit-types";

export const unitInterface = queryUnitInterfaceForModule(
  "wus-v01",
  import.meta.url,
)!;
if (!unitInterface) {
  throw new Error("undefined unit interface");
}

type StepNote = {
  relNoteNumber: number;
  position: number;
  duration: number;
};

function createSequencerEngine() {
  const state = {
    stepNotes: [] as StepNote[],
  };

  return {
    setStepNotes(stepNotes: StepNote[]) {
      state.stepNotes = stepNotes;
    },
    processStep(stepIndex: number, unitDurationSec: number, time: number) {
      if (stepIndex % 4 === 0) {
        // const time = unitInterface.audioContext.currentTime + timeOffset;
        unitInterface.noteOutputPort.noteOn(60, time);
      } else if (stepIndex % 4 === 2) {
        // const time = unitInterface.audioContext.currentTime + timeOffset;
        unitInterface.noteOutputPort.noteOff(60, time);
      }
    },
    allNotesOff() {},
  };
}

export const sequencerEngine = createSequencerEngine();
