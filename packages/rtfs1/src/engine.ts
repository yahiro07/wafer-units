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

  const { noteOutputPort } = unitInterface;

  return {
    setStepNotes(stepNotes: StepNote[]) {
      state.stepNotes = stepNotes;
    },
    processStep(stepIndex: number, time: number, unitDurationSec: number) {
      if (stepIndex % 4 === 0) {
        noteOutputPort.noteOn(60, time);
        noteOutputPort.noteOff(60, time + unitDurationSec * 0.5);
      }
    },
    allNotesOff() {},
  };
}

export const sequencerEngine = createSequencerEngine();
