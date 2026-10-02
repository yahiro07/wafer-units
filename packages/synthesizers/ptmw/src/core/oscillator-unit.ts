import { midiToFrequency, power2 } from "@lib/mu2609/utils/synth-math-utils";
import { defaultSynthParameters, OscParameters } from "./definitions";
import { createCustomWaveformProvider } from "./waveforms/custom-waveform-provider";
import { createOscillatorCore } from "./oscillator-core";
import { seqNumbers } from "@lib/mu2609/utils/helpers";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";

type OscillatorUnit = {
  noteOn(noteNumber: number, parameters: OscParameters): void;
  noteOff(noteNumber: number): void;
  updateParameters(parameters: Partial<OscParameters>): void;
  cleanup(): void;
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

  const gainNode = ac.createGain();
  const pannerNode = ac.createStereoPanner();

  connectNodes(gainNode, pannerNode, destinationNode);

  const cores = seqNumbers(7).map(() => createOscillatorCore(ac, gainNode));

  const internal = {
    applyWaveform() {
      const waveform = waveProvider.getPeriodicWave(latestParameters);
      cores.forEach((core) => core.update({ waveform }));
    },
    applyFormation() {
      if (playingNoteNumber === null) return;
      const pr = latestParameters;
      const frequency = midiToFrequency(playingNoteNumber + pr.octave * 12);
      cores.forEach((core, i) => {
        const active = i <= pr.unison - 1;
        core.update({
          frequency: frequency * (1 + i * 0.01 * power2(pr.detune)),
          volume: 1, //for unison mix
          pan: 0, //for unison spread
          isPlaying: active,
        });
      });
    },
  };

  return {
    noteOn(noteNumber, pr) {
      Object.assign(latestParameters, pr);
      playingNoteNumber = noteNumber;
      internal.applyWaveform();
      internal.applyFormation();
    },
    noteOff(noteNumber) {
      cores.forEach((core) => core.update({ isPlaying: false }));
      playingNoteNumber = null;
    },
    updateParameters(pr) {
      Object.assign(latestParameters, pr);
      if (pr.volume !== undefined) {
        gainNode.gain.value = pr.volume;
      }
      if (pr.pan !== undefined) {
        pannerNode.pan.value = pr.pan;
      }
      if (playingNoteNumber === null) return;
      const needUpdateWave = (["wave", "shape", "dense", "mix"] as const).some(
        (key) => pr[key] !== undefined,
      );
      if (needUpdateWave) {
        internal.applyWaveform();
      }
      const needUpdateFormation = (
        ["octave", "unison", "detune"] as const
      ).some((key) => pr[key] !== undefined);
      if (needUpdateFormation) {
        internal.applyFormation();
      }
    },
    cleanup() {
      disconnectNodes(gainNode, pannerNode, destinationNode);
      cores.forEach((core) => core.cleanup());
    },
  };
}
