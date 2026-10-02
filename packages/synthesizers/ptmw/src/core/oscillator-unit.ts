import { midiToFrequency } from "@lib/mu2609/utils/synth-math-utils";
import { defaultSynthParameters, OscParameters } from "./definitions";
import { createCustomWaveformProvider } from "./waveforms/custom-waveform-provider";
import { createOscillatorCore } from "./oscillator-core";

type OscillatorUnit = {
  noteOn(noteNumber: number, parameters: OscParameters): void;
  noteOff(noteNumber: number): void;
  updateParameters(parameters: Partial<OscParameters>): void;
};

export function createOscillatorUnit(
  ac: AudioContext,
  destinationNode: AudioNode,
): OscillatorUnit {
  const waveProvider = createCustomWaveformProvider(ac);

  let playingNoteNumber: number | null = null;
  let latestParameters: OscParameters = structuredClone(
    defaultSynthParameters["osc1"],
  );

  const core0 = createOscillatorCore(ac, destinationNode);
  const core1 = createOscillatorCore(ac, destinationNode);

  const internal = {
    getPeriodicWave() {
      return waveProvider.getPeriodicWave(latestParameters);
    },
    updateCores() {
      if (playingNoteNumber === null) return;
      const pr = latestParameters;
      const frequency = midiToFrequency(playingNoteNumber);
      const waveform = internal.getPeriodicWave();
      core0.update({
        frequency,
        waveform,
        volume: pr.volume,
        pan: pr.pan,
        isPlaying: true,
      });
      if (pr.unison >= 2) {
        core1.update({
          frequency: frequency * 1.05,
          waveform,
          volume: pr.volume,
          pan: pr.pan,
          isPlaying: true,
        });
      } else {
        core1.update({ isPlaying: false });
      }
    },
  };

  return {
    noteOn(noteNumber, pr) {
      latestParameters = pr;
      playingNoteNumber = noteNumber;
      internal.updateCores();
    },
    noteOff(noteNumber) {
      core0.update({ isPlaying: false });
      core1.update({ isPlaying: false });
      playingNoteNumber = null;
    },
    updateParameters(pr) {
      Object.assign(latestParameters, pr);
      if (playingNoteNumber === null) return;
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
      if (pr.unison !== undefined) {
        internal.updateCores();
      }
    },
  };
}
