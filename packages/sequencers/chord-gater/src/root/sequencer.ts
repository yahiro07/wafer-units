import {
  ClockHandlers,
  NoteInputPort,
  UnitInterface,
} from "wafer-host/unit-types";
import { clampValue } from "@/utils/helpers";
import {
  defaultSequencerEditState,
  SequencerEditState,
} from "@/root/definitions";

const cMajorScaleNotes = [0, 2, 4, 5, 7, 9, 11];

function getNotePitch(
  relNote: number,
  rootNote: number,
  keyTranspose: number,
  octaveShift: number,
) {
  const octave = (relNote / 7) >>> 0;
  const subIndex = relNote % 7;
  return clampValue(
    rootNote +
      octave * 12 +
      cMajorScaleNotes[subIndex] +
      keyTranspose +
      octaveShift * 12,
    0,
    127,
  );
}

function getNoteStepLength(stepNotes: number[], startIndex: number) {
  let duration = 1;
  for (let i = startIndex + 1; i < stepNotes.length; i++) {
    if (stepNotes[i] === 2) {
      duration++;
    } else {
      break;
    }
  }
  return duration;
}

const toneIndexToRelNoteMap = [0, 4, 7, 11, 12, 16, 19, 23, 24];

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
    sentNotes: new Set<number>(),
    keyTranspose: 0,
    rootNoteNumber: 48,
    liveRootNoteLatest: -1,
  };
  let listener: ISequencerListener | null = null;

  const internal = {
    playNote(note: number, time: number, duration?: number) {
      if (state.sentNotes.has(note)) return;
      noteOutputPort?.noteOn(note, time);
      if (duration) {
        noteOutputPort?.noteOff(note, time + duration);
      }
      state.sentNotes.add(note);
    },
    stopNotes(time: number) {
      state.sentNotes.forEach((note) => {
        noteOutputPort?.noteOff(note, time);
      });
      state.sentNotes.clear();
    },
    triggerChord(time: number, duration?: number) {
      const notes = editState.chordEnabled
        ? (editState.chordToneFlags
            .map((flag, index) =>
              flag
                ? getNotePitch(
                    toneIndexToRelNoteMap[index],
                    state.rootNoteNumber,
                    state.keyTranspose,
                    editState.octaveShift,
                  )
                : undefined,
            )
            .filter(Boolean) as number[])
        : [state.rootNoteNumber];
      notes.forEach((note) => {
        internal.playNote(note, time, duration);
      });
    },
  };

  const clockHandlers: ClockHandlers = {
    processStep(stepIndex, time, unitDuration) {
      if (!editState.gaterEnabled) return;
      const pos = stepIndex % editState.patternLength;
      const stepNote = editState.stepNotes[pos];
      if (stepNote === 1) {
        const duration =
          getNoteStepLength(editState.stepNotes, pos) * unitDuration;
        internal.triggerChord(time, duration);
      } else if (stepNote === 0) {
        internal.stopNotes(time);
      }
      listener?.onDisplayStepIndexChanged(stepIndex % 16);
    },
    stop() {
      internal.stopNotes(0);
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
          internal.stopNotes(time);
        }
        internal.triggerChord(time);
        state.liveRootNoteLatest = noteNumber;
      }
    },
    noteOff(noteNumber, time) {
      time = Math.max(time ?? 0, audioContext?.currentTime ?? 0);
      if (noteNumber === state.liveRootNoteLatest) {
        internal.stopNotes(time);
        state.liveRootNoteLatest = -1;
      }
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
    noteInput,
    setListener(_listener: ISequencerListener | null) {
      listener = _listener;
    },
  };
}
