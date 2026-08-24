function createImpulse(audioContext: AudioContext, decayTime: number) {
  const { sampleRate } = audioContext;
  const length = Math.ceil(decayTime * sampleRate);
  const impulse = audioContext.createBuffer(2, length, sampleRate);
  const impulseL = impulse.getChannelData(0);
  const impulseR = impulse.getChannelData(1);
  for (let i = 0; i < length; i++) {
    impulseL[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decayTime;
    impulseR[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decayTime;
  }
  return impulse;
}

export function createReverberator(audioContext: AudioContext) {
  const impulse = createImpulse(audioContext, 0.5);
  const inputNode = audioContext.createGain();
  inputNode.gain.value = 1;

  const convolver = audioContext.createConvolver();
  const dryGain = audioContext.createGain();
  const wetGain = audioContext.createGain();

  const outputNode = audioContext.createGain();
  outputNode.gain.value = 1;

  convolver.buffer = impulse;

  inputNode.connect(convolver);
  convolver.connect(wetGain);
  wetGain.connect(outputNode);

  inputNode.connect(dryGain);
  dryGain.connect(outputNode);

  let level = -1;
  function setLevel(value: number) {
    if (level !== value) {
      level = value;
      dryGain.gain.value = 1;
      wetGain.gain.value = level;
    }
  }
  setLevel(0);

  return {
    setLevel,
    inputNode,
    outputNode,
    cleanup() {
      convolver.disconnect();
      dryGain.disconnect();
      wetGain.disconnect();
      inputNode.disconnect();
      outputNode.disconnect();
    },
  };
}
