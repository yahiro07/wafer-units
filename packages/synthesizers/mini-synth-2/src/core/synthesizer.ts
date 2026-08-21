import { createChorus2 } from "@/core/chorus2";
import {
  defaultSynthParameters,
  ISynthesizerEngine,
  SynthParameters,
} from "@/core/definitions";
import { createReverb2 } from "@/core/reverb2";
import { createSoftClipper } from "@/core/soft-clipper";
import { createVoice, Voice } from "@/core/voice";
import { UnitInterface } from "wafer-host/unit-types";

export function createSynthesizerEngine(
  unitInterface: UnitInterface | undefined,
): ISynthesizerEngine {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;

  const voicesGain = audioContext.createGain();
  const chorus = createChorus2(audioContext);
  const reverb = createReverb2(audioContext);
  const softClipper = createSoftClipper(audioContext);
  const masterGain = audioContext.createGain();

  voicesGain.connect(chorus.inputNode);
  chorus.outputNode.connect(reverb.inputNode);
  reverb.outputNode.connect(softClipper.inputNode);
  softClipper.outputNode.connect(masterGain);
  masterGain.connect(destinationNode);

  const state: {
    parameters: SynthParameters;
    activeVoices: Map<number, Voice>;
  } = {
    parameters: structuredClone(defaultSynthParameters),
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
      softClipper.update(state.parameters.saturation);
      masterGain.gain.value = state.parameters.masterVolume;
    },
  };

  return {
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
