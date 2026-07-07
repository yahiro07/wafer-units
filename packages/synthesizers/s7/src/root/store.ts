import { createStore } from "snap-store";
import { defaultSynthParameters, SynthParameters } from "@/root/definitions";

export const store = createStore<{
  parameters: SynthParameters;
}>({
  parameters: defaultSynthParameters,
});
