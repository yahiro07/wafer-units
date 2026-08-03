import type { SynthParameterKey } from "@/audio/types";

export type ParameterDefinition = {
  key: SynthParameterKey;
  label: string;
  min: number;
  max: number;
  step: number;
};

export const leftColumnParameters: ParameterDefinition[] = [
  { key: "oscWave", label: "Wave", min: 0, max: 3, step: 1 },
  { key: "oscDetune", label: "Detune", min: 0, max: 1, step: 0.01 },
  { key: "oscSub", label: "Sub", min: 0, max: 1, step: 0.01 },
  { key: "oscDrift", label: "Drift", min: 0, max: 1, step: 0.01 },
  { key: "fxChorus", label: "Chorus", min: 0, max: 1, step: 0.01 },
  { key: "fxReverb", label: "Reverb", min: 0, max: 1, step: 0.01 },
];

export const rightColumnParameters: ParameterDefinition[] = [
  { key: "filterCutoff", label: "Cutoff", min: 0, max: 1, step: 0.01 },
  { key: "filterPeak", label: "Peak", min: 0, max: 1, step: 0.01 },
  { key: "filterEnvMod", label: "EnvMod", min: 0, max: 1, step: 0.01 },
  { key: "ampDecay", label: "Decay", min: 0, max: 1, step: 0.01 },
  { key: "ampRelease", label: "Release", min: 0, max: 1, step: 0.01 },
  { key: "ampMaster", label: "Master", min: 0, max: 1, step: 0.01 },
];
