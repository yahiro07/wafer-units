import { midiToFrequency } from "@lib/mu2609/utils/synth-math-utils";
import { defaultSynthParameters, OscParameters } from "./definitions";
import { createCustomWaveformProvider } from "./waveforms/custom-waveform-provider";
import { createOscillatorCore } from "./oscillator-core";

type OscillatorsUnit = {
  noteOn(noteNumber: number, parameters: OscParameters): void;
  noteOff(noteNumber: number): void;
  updateParameters(parameters: Partial<OscParameters>): void;
};

export function createOscillatorsUnit(
  ac: AudioContext,
  destinationNode: AudioNode,
): OscillatorsUnit {
  const waveProvider = createCustomWaveformProvider(ac);

  let latestParameters: OscParameters = defaultSynthParameters["osc1"];

  const core0 = createOscillatorCore(ac, destinationNode);
  const core1 = createOscillatorCore(ac, destinationNode);

  const internal = {
    getPeriodicWave() {
      return waveProvider.getPeriodicWave(latestParameters);
    },
  };

  return {
    noteOn(noteNumber, parameters) {
      latestParameters = parameters;
      const frequency = midiToFrequency(noteNumber);
      const waveform = internal.getPeriodicWave();
      core0.update({
        frequency,
        waveform,
        volume: parameters.volume,
        pan: parameters.pan,
        isPlaying: true,
      });
      core1.update({
        frequency: frequency * 1.05,
        waveform,
        volume: parameters.volume,
        pan: parameters.pan,
        isPlaying: true,
      });
    },
    noteOff(noteNumber) {
      core0.update({ isPlaying: false });
      core1.update({ isPlaying: false });
    },
    updateParameters(pr) {
      Object.assign(latestParameters, pr);
      const needUpdateWave = (["wave", "shape", "dense", "mix"] as const).some(
        (key) => pr[key] !== undefined,
      );
      if (needUpdateWave) {
        const waveform = internal.getPeriodicWave();
        core0.update({ waveform });
        core1.update({ waveform });
      }
      if (pr.volume !== undefined) {
        core0.update({ volume: pr.volume });
        core1.update({ volume: pr.volume });
      }
      if (pr.pan !== undefined) {
        core0.update({ pan: pr.pan });
        core1.update({ pan: pr.pan });
      }
    },
  };
}
