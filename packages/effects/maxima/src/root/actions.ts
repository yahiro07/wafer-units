import { EffectParameters } from "@/core/definitions";
import { store } from "@/root/store";

export const actions = {
  setParameter: <K extends keyof EffectParameters>(
    key: K,
    value: EffectParameters[K],
  ) => {
    store.patchParameters({ [key]: value });
  },
};
