// Generate a random exponential-decay impulse response for convolution reverb
function generateImpulseResponse(
  ctx: AudioContext,
  durationSec: number,
  decay: number,
): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * durationSec);
  const buffer = ctx.createBuffer(2, length, sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return buffer;
}

export function createReverb2(ctx: AudioContext) {
  const inputNode = ctx.createGain();
  const outputNode = ctx.createGain();

  const convolver = ctx.createConvolver();
  convolver.buffer = generateImpulseResponse(ctx, 1.5, 2);

  const dryGain = ctx.createGain();
  const wetGain = ctx.createGain();
  dryGain.gain.value = 1;
  wetGain.gain.value = 0;

  inputNode.connect(dryGain);
  inputNode.connect(convolver);
  convolver.connect(wetGain);
  dryGain.connect(outputNode);
  wetGain.connect(outputNode);

  return {
    inputNode,
    outputNode,
    update(reverbLevel: number): void {
      wetGain.gain.value = reverbLevel * 0.8;
    },
    cleanup() {
      convolver.disconnect();
      dryGain.disconnect();
      wetGain.disconnect();
      inputNode.disconnect();
    },
  };
}
