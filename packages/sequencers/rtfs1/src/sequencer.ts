import { createSequencerTickDriver } from "mofur/mx-audio";
import { queryUnitInterfaceForModule } from "wafer-host/unit-types";
import { applyDynamicNoteShiftRTFS } from "@/dynamic-note-shift";
import { SongKey, SongKeyMetaAttrs } from "@/types";

export const unitInterface = queryUnitInterfaceForModule(
  "wafer-v01",
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

  const noteOutputPort = unitInterface.createNoteOutputPort();

  const core = {
    processStep(stepIndex: number, time: number, unitDuration: number) {
      // console.log(`rtfs1 processStep`, stepIndex, time);
      stepIndex %= 8;
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

        // console.log(`rtfs1 emit note`, shiftedNote, time);
        noteOutputPort.noteOn(shiftedNote, time);
        noteOutputPort.noteOff(shiftedNote, time + duration);
      }
    },
  };

  return {
    setStepNotes(stepNotes: StepNote[]) {
      state.stepNotes = stepNotes;
    },
    startClock() {
      state.isClockInputActive = true;
    },
    processStep: core.processStep,
    endClock() {
      state.isClockInputActive = false;
    },
    setMetaAttributes(attrs: SongKeyMetaAttrs) {
      const { songKey } = attrs;
      if (songKey !== undefined) {
        state.key = songKey;
      }
    },
    inputNoteOn(note: number, _timeAt: number, _velocity: number) {
      // console.log(`inputNoteOn`, note, _timeAt);
      state.chordRootNote = note;
      if (state.isClockInputActive) return;
      if (!state.isInternalTickRunning) {
        sequencerTickDriver.setBpm(state.bpm);
        sequencerTickDriver.start({
          processStep: core.processStep,
        });
        state.isInternalTickRunning = true;
      }
    },
    inputNoteOff(_note: number, _timeAt: number) {
      // console.log(`inputNoteOff`, _note, _timeAt);
      state.chordRootNote = undefined;
      if (state.isClockInputActive) return;
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
  };
}

export const sequencer = createSequencer();
