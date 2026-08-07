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
  const editState: SequencerEditState = {
    loopBars: 4,
    notes: seqNumbers(16).map(() => -1),
  };

  const local = {
    lastEmitNote: -1,
    keyTranspose: 0,
  };
  const rootNoteNumber = 48;

  const noteOutputPort = unitInterface?.createNoteOutputPort();

  const clockHandlers: ClockHandlers = {
    processStep(stepIndex, time, unitDuration) {
      const shift = {
        1: 0,
        2: 1,
        4: 2,
        8: 3,
      }[editState.loopBars];
      const pos = (stepIndex >> shift) % 16;
      const relNote = editState.notes[pos];
      if (relNote !== -1 && relNote !== local.lastEmitNote) {
        const note = getNotePitch(relNote, rootNoteNumber, local.keyTranspose);
        noteOutputPort?.noteOn(note, time);
        noteOutputPort?.noteOff(note, time + unitDuration);
        noteOutputPort?.setProgressionRootNote(note, time);
        local.lastEmitNote = relNote;
      }
    },
    stop() {
      local.lastEmitNote = -1;
    },
  };

  return {
    setState(attrs: Partial<SequencerEditState>) {
      Object.assign(editState, attrs);
    },
    setKeyTranspose(keyTranspose: number) {
      local.keyTranspose = keyTranspose;
    },
    clockHandlers,
  };
}
