import { SynthParameters } from "@/defs/definitions";

export type SynthesisBus = {
  audioContext: AudioContext;
  parameters: SynthParameters;
};

export function calcDecayTime(prDecay: number) {
  return prDecay * 6 + 0.2;
}
