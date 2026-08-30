import { LaneId } from "@/defs/definitions";
import { filterParameterKeys, SynthesisBus } from "@/engine/engine-defs";
import { createEnvelopeUnit } from "@/engine/envelope-unit";
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
  mapQ(prPeak: number) {
    return mapUnaryTo(power2(prPeak), 0.707, 10);
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
  const lpf1 = ac.createBiquadFilter();
  const lpf2 = ac.createBiquadFilter();
  const env = createEnvelopeUnit(bus, laneId);
  const envScale = ac.createGain();
  envScale.gain.value = 0;
  env.outputNode.connect(envScale);
  envScale.connect(lpf1.detune);
  envScale.connect(lpf2.detune);

  const outputNode = ac.createGain();
  connectNodes(inputNode, lpf1, lpf2, outputNode);

  lpf1.type = "lowpass";
  lpf2.type = "lowpass";

  return {
    inputNode,
    outputNode,
    update() {
      const cutoff = helpers.mapCutoff(pr[pk.cutoff]);
      const q = helpers.mapQ(pr[pk.peak]);
      lpf1.frequency.value = cutoff;
      lpf2.frequency.value = cutoff;
      lpf1.Q.value = q;
      lpf2.Q.value = q;
      envScale.gain.value = pr[pk.env] * 4800;
    },
    gateOn(time) {
      env.gateOn(time);
    },
    gateOff(time) {
      env.gateOff(time, false);
    },
    cleanup() {
      disconnectNodes(inputNode, lpf1, lpf2, outputNode);
      env.outputNode.disconnect();
      envScale.disconnect();
      env.cleanup();
    },
  };
}
