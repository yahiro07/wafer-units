import { pitchPresets } from "@/defs/definitions";
import { store } from "@/root/store";
import { toggleBit } from "@/utils/bit-flag-helper";
import { fillNumbers } from "@/utils/helpers";

function remapStepNotes(
  stepNotes: number[],
  pitchesFrom: number[],
  pitchesTo: number[],
): number[] {
  return stepNotes.map((note) => {
    const index = pitchesFrom.indexOf(note);
    const normalizedValue = index / (pitchesFrom.length - 1);
    const newIndex = Math.round(normalizedValue * (pitchesTo.length - 1));
    return pitchesTo[newIndex];
  });
}

const actionsInternal = {
  setPitchPresetIndex(nextIndex: number) {
    const currentIndex = store.state.pitchPresetIndex;
    store.setPitchPresetIndex(nextIndex);
    const newNotes = remapStepNotes(
      store.state.stepNotes,
      pitchPresets[currentIndex],
      pitchPresets[nextIndex],
    );
    store.setStepNotes(newNotes);
  },
};

export const actions = {
  shiftPitchPreset() {
    const nextIndex = (store.state.pitchPresetIndex + 1) % pitchPresets.length;
    actionsInternal.setPitchPresetIndex(nextIndex);
    store.setPitchIndices(pitchPresets[nextIndex]);
  },
  randomizePitchPreset() {
    const nextIndex = Math.floor(Math.random() * pitchPresets.length);
    actionsInternal.setPitchPresetIndex(nextIndex);
  },
  randomizeStepNotes() {
    // const pitchPreset = pitchPresets[store.state.pitchPresetIndex];
    // const { stepNotes, stepModifierFlags } = randomizePattern(pitchPreset);
    // store.assign({ stepNotes, stepModifierFlags });
  },
  randomizePatterns() {
    if (!store.state.lockPitchPreset) {
      actions.randomizePitchPreset();
    }
    actions.randomizeStepNotes();
  },
  clearStepNotes() {
    store.assign({
      stepNotes: fillNumbers(16, -1),
      stepModifierFlags: fillNumbers(16, 0),
    });
  },
  setStepNote(stepIndex: number, pitch: number) {
    store.setStepNotes((prev) =>
      prev.map((n, i) => (i === stepIndex ? pitch : n)),
    );
  },
  toggleSlide(stepIndex: number) {
    store.setStepModifierFlags((prev) =>
      prev.map((flag, i) => (i === stepIndex ? toggleBit(flag, 0) : flag)),
    );
  },
  togglePitchIndex(pitchIndex: number) {
    const pitches = [...store.state.pitchIndices];
    const adding = !pitches.includes(pitchIndex);
    const len = pitches.length;
    if (adding) {
      if (len >= 6) {
        if (pitchIndex < 12) {
          pitches.pop();
        } else {
          pitches.shift();
        }
      }
    } else {
      if (len <= 1) return;
    }
    const newPitchIndices = adding
      ? [...pitches, pitchIndex]
      : pitches.filter((p) => p !== pitchIndex);
    newPitchIndices.sort((a, b) => a - b);
    store.setPitchIndices(newPitchIndices);
  },
  toggleAccent(stepIndex: number) {
    store.setStepModifierFlags((prev) =>
      prev.map((flag, i) => (i === stepIndex ? toggleBit(flag, 1) : flag)),
    );
  },
  toggleLockPitchPreset() {
    store.toggleLockPitchPreset();
  },
  setBpm(bpm: number) {
    store.setBpm(bpm);
  },
  togglePlayState() {
    store.toggleStandalonePlaying();
  },
  setPreviewNoteNumber(noteNumber: number) {
    store.setPreviewNoteNumber(noteNumber);
  },
};
