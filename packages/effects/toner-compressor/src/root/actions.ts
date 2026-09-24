import { EffectParameters } from "@/core/definitions";
import { analyzerEngine } from "@/core/engine-instances";
import { store } from "@/root/store";

export const actions = {
  setParameter: <K extends keyof EffectParameters>(
    key: K,
    value: EffectParameters[K],
  ) => {
    store.patchParameters({ [key]: value });
  },
  toggleMetersLayout() {
    store.toggleAltMetersLayout();
  },
  setBarLength(barLength: number) {
    store.setBarLength(barLength);
    analyzerEngine.setBarLength(barLength);
  },
};
