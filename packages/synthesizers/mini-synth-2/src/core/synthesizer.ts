import { createChorus2 } from "@/core/chorus2";
import { SynthParameters } from "@/core/definitions";
import { createReverb } from "@/core/reverb";
import { createSoftClipper } from "@/core/soft-clipper";
import { createVoice, Voice } from "@/core/voice";

export type ISynthesizer = {
  outputNode: GainNode;
  setParameters: (parameters: SynthParameters) => void;
  noteOn: (noteNumber: number, time: number, velocity: number) => void;
  noteOff: (noteNumber: number, time: number) => void;
  cleanup: () => void;
};

export function createSynthesizer(
  audioContext: AudioContext,
  initialParameters: SynthParameters,
): ISynthesizer {
  const outputNode = audioContext.createGain();

  const voicesGain = audioContext.createGain();
  const chorus = createChorus2(audioContext);
  const reverb = createReverb(audioContext);
  const softClipper = createSoftClipper(audioContext);
  const masterGain = audioContext.createGain();

  voicesGain.connect(chorus.inputNode);
  chorus.outputNode.connect(reverb.inputNode);
  reverb.outputNode.connect(softClipper.inputNode);
  softClipper.outputNode.connect(masterGain);
  masterGain.connect(outputNode);

  const state: {
    parameters: SynthParameters;
    activeVoices: Map<number, Voice>;
  } = {
    parameters: initialParameters,
    activeVoices: new Map<number, Voice>(),
  };

  const internal = {
    wrapCreateVoice(noteNumber: number, time: number, velocity: number): Voice {
      const voice = createVoice(audioContext, state.parameters);
      voice.outputNode.connect(voicesGain);
      voice.noteOn(noteNumber, time, velocity);
      state.activeVoices.set(noteNumber, voice);
      return voice;
    },
    stopVoice(noteNumber: number, time: number) {
      const voice = state.activeVoices.get(noteNumber);
      if (voice) {
        voice.noteOff(time);
        state.activeVoices.delete(noteNumber);
      }
    },
    applyParametersToVoices() {
      for (const voice of state.activeVoices.values()) {
        voice.updateNodeParameters(state.parameters);
      }
      chorus.update(state.parameters.fxChorus);
      reverb.update(state.parameters.fxReverb);
      masterGain.gain.value = state.parameters.masterVolume;
    },
  };

  return {
    outputNode,
    setParameters(parameters) {
      state.parameters = parameters;
      internal.applyParametersToVoices();
    },
    noteOn(noteNumber, time, velocity) {
      internal.stopVoice(noteNumber, time);
      internal.wrapCreateVoice(noteNumber, time, velocity);
    },
    noteOff(noteNumber, time) {
      internal.stopVoice(noteNumber, time);
    },
    cleanup() {
      chorus.cleanup();
      reverb.cleanup();
      softClipper.cleanup();
      masterGain.disconnect();
      voicesGain.disconnect();
    },
  };
}
