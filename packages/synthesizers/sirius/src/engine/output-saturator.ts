const INPUT_HEADROOM = 4;
const CURVE_SIZE = 1024;

function createSaturationCurve(): Float32Array<ArrayBuffer> {
  const curve = new Float32Array(CURVE_SIZE);
  for (let i = 0; i < CURVE_SIZE; i += 1) {
    const u = (i / (CURVE_SIZE - 1)) * 2 - 1;
    const x = u * INPUT_HEADROOM;
    curve[i] = Math.tanh(x);
  }
  return curve;
}

export function createOutputSaturator(audioContext: AudioContext) {
  const inputNode = audioContext.createGain();
  const preGain = audioContext.createGain();
  const shaperNode = audioContext.createWaveShaper();
  const outputNode = audioContext.createGain();

  inputNode.gain.value = 1;
  preGain.gain.value = 1 / INPUT_HEADROOM;
  shaperNode.oversample = "2x";
  shaperNode.curve = createSaturationCurve();
  outputNode.gain.value = 1;

  inputNode.connect(preGain);
  preGain.connect(shaperNode);
  shaperNode.connect(outputNode);

  return {
    inputNode,
    outputNode,
    cleanup() {
      inputNode.disconnect();
      preGain.disconnect();
      shaperNode.disconnect();
      outputNode.disconnect();
    },
  };
}
