// Soft saturation clip using a modified sigmoid curve
export function createSoftClipper(ctx: AudioContext) {
  const inputNode = ctx.createGain();
  const waveShaper = ctx.createWaveShaper();

  const n = 1024;
  const curve = new Float32Array(n);
  // const k = 2.0;
  const k = 6.0;
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = ((Math.PI + k) * x) / (Math.PI + k * Math.abs(x));
  }
  waveShaper.curve = curve;
  waveShaper.oversample = "2x";
  inputNode.connect(waveShaper);

  return {
    inputNode,
    outputNode: waveShaper as AudioNode,
    cleanup() {
      waveShaper.disconnect();
    },
  };
}
