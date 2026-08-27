import { calcDecayTime, SynthesisBus } from "@/engine/engine-defs";
import { clampValue } from "@/utils/helpers";
import { mapUnaryTo, midiToFrequency } from "@/utils/synth-math-utils";

type FilterUnit = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  update(noteNumber: number): void;
  gateOn(time: number): void;
  gateOff(time: number): void;
  cleanup(): void;
};

const helpers = {
  mapCutoff(prCutoff: number, noteFreq: number) {
    const max = 12000;
    const min = noteFreq * 0.25;
    const hz = min * (max / min) ** prCutoff;
    return clampValue(hz, min, max);
  },
  mapQ(prPeak: number) {
    return mapUnaryTo(prPeak, 0.707, 18);
  },
};

export function createFilterUnit(bus: SynthesisBus): FilterUnit {
  const ac = bus.audioContext;
  const pr = bus.parameters;
  const inputNode = ac.createGain();
  const hpf = ac.createBiquadFilter();
  const lpf = ac.createBiquadFilter();
  const outputNode = ac.createGain();
  inputNode.connect(hpf).connect(lpf).connect(outputNode);

  hpf.type = "highpass";
  hpf.frequency.value = 80;
  lpf.type = "lowpass";

  return {
    inputNode,
    outputNode,
    update(noteNumber: number) {
      const noteFreq = midiToFrequency(noteNumber);
      const cutoff = helpers.mapCutoff(pr.filterCutoff, noteFreq);
      const q = helpers.mapQ(pr.filterPeak);
      lpf.frequency.value = cutoff;
      lpf.Q.value = q;
    },
    gateOn(time) {
      lpf.detune.cancelScheduledValues(time);
      const prDecay = 1 - pr.filterEnvMod * 0.5;
      const decayTime = calcDecayTime(prDecay);
      const top = 1200 + pr.filterEnvMod * 3600;
      lpf.detune.setValueAtTime(top, time);
      lpf.detune.linearRampToValueAtTime(0, time + decayTime);
    },
    gateOff(_time) {},
    cleanup() {
      inputNode.disconnect();
      lpf.disconnect();
    },
  };
}
