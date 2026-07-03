class LofiEnvelopeProcessor extends AudioWorkletProcessor {
  private envelope = 0;

  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0];
    const output = outputs[0]?.[0];
    if (!output) return true;

    const attackCoefficient = Math.exp(-1 / (0.003 * sampleRate));
    const releaseCoefficient = Math.exp(-1 / (0.16 * sampleRate));

    for (let i = 0; i < output.length; i++) {
      let peakInput = 0;

      if (input) {
        for (let channel = 0; channel < input.length; channel++) {
          peakInput = Math.max(peakInput, Math.abs(input[channel]?.[i] ?? 0));
        }
      }

      const coefficient =
        peakInput > this.envelope ? attackCoefficient : releaseCoefficient;
      this.envelope = peakInput + coefficient * (this.envelope - peakInput);

      output[i] = Math.min(1, Math.max(0, (this.envelope - 0.001) * 4));
    }

    return true;
  }
}

registerProcessor("lofi-envelope-processor", LofiEnvelopeProcessor);
