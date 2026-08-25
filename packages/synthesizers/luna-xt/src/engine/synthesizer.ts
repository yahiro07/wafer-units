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
  update(time?: number): void;
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
  let endedCallback: (() => void) | undefined;

  const oscUnit = createOscillatorsUnit(bus, noteNumber);
  const ampUnit = createAmplifierUnit(bus);
  oscUnit.outputNode.connect(ampUnit.inputNode);
  ampUnit.outputNode.connect(voiceMixNode);

  oscUnit.setEndedCallback(() => {
    oscUnit.outputNode.disconnect();
    ampUnit.outputNode.disconnect();
    ampUnit.cleanup();
    endedCallback?.();
  });

  return {
    noteNumber,
    gateOnTime,
    update(time) {},
    gateOn() {
      const time = gateOnTime;
      oscUnit.start(time);
      ampUnit.gateOn(time);
    },
    gateOff(time, applyRelease) {
      const tOff = ampUnit.gateOff(time, applyRelease);
      oscUnit.stop(tOff);
    },
    mute(time) {
      const tOff = ampUnit.mute(time);
      oscUnit.stop(tOff);
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
