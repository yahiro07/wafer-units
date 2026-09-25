import { mapUnaryTo } from "@lib/mu2609/utils/helpers";
import { power2 } from "@lib/mu2609/utils/synth-math-utils";

const pi = Math.PI;

export const saturationCurveFunctions = {
  //https://www.desmos.com/calculator/ciblmcjgxn
  [0]: (x) => Math.tanh(x),
  [1]: (x) => (x < 3 ? (2 / pi) * Math.atan((pi / 2) * x) * 1.15 : 1),
  [2]: (x) => {
    x *= 0.8;
    return x < 1.5 ? (x * 1.5 - 0.5 * x * x) / 1.125 : 1;
  },
  [3]: (x) => (x < 1.5 ? x - (x * x * x) / 6.667 : 1),
} satisfies Record<number, (x: number) => number>;

export const parametersMapper = {
  mapPrDriveToXCale(prDriver: number) {
    return 1 + power2(prDriver) * 2;
  },
  mapPrTopToYScale(prTop: number) {
    return mapUnaryTo(prTop, 0.125, 1);
  },
};
