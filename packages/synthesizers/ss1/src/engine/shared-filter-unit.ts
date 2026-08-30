import { LaneId } from "@/defs/definitions";
import { filterParameterKeys, SynthesisBus } from "@/engine/engine-defs";
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
  const outputNode = ac.createGain();
  inputNode.connect(lpf1).connect(lpf2).connect(outputNode);

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
    },
    gateOn(time) {
      lpf1.detune.cancelScheduledValues(time);
      lpf2.detune.cancelScheduledValues(time);
      const prDecay = pr[pk.env];
      if (prDecay > 0) {
        const decayTime = power2(prDecay) * 2 + 0.2;
        const top = prDecay * 3600;
        lpf1.detune.setValueAtTime(top, time);
        lpf1.detune.linearRampToValueAtTime(0, time + decayTime);
        lpf2.detune.setValueAtTime(top, time);
        lpf2.detune.linearRampToValueAtTime(0, time + decayTime);
      } else {
        lpf1.detune.setValueAtTime(0, time);
        lpf2.detune.setValueAtTime(0, time);
      }
    },
    gateOff(_time) {},
    cleanup() {
      inputNode.disconnect();
      lpf1.disconnect();
      lpf2.disconnect();
    },
  };
}
