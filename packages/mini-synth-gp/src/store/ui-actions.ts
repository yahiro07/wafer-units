import {
  createMiniSynthAudio,
  hostInterface,
} from "@/audio/create-mini-synth-audio";
import { cloneSynthParameters } from "@/audio/default-parameters";
import { programPresets } from "@/audio/presets";
import { SynthParameterKey } from "@/audio/types";
import { appState, setAppState } from "@/store/app-store";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";

const synthAudio = createMiniSynthAudio();

let initialized = false;

function initialize() {
  if (initialized) return;
  initialized = true;

  synthAudio.updateParameters(appState.parameters);

  if (hostInterface) {
    hostInterface.setupUnitAgent({
      type: "instrument",
      categoryHint: "synthesizer",
      noteInput: {
        async noteOn(noteNumber) {
          await synthAudio.audioContext.resume();
          synthAudio.noteOn(noteNumber, 1);
        },
        noteOff(noteNumber) {
          synthAudio.noteOff(noteNumber);
        },
      },
    });
  } else {
    return setupMidiKeyboardInput({
      connectionStateCallback(connected) {
        setAppState("midiConnected", connected);
      },
      noteOn(noteNumber, velocity) {
        void synthAudio.audioContext.resume();
        synthAudio.noteOn(noteNumber, velocity);
      },
      noteOff(noteNumber) {
        synthAudio.noteOff(noteNumber);
      },
    });
  }
}

function applyPresetByIndex(index: number) {
  const clampedIndex = (index + programPresets.length) % programPresets.length;
  const preset = programPresets[clampedIndex];
  setAppState("selectedProgramIndex", clampedIndex);
  setAppState("parameters", cloneSynthParameters(preset.parameters));
  synthAudio.updateParameters(appState.parameters);
}

function setParameter(key: SynthParameterKey, value: number) {
  const nextValue = key === "oscWave" ? Math.round(value) : value;
  setAppState("parameters", key, nextValue);
  synthAudio.updateParameters(appState.parameters);
}

export const uiActions = {
  initialize,
  setParameter,
  selectProgramByIndex(index: number) {
    applyPresetByIndex(index);
  },
  shiftProgram(step: number) {
    applyPresetByIndex(appState.selectedProgramIndex + step);
  },
  resumeAudio() {
    void synthAudio.audioContext.resume();
  },
  allNotesOff() {
    synthAudio.allNotesOff();
  },
};
