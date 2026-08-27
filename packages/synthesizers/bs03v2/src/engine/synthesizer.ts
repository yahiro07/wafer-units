import { defaultSynthParameters } from "@/defs/definitions";
import { ISynthesizer } from "@/defs/interfaces";
import { createAmplifierUnit } from "@/engine/amplifier-unit";
import { createEffectChain } from "@/engine/effect-chain";
import { SynthesisBus } from "@/engine/engine-defs";
import { createFilterUnit } from "@/engine/filter-unit";
import { createOscillatorUnit } from "@/engine/oscillator-unit";
import { removeArrayItem } from "@/utils/helpers";
import { UnitInterface } from "wafer-host/unit-types";

type Voice = {
  noteNumber: number;
  gateOnTime: number;
  update(): void;
  gateOn(): void;
  gateOff(time: number): void;
  mute(time: number): void;
  setEndedCallback(fn: () => void): void;
};

function createVoice(
  bus: SynthesisBus,
  voiceMixNode: AudioNode,
  noteNumber: number,
  gateOnTime: number,
): Voice {
  const ac = bus.audioContext;
  let endedCallback: (() => void) | undefined;

  const osc1 = createOscillatorUnit(bus, noteNumber);
  const osc1Amp = createAmplifierUnit(bus);

  osc1.outputNode.connect(osc1Amp.inputNode);
  osc1Amp.outputNode.connect(voiceMixNode);

  const lifeSpanNode = ac.createConstantSource();

  lifeSpanNode.onended = () => {
    osc1.stop();
    osc1.outputNode.disconnect();
    osc1Amp.outputNode.disconnect();
    osc1Amp.cleanup();
    endedCallback?.();
  };

  return {
    noteNumber,
    gateOnTime,
    update() {
      osc1.update();
    },
    gateOn() {
      const time = gateOnTime;
      osc1.start(time);
      osc1Amp.gateOn(time);
      lifeSpanNode.start(time);
    },
    gateOff(time) {
      const tOff = osc1Amp.gateOff(time);
      lifeSpanNode.stop(tOff);
    },
    mute(time) {
      const tOff = osc1Amp.mute(time);
      lifeSpanNode.stop(tOff);
    },
    setEndedCallback(fn) {
      endedCallback = fn;
    },
  };
}

export function createSynthesizer(
  unitInterface: UnitInterface | undefined,
  audioContext: AudioContext,
): ISynthesizer {
  const ac = audioContext;
  const destinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  const voiceMixNode = ac.createGain();
  const activeVoices: Voice[] = [];
  const releasingVoices: Voice[] = [];

  const bus: SynthesisBus = {
    parameters: { ...defaultSynthParameters },
    audioContext: ac,
  };
  const filter = createFilterUnit(bus);
  const effectChain = createEffectChain(bus);

  voiceMixNode.connect(filter.inputNode);
  filter.outputNode.connect(effectChain.inputNode);
  effectChain.outputNode.connect(destinationNode);

  let latestNoteNumber = 48;

  return {
    setParameters(_parameters) {
      Object.assign(bus.parameters, _parameters);
      for (const voice of activeVoices) {
        voice.update();
      }
      filter.update(latestNoteNumber);
      effectChain.update();
    },
    noteOn(noteNumber, time = ac.currentTime) {
      if (releasingVoices.length > 0) {
        for (const voice of releasingVoices) {
          voice.mute(time);
        }
        releasingVoices.length = 0;
      }
      const voice = createVoice(bus, voiceMixNode, noteNumber, time);
      voice.update();
      voice.gateOn();
      activeVoices.push(voice);
      filter.update(noteNumber);
      filter.gateOn(time);
      latestNoteNumber = noteNumber;
    },
    noteOff(noteNumber, time = ac.currentTime) {
      const voice = activeVoices.find((it) => it.noteNumber === noteNumber);
      if (voice) {
        releasingVoices.push(voice);
        voice.setEndedCallback(() => {
          removeArrayItem(releasingVoices, voice);
        });
        voice.gateOff(time);
        removeArrayItem(activeVoices, voice);
      }
      filter.gateOff(time);
    },
    cleanup() {
      voiceMixNode.disconnect();
      effectChain.outputNode.disconnect();
    },
  };
}
