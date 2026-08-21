const INPUT_HEADROOM = 4;
const CURVE_SIZE = 1024;

function createTanhCurve(): Float32Array {
  const curve = new Float32Array(CURVE_SIZE);
  for (let i = 0; i < CURVE_SIZE; i += 1) {
    const u = (i / (CURVE_SIZE - 1)) * 2 - 1;
    curve[i] = Math.tanh(u * INPUT_HEADROOM);
  }
  return curve;
}

export function createOutputSaturator(audioContext: AudioContext) {
  const inputNode = audioContext.createGain();
  const shaperNode = audioContext.createWaveShaper();
  inputNode.gain.value = (1 / INPUT_HEADROOM) * (0.5 / 0.46);
  shaperNode.oversample = "2x";
  shaperNode.curve = createTanhCurve();
  inputNode.connect(shaperNode);

  return {
    inputNode,
    outputNode: shaperNode,
    cleanup() {
      inputNode.disconnect();
      shaperNode.disconnect();
    },
  };
}
