import { SynthParameters } from "@/defs/definitions";
import { power2 } from "@/utils/synth-math-utils";

export type SynthesisBus = {
  audioContext: AudioContext;
  parameters: SynthParameters;
};

export function calcDecayTime(prDecay: number, accent: boolean) {
  let decayTime = power2(prDecay) * 6 + 0.1;
  if (accent) {
    decayTime *= 0.5;
  }
  return decayTime;
}
