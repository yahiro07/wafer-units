import { clampValue } from "@/utils/number-utils";

export function createChorusModule(audioContext: AudioContext) {
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();

  const dryGainNode = audioContext.createGain();
  const wetGainNode = audioContext.createGain();

  const delayNodeA = audioContext.createDelay(0.05);
  const delayNodeB = audioContext.createDelay(0.05);
  delayNodeA.delayTime.value = 0.01;
  delayNodeB.delayTime.value = 0.016;

  const lfoA = audioContext.createOscillator();
  const lfoB = audioContext.createOscillator();
  const lfoGainA = audioContext.createGain();
  const lfoGainB = audioContext.createGain();

  lfoA.type = "sine";
  lfoB.type = "triangle";
  lfoA.frequency.value = 0.23;
  lfoB.frequency.value = 0.31;

  lfoGainA.gain.value = 0;
  lfoGainB.gain.value = 0;

  inputNode.connect(dryGainNode);
  inputNode.connect(delayNodeA);
  inputNode.connect(delayNodeB);

  delayNodeA.connect(wetGainNode);
  delayNodeB.connect(wetGainNode);

  dryGainNode.connect(outputNode);
  wetGainNode.connect(outputNode);

  lfoA.connect(lfoGainA);
  lfoB.connect(lfoGainB);
  lfoGainA.connect(delayNodeA.delayTime);
  lfoGainB.connect(delayNodeB.delayTime);

  lfoA.start();
  lfoB.start();

  function updateNodeParameters(params: { amount: number }) {
    const amount = clampValue(params.amount, 0, 1);
    const now = audioContext.currentTime;
    dryGainNode.gain.setTargetAtTime(1 - amount * 0.55, now, 0.02);
    wetGainNode.gain.setTargetAtTime(amount * 0.85, now, 0.02);
    lfoGainA.gain.setTargetAtTime(0.0025 * amount, now, 0.02);
    lfoGainB.gain.setTargetAtTime(0.0032 * amount, now, 0.02);
  }

  return {
    inputNode,
    outputNode,
    updateNodeParameters,
    cleanup() {
      lfoA.stop();
      lfoB.stop();
      lfoA.disconnect();
      lfoB.disconnect();
      lfoGainA.disconnect();
      lfoGainB.disconnect();
      delayNodeA.disconnect();
      delayNodeB.disconnect();
      dryGainNode.disconnect();
      wetGainNode.disconnect();
      inputNode.disconnect();
    },
  };
}
