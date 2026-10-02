import { midiToFrequency } from "@lib/mu2609/utils/synth-math-utils";
import { OscParameters } from "./definitions";
import { createCustomWaveformProvider } from "./waveforms/custom-waveform-provider";

type OscillatorUnit = {
  noteOn(noteNumber: number, parameters: OscParameters): void;
  noteOff(noteNumber: number): void;
  updateParameters(parameters: OscParameters): void;
};

export function createOscillatorUnit(
  ac: AudioContext,
  destinationNode: AudioNode,
): OscillatorUnit {
  const waveProvider = createCustomWaveformProvider(ac);

  let osc: OscillatorNode | null = null;
  let latestWave: PeriodicWave | null = null;

  const internal = {
    updateParameters(parameters: OscParameters) {
      if (!osc) return;
      const pr = parameters;
      const wave = waveProvider.getPeriodicWave({
        wave: pr.wave,
        shape: pr.shape,
        dense: pr.dense,
        mix: pr.mix,
      });
      if (latestWave !== wave) {
        osc.setPeriodicWave(wave);
        latestWave = wave;
      }
    },
  };

  return {
    noteOn(noteNumber, parameters) {
      if (osc) {
        osc.stop();
      }
      const freq = midiToFrequency(noteNumber);
      osc = ac.createOscillator();
      latestWave = null;
      internal.updateParameters(parameters);
      osc.frequency.value = freq;
      osc.connect(destinationNode);
      osc.start();
    },
    noteOff(noteNumber) {
      osc?.stop();
      osc = null;
    },
    updateParameters: internal.updateParameters,
  };
}
