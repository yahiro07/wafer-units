import { SynthParameters } from "@/defs/definitions";

export type SynthesisBus = {
  audioContext: AudioContext;
  parameters: SynthParameters;
};

export function calcDecayTime(prDecay: number) {
  return prDecay ** 2 * 8 + 0.2;
}
