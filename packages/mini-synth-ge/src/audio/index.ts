import { createEffect } from "solid-js";
import { getUnitInterface } from "wus-unit-types";
import { appState, SynthParameters } from "@/store/store";
import { createChorus } from "./chorus";
import { createReverb } from "./reverb";
import { createVoice } from "./voice";

export const unitInterface = getUnitInterface();

let engineInstance: ReturnType<typeof createAudioEngine> | null = null;

function createAudioEngine() {
  const context = unitInterface?.audioContext ?? new AudioContext();
  const destNode =
    unitInterface?.primaryOutputPort.audioOutput.node ?? context.destination;

  const voicesGain = context.createGain();
  const chorus = createChorus(context);
  const reverb = createReverb(context);
  const masterGain = context.createGain();

  voicesGain.connect(chorus.inputNode);
  chorus.outputNode.connect(reverb.inputNode);
  reverb.outputNode.connect(masterGain);
  masterGain.connect(destNode);

  const activeVoices = new Map<number, ReturnType<typeof createVoice>>();

  return {
    async resumeIfNeed() {
      if (context.state === "suspended") {
        await context.resume();
      }
    },
    noteOn(note: number, velocity: number) {
      const existing = activeVoices.get(note);
      if (existing) {
        existing.noteOff();
      }
      const voice = createVoice(context, note, velocity, appState.parameters);
      voice.outputNode.connect(voicesGain);
      activeVoices.set(note, voice);
    },
    noteOff(note: number) {
      const existing = activeVoices.get(note);
      if (existing) {
        existing.noteOff();
        activeVoices.delete(note);
      }
    },
    updateNodeParameters(params: SynthParameters) {
      chorus.updateNodeParameters(params);
      reverb.updateNodeParameters(params);
      masterGain.gain.value = params.masterVolume;
    },
  };
}

export function getAudioEngine() {
  if (!engineInstance) {
    engineInstance = createAudioEngine();
    createEffect(() => {
      engineInstance!.updateNodeParameters(appState.parameters);
    });
  }
  return engineInstance;
}
