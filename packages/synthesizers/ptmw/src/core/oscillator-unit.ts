import { midiToFrequency, power2 } from "@lib/mu2609/utils/synth-math-utils";
import { OscParameters } from "./definitions";
import { createCustomWaveformProvider } from "./waveforms/custom-waveform-provider";
import { createOscillatorCore } from "./oscillator-core";
import { seqNumbers } from "@lib/mu2609/utils/helpers";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";

type OscillatorUnit = {
  noteOn(noteNumber: number, parameters: OscParameters): void;
  noteOff(): void;
  updateParameters(parameters: OscParameters): void;
  cleanup(): void;
};

export function createOscillatorUnit(
  ac: AudioContext,
  destinationNode: AudioNode,
): OscillatorUnit {
  const waveProvider = createCustomWaveformProvider(ac);

  let playingNoteNumber: number | null = null;

  const gainNode = ac.createGain();
  const pannerNode = ac.createStereoPanner();

  connectNodes(gainNode, pannerNode, destinationNode);

  const cores = seqNumbers(7).map(() => createOscillatorCore(ac, gainNode));

  const internal = {
    applyParameters(pr: OscParameters) {
      if (playingNoteNumber === null) return;
      const waveform = waveProvider.getPeriodicWave(pr);
      const frequency = midiToFrequency(playingNoteNumber + pr.octave * 12);
      cores.forEach((core, i) => {
        const active = i <= pr.unison - 1;
        core.update({
          frequency: frequency * (1 + i * 0.01 * power2(pr.detune)),
          volume: 1, //for unison mix
          pan: 0, //for unison spread
          isPlaying: active,
          waveform,
        });
      });
    },
  };

  return {
    noteOn(noteNumber, pr) {
      playingNoteNumber = noteNumber;
      internal.applyParameters(pr);
    },
    noteOff() {
      cores.forEach((core) => core.update({ isPlaying: false }));
      playingNoteNumber = null;
    },
    updateParameters(pr) {
      if (pr.volume !== undefined) {
        gainNode.gain.value = pr.volume;
      }
      if (pr.pan !== undefined) {
        pannerNode.pan.value = pr.pan;
      }
      if (playingNoteNumber === null) return;
      internal.applyParameters(pr);
    },
    cleanup() {
      disconnectNodes(gainNode, pannerNode, destinationNode);
      cores.forEach((core) => core.cleanup());
    },
  };
}
