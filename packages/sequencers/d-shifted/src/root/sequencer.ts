import {
  ClockHandlers,
  NoteInputPort,
  SongKeySpec,
  UnitInterface,
} from "wafer-host/unit-types";
import { clampValue, seqNumbers } from "@/utils/helpers";
import {
  defaultSequencerEditState,
  SequencerEditState,
} from "@/root/definitions";

const majorSubDegrees = [0, 2, 4, 5, 7, 9, 11];
const minorSubDegrees = [0, 2, 3, 5, 7, 8, 10];

function createScaleNoteNumbers(keyRoot: number, mode: "major" | "minor") {
  const subDegrees = mode === "major" ? majorSubDegrees : minorSubDegrees;
  return seqNumbers(84).map((i) => {
    const oct = (i / 7) >>> 0;
    const sub = i % 7;
    //if keyRoot is negative, this value could be negative,
    //so it should be clamped to 0-127 before sending
    return oct * 12 + subDegrees[sub] + keyRoot;
  });
}

export type ISequencerListener = {
  onPlayStepPositionChanged(stepPosition: number): void;
};

export function createSequencer(unitInterface: UnitInterface | undefined) {
  const noteOutputPort = unitInterface?.createNoteOutputPort();

  const editState: SequencerEditState = structuredClone(
    defaultSequencerEditState,
  );

  const state = {
    scaleNoteNumbers: createScaleNoteNumbers(-3, "minor"), //default Am
    inputRootNoteNumber: -1,
  };
  let listener: ISequencerListener | null = null;

  const internal = {
    playNote(note: number, time: number, duration: number) {
      noteOutputPort?.noteOn(note, time);
      noteOutputPort?.noteOff(note, time + duration);
    },
    getShiftingRootIndex() {
      if (editState.shiftEnabled) {
        const index = state.scaleNoteNumbers.indexOf(state.inputRootNoteNumber);
        if (index !== -1) return index;
      }
      return 28;
    },
    getOutputNoteNumber(root: number, pitch: number) {
      return clampValue(
        state.scaleNoteNumbers[
          clampValue(root + pitch + editState.octaveShift * 7, 0, 83)
        ],
        0,
        127,
      );
    },
  };

  const clockHandlers: ClockHandlers = {
    processStep(stepIndex, time, unitDuration) {
      const pos = stepIndex % editState.patternLength;
      const notes = editState.notes.filter((note) => note.position === pos);
      const root = internal.getShiftingRootIndex();
      for (const note of notes) {
        const durationSec = note.duration * unitDuration * editState.stepDuty;
        const noteNumber = internal.getOutputNoteNumber(root, note.pitch);
        internal.playNote(noteNumber, time, durationSec);
      }
      listener?.onPlayStepPositionChanged(pos);
    },
    stop() {
      listener?.onPlayStepPositionChanged(-1);
    },
  };

  const noteInput: NoteInputPort = {
    noteOn(noteNumber) {
      state.inputRootNoteNumber = noteNumber;
    },
    noteOff() {},
  };

  return {
    setState(attrs: Partial<SequencerEditState>) {
      Object.assign(editState, attrs);
    },
    setKey(keySpec: SongKeySpec) {
      const { root, mode } = keySpec;
      state.scaleNoteNumbers = createScaleNoteNumbers(root, mode);
    },
    clockHandlers,
    noteInput,
    setListener(_listener: ISequencerListener | null) {
      listener = _listener;
    },
  };
}
