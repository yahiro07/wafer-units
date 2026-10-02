import type { UnitInterface } from "wafer-host/unit-types";
import { createTiltingEq } from "./tilting-eq";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import { createReverb } from "./reverb";
import { createOscillatorUnit } from "./oscillator-unit";
import {
  OscId,
  OscParameters,
  ParameterEditSpec,
  SynthParameters,
} from "./definitions";

type SynthesisBus = {
  audioContext: AudioContext;
  latestParameters: SynthParameters;
};

type SynthesizerVoice = {
  getGateOnTime(): number;
  updateOscParameters(oscId: OscId, parameters: OscParameters): void;
  noteOn(noteNumber: number): void;
  noteOff(): void;
  cleanup(): void;
};

function createSynthesizerVoice(
  bus: SynthesisBus,
  destinationNode: AudioNode,
): SynthesizerVoice {
  const ac = bus.audioContext;
  const oscMixNode = ac.createGain();

  const osc1 = createOscillatorUnit(ac, oscMixNode);
  const osc2 = createOscillatorUnit(ac, oscMixNode);
  const osc3 = createOscillatorUnit(ac, oscMixNode);

  connectNodes(oscMixNode, destinationNode);

  return {
    getGateOnTime() {
      return 0;
    },
    updateOscParameters(oscId, attrs) {
      const osc = {
        osc1: osc1,
        osc2: osc2,
        osc3: osc3,
      }[oscId];
      osc.updateParameters(attrs);
    },
    noteOn(noteNumber: number) {
      osc1.noteOn(noteNumber, bus.latestParameters.osc1);
      osc2.noteOn(noteNumber, bus.latestParameters.osc2);
      osc3.noteOn(noteNumber, bus.latestParameters.osc3);
    },
    noteOff() {
      osc1.noteOff();
      osc2.noteOff();
      osc3.noteOff();
    },
    cleanup() {
      disconnectNodes(oscMixNode, destinationNode);
    },
  };
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

  const voice = createSynthesizerVoice(bus, voicesMixNode);

  const titlingEq = createTiltingEq(ac);
  const reverb = createReverb(ac);

  const disconnects = connectNodes(
    voicesMixNode,
    titlingEq,
    reverb,
    destinationNode,
  );

  let latestNoteNumber: number | null = null;

  return {
    applyParameters(spec: ParameterEditSpec) {
      if (spec.osc1) {
        Object.assign(latestParameters.osc1, spec.osc1);
        voice.updateOscParameters("osc1", latestParameters.osc1);
      }
      if (spec.osc2) {
        Object.assign(latestParameters.osc2, spec.osc2);
        voice.updateOscParameters("osc2", latestParameters.osc2);
      }
      if (spec.osc3) {
        Object.assign(latestParameters.osc3, spec.osc3);
        voice.updateOscParameters("osc3", latestParameters.osc3);
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
    noteOn(noteNumber: number) {
      voice.noteOn(noteNumber);
      latestNoteNumber = noteNumber;
    },
    noteOff(noteNumber: number) {
      if (noteNumber === latestNoteNumber) {
        voice.noteOff();
        latestNoteNumber = null;
      }
    },
    cleanup() {
      disconnects();
    },
  };
}
