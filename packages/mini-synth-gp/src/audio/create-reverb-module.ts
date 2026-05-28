import { clampValue } from "@/utils/number-utils";

function createImpulseResponse(
  audioContext: AudioContext,
  durationSec: number,
  decay: number,
) {
  const sampleRate = audioContext.sampleRate;
  const bufferLength = Math.floor(sampleRate * durationSec);
  const impulseBuffer = audioContext.createBuffer(2, bufferLength, sampleRate);

  for (
    let channelIndex = 0;
    channelIndex < impulseBuffer.numberOfChannels;
    channelIndex += 1
  ) {
    const channelData = impulseBuffer.getChannelData(channelIndex);
    for (let sampleIndex = 0; sampleIndex < bufferLength; sampleIndex += 1) {
      const t = sampleIndex / bufferLength;
      channelData[sampleIndex] =
        (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
    }
  }

  return impulseBuffer;
}

export function createReverbModule(audioContext: AudioContext) {
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();

  const dryGainNode = audioContext.createGain();
  const wetGainNode = audioContext.createGain();
  const convolverNode = audioContext.createConvolver();

  convolverNode.buffer = createImpulseResponse(audioContext, 2.4, 2.8);

  inputNode.connect(dryGainNode);
  inputNode.connect(convolverNode);
  convolverNode.connect(wetGainNode);

  dryGainNode.connect(outputNode);
  wetGainNode.connect(outputNode);

  function updateNodeParameters(params: { amount: number }) {
    const amount = clampValue(params.amount, 0, 1);
    const now = audioContext.currentTime;
    dryGainNode.gain.setTargetAtTime(1 - amount * 0.65, now, 0.03);
    wetGainNode.gain.setTargetAtTime(amount * 0.8, now, 0.03);
  }

  return {
    inputNode,
    outputNode,
    updateNodeParameters,
  };
}
