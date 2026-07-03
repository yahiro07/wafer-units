import { EffectParameters } from "./definitions";

export function createEffect(
  audioContext: AudioContext,
  initialParameters: EffectParameters,
) {
  const state = {
    parameters: { ...initialParameters },
  };
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();

  function applyParameters() {}

  applyParameters();

  return {
    inputNode,
    outputNode,
    setParameters(parameters: EffectParameters) {
      state.parameters = { ...parameters };
      applyParameters();
    },
  };
}
