import { oscParameterKeys, SynthesisBus } from "@/engine/engine-defs";
import { createOscillatorCore } from "@/engine/oscillator-core";
import { getCustomWaveform } from "@/engine/custom-waveforms";
import { midiToFrequency } from "@/utils/synth-math-utils";
import { OscId } from "@/defs/definitions";

type OscillatorsUnit = {
  outputNode: AudioNode;
  update(): void;
  start(time: number): void;
  stop(time?: number): void;
  cleanup(): void;
};

export function createOscillatorsUnit(
  oscId: OscId,
  bus: SynthesisBus,
  noteNumber: number,
): OscillatorsUnit {
  const pk = oscParameterKeys[oscId];
  const ac = bus.audioContext;
  const pr = bus.parameters;
  const outputNode = ac.createGain();
  const osc = createOscillatorCore(ac, outputNode);

  return {
    outputNode,
    update() {
      const frequency = midiToFrequency(noteNumber + pr[pk.octave] * 12);
      osc.setFrequency(frequency);
      osc.setWaveform(getCustomWaveform(ac, pr[pk.wave]));
    },
    start(time) {
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
