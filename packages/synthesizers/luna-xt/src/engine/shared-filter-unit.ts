import { SynthesisBus } from "@/engine/engine-defs";
import { clampValue } from "@/utils/helpers";
import { mapUnaryTo } from "@/utils/synth-math-utils";

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
    return mapUnaryTo(prPeak, 0.707, 10);
  },
};

export function createSharedFilterUnit(bus: SynthesisBus): SharedFilterUnit {
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
      const cutoff = helpers.mapCutoff(pr.lpfCutoff);
      const q = helpers.mapQ(pr.lpfPeak);
      lpf1.frequency.value = cutoff;
      lpf2.frequency.value = cutoff;
      lpf1.Q.value = q;
      lpf2.Q.value = q;
    },
    gateOn(time) {
      lpf1.detune.cancelScheduledValues(time);
      lpf2.detune.cancelScheduledValues(time);
      const prDecay = pr.lpfDecay;
      if (prDecay > 0) {
        const decayTime = pr.lpfDecay ** 2 * 2;
        lpf1.detune.setValueAtTime(3600, time);
        lpf1.detune.linearRampToValueAtTime(0, time + decayTime);
        lpf2.detune.setValueAtTime(3600, time);
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
