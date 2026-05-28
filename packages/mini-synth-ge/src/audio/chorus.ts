import { SynthParameters } from "@/store";

export function createChorus(context: AudioContext) {
  const inputNode = context.createGain();
  const outputNode = context.createGain();

  const dryGain = context.createGain();
  const wetGain = context.createGain();

  const delay = context.createDelay();
  delay.delayTime.value = 0.02; // 20ms base

  const lfo = context.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 1.5; // 1.5 Hz
  const lfoGain = context.createGain();
  lfoGain.gain.value = 0.005; // 5ms deviation

  lfo.connect(lfoGain);
  lfoGain.connect(delay.delayTime);
  lfo.start();

  inputNode.connect(dryGain);
  inputNode.connect(delay);
  delay.connect(wetGain);

  dryGain.connect(outputNode);
  wetGain.connect(outputNode);

  return {
    inputNode,
    outputNode,
    updateNodeParameters(params: SynthParameters) {
      const amount = params.fxChorus;
      wetGain.gain.value = amount;
      dryGain.gain.value = 1 - amount * 0.5;
    },
  };
}
