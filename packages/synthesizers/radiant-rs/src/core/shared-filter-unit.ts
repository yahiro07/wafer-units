import { clampValue, mapUnaryTo } from "@lib/mu2609/utils/helpers";
import { power2 } from "@lib/mu2609/utils/synth-math-utils";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import { createEnvelopeUnit } from "./envelope-unit";
import { AmpParameters, FilterParameters, FilterType } from "./definitions";
import { createFilterCore } from "./filter-core";

type SharedFilterUnit = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  update(): void;
  //for latest note
  gateOn(time: number): void;
  gateOff(time: number): void;
  cleanup(): void;
};

const helpers = {
  mapCutoff(prCutoff: number) {
    const max = 18000;
    const min = 60;
    const hz = min * (max / min) ** prCutoff;
    return clampValue(hz, min, max);
  },
  mapQ(prPeak: number, filterType: FilterType) {
    const topQ = filterType === FilterType.LP24 ? 5 : 10;
    return mapUnaryTo(power2(prPeak), 0.707, topQ);
  },
};

export function createSharedFilterUnit(
  ac: AudioContext,
  getFilterParameters: () => FilterParameters,
  getAmpParameters: () => AmpParameters,
): SharedFilterUnit {
  const inputNode = ac.createGain();
  const lpf = createFilterCore(ac);
  const env = createEnvelopeUnit(ac, getAmpParameters);
  const envScale = ac.createGain();
  envScale.gain.value = 0;
  env.outputNode.connect(envScale);
  envScale.connect(lpf.detuneInputNode);

  const outputNode = ac.createGain();
  connectNodes(inputNode, lpf, outputNode);

  return {
    inputNode,
    outputNode,
    update() {
      const pr = getFilterParameters();
      const prType = pr.type;
      const prCutoff = pr.cutoff;
      const prPeak = pr.peak;
      const cutoff = helpers.mapCutoff(prCutoff);
      const q = helpers.mapQ(prPeak, prType);
      lpf.setFilterType(prType === FilterType.LP24 ? "lp24" : "lp12");
      lpf.setCutoff(cutoff);
      lpf.setQ(q);
      envScale.gain.value = pr.env * 3600;
    },
    gateOn(time) {
      env.gateOn(time);
    },
    gateOff(time) {
      const pr = getFilterParameters();
      env.gateOff(time, pr.envRelease);
    },
    cleanup() {
      disconnectNodes(inputNode, lpf, outputNode);
      env.outputNode.disconnect();
      envScale.disconnect();
      env.cleanup();
    },
  };
}
