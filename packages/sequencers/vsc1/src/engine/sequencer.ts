import { UnitInterface } from "wafer-host/unit-types";
import { clampValue } from "@/utils/helpers";
import {
  SequencerEditState,
  defaultSequencerEditState,
} from "@/defs/definitions";
import {
  ISequencer,
  ISequencerListener,
  ISynthesizer,
} from "@/defs/interfaces";

export function createSequencer(
  unitInterface: UnitInterface | undefined,
  synthesizer: ISynthesizer | undefined,
): ISequencer {
  const noteOutputPort = unitInterface?.createNoteOutputPort();

  const editState: SequencerEditState = structuredClone(
    defaultSequencerEditState,
  );

  let listener: ISequencerListener | null = null;

  let previewToneNoteNumber = -1;

  const internal = {
    emitPreviewTone(noteNumber: number, isOn: boolean) {
      const dest = noteOutputPort ?? synthesizer;
      if (isOn) {
        dest?.noteOn(noteNumber);
      } else {
        dest?.noteOff(noteNumber);
      }
    },
    playPreviewTone(noteNumber: number) {
      internal.stopPreviewTone();
      internal.emitPreviewTone(noteNumber, true);
      previewToneNoteNumber = noteNumber;
    },
    stopPreviewTone() {
      if (previewToneNoteNumber !== -1) {
        internal.emitPreviewTone(previewToneNoteNumber, false);
      }
    },
    playNote(note: number, time: number, duration: number) {
      const dest = noteOutputPort ?? synthesizer;
      if (dest) {
        dest.noteOn(note, time);
        dest.noteOff(note, time + duration);
      }
    },
    getOutputNoteNumber(pitch: number) {
      const shift = editState.octaveShift;
      return clampValue(48 + pitch + shift * 12, 0, 127);
    },
  };

  const stepShifts = {
    "16th": 0,
    "8th": 1,
    "4th": 2,
  };

  let prevStepIndex = -1;

  return {
    setState(attrs: Partial<SequencerEditState>) {
      Object.assign(editState, attrs);
    },
    start() {
      prevStepIndex = -1;
    },
    processStep(stepIndex, time, unitDuration) {
      const shift = stepShifts[editState.baseStep];
      stepIndex >>= shift;
      unitDuration *= 1 << shift;
      if (stepIndex !== prevStepIndex) {
        const pos = stepIndex % editState.patternLength;
        const notes = editState.notes.filter((note) => note.position === pos);
        for (const note of notes) {
          const duty = 0.2 + editState.stepDuty * 0.8;
          const durationSec = note.duration * unitDuration * duty;
          const noteNumber = internal.getOutputNoteNumber(note.pitch);
          internal.playNote(noteNumber, time, durationSec);
        }
        listener?.onPlayStepPositionChanged(stepIndex);
        prevStepIndex = stepIndex;
      }
    },
    stop() {
      listener?.onPlayStepPositionChanged(-1);
    },
    setListener(_listener) {
      listener = _listener;
    },
    setPreviewTone(pitchIndex: number) {
      if (pitchIndex !== -1) {
        const noteNumber = internal.getOutputNoteNumber(pitchIndex);
        internal.playPreviewTone(noteNumber);
      } else {
        internal.stopPreviewTone();
      }
    },
  };
}
