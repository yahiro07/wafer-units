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

function createScaleNoteNumbers(keyTranspose: number) {
  return seqNumbers(84).map((i) => {
    const oct = (i / 7) >>> 0;
    const sub = i % 7;
    return oct * 12 + majorSubDegrees[sub] + keyTranspose;
  });
}

export type ISequencerListener = {
  onDisplayStepIndexChanged(stepIndex: number): void;
};

export function createSequencer(unitInterface: UnitInterface | undefined) {
  const noteOutputPort = unitInterface?.createNoteOutputPort();

  const editState: SequencerEditState = structuredClone(
    defaultSequencerEditState,
  );

  const state = {
    scaleNoteNumbers: createScaleNoteNumbers(0),
    sentNotes: new Set<number>(),
    rootNoteShift: 0,
    liveRootNoteLatest: -1,
    keyMode: "minor" as "major" | "minor",
  };
  let listener: ISequencerListener | null = null;

  const internal = {
    playNote(note: number, time: number, duration: number) {
      noteOutputPort?.noteOn(note, time);
      noteOutputPort?.noteOff(note, time + duration);
    },
    getScaleFundamentalIndex() {
      return state.keyMode === "major" ? 28 : 26;
    },
    getOutputNoteNumber(pitch: number) {
      const fi = internal.getScaleFundamentalIndex();
      const root = fi + (editState.shiftEnabled ? state.rootNoteShift : 0);
      return state.scaleNoteNumbers[
        clampValue(root + pitch + editState.octaveShift * 7, 0, 83)
      ];
    },
  };

  const clockHandlers: ClockHandlers = {
    processStep(stepIndex, time, unitDuration) {
      const pos = stepIndex % editState.patternLength;
      const notes = editState.notes.filter((note) => note.position === pos);

      for (const note of notes) {
        const durationSec = note.duration * unitDuration * editState.stepDuty;
        const noteNumber = internal.getOutputNoteNumber(note.pitch);
        internal.playNote(noteNumber, time, durationSec);
      }
      listener?.onDisplayStepIndexChanged(stepIndex % 16);
    },
    stop() {
      listener?.onDisplayStepIndexChanged(-1);
    },
  };

  const noteInput: NoteInputPort = {
    noteOn(noteNumber) {
      const index = state.scaleNoteNumbers.indexOf(noteNumber);
      if (index !== -1) {
        const fi = internal.getScaleFundamentalIndex();
        state.rootNoteShift = index - fi;
      } else {
        state.rootNoteShift = 0;
      }
    },
    noteOff() {},
  };

  return {
    setState(attrs: Partial<SequencerEditState>) {
      Object.assign(editState, attrs);
    },
    setKey(keySpec: SongKeySpec) {
      state.keyMode = keySpec.mode;
      state.scaleNoteNumbers = createScaleNoteNumbers(keySpec.keyTranspose);
    },
    clockHandlers,
    noteInput,
    setListener(_listener: ISequencerListener | null) {
      listener = _listener;
    },
  };
}
