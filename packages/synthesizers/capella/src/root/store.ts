import { defaultSynthParameters, SynthParameters } from "@/defs/definitions";
import { createStore } from "snap-store";

export const store = createStore<{
  parameters: SynthParameters;
  viewActive: boolean;
}>({
  parameters: { ...defaultSynthParameters },
  viewActive: false,
});
