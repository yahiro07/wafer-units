import { SynthesisBus } from "@/engine/engine-defs";
import { createOscillatorCore } from "@/engine/oscillator-core";
import { midiToFrequency } from "@/utils/synth-math-utils";

type OscillatorUnit = {
  outputNode: AudioNode;
  update(noteNumber: number): void;
  start(time: number): void;
  slideTo(
    noteFrom: number,
    noteTo: number,
    timeFrom: number,
    timeTo: number,
  ): void;
  stop(): void;
};

export function createOscillatorUnit(bus: SynthesisBus): OscillatorUnit {
  const ac = bus.audioContext;
  const pr = bus.parameters;
  const outputNode = ac.createGain();
  const osc = createOscillatorCore(ac, outputNode);
  return {
    outputNode,
    update(noteNumber) {
      const wave = pr.oscWave;
      const frequency = midiToFrequency(noteNumber);
      osc.setFrequency(frequency);
      osc.setWaveform(wave === 0 ? "sawtooth" : "square");
      osc.setVolume(1);
      osc.oscNode.detune.setValueAtTime(0, ac.currentTime);
    },
    slideTo(noteFrom, noteTo, timeFrom, timeTo) {
      if (noteTo !== noteFrom) {
        if (1) {
          const detune1 = (noteTo - noteFrom) * 100;
          osc.oscNode.detune.cancelScheduledValues(timeFrom);
          osc.oscNode.detune.setValueAtTime(0, timeFrom);
          osc.oscNode.detune.linearRampToValueAtTime(detune1, timeTo);
        } else {
          const detune1 = (noteTo - noteFrom) * 100;
          const duration = timeTo - timeFrom;
          const n = 32;
          const curve = new Float32Array(n);
          for (let i = 0; i < n; i++) {
            const t = i / (n - 1);
            const w = -Math.cos(t * Math.PI) * 0.5 + 0.5;
            curve[i] = detune1 * w;
          }
          osc.oscNode.detune.cancelScheduledValues(timeFrom);
          osc.oscNode.detune.setValueCurveAtTime(curve, timeFrom, duration);
        }
      }
    },
    start(time) {
      osc.start(time);
    },
    stop() {
      osc.stop();
    },
  };
}
