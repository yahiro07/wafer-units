import { IChorusEffect } from "@/core/effect-types";

export function createChorus2(context: AudioContext): IChorusEffect {
  const inputNode = context.createGain();
  const outputNode = context.createGain();

  const dryGain = context.createGain();
  const wetGain = context.createGain();

  const delay = context.createDelay(0.05);
  delay.delayTime.value = 0.016; // 16ms base

  const lfo = context.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.8; // Keep the movement close to the other chorus variants.
  const lfoGain = context.createGain();
  lfoGain.gain.value = 0;

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
    setLevel(level: number): void {
      const now = context.currentTime;
      wetGain.gain.setTargetAtTime(level * 0.65, now, 0.02);
      dryGain.gain.setTargetAtTime(1 - level * 0.35, now, 0.02);
      lfoGain.gain.setTargetAtTime(level * 0.003, now, 0.02);
    },
    cleanupNodes() {
      lfo.stop();
      lfo.disconnect();
      lfoGain.disconnect();
    },
  };
}
