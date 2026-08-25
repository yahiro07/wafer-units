import { SynthesisBus } from "@/engine/engine-defs";
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

  const osc = ac.createOscillator();
  osc.type = "sawtooth";
  osc.connect(outputNode);

  return {
    outputNode,
    start(time) {
      const frequency = midiToFrequency(noteNumber);
      osc.frequency.value = frequency;
      osc.start(time);
    },
    stop(time) {
      osc.stop(time);
    },
    cleanup() {
      osc.disconnect();
    },
  };
}
