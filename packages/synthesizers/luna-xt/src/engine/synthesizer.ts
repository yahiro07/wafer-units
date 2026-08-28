import {
  defaultSynthParameters,
  fixedParameters,
  SynthesizerEngine,
} from "@/defs/definitions";
import { createAmplifierUnit } from "@/engine/amplifier-unit";
import { createEffectChain } from "@/engine/effect-chain";
import { SynthesisBus } from "@/engine/engine-defs";
import { createOscillatorsUnit } from "@/engine/oscillators-unit";
import { createSharedFilterUnit } from "@/engine/shared-filter-unit";
import { connectNodes, disconnectNodes } from "@/engine/webaudio-helpers";
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
  voiceMixNodes: AudioNode[],
  noteNumber: number,
  gateOnTime: number,
): Voice {
  const ac = bus.audioContext;
  let endedCallback: (() => void) | undefined;

  const osc1 = createOscillatorsUnit("lane1", bus, noteNumber);
  const osc2 = createOscillatorsUnit("lane2", bus, noteNumber);
  const amp1 = createAmplifierUnit(bus, "lane1");
  const amp2 = createAmplifierUnit(bus, "lane2");

  connectNodes(osc1, amp1, voiceMixNodes[0]);
  connectNodes(osc2, amp2, voiceMixNodes[1]);

  const lifeSpanNode = ac.createConstantSource();

  lifeSpanNode.onended = () => {
    osc1.stop();
    osc2.stop();
    disconnectNodes(osc1, amp1, osc2, amp2);
    amp1.cleanup();
    amp2.cleanup();
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
      osc2.start(time);
      amp1.gateOn(time);
      amp2.gateOn(time);
      lifeSpanNode.start(time);
    },
    gateOff(time, applyRelease) {
      const tOff = amp1.gateOff(time, applyRelease);
      amp2.gateOff(time, applyRelease);
      lifeSpanNode.stop(tOff);
    },
    mute(time) {
      const tOff = amp1.mute(time);
      amp2.mute(time);
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

  const voiceMixNode1 = ac.createGain();
  const voiceMixNode2 = ac.createGain();
  const voiceMixNodes = [voiceMixNode1, voiceMixNode2];
  const activeVoices: Voice[] = [];
  const releasingVoices: Voice[] = [];

  const bus: SynthesisBus = {
    parameters: { ...defaultSynthParameters },
    audioContext: ac,
  };
  const sharedFilter1 = createSharedFilterUnit(bus, "lane1");
  const sharedFilter2 = createSharedFilterUnit(bus, "lane2");

  const effectChain = createEffectChain(bus);

  voiceMixNode1.connect(sharedFilter1.inputNode);
  voiceMixNode2.connect(sharedFilter2.inputNode);
  sharedFilter1.outputNode.connect(effectChain.inputNode);
  sharedFilter2.outputNode.connect(effectChain.inputNode);
  effectChain.outputNode.connect(destinationNode);

  return {
    affectParameters(_parameters) {
      Object.assign(bus.parameters, _parameters);
      for (const voice of activeVoices) {
        voice.update();
      }
      sharedFilter1.update();
      sharedFilter2.update();
      effectChain.update();
    },
    noteOn(noteNumber, time = ac.currentTime) {
      if (fixedParameters.ampReleaseLastOnly && releasingVoices.length > 0) {
        for (const voice of releasingVoices) {
          voice.mute(time);
        }
        releasingVoices.length = 0;
      }
      const voice = createVoice(bus, voiceMixNodes, noteNumber, time);
      voice.update();
      voice.gateOn();
      activeVoices.push(voice);
      sharedFilter1.gateOn(time);
      sharedFilter2.gateOn(time);
    },
    noteOff(noteNumber, time = ac.currentTime) {
      const voice = activeVoices.find((it) => it.noteNumber === noteNumber);
      if (voice) {
        const isLastVoice = activeVoices.length === 1;
        const applyRelease = fixedParameters.ampReleaseLastOnly
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
      sharedFilter1.gateOff(time);
      sharedFilter2.gateOff(time);
    },
    cleanup() {
      voiceMixNode1.disconnect();
      voiceMixNode2.disconnect();
      effectChain.outputNode.disconnect();
    },
  };
}
