import { SynthParameters } from "@/root/definitions";
import { store } from "@/root/store";

export const actions = {
  setParameter<K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ) {
    store.patchParameters({ [key]: value });
  },
  randomizeParameters() {},
};
