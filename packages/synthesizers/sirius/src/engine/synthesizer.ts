import { createChorus2 } from "@/engine/chorus2";
import {
  defaultSynthParameters,
  ISynthesizerEngine,
  SynthParameters,
} from "@/defs/definitions";
import { createOutputSaturator } from "@/engine/output-saturator";
import { createReverb2 } from "@/engine/reverb2";
import { createVoice, Voice } from "@/engine/voice";
import { UnitInterface } from "wafer-host/unit-types";
import { mapVolumeControlCurveCenterUnityBrokenLinear } from "@/engine/curve";

export function createSynthesizerEngine(
  unitInterface: UnitInterface | undefined,
): ISynthesizerEngine {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;

  const voicesGain = audioContext.createGain();
  const chorus = createChorus2(audioContext);
  const reverb = createReverb2(audioContext);
  // const softClipper = createSoftClipper(audioContext);
  const softClipper = createOutputSaturator(audioContext);
  const masterGain = audioContext.createGain();

  voicesGain.connect(chorus.inputNode);
  chorus.outputNode.connect(reverb.inputNode);
  reverb.outputNode.connect(masterGain);
  masterGain.connect(softClipper.inputNode);
  softClipper.outputNode.connect(destinationNode);

  const state: {
    parameters: SynthParameters;
    activeVoices: Map<number, Voice>;
  } = {
    parameters: structuredClone(defaultSynthParameters),
    activeVoices: new Map<number, Voice>(),
  };

  const internal = {
    wrapCreateVoice(noteNumber: number, time: number, velocity: number): Voice {
      const voice = createVoice(
        audioContext,
        state.parameters,
        noteNumber,
        velocity,
      );
      voice.outputNode.connect(voicesGain);
      voice.gateOn(time);
      state.activeVoices.set(noteNumber, voice);
      return voice;
    },
    stopVoice(noteNumber: number, time: number) {
      const voice = state.activeVoices.get(noteNumber);
      if (voice) {
        voice.gateOff(time);
        state.activeVoices.delete(noteNumber);
      }
    },
    applyParametersToVoices() {
      for (const voice of state.activeVoices.values()) {
        voice.updateNodeParameters();
      }
      chorus.update(state.parameters.fxChorus);
      reverb.update(state.parameters.fxReverb);
      const outGain =
        mapVolumeControlCurveCenterUnityBrokenLinear(
          state.parameters.patchVolume,
        ) * 0.7;
      masterGain.gain.linearRampToValueAtTime(
        outGain,
        audioContext.currentTime + 0.1,
      );
    },
  };

  return {
    setParameters(parameters) {
      Object.assign(state.parameters, parameters);
      internal.applyParametersToVoices();
    },
    noteOn(noteNumber, time = audioContext.currentTime, velocity = 1) {
      internal.stopVoice(noteNumber, time);
      internal.wrapCreateVoice(noteNumber, time, velocity);
    },
    noteOff(noteNumber, time = audioContext.currentTime) {
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
