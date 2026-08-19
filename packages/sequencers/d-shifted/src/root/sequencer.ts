import {
  ClockHandlers,
  NoteInputPort,
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

function getNoteStepLength(
  stepNotes: number[],
  startIndex: number,
  patternLength: number,
) {
  let duration = 1;
  for (let i = startIndex + 1; i < patternLength; i++) {
    if (stepNotes[i] === 2) {
      duration++;
    } else {
      break;
    }
  }
  return duration;
}

const toneIndexToScaleRelNoteMap = [0, 2, 4, 6, 7, 9, 11, 13, 14];

export type ISequencerListener = {
  onDisplayStepIndexChanged(stepIndex: number): void;
};

export function createSequencer(unitInterface: UnitInterface | undefined) {
  const noteOutputPort = unitInterface?.createNoteOutputPort();
  const audioContext = unitInterface?.audioContext;

  const editState: SequencerEditState = structuredClone(
    defaultSequencerEditState,
  );

  const state = {
    scaleNoteNumbers: createScaleNoteNumbers(0),
    sentNotes: new Set<number>(),
    rootNoteNumber: 48,
    liveRootNoteLatest: -1,
  };
  let listener: ISequencerListener | null = null;

  const internal = {
    playSequencerNote(note: number, time: number, duration: number) {
      noteOutputPort?.noteOn(note, time);
      noteOutputPort?.noteOff(note, time + duration);
    },
    playLiveNote(note: number, time: number) {
      if (state.sentNotes.has(note)) return;
      noteOutputPort?.noteOn(note, time);
      state.sentNotes.add(note);
    },
    stopLiveNotes(time: number) {
      state.sentNotes.forEach((note) => {
        noteOutputPort?.noteOff(note, time);
      });
      state.sentNotes.clear();
    },
    getChordTone(rootNote: number, scaleRel: number) {
      const { scaleNoteNumbers } = state;
      const { octaveShift } = editState;
      const rootIndex = scaleNoteNumbers.indexOf(rootNote);
      if (rootIndex < 0) return rootNote + octaveShift * 12;
      return scaleNoteNumbers[
        clampValue(rootIndex + scaleRel + octaveShift * 7, 0, 83)
      ];
    },
    getChordNotes() {
      if (editState.chordEnabled) {
        return editState.chordToneFlags
          .map((flag, index) => {
            if (flag) {
              const scaleRel = toneIndexToScaleRelNoteMap[index];
              return internal.getChordTone(state.rootNoteNumber, scaleRel);
            }
            return undefined;
          })
          .filter(Boolean) as number[];
      } else {
        return [state.rootNoteNumber + editState.octaveShift * 12];
      }
    },
  };

  const clockHandlers: ClockHandlers = {
    processStep(stepIndex, time, unitDuration) {
      if (!editState.gaterEnabled) return;
      const pos = stepIndex % editState.patternLength;
      const stepNote = editState.stepNotes[pos];
      if (stepNote === 1) {
        const duration =
          getNoteStepLength(editState.stepNotes, pos, editState.patternLength) *
          unitDuration *
          editState.stepDuty;
        const notes = internal.getChordNotes();
        notes.forEach((note) => {
          internal.playSequencerNote(note, time, duration);
        });
      }
      listener?.onDisplayStepIndexChanged(stepIndex % 16);
    },
    stop() {
      listener?.onDisplayStepIndexChanged(-1);
    },
  };

  const noteInput: NoteInputPort = {
    noteOn(noteNumber, time) {
      time = Math.max(time ?? 0, audioContext?.currentTime ?? 0);
      state.rootNoteNumber = noteNumber;
      if (!editState.gaterEnabled) {
        if (
          state.liveRootNoteLatest !== -1 &&
          noteNumber !== state.liveRootNoteLatest
        ) {
          internal.stopLiveNotes(time);
        }
        const notes = internal.getChordNotes();
        notes.forEach((note) => {
          internal.playLiveNote(note, time);
        });
        state.liveRootNoteLatest = noteNumber;
      }
    },
    noteOff(noteNumber, time) {
      time = Math.max(time ?? 0, audioContext?.currentTime ?? 0);
      if (noteNumber === state.liveRootNoteLatest) {
        internal.stopLiveNotes(time);
        state.liveRootNoteLatest = -1;
      }
    },
  };

  return {
    setState(attrs: Partial<SequencerEditState>) {
      Object.assign(editState, attrs);
    },
    setKeyTranspose(keyTranspose: number) {
      state.scaleNoteNumbers = createScaleNoteNumbers(keyTranspose);
    },
    clockHandlers,
    noteInput,
    setListener(_listener: ISequencerListener | null) {
      listener = _listener;
    },
  };
}
