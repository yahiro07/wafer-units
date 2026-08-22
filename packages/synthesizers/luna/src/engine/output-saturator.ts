const INPUT_HEADROOM = 1.5;
const CURVE_SIZE = 1024;

function createSaturationCurve(): Float32Array<ArrayBuffer> {
  const curve = new Float32Array(CURVE_SIZE);
  for (let i = 0; i < CURVE_SIZE; i += 1) {
    const u = (i / (CURVE_SIZE - 1)) * 2 - 1;
    const x = u * INPUT_HEADROOM;
    if (Math.abs(x) <= 1.5) {
      curve[i] = x - (x * x * x) / 6.66;
    } else {
      curve[i] = Math.sign(x);
    }
  }
  return curve;
}

export function createOutputSaturator(audioContext: AudioContext) {
  const inputNode = audioContext.createGain();
  const dryGain = audioContext.createGain();
  const preGain = audioContext.createGain();
  const shaperNode = audioContext.createWaveShaper();
  const wetGain = audioContext.createGain();
  const outputNode = audioContext.createGain();

  inputNode.gain.value = 1;
  dryGain.gain.value = 1;
  preGain.gain.value = 1 / INPUT_HEADROOM;
  shaperNode.oversample = "2x";
  shaperNode.curve = createSaturationCurve();
  wetGain.gain.value = 0;
  outputNode.gain.value = 1;

  inputNode.connect(dryGain);
  dryGain.connect(outputNode);
  inputNode.connect(preGain);
  preGain.connect(shaperNode);
  shaperNode.connect(wetGain);
  wetGain.connect(outputNode);

  return {
    inputNode,
    outputNode,
    setEnabled(enabled: boolean, time: number) {
      dryGain.gain.setValueAtTime(enabled ? 0 : 1, time);
      wetGain.gain.setValueAtTime(enabled ? 1 : 0, time);
    },
    cleanup() {
      inputNode.disconnect();
      dryGain.disconnect();
      preGain.disconnect();
      shaperNode.disconnect();
      wetGain.disconnect();
      outputNode.disconnect();
    },
  };
}
