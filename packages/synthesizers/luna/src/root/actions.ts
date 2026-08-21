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
  randomizeParameters() {},
};
