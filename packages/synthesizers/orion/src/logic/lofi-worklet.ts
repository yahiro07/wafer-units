class LoFiProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: "amount", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
    ];
  }

  private sampleCount = 0;
  private heldSamples: number[] = [];
  private shouldStop = false;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      if (event.data?.type === "stop") {
        this.shouldStop = true;
      }
    };
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ): boolean {
    const input = inputs[0];
    const output = outputs[0];
    if (!output || output.length === 0) {
      return !this.shouldStop;
    }

    if (this.shouldStop) {
      for (const channel of output) {
        channel.fill(0.0);
      }
      return false;
    }

    const amountRaw = parameters["amount"][0];
    const loFiAmount = amountRaw * amountRaw * 0.5;
    const bufferSize = output[0].length;
    const inputChannelCount = input?.length ?? 0;

    if (inputChannelCount === 0 || loFiAmount <= 0.005) {
      for (let ch = 0; ch < output.length; ch++) {
        const source = input?.[Math.min(ch, Math.max(0, inputChannelCount - 1))];
        if (source) {
          output[ch].set(source);
        } else {
          output[ch].fill(0.0);
        }
      }
      return true;
    }

    const bits = 16.0 - loFiAmount * 12.0;
    const step = Math.pow(2, bits);
    const sampleHoldInterval = Math.floor(1 + loFiAmount * 14);

    if (this.heldSamples.length < output.length) {
      this.heldSamples.length = output.length;
      this.heldSamples.fill(0.0);
    }

    for (let i = 0; i < bufferSize; i++) {
      const shouldCapture = this.sampleCount % sampleHoldInterval === 0;
      for (let ch = 0; ch < output.length; ch++) {
        const source =
          input[Math.min(ch, inputChannelCount - 1)] ?? output[ch];
        let sample = source[i] ?? 0.0;
        sample = Math.round(sample * step) / step;
        if (shouldCapture) {
          this.heldSamples[ch] = sample;
        }
        output[ch][i] = this.heldSamples[ch];
      }
      this.sampleCount++;
    }

    return true;
  }
}

registerProcessor("lofi-processor", LoFiProcessor);
