function saturationCurve(x: number, k: number) {
  return ((Math.PI + k) * x) / (Math.PI + k * Math.abs(x));
}

function createSaturationCurveBuffer(k: number) {
  const n = 1024;
  const curve = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = saturationCurve(x, k);
  }
  return curve;
}
const saturationCurveBuffers: Record<number, Float32Array<ArrayBuffer>> = {};

function getSaturationCurveBufferCached(k: number) {
  return (saturationCurveBuffers[k] ??= createSaturationCurveBuffer(k));
}

// Soft saturation clip using a modified sigmoid curve
export function createSoftClipper(ctx: AudioContext) {
  const inputNode = ctx.createGain();
  const waveShaper = ctx.createWaveShaper();
  const outputNode = ctx.createGain();

  waveShaper.curve = getSaturationCurveBufferCached(0);
  waveShaper.oversample = "2x";
  inputNode.connect(waveShaper);
  waveShaper.connect(outputNode);

  return {
    inputNode,
    outputNode,
    update(saturationLevel: number) {
      const k = Math.floor(saturationLevel * 7.999);
      waveShaper.curve = getSaturationCurveBufferCached(k);
      const gainFix = 0.5 / saturationCurve(0.5, k);
      outputNode.gain.value = gainFix;
    },
    cleanup() {
      inputNode.disconnect();
      waveShaper.disconnect();
    },
  };
}
