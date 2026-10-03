import { midiToFrequency } from "@lib/mu2609/utils/synth-math-utils";
import { OscParameters } from "./definitions";
import { createCustomWaveformProvider } from "./waveforms/custom-waveform-provider";
import { createOscillatorCore } from "./oscillator-core";
import { seqNumbers } from "@lib/mu2609/utils/helpers";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import { buildUnisonPartialSpecs } from "./unison-partial-specs";
import { mapKnobCurveCenterUnity } from "@lib/mu2609/utils/volume-curve";

type OscillatorUnit = {
  noteOn(noteNumber: number, time: number, parameters: OscParameters): void;
  noteOff(time: number): void;
  updateParameters(parameters: OscParameters): void;
  cleanup(): void;
};

const configs = {
  phaseRandomMaxSec: 0.003,
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
    applyParameters(
      pr: OscParameters,
      time: number,
      withStartDelay: boolean = false,
    ) {
      if (playingNoteNumber === null) return;
      if (!pr.enabled) {
        cores.forEach((core) => core.update({ isPlaying: false }, time));
        return;
      }
      const waveform = waveProvider.getPeriodicWave(pr);
      const unisonPartialSpecs = buildUnisonPartialSpecs(pr);
      const frequency = midiToFrequency(playingNoteNumber);
      for (let i = 0; i < 7; i++) {
        const active = i <= pr.unison - 1;
        const core = cores[i];
        if (!active) {
          core.update({ isPlaying: false }, time);
          continue;
        }
        const spec = unisonPartialSpecs[i];
        const detune = spec.octave * 1200 + spec.detune * 100;
        const startDelay =
          withStartDelay && !spec.isCore
            ? Math.random() * configs.phaseRandomMaxSec
            : 0;
        core.update(
          {
            frequency,
            detune,
            volume: spec.volume,
            pan: spec.panning,
            isPlaying: active,
            waveform,
          },
          time + startDelay,
        );
      }
    },
  };

  return {
    noteOn(noteNumber, time, pr) {
      playingNoteNumber = noteNumber;
      internal.applyParameters(pr, time, pr.phaseRandom);
    },
    noteOff(time) {
      cores.forEach((core) => core.update({ isPlaying: false }, time));
      playingNoteNumber = null;
    },
    updateParameters(pr) {
      if (pr.volume !== undefined) {
        gainNode.gain.value = mapKnobCurveCenterUnity(pr.volume);
      }
      if (pr.pan !== undefined) {
        pannerNode.pan.value = pr.pan;
      }
      if (playingNoteNumber === null) return;
      internal.applyParameters(pr, ac.currentTime);
    },
    cleanup() {
      disconnectNodes(gainNode, pannerNode, destinationNode);
      cores.forEach((core) => core.cleanup());
    },
  };
}
