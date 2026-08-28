import {
  defaultSynthParameters,
  SynthPresetParameters,
} from "@/defs/definitions";

export const allPresets: Record<string, SynthPresetParameters> = {
  init: {
    ...defaultSynthParameters,
  },
};
