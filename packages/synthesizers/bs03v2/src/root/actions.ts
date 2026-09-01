import {
  BoolParameterKeys,
  pitchPresets,
  SynthParameters,
} from "@/defs/definitions";
import {
  generateRandomParameters,
  generateRandomStepPattern,
} from "@/root/randomizer";
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
  setPitchPresetIndex(nextIndex: number, remapNotes: boolean) {
    const currentIndex = store.state.pitchPresetIndex;
    store.setPitchPresetIndex(nextIndex);
    store.setPitchIndices(pitchPresets[nextIndex]);
    if (remapNotes) {
      const newNotes = remapStepNotes(
        store.state.stepNotes,
        pitchPresets[currentIndex],
        pitchPresets[nextIndex],
      );
      store.setStepNotes(newNotes);
    }
  },
};

export const actions = {
  shiftPitchPreset() {
    const nextIndex = (store.state.pitchPresetIndex + 1) % pitchPresets.length;
    actionsInternal.setPitchPresetIndex(nextIndex, true);
  },
  randomizeParameters() {
    const parameters = generateRandomParameters();
    store.setSynthParameters(parameters);
  },
  randomizePatterns() {
    if (!store.state.lockPitchPreset) {
      const nextIndex = Math.floor(Math.random() * pitchPresets.length);
      actionsInternal.setPitchPresetIndex(nextIndex, false);
    }
    const { stepNotes, stepModifierFlags } = generateRandomStepPattern(
      store.state.pitchIndices,
    );
    store.assign({ stepNotes, stepModifierFlags });
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
  setSynthParameter(key: keyof SynthParameters, value: number) {
    store.patchSynthParameters({ [key]: value });
  },
  setBpm(bpm: number) {
    store.setBpm(bpm);
  },
  togglePlayState() {
    store.toggleStandalonePlaying();
  },
  setParameter<K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ) {
    store.patchSynthParameters({ [key]: value });
  },
  setBoolParameter<K extends BoolParameterKeys>(key: K, value: boolean) {
    store.patchSynthParameters({ [key]: value });
  },
  toggleBoolParameter<K extends BoolParameterKeys>(key: K) {
    store.patchSynthParameters({ [key]: !store.state.synthParameters[key] });
  },
  // setPreset(presetKey: string) {
  //   const preset = allPresets[presetKey];
  //   if (preset) {
  //     store.setPresetKey(presetKey);
  //     store.patchSynthParameters(preset);
  //   }
  // },
  // shiftPreset(dir: 1 | -1) {
  //   const idx = allPresetKeys.indexOf(store.state.presetKey);
  //   const nextIdx = (idx + dir + allPresetKeys.length) % allPresetKeys.length;
  //   actions.setPreset(allPresetKeys[nextIdx]);
  // },
  async emitPresetData() {
    const { ...attrs } = store.state.synthParameters;
    const jsonText = JSON.stringify(attrs, null, 2).replaceAll(
      /\.(\d+)/g,
      (_match, digits: string) => "." + digits.slice(0, 2),
    );
    await navigator.clipboard.writeText(jsonText);
    console.log("Preset data copied to clipboard");
  },
};
