import { createStore } from "solid-js/store";
import { createMiniSynthAudio, hostInterface } from "@/audio/create-mini-synth-audio";
import {
  cloneSynthParameters,
  DEFAULT_SYNTH_PARAMETERS,
} from "@/audio/default-parameters";
import { PROGRAM_PRESETS } from "@/audio/presets";
import type { SynthParameterKey, SynthParameters } from "@/audio/types";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";

const synthAudio = createMiniSynthAudio();

type AppState = {
  selectedProgramIndex: number;
  midiConnected: boolean;
  parameters: SynthParameters;
};

const [appState, setAppState] = createStore<AppState>({
  selectedProgramIndex: 0,
  midiConnected: false,
  parameters: cloneSynthParameters(DEFAULT_SYNTH_PARAMETERS),
});

let initialized = false;

function initialize() {
  if (initialized) return;
  initialized = true;

  synthAudio.updateParameters(appState.parameters);

  if(hostInterface){
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
    })
  }else{
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
  const clampedIndex =
    (index + PROGRAM_PRESETS.length) % PROGRAM_PRESETS.length;
  const preset = PROGRAM_PRESETS[clampedIndex];
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

export { appState };
