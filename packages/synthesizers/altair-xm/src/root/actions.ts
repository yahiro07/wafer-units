import {
  BoolParameterKeys,
  defaultSynthParameters,
  FilterType,
  SynthParameters,
} from "@/defs/definitions";
import { allPresets } from "@/defs/presets";
import { createRandomParameters } from "@/root/randomizer";
import { allPresetKeys, store } from "@/root/store";
import { pickObjectMembers } from "@/utils/helpers";

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
  shiftFilterType() {
    const currentType = store.state.parameters.filter1Type;
    const nextType =
      currentType === FilterType.LP24 ? FilterType.LP12 : FilterType.LP24;
    actions.setParameter("filter1Type", nextType);
  },
  setPreset(presetKey: string) {
    const preset = allPresets[presetKey];
    if (preset) {
      store.setPresetKey(presetKey);
      const data = JSON.parse(preset) as SynthParameters;
      const attrs = pickObjectMembers(
        data,
        Object.keys(defaultSynthParameters) as (keyof SynthParameters)[],
      );
      store.patchParameters(attrs);
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
    const jsonText =
      "`" +
      JSON.stringify(attrs).replaceAll(
        /\.(\d+)/g,
        (_match, digits: string) => "." + digits.slice(0, 2),
      ) +
      "`,\n";
    await navigator.clipboard.writeText(jsonText);
    console.log("Preset data copied to clipboard");
  },
};
