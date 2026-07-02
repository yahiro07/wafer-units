import {
  allPresetNames,
  allPresets,
  appState,
  SynthParameters,
  setAppState,
} from "@/store/store";

export const uiActions = {
  setPreset(name: string) {
    if (allPresets[name]) {
      setAppState({
        presetName: name,
        parameters: { ...allPresets[name] },
      });
    }
  },
  shiftPreset(dir: 1 | -1) {
    const idx = allPresetNames.indexOf(appState.presetName);
    const nextIdx = (idx + dir + allPresetNames.length) % allPresetNames.length;
    this.setPreset(allPresetNames[nextIdx]);
  },
  setParameter<K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ) {
    setAppState("parameters", key, value);
  },
};
