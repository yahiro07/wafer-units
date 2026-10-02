import type { UnitInterface } from "wafer-host/unit-types";
import { createTiltingEq } from "./tilting-eq";
import { connectNodes } from "@lib/mu2609/utils/webaudio-helper";
import { createReverb } from "./reverb";
import { createOscillatorUnit } from "./oscillator-unit";
import {
  OscId,
  OscParameters,
  ParameterEditSpec,
  SynthParameters,
} from "./definitions";
import { createAmplifierUnit } from "./envelope-unit";
import { createSharedFilterUnit } from "./shared-filter-unit";

type SynthesisBus = {
  audioContext: AudioContext;
  latestParameters: SynthParameters;
};

type SynthesizerVoice = {
  getGateOnTime(): number;
  updateOscParameters(oscId: OscId, parameters: OscParameters): void;
  noteOn(noteNumber: number, time: number): void;
  noteOff(time: number): void;
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
  const amplifier = createAmplifierUnit(ac, () => bus.latestParameters.amp);

  const disconnects = connectNodes(oscMixNode, amplifier, destinationNode);

  return {
    getGateOnTime() {
      return 0;
    },
    updateOscParameters(oscId, parameters) {
      const osc = { osc1, osc2, osc3 }[oscId];
      osc.updateParameters(parameters);
    },
    noteOn(noteNumber: number, time: number) {
      const params = bus.latestParameters;
      osc1.noteOn(noteNumber, time, params.osc1);
      osc2.noteOn(noteNumber, time, params.osc2);
      osc3.noteOn(noteNumber, time, params.osc3);
      amplifier.gateOn(time);
    },
    noteOff(time: number) {
      const tOff = amplifier.gateOff(time, true);
      osc1.noteOff(tOff);
      osc2.noteOff(tOff);
      osc3.noteOff(tOff);
    },
    cleanup() {
      disconnects();
      osc1.cleanup();
      osc2.cleanup();
      osc3.cleanup();
      amplifier.cleanup();
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

  const sharedFilter = createSharedFilterUnit(
    ac,
    () => bus.latestParameters.filter,
    () => bus.latestParameters.amp,
  );

  const voice = createSynthesizerVoice(bus, voicesMixNode);

  const titlingEq = createTiltingEq(ac);
  const reverb = createReverb(ac);

  const disconnects = connectNodes(
    voicesMixNode,
    sharedFilter,
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
      voice.noteOn(noteNumber, time);
      sharedFilter.gateOn(time);
      latestNoteNumber = noteNumber;
    },
    noteOff(noteNumber: number, time: number) {
      time = Math.max(time ?? 0, ac.currentTime);
      if (noteNumber === latestNoteNumber) {
        voice.noteOff(time);
        sharedFilter.gateOff(time);
        latestNoteNumber = null;
      }
    },
    cleanup() {
      disconnects();
    },
  };
}
