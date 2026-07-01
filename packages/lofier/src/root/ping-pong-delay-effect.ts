import { EffectParameters } from "@/common/types";

export function createLofierEffect(
  audioContext: AudioContext,
  initialParameters: EffectParameters,
) {
  const state: {
    parameters: EffectParameters;
  } = {
    parameters: initialParameters,
  };

  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();

  function applyParameters() {}

  applyParameters();

  return {
    inputNode,
    outputNode,
    setParameters(parameters: EffectParameters) {
      state.parameters = parameters;
      applyParameters();
    },
  };
}
