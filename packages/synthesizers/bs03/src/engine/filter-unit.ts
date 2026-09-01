import { calcDecayTime, SynthesisBus } from "@/engine/engine-defs";
import { connectNodes, disconnectNodes } from "@/engine/webaudio-helpers";
import { bottomLimit } from "@/utils/helpers";
import {
  invPower2,
  mapUnaryTo,
  midiToFrequency,
} from "@/utils/synth-math-utils";

type FilterUnit = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  update(noteNumber: number): void;
  gateOn(time: number, accent?: boolean): void;
  gateOff(time: number): void;
  cleanup(): void;
};

const helpers = {
  mapCutoff(prCutoff: number, noteFreq: number) {
    const max = 18000;
    const min = bottomLimit(noteFreq / 4, 80);
    return min * (max / min) ** (prCutoff ** 1.3);
  },
  mapQ(prPeak: number, accent: boolean) {
    return prPeak * 20 + (accent ? 4 : 0);
  },
};

export function createFilterUnit(bus: SynthesisBus): FilterUnit {
  const ac = bus.audioContext;
  const pr = bus.parameters;
  const inputNode = ac.createGain();
  const hpf = ac.createBiquadFilter();
  const lpf = ac.createBiquadFilter();
  const outputNode = ac.createGain();
  connectNodes(inputNode, hpf, lpf, outputNode);

  hpf.type = "highpass";
  hpf.frequency.value = 20;
  lpf.type = "lowpass";

  return {
    inputNode,
    outputNode,
    update(noteNumber: number) {
      const noteFreq = midiToFrequency(noteNumber);
      const cutoff = helpers.mapCutoff(pr.filterCutoff, noteFreq);
      lpf.frequency.value = cutoff;
    },
    gateOn(time, accent) {
      lpf.detune.cancelScheduledValues(time);
      const prDecay = pr.ampDecay;
      const prEnvMod = pr.filterEnvMod;
      const decayTime = calcDecayTime(prDecay, accent ?? false);
      if (prEnvMod > 0) {
        const top =
          pr.filterEnvMod * mapUnaryTo(invPower2(pr.filterPeak), 1800, 3600);
        lpf.detune.setValueAtTime(top + 1e-3, time);
        lpf.detune.exponentialRampToValueAtTime(1e-3, time + decayTime);
      } else {
        lpf.detune.setValueAtTime(0, time);
      }
      const q = helpers.mapQ(pr.filterPeak, accent ?? false);
      lpf.Q.setValueAtTime(q, time);
    },
    gateOff(_time) {},
    cleanup() {
      disconnectNodes(inputNode, lpf);
    },
  };
}
