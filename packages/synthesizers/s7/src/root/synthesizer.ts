import { SynthParameters } from "@/root/definitions";

export function createSynthesizer(
  audioContext: AudioContext,
  initialParameters: SynthParameters,
) {
  const state: {
    parameters: SynthParameters;
  } = {
    parameters: initialParameters,
  };

  const outputNode = audioContext.createGain();

  // Apply parameters to audio nodes
  function applyParameters() {}

  // Apply initial parameters
  applyParameters();

  return {
    outputNode,
    setParameters(parameters: SynthParameters) {
      state.parameters = parameters;
      applyParameters();
    },
    noteOn(noteNumber: number, time: number) {},
    noteOff(noteNumber: number, time: number) {},
    cleanup() {},
  };
}
