import { calcDecayTime, SynthesisBus } from "@/engine/engine-defs";
import { connectNodes, disconnectNodes } from "@/engine/webaudio-helpers";
import { clampValue } from "@/utils/helpers";
import { mapUnaryTo, midiToFrequency } from "@/utils/synth-math-utils";

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
    const min = noteFreq / 4;
    const hz = min * (max / min) ** prCutoff;
    return clampValue(hz, min, max);
  },
  mapQ(prPeak: number, accent: boolean) {
    return mapUnaryTo(prPeak, 0.707, 12) + (accent ? 8 : 0);
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
      const decayTime = calcDecayTime(prDecay);
      if (prEnvMod > 0) {
        const top = pr.filterEnvMod * (accent ? 4800 : 3600) + 1e-3;
        lpf.detune.setValueAtTime(top, time);
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
