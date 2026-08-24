import { BoolParameterKeys, SynthParameters } from "@/defs/definitions";
import { store } from "@/root/store";

export const actions = {
  patchParameter<K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ) {
    store.patchParameters({ [key]: value });
  },
  toggleBoolParameter(key: BoolParameterKeys) {
    store.patchParameters({ [key]: !store.state.parameters[key] });
  },
};
