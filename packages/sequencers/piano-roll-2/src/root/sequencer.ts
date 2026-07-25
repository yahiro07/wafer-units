import { UnitInterface } from "wafer-host/unit-types";
import { Note } from "@/definitions/model";
import { clampValue, linearInterpolate, seqNumbers } from "@/utils/helpers";

type SequencerEditState = {
  notes: Note[];
  octave: number;
  duty: number;
  notesStepLength: number;
};

const majorSubDegrees = [0, 2, 4, 5, 7, 9, 11];

function createScaleNoteNumbers(keyTranspose: number) {
  return seqNumbers(84).map((i) => {
    const oct = (i / 7) >>> 0;
    const sub = i % 7;
    return oct * 12 + majorSubDegrees[sub] + keyTranspose;
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
  return clampValue(scaleNoteNumbers[scaleNodeIndex], 0, 127);
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
  let scaleNoteNumbers = createScaleNoteNumbers(0);
  const noteOutputPort = unitInterface?.createNoteOutputPort();
  const sentNoteNumbers: Set<number> = new Set();
  let rootShift = 0;

  const core = {
    processStep(stepIndex: number, time: number, unitDuration: number) {
      const pos = stepIndex % editState.notesStepLength;
      for (const note of editState.notes) {
        if (note.position === pos) {
          const outNoteNumber = getNoteShifted(
            note.pitch,
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
          sentNoteNumbers.add(outNoteNumber);
        }
      }
    },
    clearSentNotes() {
      for (const noteNumber of sentNoteNumbers) {
        noteOutputPort?.noteOff(noteNumber);
      }
      sentNoteNumbers.clear();
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
        core.clearSentNotes();
        rootShift = scaleNoteIndex - 35;
      }
    },
    setKeyTranspose(inputKeyTranspose: number) {
      scaleNoteNumbers = createScaleNoteNumbers(inputKeyTranspose);
    },
    start() {},
    processStep(stepIndex: number, time: number, unitDuration: number) {
      core.processStep(stepIndex, time, unitDuration);
    },
    stop() {
      core.clearSentNotes();
    },
  };
}
