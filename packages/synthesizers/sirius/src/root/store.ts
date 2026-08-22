import { SynthParameters, defaultSynthParameters } from "@/core/definitions";
import { allPresets } from "@/core/presets";
import { createStore } from "snap-store";

export const allPresetKeys = Object.keys(allPresets);

export const store = createStore<{
  parameters: SynthParameters;
  presetKey: string;
}>({
  parameters: defaultSynthParameters,
  presetKey: "Init",
});
