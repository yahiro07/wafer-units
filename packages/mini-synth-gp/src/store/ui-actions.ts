import {
  createMiniSynthAudio,
  hostInterface,
} from "@/audio/create-mini-synth-audio";
import { cloneSynthParameters } from "@/audio/default-parameters";
import { programPresets } from "@/audio/presets";
import { SynthParameterKey, SynthParameters } from "@/audio/types";
import { appState, setAppState } from "@/store/app-store";
import { persistence } from "@/store/persistence";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";

const synthAudio = createMiniSynthAudio();
let initialized = false;
export const uiActions = {
  initialize() {
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
        persistence,
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
  },
  setParameter(key: SynthParameterKey, value: number) {
    const nextValue = key === "oscWave" ? Math.round(value) : value;
    setAppState("parameters", key, nextValue);
    synthAudio.updateParameters(appState.parameters);
  },
  applyPresetByIndex(index: number) {
    const clampedIndex =
      (index + programPresets.length) % programPresets.length;
    const preset = programPresets[clampedIndex];
    setAppState("selectedProgramIndex", clampedIndex);
    setAppState("parameters", cloneSynthParameters(preset.parameters));
    synthAudio.updateParameters(appState.parameters);
  },
  shiftProgram(step: number) {
    uiActions.applyPresetByIndex(appState.selectedProgramIndex + step);
  },
  resumeAudio() {
    void synthAudio.audioContext.resume();
  },
  allNotesOff() {
    synthAudio.allNotesOff();
  },
  loadStates(state: {
    selectedProgramIndex: number;
    parameters: SynthParameters;
  }) {
    setAppState("selectedProgramIndex", state.selectedProgramIndex);
    setAppState("parameters", cloneSynthParameters(state.parameters));
    synthAudio.updateParameters(state.parameters);
  },
};
