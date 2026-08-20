import { defaultSynthParameters, SynthParameters } from "@/root/definitions";
import { createStore } from "snap-store";

export const store = createStore<{
  parameters: SynthParameters;
}>({
  parameters: defaultSynthParameters,
});
