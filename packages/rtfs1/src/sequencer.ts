import { createSequencerTickDriver } from "mofur/mx-audio";
import { queryUnitInterfaceForModule } from "wus-unit-types";
import { applyDynamicNoteShiftRTFS } from "@/dynamic-note-shift";
import { DynamicPatternMeta, SongKey } from "@/types";

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

function createSequencer() {
  console.log("csq 0258");

  const state = {
    stepNotes: [] as StepNote[],
    key: "Am" as SongKey,
    chordRootNote: 60 as number | undefined,
    octaveShift: 0,
    noteDuty: 0.9,
    bpm: 120,
    isClockInputActive: false,
    isInternalTickRunning: false,
  };

  const sequencerTickDriver = createSequencerTickDriver(
    unitInterface.audioContext,
  );

  const { noteOutputPort } = unitInterface;

  const core = {
    processStep(stepIndex: number, time: number, unitDurationSec: number) {
      console.log({ stepIndex, time, unitDurationSec });
      if (stepIndex % 1 === 0 && time !== undefined) {
        if (state.chordRootNote !== undefined) {
          const note = applyDynamicNoteShiftRTFS(
            0,
            state.key,
            state.chordRootNote,
            0,
          );
          noteOutputPort.noteOn(note, time);
          noteOutputPort.noteOff(note, time + unitDurationSec * 0.5);
        }
      }
    },
  };

  return {
    setStepNotes(stepNotes: StepNote[]) {
      state.stepNotes = stepNotes;
    },
    processStep: core.processStep,
    allNotesOff() {},
    setMetaAttributes(attrs: DynamicPatternMeta) {
      if (attrs.dynamicPatternInput) {
        const { key, chordRootNote } = attrs.dynamicPatternInput;
        if (key !== undefined) {
          state.key = key;
        }
        if (chordRootNote !== undefined) {
          state.chordRootNote = chordRootNote;
        }
      }
    },
    inputNoteOn(note: number, _timeAt: number, _velocity: number) {
      state.chordRootNote = note;
      if (!state.isInternalTickRunning) {
        sequencerTickDriver.setBpm(state.bpm);
        sequencerTickDriver.start({
          processStep: core.processStep,
        });
        state.isInternalTickRunning = true;
      }
    },
    inputNoteOff(_note: number, _timeAt: number) {
      state.chordRootNote = undefined;
      if (state.isInternalTickRunning) {
        sequencerTickDriver.stop();
        state.isInternalTickRunning = false;
      }
    },
  };
}

export const sequencer = createSequencer();
