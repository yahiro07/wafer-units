import { SynthParameters } from "@/store/store";

export function createReverb(context: AudioContext) {
  const inputNode = context.createGain();
  const outputNode = context.createGain();

  const dryGain = context.createGain();
  const wetGain = context.createGain();

  const convolver = context.createConvolver();

  // Simple impulse response
  const length = 2.0;
  const sampleRate = context.sampleRate;
  const buffer = context.createBuffer(2, sampleRate * length, sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < buffer.length; i++) {
      const decay = Math.exp((-i / (sampleRate * length)) * 5);
      data[i] = (Math.random() * 2 - 1) * decay;
    }
  }
  convolver.buffer = buffer;

  inputNode.connect(dryGain);
  inputNode.connect(convolver);
  convolver.connect(wetGain);

  dryGain.connect(outputNode);
  wetGain.connect(outputNode);

  return {
    inputNode,
    outputNode,
    updateNodeParameters(params: SynthParameters) {
      const amount = params.fxReverb;
      wetGain.gain.value = amount;
      dryGain.gain.value = 1 - amount * 0.5;
    },
  };
}
