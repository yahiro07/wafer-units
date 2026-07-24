import { ClockHandlers, UnitInterface } from "wafer-host/unit-types";
import { Note } from "@/root/model";

type SequencerEditState = {
  notes: Note[];
  octave: number;
  duty: number;
};

export function createSequencerEngine(
  unitInterface: UnitInterface | undefined,
) {
  const editState: SequencerEditState = {
    notes: [],
    octave: 0,
    duty: 0.5,
  };

  const local = {
    lastEmitNote: -1,
  };
  const rootNoteNumber = 48;

  const noteOutputPort = unitInterface?.createNoteOutputPort();

  const clockHandlers: ClockHandlers = {
    processStep(stepIndex, time, unitDuration) {},
    stop() {
      local.lastEmitNote = -1;
    },
  };

  return {
    setNotes(notes: Note[]) {
      editState.notes = notes;
    },
    setOctave(octave: number) {
      editState.octave = octave;
    },
    setDuty(duty: number) {
      editState.duty = duty;
    },
    clockHandlers,
  };
}
