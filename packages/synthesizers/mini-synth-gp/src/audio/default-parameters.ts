import type { SynthParameters } from "@/audio/types";

export const defaultSynthParameters: SynthParameters = {
  oscWave: 0,
  oscDetune: 0,
  oscSub: 0,
  oscDrift: 0,
  fxChorus: 0,
  fxReverb: 0,
  filterCutoff: 0.9,
  filterPeak: 0,
  filterEnvMod: 0,
  ampDecay: 1,
  ampRelease: 0.2,
  ampMaster: 0.8,
};

export function cloneSynthParameters(
  source: SynthParameters = defaultSynthParameters,
): SynthParameters {
  return { ...source };
}
