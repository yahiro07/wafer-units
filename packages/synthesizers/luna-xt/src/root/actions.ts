import { BoolParameterKeys, OscId, SynthParameters } from "@/defs/definitions";
import { allPresets } from "@/defs/presets";
import { createRandomParameters } from "@/root/randomizer";
import { allPresetKeys, store } from "@/root/store";

export const actions = {
  setParameter<K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ) {
    store.patchParameters({ [key]: value });
  },
  setBoolParameter<K extends BoolParameterKeys>(key: K, value: boolean) {
    store.patchParameters({ [key]: value });
  },
  toggleBoolParameter<K extends BoolParameterKeys>(key: K) {
    store.patchParameters({ [key]: !store.state.parameters[key] });
  },
  shiftOscMix(oscId: OscId) {
    const mix = store.state.parameters[`${oscId}Mix`];
    store.patchParameters({ [`${oscId}Mix`]: (mix + 1) % 3 });
  },
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
