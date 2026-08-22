import { SynthParameters, defaultSynthParameters } from "@/defs/definitions";
import { allPresets } from "@/defs/presets";
import { createStore } from "snap-store";

export const allPresetKeys = Object.keys(allPresets);

export const store = createStore<{
  parameters: SynthParameters;
  presetKey: string;
}>({
  parameters: defaultSynthParameters,
  presetKey: "init",
});
