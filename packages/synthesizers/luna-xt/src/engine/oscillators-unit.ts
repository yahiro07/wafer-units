import { oscParameterKeys, SynthesisBus } from "@/engine/engine-defs";
import { createOscillatorUnit } from "@/engine/oscillator-unit";
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
  const osc = createOscillatorUnit(ac, outputNode);

  const internal = {
    applyParameters() {
      const frequency = midiToFrequency(noteNumber);
      osc.setFrequency(frequency);
      osc.setWaveform(getCustomWaveform(ac, pr[pk.wave]));
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
