import { SynthParameters } from "@/defs/definitions";
import { allPresets } from "@/defs/presets";
import { createRandomParameters } from "@/root/randomizer";
import { allPresetKeys, store } from "@/root/store";

export const actions = {
  setPreset(presetKey: string) {
    const preset = allPresets[presetKey];
    if (preset) {
      store.setPresetKey(presetKey);
      store.patchParameters(preset);
    }
  },
  shiftPreset(dir: 1 | -1) {
    const idx = allPresetKeys.indexOf(store.state.presetKey);
    const nextIdx = (idx + dir + allPresetKeys.length) % allPresetKeys.length;
    actions.setPreset(allPresetKeys[nextIdx]);
  },
  setParameter<K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ) {
    store.patchParameters({ [key]: value });
  },
  toggleBoolParameter<K extends "sub">(key: K) {
    store.patchParameters({ [key]: !store.state.parameters[key] });
  },
  toggleShapeEnvRange() {
    const next = store.state.parameters.envRange === 1 ? 0 : 1;
    store.patchParameters({ envRange: next });
  },
  randomizeParameters() {
    const paramAttrs = createRandomParameters();
    store.patchParameters(paramAttrs);
  },
  async emitPresetData() {
    const { ...attrs } = store.state.parameters;
    const jsonText = JSON.stringify(attrs, null, 2).replaceAll(
      /\.(\d+)/g,
      (_match, digits: string) => "." + digits.slice(0, 2),
    );
    await navigator.clipboard.writeText(jsonText);
    console.log("Preset data copied to clipboard");
  },
};
