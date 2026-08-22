export function midiToFreq(note: number) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

export function createNoiseBuffer(context: AudioContext, length: number) {
  const bufferSize = context.sampleRate * length;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

//x:-1__1, k:-1__1, positive k for low curve, negative k for high curve
export function tunableSigmoid(x: number, k: number) {
  return (x - k * x) / (k - 2 * k * Math.abs(x) + 1);
}
