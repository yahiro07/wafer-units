class MaximaProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "drive",
        defaultValue: 0,
        minValue: 0,
        maxValue: 24,
        automationRate: "k-rate",
      },
      {
        name: "ceiling",
        defaultValue: -1,
        minValue: -18,
        maxValue: 0,
        automationRate: "k-rate",
      },
      {
        name: "lookahead",
        defaultValue: 5,
        minValue: 1,
        maxValue: 50,
        automationRate: "k-rate",
      },
    ];
  }

  private channels: ChannelState[] = [];
  private maxSpanSamples = 0;

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ) {
    const input = inputs[0];
    const output = outputs[0];
    if (!output) return true;

    const drive = clamp(parameters.drive[0] ?? 0, 0, 24);
    const ceiling = dbToGain(clamp(parameters.ceiling[0] ?? -1, -18, 0));
    const maxSpanSamples = Math.max(
      1,
      Math.round(
        (clamp(parameters.lookahead[0] ?? 5, 1, 50) / 1000) * sampleRate,
      ),
    );

    if (this.maxSpanSamples !== maxSpanSamples) {
      this.maxSpanSamples = maxSpanSamples;
      this.channels = [];
    }

    for (let channel = 0; channel < output.length; channel++) {
      const outputChannel = output[channel];
      if (!outputChannel) continue;

      const inputChannel = input?.[channel] ?? input?.[0];
      const state = (this.channels[channel] ??= new ChannelState(
        maxSpanSamples,
      ));

      for (let i = 0; i < outputChannel.length; i++) {
        outputChannel[i] = state.takeOutput();
        state.pushInput(inputChannel?.[i] ?? 0, drive, ceiling);
      }
    }

    return true;
  }
}

class ChannelState {
  private readonly span: Float32Array;
  private readonly delayedOutput: Float32Array;
  private spanLength = 0;
  private spanPeak = 0;
  private lastPolarity = 0;
  private outputIndex = 0;
  private envelopePeak = 0;

  constructor(private readonly maxSpanSamples: number) {
    this.span = new Float32Array(maxSpanSamples);
    this.delayedOutput = new Float32Array(maxSpanSamples * 2 + 128);
  }

  takeOutput() {
    const value = this.delayedOutput[this.outputIndex] ?? 0;
    this.delayedOutput[this.outputIndex] = 0;
    this.outputIndex = (this.outputIndex + 1) % this.delayedOutput.length;
    return value;
  }

  pushInput(value: number, drive: number, ceiling: number) {
    const polarity = getPolarity(value);
    if (
      polarity !== 0 &&
      this.lastPolarity !== 0 &&
      polarity !== this.lastPolarity &&
      this.spanLength > 0
    ) {
      this.flush(drive, ceiling);
    }

    this.span[this.spanLength] = value;
    this.spanLength++;
    this.spanPeak = Math.max(this.spanPeak, Math.abs(value));
    if (polarity !== 0) this.lastPolarity = polarity;

    if (this.spanLength >= this.maxSpanSamples) {
      this.flush(drive, ceiling);
    }
  }

  private flush(drive: number, ceiling: number) {
    if (this.spanLength === 0) return;

    const release = Math.exp(-this.spanLength / (sampleRate * 0.12));
    this.envelopePeak = Math.max(this.spanPeak, this.envelopePeak * release);

    const maxBoost = dbToGain(drive);
    const spanGain = Math.min(
      maxBoost,
      ceiling / Math.max(this.spanPeak, 1e-9),
    );
    const envelopeGain = Math.min(
      maxBoost,
      ceiling / Math.max(this.envelopePeak, 1e-9),
    );
    const gain = Math.min(spanGain, Math.sqrt(spanGain * envelopeGain));
    const delay = this.maxSpanSamples - this.spanLength;
    let writeIndex = (this.outputIndex + delay) % this.delayedOutput.length;

    for (let i = 0; i < this.spanLength; i++) {
      this.delayedOutput[writeIndex] = this.span[i] * gain;
      writeIndex = (writeIndex + 1) % this.delayedOutput.length;
    }

    this.spanLength = 0;
    this.spanPeak = 0;
  }
}

function getPolarity(value: number) {
  const threshold = 1e-5;
  if (value > threshold) return 1;
  if (value < -threshold) return -1;
  return 0;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function dbToGain(decibels: number) {
  return 10 ** (decibels / 20);
}

registerProcessor("maxima-processor", MaximaProcessor);
