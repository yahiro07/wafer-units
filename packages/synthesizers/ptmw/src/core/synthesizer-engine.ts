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
import { createOutputSaturator } from "./output-saturator";

function getNextVoice(voices: SynthesizerVoice[]): SynthesizerVoice {
  const sorted = [...voices].sort((a, b) => a.gateOnTime - b.gateOnTime);
  return sorted.find((it) => it.noteNumber === -1) ?? sorted[0];
}

function createVoicesStage(bus: SynthesisBus) {
  const voicesMixNode = bus.audioContext.createGain();
  voicesMixNode.gain.value = 0.7;

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

function createEffectChain(bus: SynthesisBus) {
  const ac = bus.audioContext;
  const inputNode = ac.createGain();
  const outputNode = ac.createGain();
  const titlingEq = createTiltingEq(ac);
  const saturator = createOutputSaturator(ac);
  saturator.update(1);
  const reverb = createReverb(ac);

  const disconnects = connectNodes(
    inputNode,
    titlingEq,
    saturator,
    reverb,
    outputNode,
  );

  return {
    inputNode,
    outputNode,
    applyParameters(spec: ParameterEditSpec) {
      if (spec.reverb) {
        reverb.apply({
          decay: spec.reverb.time,
          damp: spec.reverb.tone,
          mix: spec.reverb.mix,
        });
      }
      if (spec.eq) {
        titlingEq.update({
          prFreq: bus.latestParameters.eq.freq,
          prTilt: bus.latestParameters.eq.tilt,
        });
      }
    },
    cleanup() {
      titlingEq.cleanup();
      saturator.cleanup();
      reverb.cleanup();
      disconnects();
    },
  };
}

export function createSynthesizerEngine(
  unitInterface: UnitInterface | undefined,
  parameters: SynthParameters,
) {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  const bus: SynthesisBus = { audioContext: ac, latestParameters: parameters };

  const voicesStage = createVoicesStage(bus);
  const effectChain = createEffectChain(bus);

  const disconnects = connectNodes(
    voicesStage.outputNode,
    effectChain,
    destinationNode,
  );

  return {
    applyParameters(spec: ParameterEditSpec) {
      for (const _key in spec) {
        const key = _key as keyof SynthParameters;
        Object.assign(bus.latestParameters[key], spec[key]);
      }
      voicesStage.applyParameters(spec);
      effectChain.applyParameters(spec);
    },
    noteOn(noteNumber: number, time: number) {
      voicesStage.noteOn(noteNumber, time);
    },
    noteOff(noteNumber: number, time: number) {
      voicesStage.noteOff(noteNumber, time);
    },
    cleanup() {
      voicesStage.cleanup();
      effectChain.cleanup();
      disconnects();
    },
  };
}
