import { SongKeySpec, UnitInterface } from "wafer-host/unit-types";
import { clampValue, seqNumbers } from "@/utils/helpers";
import {
  SequencerEditState,
  defaultSequencerEditState,
} from "@/defs/definitions";
import {
  ISequencer,
  ISequencerListener,
  ISynthesizer,
} from "@/defs/interfaces";

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

export function createSequencer(
  unitInterface: UnitInterface | undefined,
  synthesizer: ISynthesizer | undefined,
): ISequencer {
  const noteOutputPort = unitInterface?.createNoteOutputPort();

  const editState: SequencerEditState = structuredClone(
    defaultSequencerEditState,
  );

  const state = {
    scaleNoteNumbers: createScaleNoteNumbers(-3, "minor"), //default Am
    inputRootNoteNumber: -1,
  };
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
      noteOutputPort?.noteOn(note, time);
      noteOutputPort?.noteOff(note, time + duration);
    },
    getShiftingRootIndex() {
      if (editState.shiftEnabled && state.inputRootNoteNumber !== -1) {
        const index = state.scaleNoteNumbers.indexOf(state.inputRootNoteNumber);
        if (index !== -1) return index - 7;
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

  return {
    setState(attrs: Partial<SequencerEditState>) {
      Object.assign(editState, attrs);
    },
    setKey(keySpec: SongKeySpec) {
      const { root, mode } = keySpec;
      state.scaleNoteNumbers = createScaleNoteNumbers(root, mode);
    },
    start() {},
    processStep(stepIndex, time, unitDuration) {
      const shift = editState.baseStep === "8th" ? 1 : 0;
      stepIndex >>= shift;
      const pos = stepIndex % editState.patternLength;
      const notes = editState.notes.filter((note) => note.position === pos);
      const root = internal.getShiftingRootIndex();
      for (const note of notes) {
        const duty = 0.2 + editState.stepDuty * 0.8;
        const durationSec = note.duration * unitDuration * duty;
        const noteNumber = internal.getOutputNoteNumber(root, note.pitch);
        internal.playNote(noteNumber, time, durationSec);
      }
      listener?.onPlayStepPositionChanged(stepIndex);
    },
    stop() {
      listener?.onPlayStepPositionChanged(-1);
    },
    setListener(_listener) {
      listener = _listener;
    },
    setPreviewTone(pitchIndex: number) {
      if (pitchIndex !== -1) {
        const root = internal.getShiftingRootIndex();
        const noteNumber = internal.getOutputNoteNumber(root, pitchIndex);
        internal.playPreviewTone(noteNumber);
      } else {
        internal.stopPreviewTone();
      }
    },
  };
}
