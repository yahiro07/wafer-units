import { createEffect } from "solid-js";
import { queryUnitInterface } from "wus-unit-types";
import { appState, SynthParameters } from "@/store/store";
import { createChorus } from "./chorus";
import { createReverb } from "./reverb";
import { createVoice } from "./voice";

export const unitInterface = queryUnitInterface("wus-v01");

let engineInstance: ReturnType<typeof createAudioEngine> | null = null;

function createAudioEngine() {
  const context = unitInterface?.audioContext ?? new AudioContext();
  const destNode = unitInterface?.audioOutputNode ?? context.destination;

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
    noteOn(note: number, velocity: number, time?: number) {
      const existing = activeVoices.get(note);
      if (existing) {
        existing.noteOff(time);
      }
      const voice = createVoice(
        context,
        note,
        velocity,
        appState.parameters,
        time,
      );
      voice.outputNode.connect(voicesGain);
      activeVoices.set(note, voice);
    },
    noteOff(note: number, time?: number) {
      const existing = activeVoices.get(note);
      if (existing) {
        existing.noteOff(time);
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
