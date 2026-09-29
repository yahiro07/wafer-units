import { mapUnaryTo } from "@lib/mu2609/utils/helpers";
import { power2, power3 } from "@lib/mu2609/utils/synth-math-utils";

export const parameterMapper = {
  mapThreshold(prThreshold: number) {
    return mapUnaryTo(prThreshold, -40, 0);
  },
  mapRatio(prRatio: number) {
    return mapUnaryTo(power3(prRatio), 1, 20);
  },
  mapKnee(prKnee: number) {
    return mapUnaryTo(prKnee, 0, 24);
  },
  mapAttack(prAttack: number) {
    return mapUnaryTo(power2(prAttack), 0.001, 0.08);
  },
  mapRelease(prRelease: number) {
    return mapUnaryTo(power2(prRelease), 0.01, 0.5);
  },
};
