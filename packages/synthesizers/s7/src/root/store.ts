import { createStore } from "snap-store";
import { defaultSynthParameters, SynthParameters } from "@/root/synth-common";

export const store = createStore<{
  parameters: SynthParameters;
}>({
  parameters: defaultSynthParameters,
});
