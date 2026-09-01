import { SynthParameters } from "@/defs/definitions";
import { power2 } from "@/utils/synth-math-utils";

export type SynthesisBus = {
  audioContext: AudioContext;
  parameters: SynthParameters;
};

export function calcDecayTime(prDecay: number) {
  return power2(prDecay) * 8 + 0.2;
}
