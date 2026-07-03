import { IChorusEffect } from "@/core/effect-types";

export function createChorus4(audioContext: AudioContext): IChorusEffect {
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();
  const dryNode = audioContext.createGain();
  const delayNode = audioContext.createDelay();
  const wetNode = audioContext.createGain();

  const lfo = audioContext.createOscillator();
  const lfoGain = audioContext.createGain();

  inputNode.connect(dryNode);
  dryNode.connect(outputNode);

  inputNode.connect(delayNode);
  delayNode.connect(wetNode);
  wetNode.connect(outputNode);

  lfo.type = "sine";
  lfo.frequency.value = 0.25;

  delayNode.delayTime.value = 0.015; //15ms offset
  lfoGain.gain.value = 0.005; //+/- 5ms modulation

  lfo.connect(lfoGain);
  lfoGain.connect(delayNode.delayTime);
  lfo.start();

  function setLevel(value: number, force?: boolean) {
    const mix = value * 0.5;
    if (force || wetNode.gain.value !== mix) {
      wetNode.gain.value = mix;
      dryNode.gain.value = 1 - mix;
    }
  }
  setLevel(0);

  return {
    inputNode,
    outputNode,
    setLevel,
  };
}
