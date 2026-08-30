import { FilterType, LaneId } from "@/defs/definitions";
import { filterParameterKeys, SynthesisBus } from "@/engine/engine-defs";
import { createEnvelopeUnit } from "@/engine/envelope-unit";
import { createFilterCore } from "@/engine/filter-core";
import { connectNodes, disconnectNodes } from "@/engine/webaudio-helpers";
import { clampValue } from "@/utils/helpers";
import { mapUnaryTo, power2 } from "@/utils/synth-math-utils";

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
  bus: SynthesisBus,
  laneId: LaneId,
): SharedFilterUnit {
  const pk = filterParameterKeys[laneId];
  const ac = bus.audioContext;
  const pr = bus.parameters;
  const inputNode = ac.createGain();
  const lpf = createFilterCore(ac);
  const env = createEnvelopeUnit(bus, laneId);
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
      const prType = pr[pk.type];
      const prCutoff = pr[pk.cutoff];
      const prPeak = pr[pk.peak];
      const cutoff = helpers.mapCutoff(prCutoff);
      const q = helpers.mapQ(prPeak, prType);
      lpf.setFilterType(prType === FilterType.LP24 ? "lp24" : "lp12");
      lpf.setCutoff(cutoff);
      lpf.setQ(q);
      envScale.gain.value = pr[pk.env] * 3600;
    },
    gateOn(time) {
      env.gateOn(time);
    },
    gateOff(time) {
      env.gateOff(time, pr[pk.envRelease]);
    },
    cleanup() {
      disconnectNodes(inputNode, lpf, outputNode);
      env.outputNode.disconnect();
      envScale.disconnect();
      env.cleanup();
    },
  };
}
