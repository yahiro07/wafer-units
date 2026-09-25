class CustomCompressorProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "threshold",
        defaultValue: 0,
        minValue: -100,
        maxValue: 0,
        automationRate: "k-rate",
      },
      {
        name: "ratio",
        defaultValue: 1,
        minValue: 1,
        maxValue: 20,
        automationRate: "k-rate",
      },
      {
        name: "knee",
        defaultValue: 0,
        minValue: 0,
        maxValue: 40,
        automationRate: "k-rate",
      },
      {
        name: "attack",
        defaultValue: 0.003,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate",
      },
      {
        name: "release",
        defaultValue: 0.25,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate",
      },
    ];
  }

  private gain = 1;

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ) {
    const main = inputs[0];
    const output = outputs[0];
    if (!main?.length || !output?.length || !main[0] || !output[0]) return true;

    const threshold = parameters.threshold[0] ?? 0;
    const ratio = parameters.ratio[0] ?? 1;
    const knee = parameters.knee[0] ?? 0;
    const attack = parameters.attack[0] ?? 0.003;
    const release = parameters.release[0] ?? 0.25;
    const attackCoef = smoothingCoefficient(attack);
    const releaseCoef = smoothingCoefficient(release);
    const side = inputs[1];
    const detector = side?.length ? side : main;
    const frameCount = Math.min(main[0].length, output[0].length);

    for (let i = 0; i < frameCount; i++) {
      const peak = channelPeak(detector, i);
      const levelDb = 20 * Math.log10(Math.max(peak, 1e-8));
      const gainDb = staticGainDb(levelDb, threshold, ratio, knee);
      const target = 10 ** (gainDb / 20);
      const coefficient = target < this.gain ? attackCoef : releaseCoef;
      this.gain = target + coefficient * (this.gain - target);

      for (let channel = 0; channel < output.length; channel++) {
        const outputChannel = output[channel];
        const inputChannel = main[channel] ?? main[0];
        if (!outputChannel || !inputChannel) continue;
        outputChannel[i] = (inputChannel[i] ?? 0) * this.gain;
      }
    }

    return true;
  }
}

function smoothingCoefficient(timeSeconds: number) {
  if (timeSeconds <= 0) return 0;
  return Math.exp(-1 / (timeSeconds * sampleRate));
}

function channelPeak(channels: Float32Array[], index: number) {
  let peak = 0;
  for (let channel = 0; channel < channels.length; channel++) {
    const sample = channels[channel]?.[index] ?? 0;
    const amplitude = sample < 0 ? -sample : sample;
    if (amplitude > peak) peak = amplitude;
  }
  return peak;
}

function staticGainDb(
  levelDb: number,
  threshold: number,
  ratio: number,
  knee: number,
) {
  const safeRatio = Math.max(ratio, 1);
  if (knee <= 0) {
    if (levelDb <= threshold) return 0;
    return threshold + (levelDb - threshold) / safeRatio - levelDb;
  }

  const halfKnee = knee / 2;
  if (levelDb < threshold - halfKnee) return 0;
  if (levelDb > threshold + halfKnee) {
    return threshold + (levelDb - threshold) / safeRatio - levelDb;
  }

  const distance = levelDb - threshold + halfKnee;
  return ((1 / safeRatio - 1) * distance * distance) / (2 * knee);
}

registerProcessor("custom-compressor", CustomCompressorProcessor);
