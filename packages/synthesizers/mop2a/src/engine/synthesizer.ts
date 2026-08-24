import {
  defaultSynthParameters,
  ISynthesizer,
  SynthParameters,
} from "@/defs/definitions";
import { createVoice, Voice } from "@/engine/voice";
import { UnitInterface } from "wafer-host/unit-types";

export function createSynthesizerEngine(
  unitInterface: UnitInterface | undefined,
): ISynthesizer {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;
  const parameters = structuredClone(defaultSynthParameters);

  const voicesOutputNode = audioContext.createGain();
  voicesOutputNode.connect(destinationNode);

  const voices: Map<number, Voice> = new Map();

  return {
    applyParameters(paramAttrs: Partial<SynthParameters>) {
      Object.assign(parameters, paramAttrs);
      for (const voice of voices.values()) {
        voice.affectParameters();
      }
      voicesOutputNode.gain.value = parameters.patchVolume * 2;
    },
    noteOn(noteNumber: number, time?: number) {
      time ??= audioContext.currentTime;
      const voice = createVoice(
        audioContext,
        voicesOutputNode,
        parameters,
        noteNumber,
      );
      voice.affectParameters();
      voice.triggerAttack(time);
      voices.set(noteNumber, voice);
    },
    noteOff(noteNumber: number, time?: number) {
      time ??= audioContext.currentTime;
      const voice = voices.get(noteNumber);
      if (voice) {
        voice.triggerRelease(time);
        voices.delete(noteNumber);
      }
    },
    cleanup() {
      voicesOutputNode.disconnect();
    },
  };
}
