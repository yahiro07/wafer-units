export function createChorus1(ctx: AudioContext) {
  const inputNode = ctx.createGain();
  const outputNode = ctx.createGain();

  const dryGain = ctx.createGain();
  const wetGain = ctx.createGain();
  dryGain.gain.value = 1;
  wetGain.gain.value = 0;

  // Two modulated delay lines for stereo width
  const delayL = ctx.createDelay(0.05);
  const delayR = ctx.createDelay(0.05);
  delayL.delayTime.value = 0.012;
  delayR.delayTime.value = 0.018;

  const lfoL = ctx.createOscillator();
  const lfoR = ctx.createOscillator();
  const lfoGainL = ctx.createGain();
  const lfoGainR = ctx.createGain();
  lfoL.type = "sine";
  lfoR.type = "sine";
  lfoL.frequency.value = 0.7;
  lfoR.frequency.value = 1.0;
  lfoGainL.gain.value = 0.003;
  lfoGainR.gain.value = 0.003;

  lfoL.connect(lfoGainL);
  lfoR.connect(lfoGainR);
  lfoGainL.connect(delayL.delayTime);
  lfoGainR.connect(delayR.delayTime);
  lfoL.start();
  lfoR.start();

  // Merge L/R delays into stereo wet signal
  const merger = ctx.createChannelMerger(2);
  inputNode.connect(dryGain);
  inputNode.connect(delayL);
  inputNode.connect(delayR);
  delayL.connect(merger, 0, 0);
  delayR.connect(merger, 0, 1);
  merger.connect(wetGain);
  dryGain.connect(outputNode);
  wetGain.connect(outputNode);

  return {
    inputNode,
    outputNode,
    setLevel(level: number): void {
      wetGain.gain.value = level * 0.6;
      lfoGainL.gain.value = level * 0.005;
      lfoGainR.gain.value = level * 0.005;
    },
    cleanupNodes() {
      lfoL.stop();
      lfoR.stop();
      lfoL.disconnect();
      lfoR.disconnect();
      lfoGainL.disconnect();
      lfoGainR.disconnect();
    },
  };
}
