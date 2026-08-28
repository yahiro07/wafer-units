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
  const amp = createAmplifierUnit(bus);
  const osc1MixGain = ac.createGain();
  const osc2MixGain = ac.createGain();

  osc1.outputNode.connect(osc1MixGain);
  osc2.outputNode.connect(osc2MixGain);
  osc1MixGain.connect(amp.inputNode);
  osc2MixGain.connect(amp.inputNode);
  amp.outputNode.connect(voiceMixNode);

  const lifeSpanNode = ac.createConstantSource();

  lifeSpanNode.onended = () => {
    osc1.stop();
    osc2.stop();
    osc1.outputNode.disconnect();
    osc2.outputNode.disconnect();
    osc1MixGain.disconnect();
    osc2MixGain.disconnect();
    amp.outputNode.disconnect();
    amp.cleanup();
    endedCallback?.();
  };

  return {
    noteNumber,
    gateOnTime,
    update() {
      osc1.update();
      osc2.update();
      const t = bus.parameters.oscMix;
      osc1MixGain.gain.value = Math.sqrt(1 - t);
      osc2MixGain.gain.value = Math.sqrt(t);
    },
    gateOn() {
      const time = gateOnTime;
      osc1.start(time);
      osc2.start(time);
      amp.gateOn(time);
      lifeSpanNode.start(time);
    },
    gateOff(time, applyRelease) {
      const tOff = amp.gateOff(time, applyRelease);
      lifeSpanNode.stop(tOff);
    },
    mute(time) {
      const tOff = amp.mute(time);
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
  const destinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  const voiceMixNode = ac.createGain();
  const activeVoices: Voice[] = [];
  const releasingVoices: Voice[] = [];

  const bus: SynthesisBus = {
    parameters: { ...defaultSynthParameters },
    audioContext: ac,
  };
  const sharedFilter = createSharedFilterUnit(bus);
  const effectChain = createEffectChain(bus);

  voiceMixNode.connect(sharedFilter.inputNode);
  sharedFilter.outputNode.connect(effectChain.inputNode);
  effectChain.outputNode.connect(destinationNode);

  return {
    affectParameters(_parameters) {
      Object.assign(bus.parameters, _parameters);
      for (const voice of activeVoices) {
        voice.update();
      }
      sharedFilter.update();
      effectChain.update();
    },
    noteOn(noteNumber, time = ac.currentTime) {
      if (bus.parameters.ampReleaseLastOnly && releasingVoices.length > 0) {
        for (const voice of releasingVoices) {
          voice.mute(time);
        }
        releasingVoices.length = 0;
      }
      const voice = createVoice(bus, voiceMixNode, noteNumber, time);
      voice.update();
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
