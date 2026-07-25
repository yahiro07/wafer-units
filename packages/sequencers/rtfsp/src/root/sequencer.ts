import { UnitInterface } from "wafer-host/unit-types";
import { Note } from "@/root/model";
import { clampValue, linearInterpolate, seqNumbers } from "@/utils/helpers";

type SequencerEditState = {
  notes: Note[];
  octave: number;
  duty: number;
  notesStepLength: number;
};

const majorSubDegrees = [0, 2, 4, 5, 7, 9, 11];

function createScaleNoteNumbers() {
  return seqNumbers(84).map((i) => {
    const oct = (i / 7) >>> 0;
    const sub = i % 7;
    return oct * 12 + majorSubDegrees[sub];
  });
}

function getNoteShifted(
  degreeIndex: number,
  octave: number,
  scaleNoteNumbers: number[],
  rootShift: number,
) {
  const shiftAmount = [0, 2, 4, 6, 7][degreeIndex];
  const scaleNodeIndex = clampValue(
    35 + rootShift + octave * 7 + shiftAmount - 7,
    0,
    83,
  );
  return scaleNoteNumbers[scaleNodeIndex];
}

export function createSequencerEngine(
  unitInterface: UnitInterface | undefined,
) {
  const editState: SequencerEditState = {
    notes: [],
    notesStepLength: 1,
    octave: 0,
    duty: 0.5,
  };
  const scaleNoteNumbers = createScaleNoteNumbers();
  const noteOutputPort = unitInterface?.createNoteOutputPort();
  const sentNoteNUmbers: Set<number> = new Set();
  let rootShift = 0;

  const core = {
    start() {},
    processStep(stepIndex: number, time: number, unitDuration: number) {
      const pos = stepIndex % editState.notesStepLength;
      for (const note of editState.notes) {
        if (note.position === pos) {
          const outNoteNumber = getNoteShifted(
            note.degreeIndex,
            editState.octave,
            scaleNoteNumbers,
            rootShift,
          );
          const dutyRate = linearInterpolate(editState.duty, 0, 1, 0.2, 1);
          noteOutputPort?.noteOn(outNoteNumber, time);
          noteOutputPort?.noteOff(
            outNoteNumber,
            time + note.duration * unitDuration * dutyRate,
          );
          sentNoteNUmbers.add(outNoteNumber);
        }
      }
    },
    stop() {
      for (const noteNumber of sentNoteNUmbers) {
        noteOutputPort?.noteOff(noteNumber);
      }
    },
  };

  return {
    setNotes(notes: Note[], notesStepLength: number) {
      editState.notes = notes;
      editState.notesStepLength = notesStepLength;
    },
    setOctave(octave: number) {
      editState.octave = octave;
    },
    setDuty(duty: number) {
      editState.duty = duty;
    },
    setRootNoteNumber(rootNoteNumber: number) {
      const scaleNoteIndex = scaleNoteNumbers.indexOf(rootNoteNumber);
      if (scaleNoteIndex !== -1) {
        rootShift = scaleNoteIndex - 35;
      }
    },
    start: core.start,
    processStep: core.processStep,
    stop: core.stop,
  };
}
