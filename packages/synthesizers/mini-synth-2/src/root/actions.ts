import { SynthParameters } from "@/core/definitions";
import { allPresets } from "@/core/presets";
import { allPresetKeys, store } from "@/root/store";

export const actions = {
  setPreset(presetKey: string) {
    const preset = allPresets[presetKey];
    if (preset) {
      store.assign({ presetKey, parameters: preset });
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
  randomizeParameters() {
    //todo
  },
};
