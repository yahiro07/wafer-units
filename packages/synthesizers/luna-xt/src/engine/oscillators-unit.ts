import { SynthesisBus } from "@/engine/engine-defs";
import { createOscillatorUnit } from "@/engine/oscillator-unit";
import { midiToFrequency } from "@/utils/synth-math-utils";

type OscillatorsUnit = {
  outputNode: AudioNode;
  start(time: number): void;
  stop(time: number): void;
  cleanup(): void;
};

export function createOscillatorsUnit(
  bus: SynthesisBus,
  noteNumber: number,
): OscillatorsUnit {
  const ac = bus.audioContext;
  const outputNode = ac.createGain();
  const osc = createOscillatorUnit(ac, outputNode);
  return {
    outputNode,
    start(time) {
      const frequency = midiToFrequency(noteNumber);
      osc.setFrequency(frequency);
      osc.setWaveform("sawtooth");
      osc.start(time);
    },
    stop(time) {
      osc.stop(time);
    },
    cleanup() {
      osc.cleanup();
    },
  };
}
