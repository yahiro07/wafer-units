import { createStore } from "solid-js/store";

export type SynthParameters = {
  oscWave: number; // 0, 1, 2 (saw, rect, pulse)
  oscDetune: number; // 0~1
  oscSub: number; // 0~1
  oscDrift: number; // 0~1
  fxChorus: number; // 0~1
  fxReverb: number; // 0~1
  filterCutoff: number; // 0~1
  filterPeak: number; // 0~1
  filterEnvMod: number; // 0~1
  ampDecay: number; // 0~1
  ampRelease: number; // 0~1
  masterVolume: number; // 0~1
};

export const PRESETS: Record<string, SynthParameters> = {
  Init: {
    oscWave: 0, oscDetune: 0, oscSub: 0, oscDrift: 0, fxChorus: 0, fxReverb: 0,
    filterCutoff: 1, filterPeak: 0, filterEnvMod: 0, ampDecay: 1, ampRelease: 0.1, masterVolume: 0.8
  },
  Bass1: {
    oscWave: 1, oscDetune: 0, oscSub: 0.8, oscDrift: 0, fxChorus: 0, fxReverb: 0,
    filterCutoff: 0.3, filterPeak: 0.5, filterEnvMod: 0.6, ampDecay: 0.3, ampRelease: 0.1, masterVolume: 0.8
  },
  Bass2: {
    oscWave: 0, oscDetune: 0.2, oscSub: 0.5, oscDrift: 0.1, fxChorus: 0.2, fxReverb: 0.1,
    filterCutoff: 0.4, filterPeak: 0.3, filterEnvMod: 0.4, ampDecay: 0.4, ampRelease: 0.1, masterVolume: 0.8
  },
  Lead1: {
    oscWave: 0, oscDetune: 0.3, oscSub: 0, oscDrift: 0.2, fxChorus: 0.1, fxReverb: 0.4,
    filterCutoff: 0.8, filterPeak: 0.4, filterEnvMod: 0.2, ampDecay: 1, ampRelease: 0.2, masterVolume: 0.8
  },
  Lead2: {
    oscWave: 2, oscDetune: 0, oscSub: 0, oscDrift: 0.1, fxChorus: 0.3, fxReverb: 0.5,
    filterCutoff: 0.7, filterPeak: 0.6, filterEnvMod: 0.4, ampDecay: 0.5, ampRelease: 0.4, masterVolume: 0.8
  },
  Pad1: {
    oscWave: 0, oscDetune: 0.8, oscSub: 0.2, oscDrift: 0.5, fxChorus: 0.8, fxReverb: 0.8,
    filterCutoff: 0.6, filterPeak: 0.2, filterEnvMod: 0.2, ampDecay: 1, ampRelease: 0.8, masterVolume: 0.8
  },
  Pad2: {
    oscWave: 1, oscDetune: 0.5, oscSub: 0.4, oscDrift: 0.8, fxChorus: 0.5, fxReverb: 0.9,
    filterCutoff: 0.4, filterPeak: 0.1, filterEnvMod: 0.2, ampDecay: 1, ampRelease: 0.9, masterVolume: 0.8
  }
};

export const PRESET_NAMES = Object.keys(PRESETS);

export type AppState = {
  presetName: string;
  parameters: SynthParameters;
};

export const [appState, setAppState] = createStore<AppState>({
  presetName: "Init",
  parameters: { ...PRESETS["Init"] }
});

export const uiActions = {
  setPreset(name: string) {
    if (PRESETS[name]) {
      setAppState({
        presetName: name,
        parameters: { ...PRESETS[name] }
      });
    }
  },
  shiftPreset(dir: 1 | -1) {
    const idx = PRESET_NAMES.indexOf(appState.presetName);
    const nextIdx = (idx + dir + PRESET_NAMES.length) % PRESET_NAMES.length;
    this.setPreset(PRESET_NAMES[nextIdx]);
  },
  setParameter<K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K]
  ) {
    setAppState("parameters", key, value);
  }
};
