class LofierProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [{ name: "degrade", defaultValue: 0, minValue: 0, maxValue: 1 }];
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ) {
    const input = inputs[0];
    const output = outputs[0];
    if (!input || !output) return true;

    const degradeParam = parameters.degrade;

    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];
      if (!outputChannel) continue;

      // degrade(0~1) をもとに、サンプリングレートの間引き幅とビット深度を計算
      const currentDegrade =
        degradeParam.length > 1 ? degradeParam[0] : degradeParam[0];

      // degrade=0 で無加工、1 で超粗い (サンプル間引き幅 1〜32、ビット深度 32〜3ビット)
      const sampleStep = Math.max(1, Math.floor(currentDegrade * 31) + 1);
      const bitDepth = Math.max(3, 32 - currentDegrade * 29);
      const step = Math.pow(0.5, bitDepth);

      let lastValue = 0;

      for (let i = 0; i < inputChannel.length; i++) {
        // 1. ダウンサンプリング (間引き)
        if (i % sampleStep === 0) {
          const raw = inputChannel[i];
          // 2. ビット深度の削減 (量子化)
          lastValue = Math.round(raw / step) * step;
        }
        outputChannel[i] = lastValue;
      }
    }
    return true;
  }
}

registerProcessor("lofier-processor", LofierProcessor);
