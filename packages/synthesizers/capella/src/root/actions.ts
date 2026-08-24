import {
  BoolParameterKeys,
  defaultSynthParameters,
  SynthParameters,
} from "@/defs/definitions";
import { createRandomParameters } from "@/root/randomizer";
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
  resetParameters() {
    store.patchParameters(defaultSynthParameters);
  },
  randomizeParameters() {
    store.patchParameters(createRandomParameters());
  },
  async copyParametersToClipboard() {
    const { ...attrs } = store.state.parameters;
    const jsonText = JSON.stringify(attrs, null, 2).replaceAll(
      /\.(\d+)/g,
      (_match, digits: string) => "." + digits.slice(0, 2),
    );
    await navigator.clipboard.writeText(jsonText);
    console.log("Preset data copied to clipboard");
  },
};
