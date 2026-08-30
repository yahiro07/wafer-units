import { SynthesisBus } from "@/engine/engine-defs";
import { createOscillatorCore } from "@/engine/oscillator-core";
import { midiToFrequency } from "@/utils/synth-math-utils";

type OscillatorUnit = {
  outputNode: AudioNode;
  update(noteNumber: number): void;
  start(time: number): void;
  stop(): void;
};

export function createOscillatorUnit(bus: SynthesisBus): OscillatorUnit {
  const ac = bus.audioContext;
  const pr = bus.parameters;
  const outputNode = ac.createGain();
  const osc = createOscillatorCore(ac, outputNode);
  return {
    outputNode,
    update(noteNumber: number) {
      const wave = pr.oscWave;
      const frequency = midiToFrequency(noteNumber);
      osc.setFrequency(frequency);
      osc.setWaveform(wave === 0 ? "sawtooth" : "square");
      osc.setVolume(1);
    },
    start(time) {
      osc.start(time);
    },
    stop() {
      osc.stop();
    },
  };
}
