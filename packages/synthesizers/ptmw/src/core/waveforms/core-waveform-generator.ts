import { mapUnaryTo, resultOf } from "@lib/mu2609/utils/helpers";
import {
  invPower2,
  power2,
  power3,
  tunableSigmoid,
  mixValue,
} from "@lib/mu2609/utils/synth-math-utils";
import { phaseTweakers } from "./phase-tweakers";
import { CustomWaveParameters } from "./waveform-types";

export function createCoreWaveformGenerator(pr: CustomWaveParameters) {
  const phaseTweakerFn =
    {
      [0]: phaseTweakers.speed,
      [1]: phaseTweakers.accel,
      [2]: phaseTweakers.sfm,
      [3]: phaseTweakers.sdm,
    }[pr.wave] ?? phaseTweakers.speed;

  const d = mapUnaryTo(pr.dense, -1, 1);
  const k = resultOf(() => {
    if (d > 0) {
      return invPower2(d) * -0.95;
    } else {
      return invPower2(-d) * 0.95;
    }
  });
  const denseGainFix = resultOf(() => {
    if (d > 0) {
      return mapUnaryTo(power2(d), 1, 0.6);
    } else {
      return mapUnaryTo(power3(-d), 1, 1.8);
    }
  });
  const denseFn = (y: number) => {
    return tunableSigmoid(y, k) * denseGainFix;
  };
  return {
    getSample(pp: number): number {
      const y1 = pp * 2 - 1;
      const pp2 = phaseTweakerFn(pp, pr.shape);
      let y2 = pp2 * 2 - 1;
      if (0) {
        const y = mixValue(y1, y2, pr.mix);
        return denseFn(y);
      } else {
        y2 = denseFn(y2);
        return mixValue(y1, y2, pr.mix);
      }
    },
  };
}
