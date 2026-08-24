import {
  defaultSynthParameters,
  ISynthesizer,
  SynthParameters,
} from "@/defs/definitions";
import { createEffectChain } from "@/engine/effect-chain";
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
  const effectChain = createEffectChain(audioContext);

  voicesOutputNode.connect(effectChain.inputNode);
  effectChain.outputNode.connect(destinationNode);

  const voices: Map<number, Voice> = new Map();

  return {
    applyParameters(paramAttrs: Partial<SynthParameters>) {
      Object.assign(parameters, paramAttrs);
      for (const voice of voices.values()) {
        voice.affectParameters();
      }
      voicesOutputNode.gain.linearRampToValueAtTime(
        parameters.patchVolume * 2 * 0.3,
        audioContext.currentTime + 0.02,
      );
      effectChain.update({
        chorusLevel: !parameters.chorusAltReverb ? parameters.chorusLevel : 0,
        reverbLevel: parameters.chorusAltReverb ? parameters.chorusLevel : 0,
      });
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
      effectChain.cleanup();
    },
  };
}
