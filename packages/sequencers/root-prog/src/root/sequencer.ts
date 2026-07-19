import { ClockHandlers, UnitInterface } from "wafer-host/unit-types";
import { LoopBars } from "@/root/parameters";
import { seqNumbers } from "@/utils/helpers";

type SequencerEditState = {
  loopBars: LoopBars;
  notes: number[];
};

const cMajorScaleNotes = [0, 2, 4, 5, 7, 9, 11];

function getNotePitch(relNote: number, rootNote: number) {
  const octave = (relNote / 7) >>> 0;
  const subIndex = relNote % 7;
  return rootNote + octave * 12 + cMajorScaleNotes[subIndex];
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
        const note = getNotePitch(relNote, rootNoteNumber);
        console.log("noteOn", note, time);
        noteOutputPort?.noteOn(note, time);
        noteOutputPort?.noteOff(note, time + unitDuration);
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
    clockHandlers,
  };
}
