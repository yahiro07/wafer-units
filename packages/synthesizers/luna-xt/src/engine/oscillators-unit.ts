import { OscWave } from "@/defs/definitions";
import { SynthesisBus } from "@/engine/engine-defs";
import { createOscillatorUnit } from "@/engine/oscillator-unit";
import { midiToFrequency } from "@/utils/synth-math-utils";

type OscillatorsUnit = {
  outputNode: AudioNode;
  update(): void;
  start(time: number): void;
  stop(time: number): void;
  cleanup(): void;
};

export function createOscillatorsUnit(
  bus: SynthesisBus,
  noteNumber: number,
): OscillatorsUnit {
  const ac = bus.audioContext;
  const pr = bus.parameters;
  const outputNode = ac.createGain();
  const osc = createOscillatorUnit(ac, outputNode);

  const internal = {
    applyParameters() {
      const frequency = midiToFrequency(noteNumber);
      osc.setFrequency(frequency);
      osc.setWaveform(pr.osc1Wave === OscWave.Saw ? "sawtooth" : "square");
    },
  };
  return {
    outputNode,
    update() {
      internal.applyParameters();
    },
    start(time) {
      internal.applyParameters();
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
