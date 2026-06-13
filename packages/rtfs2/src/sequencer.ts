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
    processStep(stepIndex: number, time: number, unitDuration: number) {
      stepIndex %= 16;
      if (time === undefined || unitDuration === undefined) {
        //something wrong with the tick driver
        return;
      }
      if (state.chordRootNote === undefined) return;

      const targetNotes = state.stepNotes.filter(
        (note) => note.position === stepIndex,
      );
      for (const stepNote of targetNotes) {
        const shiftedNote = applyDynamicNoteShiftRTFS(
          stepNote.relNoteNumber,
          state.key,
          state.chordRootNote,
          state.octaveShift,
        );
        const duration =
          stepNote.duration * unitDuration -
          (1 - state.noteDuty) * unitDuration;

        noteOutputPort.noteOn(shiftedNote, time);
        noteOutputPort.noteOff(shiftedNote, time + duration);
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
    setAttrs(attrs: Partial<Pick<typeof state, "octaveShift" | "noteDuty">>) {
      if (attrs.octaveShift !== undefined) {
        state.octaveShift = attrs.octaveShift;
      }
      if (attrs.noteDuty !== undefined) {
        state.noteDuty = attrs.noteDuty;
      }
    },
    setPreviewNote(_note: number | null) {},
  };
}

export const sequencer = createSequencer();
