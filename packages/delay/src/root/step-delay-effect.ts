import { EffectParameters } from "@/common/types";

export function createStepDelayEffect(audioContext: AudioContext) {
  const state = {
    bpm: 120,
    parameters: {
      rate: 16,
      feed: 0.5,
      mix: 0.5,
    } as EffectParameters,
  };
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();
  return {
    inputNode,
    outputNode,
    setParameters(parameters: EffectParameters) {
      state.parameters = parameters;
    },
    setBpm(bpm: number) {
      state.bpm = bpm;
    },
  };
}
