import { defaultSynthParameters, SynthesizerEngine } from "@/defs/definitions";
import { createAmplifierUnit } from "@/engine/amplifier-unit";
import { createEffectChain } from "@/engine/effect-chain";
import { SynthesisBus } from "@/engine/engine-defs";
import { createOscillatorsUnit } from "@/engine/oscillators-unit";
import { createSharedFilterUnit } from "@/engine/shared-filter-unit";
import { removeArrayItem } from "@/utils/helpers";
import { UnitInterface } from "wafer-host/unit-types";

type Voice = {
  noteNumber: number;
  gateOnTime: number;
  update(): void;
  gateOn(): void;
  gateOff(time: number, applyRelease: boolean): void;
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

  const osc1 = createOscillatorsUnit("osc1", bus, noteNumber);
  const osc2 = createOscillatorsUnit("osc2", bus, noteNumber);
  const osc1Amp = createAmplifierUnit("osc1", bus);
  const osc2Amp = createAmplifierUnit("osc2", bus);

  osc1.outputNode.connect(osc1Amp.inputNode);
  osc1Amp.outputNode.connect(voiceMixNode);
  osc2.outputNode.connect(osc2Amp.inputNode);
  osc2Amp.outputNode.connect(voiceMixNode);

  const lifeSpanNode = ac.createConstantSource();

  lifeSpanNode.onended = () => {
    osc1.stop();
    osc2.stop();
    osc1.outputNode.disconnect();
    osc1Amp.outputNode.disconnect();
    osc2.outputNode.disconnect();
    osc2Amp.outputNode.disconnect();
    osc1Amp.cleanup();
    osc2Amp.cleanup();
    endedCallback?.();
  };

  return {
    noteNumber,
    gateOnTime,
    update() {
      osc1.update();
      osc2.update();
    },
    gateOn() {
      const time = gateOnTime;
      osc1.start(time);
      osc1Amp.gateOn(time);
      osc2.start(time);
      osc2Amp.gateOn(time);
      lifeSpanNode.start(time);
    },
    gateOff(time, applyRelease) {
      const tOff = osc1Amp.gateOff(time, applyRelease);
      osc2Amp.gateOff(time, applyRelease);
      lifeSpanNode.stop(tOff);
    },
    mute(time) {
      const tOff = osc1Amp.mute(time);
      osc2Amp.mute(time);
      lifeSpanNode.stop(tOff);
    },
    setEndedCallback(fn) {
      endedCallback = fn;
    },
  };
}

export function createSynthesizerEngine(
  unitInterface: UnitInterface | undefined,
): SynthesizerEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode = unitInterface?.audioInputNode ?? ac.destination;

  const voiceMixNode = ac.createGain();
  const activeVoices: Voice[] = [];
  const releasingVoices: Voice[] = [];

  const bus: SynthesisBus = {
    parameters: { ...defaultSynthParameters },
    audioContext: ac,
  };
  const sharedFilter = createSharedFilterUnit(bus);
  const effectChain = createEffectChain(bus);

  voiceMixNode.gain.value = 0.3;
  voiceMixNode.connect(sharedFilter.inputNode);
  sharedFilter.outputNode.connect(effectChain.inputNode);
  effectChain.outputNode.connect(destinationNode);

  return {
    affectParameters(_parameters) {
      Object.assign(bus.parameters, _parameters);
      for (const voice of activeVoices) {
        voice.update();
      }
    },
    noteOn(noteNumber, time = ac.currentTime) {
      if (bus.parameters.ampReleaseLastOnly && releasingVoices.length > 0) {
        for (const voice of releasingVoices) {
          voice.mute(time);
        }
        releasingVoices.length = 0;
      }
      const voice = createVoice(bus, voiceMixNode, noteNumber, time);
      voice.gateOn();
      activeVoices.push(voice);
      sharedFilter.gateOn(time);
    },
    noteOff(noteNumber, time = ac.currentTime) {
      const voice = activeVoices.find((it) => it.noteNumber === noteNumber);
      if (voice) {
        const isLastVoice = activeVoices.length === 1;
        const applyRelease = bus.parameters.ampReleaseLastOnly
          ? isLastVoice
          : true;
        if (applyRelease) {
          releasingVoices.push(voice);
          voice.setEndedCallback(() => {
            removeArrayItem(releasingVoices, voice);
          });
        }
        voice.gateOff(time, applyRelease);
        removeArrayItem(activeVoices, voice);
      }
      sharedFilter.gateOff(time);
    },
    cleanup() {
      voiceMixNode.disconnect();
      effectChain.outputNode.disconnect();
    },
  };
}
