import type { UnitInterface } from "wafer-host/unit-types";
import { createTiltingEq } from "./tilting-eq";
import { connectNodes } from "@lib/mu2609/utils/webaudio-helper";
import { createReverb } from "./reverb";
import {
  ParameterEditSpec,
  SynthesisBus,
  SynthParameters,
} from "./definitions";
import { createSharedFilterUnit } from "./shared-filter-unit";
import { createSynthesizerVoice, SynthesizerVoice } from "./synthesizer-voice";
import { seqNumbers } from "@lib/mu2609/utils/helpers";

function getNextVoice(voices: SynthesizerVoice[]): SynthesizerVoice {
  let nextVoice = voices.find((voice) => voice.noteNumber === -1);
  if (nextVoice) return nextVoice;
  return [...voices].sort((a, b) => a.gateOnTime - b.gateOnTime)[0];
}

export function createSynthesizerEngine(
  unitInterface: UnitInterface | undefined,
  parameters: SynthParameters,
) {
  const latestParameters = parameters;
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  const bus: SynthesisBus = { audioContext: ac, latestParameters };

  const voicesMixNode = ac.createGain();

  const sharedFilter = createSharedFilterUnit(
    ac,
    () => bus.latestParameters.filter,
    () => bus.latestParameters.amp,
  );

  const voices = seqNumbers(4).map(() =>
    createSynthesizerVoice(bus, voicesMixNode),
  );

  const titlingEq = createTiltingEq(ac);
  const reverb = createReverb(ac);

  const disconnects = connectNodes(
    voicesMixNode,
    sharedFilter,
    titlingEq,
    reverb,
    destinationNode,
  );

  return {
    applyParameters(spec: ParameterEditSpec) {
      if (spec.osc1) {
        Object.assign(latestParameters.osc1, spec.osc1);
        voices.forEach((voice) => {
          voice.updateOscParameters("osc1", latestParameters.osc1);
        });
      }
      if (spec.osc2) {
        Object.assign(latestParameters.osc2, spec.osc2);
        voices.forEach((voice) => {
          voice.updateOscParameters("osc2", latestParameters.osc2);
        });
      }
      if (spec.osc3) {
        Object.assign(latestParameters.osc3, spec.osc3);
        voices.forEach((voice) => {
          voice.updateOscParameters("osc3", latestParameters.osc3);
        });
      }
      if (spec.filter) {
        Object.assign(latestParameters.filter, spec.filter);
        sharedFilter.update();
      }
      if (spec.amp) {
        Object.assign(latestParameters.amp, spec.amp);
      }
      if (spec.reverb) {
        reverb.apply({
          decay: spec.reverb.time,
          damp: spec.reverb.tone,
          mix: spec.reverb.mix,
        });
        Object.assign(latestParameters.reverb, spec.reverb);
      }
      if (spec.eq) {
        titlingEq.update({
          prFreq: spec.eq.freq ?? latestParameters.eq.freq,
          prTilt: spec.eq.tilt ?? latestParameters.eq.tilt,
        });
        Object.assign(latestParameters.eq, spec.eq);
      }
    },
    noteOn(noteNumber: number, time: number) {
      time = Math.max(time ?? 0, ac.currentTime);
      const voice = getNextVoice(voices);
      voice.noteOn(noteNumber, time);
      voice.noteNumber = noteNumber;
      voice.gateOnTime = time;
      sharedFilter.gateOn(time);
    },
    noteOff(noteNumber: number, time: number) {
      time = Math.max(time ?? 0, ac.currentTime);
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
      disconnects();
    },
  };
}
