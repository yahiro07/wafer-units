import { ClockHandlers, UnitInterface } from "wafer-host/unit-types";
import { LoopBars } from "@/root/parameters";
import { clampValue, seqNumbers } from "@/utils/helpers";

type SequencerEditState = {
  loopBars: LoopBars;
  notes: number[];
};

const cMajorScaleNotes = [0, 2, 4, 5, 7, 9, 11];

function getNotePitch(relNote: number, rootNote: number, keyTranspose: number) {
  const octave = (relNote / 7) >>> 0;
  const subIndex = relNote % 7;
  return clampValue(
    rootNote + octave * 12 + cMajorScaleNotes[subIndex] + keyTranspose,
    0,
    127,
  );
}

export function createSequencerEngine(
  unitInterface: UnitInterface | undefined,
) {
  const noteOutputPort = unitInterface?.createNoteOutputPort();

  const editState: SequencerEditState = {
    loopBars: 4,
    notes: seqNumbers(16).map(() => -1),
  };

  const state = {
    lastEmitNote: -1,
    keyTranspose: 0,
    rootNoteNumber: 48,
  };

  const internal = {
    playNote(note: number, time: number) {
      if (note === state.lastEmitNote) return;
      if (state.lastEmitNote !== -1) {
        noteOutputPort?.noteOff(state.lastEmitNote, time);
      }
      noteOutputPort?.noteOn(note, time);
      state.lastEmitNote = note;
    },
    stopNote() {
      if (state.lastEmitNote !== -1) {
        noteOutputPort?.noteOff(state.lastEmitNote);
        state.lastEmitNote = -1;
      }
    },
  };

  const clockHandlers: ClockHandlers = {
    processStep(stepIndex, time) {
      const shift = Math.floor(Math.log2(editState.loopBars));
      const pos = (stepIndex >> shift) % 16;
      const relNote = editState.notes[pos];
      if (relNote !== -1) {
        const note = getNotePitch(
          relNote,
          state.rootNoteNumber,
          state.keyTranspose,
        );
        internal.playNote(note, time);
      }
    },
    stop() {
      internal.stopNote();
    },
  };

  return {
    setState(attrs: Partial<SequencerEditState>) {
      Object.assign(editState, attrs);
    },
    setKeyTranspose(keyTranspose: number) {
      state.keyTranspose = keyTranspose;
    },
    clockHandlers,
  };
}
