import { SamplerParameters } from "@/core/definitions";
import { store } from "@/root/store";

export const actions = {
  setParameter: <K extends keyof SamplerParameters>(
    key: K,
    value: SamplerParameters[K],
  ) => {
    store.patchParameters({ [key]: value });
  },
};
