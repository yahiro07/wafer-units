import { createStore } from "solid-js/store";
import type { AudioEngine } from "@/audio/audio-engine";
import { createAudioEngine } from "@/audio/audio-engine";
import type { SynthParams } from "@/audio/synth-params";
import { defaultParams, presetNames, presets } from "@/audio/synth-params";

interface AppState {
  currentPresetIndex: number;
  parameters: SynthParams;
}

const [appState, setAppState] = createStore<AppState>({
  currentPresetIndex: 0,
  parameters: { ...defaultParams },
});

let audioEngine: AudioEngine | null = null;

// Lazy engine creation: AudioContext is created on first noteOn
function ensureEngine(): AudioEngine {
  if (!audioEngine) {
    audioEngine = createAudioEngine();
    audioEngine.updateParams(appState.parameters);
  }
  return audioEngine;
}

export { appState };

export const uiActions = {
  setParameter<K extends keyof SynthParams>(
    key: K,
    value: SynthParams[K],
  ): void {
    setAppState("parameters", (prev) => ({ ...prev, [key]: value }));
    audioEngine?.updateParams(appState.parameters);
  },

  selectPreset(index: number): void {
    const name = presetNames[index];
    const preset = presets[name];
    if (!preset) return;
    setAppState("currentPresetIndex", index);
    setAppState("parameters", { ...preset });
    audioEngine?.updateParams(preset);
  },

  prevPreset(): void {
    const newIndex =
      (appState.currentPresetIndex - 1 + presetNames.length) %
      presetNames.length;
    uiActions.selectPreset(newIndex);
  },

  nextPreset(): void {
    const newIndex = (appState.currentPresetIndex + 1) % presetNames.length;
    uiActions.selectPreset(newIndex);
  },

  noteOn(note: number, velocity: number): void {
    ensureEngine().noteOn(note, velocity);
  },

  noteOff(note: number): void {
    audioEngine?.noteOff(note);
  },

  loadState(state: AppState) {
    setAppState("currentPresetIndex", state.currentPresetIndex);
    setAppState("parameters", state.parameters);
    audioEngine?.updateParams(state.parameters);
  },
};
