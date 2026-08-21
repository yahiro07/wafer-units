import { SynthParameters } from "@/defs/definitions";
import { store } from "@/root/store";

export const actions = {
  setParameter<K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ) {
    store.patchParameters({ [key]: value });
  },
  toggleBoolParameter<
    K extends "attackAltPunch" | "lpfSteep" | "pitchLfoAltPitchEg",
  >(key: K) {
    store.patchParameters({ [key]: !store.state.parameters[key] });
  },
  toggleOsc2Volume() {
    store.patchParameters({
      osc2Volume: store.state.parameters.osc2Volume === 0 ? 1 : 0,
    });
  },
  randomizeParameters() {},
};
