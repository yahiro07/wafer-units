import { seqNumbers } from "@lib/mu2609/utils/helpers";
import { connectNodes } from "@lib/mu2609/utils/webaudio-helper";
import { SynthesisBus, ParameterEditSpec } from "./definitions";
import { createSharedFilterUnit } from "./shared-filter-unit";
import { SynthesizerVoice, createSynthesizerVoice } from "./synthesizer-voice";

function getNextVoice(voices: SynthesizerVoice[]): SynthesizerVoice {
  const sorted = [...voices].sort((a, b) => a.gateOnTime - b.gateOnTime);
  return sorted.find((it) => it.noteNumber === -1) ?? sorted[0];
}

export function createVoicesStage(bus: SynthesisBus) {
  const voicesMixNode = bus.audioContext.createGain();
  voicesMixNode.gain.value = 0.25;

  const voices = seqNumbers(6).map(() =>
    createSynthesizerVoice(bus, voicesMixNode),
  );
  const sharedFilter = createSharedFilterUnit(
    bus.audioContext,
    () => bus.latestParameters.filter,
    () => bus.latestParameters.amp,
  );
  const disconnects = connectNodes(voicesMixNode, sharedFilter);

  return {
    outputNode: sharedFilter,
    applyParameters(spec: ParameterEditSpec) {
      if (spec.osc1) {
        voices.forEach((voice) => {
          voice.updateOscParameters("osc1", bus.latestParameters.osc1);
        });
      }
      if (spec.osc2) {
        voices.forEach((voice) => {
          voice.updateOscParameters("osc2", bus.latestParameters.osc2);
        });
      }
      if (spec.osc3) {
        voices.forEach((voice) => {
          voice.updateOscParameters("osc3", bus.latestParameters.osc3);
        });
      }
      if (spec.filter) {
        sharedFilter.update();
      }
    },
    noteOn(noteNumber: number, time: number) {
      time = Math.max(time ?? 0, bus.audioContext.currentTime);
      const voice = getNextVoice(voices);
      voice.noteOn(noteNumber, time);
      voice.noteNumber = noteNumber;
      voice.gateOnTime = time;
      sharedFilter.gateOn(time);
    },
    noteOff(noteNumber: number, time: number) {
      time = Math.max(time ?? 0, bus.audioContext.currentTime);
      const voice = voices.find((voice) => voice.noteNumber === noteNumber);
      if (voice) {
        voice.noteOff(time);
        sharedFilter.gateOff(time);
        voice.noteNumber = -1;
      }
    },
    cleanup() {
      voices.forEach((voice) => {
        voice.cleanup();
      });
      sharedFilter.cleanup();
      disconnects();
    },
  };
}
