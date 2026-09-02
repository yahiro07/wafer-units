import { SynthParameters } from "@/defs/definitions";

export type SynthesisBus = {
  audioContext: AudioContext;
  parameters: SynthParameters;
};

export function calcDecayTime(prDecay: number, accent: boolean) {
  let decayTime = prDecay * 6 + 0.1;
  if (accent) {
    decayTime *= 0.5;
  }
  return decayTime;
}
