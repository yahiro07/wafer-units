import { seqNumbers } from "@lib/mu2609/utils/helpers";
import { createCoreWaveformGenerator } from "./waveforms/core-waveform-generator";
import { CustomWaveParameters } from "./waveforms/waveform-types";

type PreviewWaveProvider = {
  getPreviewWave(params: CustomWaveParameters): number[];
};

export function createPreviewWaveProvider(): PreviewWaveProvider {
  const paramStep = 80;

  let latestKey: string | undefined;
  let latestWave: number[] | undefined;

  const internal = {
    generateWaveform(pr: CustomWaveParameters): number[] {
      const coreWaveformGenerator = createCoreWaveformGenerator(pr);
      return seqNumbers(256).map((i) => {
        const pp = i / 256;
        return coreWaveformGenerator.getSample(pp);
      });
    },
  };

  return {
    getPreviewWave(pr) {
      const shapeIndex = Math.round(pr.shape * paramStep);
      const denseIndex = Math.round(pr.dense * paramStep);
      const mixIndex = Math.round(pr.mix * paramStep);

      const wave = pr.wave;
      const key = `${wave}-${shapeIndex}-${denseIndex}-${mixIndex}`;
      if (key !== latestKey) {
        const shape = shapeIndex / paramStep;
        const dense = denseIndex / paramStep;
        const mix = mixIndex / paramStep;
        console.log(`generating preview waveform for ${key}`);
        latestWave = internal.generateWaveform({ wave, shape, dense, mix });
        latestKey = key;
      }
      return latestWave!;
    },
  };
}
