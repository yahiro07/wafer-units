class LofiProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "degrade",
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate",
      },
    ];
  }

  private heldValues: number[] = [];
  private sampleCounters: number[] = [];

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ) {
    const input = inputs[0];
    const output = outputs[0];
    if (!input || !output) return true;

    const degrade = clamp01(parameters.degrade[0] ?? 0);
    const targetSampleRate = mapExponential(degrade, sampleRate, 2400);
    const sampleStep = Math.max(1, Math.round(sampleRate / targetSampleRate));

    for (let channel = 0; channel < output.length; channel++) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];
      if (!outputChannel) continue;

      if (!inputChannel) {
        outputChannel.fill(0);
        continue;
      }

      let heldValue = this.heldValues[channel] ?? 0;
      let counter = this.sampleCounters[channel] ?? 0;

      if (sampleStep === 1) {
        outputChannel.set(inputChannel);
        this.heldValues[channel] = inputChannel[inputChannel.length - 1] ?? 0;
        this.sampleCounters[channel] = 0;
        continue;
      }

      for (let i = 0; i < outputChannel.length; i++) {
        if (counter <= 0) {
          heldValue = inputChannel[i];
          counter = sampleStep;
        }

        outputChannel[i] = heldValue;
        counter--;
      }

      this.heldValues[channel] = heldValue;
      this.sampleCounters[channel] = counter;
    }

    return true;
  }
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function mapExponential(value: number, min: number, max: number) {
  const normalized = clamp01(value);
  return min * (max / min) ** normalized;
}

registerProcessor("lofi-processor", LofiProcessor);
