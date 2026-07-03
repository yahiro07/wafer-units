class NoiseMixProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "envAttack",
        defaultValue: 0.5,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate",
      },
      {
        name: "envRelease",
        defaultValue: 0.5,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate",
      },
      {
        name: "noiseBAbs",
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate",
      },
    ];
  }

  private envelope = 0;

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ) {
    const input = inputs[0];
    const envelopeOutput = outputs[0]?.[0];
    const modulatorOutput = outputs[1]?.[0];

    if (!envelopeOutput || !modulatorOutput) return true;

    const attack = mapExponential(parameters.envAttack[0], 0.002, 0.12);
    const release = mapExponential(parameters.envRelease[0], 0.025, 1.2);
    const attackCoefficient = Math.exp(-1 / (attack * sampleRate));
    const releaseCoefficient = Math.exp(-1 / (release * sampleRate));
    const useAbsModulator = parameters.noiseBAbs[0] >= 0.5;

    for (let i = 0; i < envelopeOutput.length; i++) {
      let mixedInput = 0;
      let peakInput = 0;

      if (input) {
        for (let channel = 0; channel < input.length; channel++) {
          const value = input[channel]?.[i] ?? 0;
          mixedInput += value;
          peakInput = Math.max(peakInput, Math.abs(value));
        }

        if (input.length > 0) {
          mixedInput /= input.length;
        }
      }

      const coefficient =
        peakInput > this.envelope ? attackCoefficient : releaseCoefficient;
      this.envelope = peakInput + coefficient * (this.envelope - peakInput);

      envelopeOutput[i] = this.envelope;
      modulatorOutput[i] = useAbsModulator ? Math.abs(mixedInput) : mixedInput;
    }

    return true;
  }
}

function mapExponential(value: number, min: number, max: number) {
  const normalized = Math.min(1, Math.max(0, value));
  return min * (max / min) ** normalized;
}

registerProcessor("noise-mix-processor", NoiseMixProcessor);
