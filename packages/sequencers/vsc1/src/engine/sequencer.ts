import {
  defaultSequencerEditState,
  SequencerEditState,
} from "@/defs/definitions";
import {
  ISequencer,
  ISequencerListener,
  ISynthesizer,
} from "@/defs/interfaces";
import { UnitInterface } from "wafer-host/unit-types";

export function createSequencer(
  unitInterface: UnitInterface | undefined,
  synthesizer: ISynthesizer,
  audioContext: AudioContext,
): ISequencer {
  const editState: SequencerEditState = structuredClone(
    defaultSequencerEditState,
  );
  let listener: ISequencerListener | null;
  let noteLatest = -1;
  let keyTranspose = 0;

  const internal = {
    playNote(note: number, time: number) {
      synthesizer.noteOn(note, time);
      noteLatest = note;
    },
    stopNote(time: number) {
      if (noteLatest !== -1) {
        synthesizer.noteOff(noteLatest, time);
        noteLatest = -1;
      }
    },
  };

  return {
    patchEditState(attrs) {
      Object.assign(editState, attrs);
    },
    setListener(_listener) {
      listener = _listener;
      return () => (listener = null);
    },
    start() {},
    step(inputStepIndex, time, _unitDuration) {
      const es = editState;
      const stepIndex = inputStepIndex % 16;
      const pitch = es.stepNotes[stepIndex];
      if (pitch !== undefined) {
        const note = pitch + 33 + keyTranspose;
        internal.playNote(note, time);
      } else {
        internal.stopNote(time);
      }
      listener?.setPlayPosition(stepIndex);
    },
    stop() {
      internal.stopNote(audioContext.currentTime);
    },
    setKeyTranspose(_keyTranspose: number) {
      keyTranspose = _keyTranspose;
    },
    cleanup() {},
  };
}
