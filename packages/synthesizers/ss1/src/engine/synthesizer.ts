import { defaultSynthParameters, SynthesizerEngine } from "@/defs/definitions";
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
  gateOff(time: number): void;
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

  const osc1 = createOscillatorsUnit("lane1", bus, noteNumber);
  const amp1 = createAmplifierUnit(bus, "lane1");

  connectNodes(osc1, amp1, voiceMixNode);

  const lifeSpanNode = ac.createConstantSource();

  lifeSpanNode.onended = () => {
    osc1.stop();
    disconnectNodes(osc1, amp1);
    amp1.cleanup();
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
      amp1.gateOn(time);
      lifeSpanNode.start(time);
    },
    gateOff(time) {
      const tOff = amp1.gateOff(time);
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
  const activeVoices: Voice[] = [];

  const bus: SynthesisBus = {
    parameters: { ...defaultSynthParameters },
    audioContext: ac,
  };
  const sharedFilter1 = createSharedFilterUnit(bus, "lane1");
  const effectChain = createEffectChain(bus);

  voiceMixNode1.connect(sharedFilter1.inputNode);
  sharedFilter1.outputNode.connect(effectChain.inputNode);
  effectChain.outputNode.connect(destinationNode);

  return {
    affectParameters(_parameters) {
      Object.assign(bus.parameters, _parameters);
      for (const voice of activeVoices) {
        voice.update();
      }
      sharedFilter1.update();
      effectChain.update();
    },
    noteOn(noteNumber, time = ac.currentTime) {
      const voice = createVoice(bus, voiceMixNode1, noteNumber, time);
      voice.update();
      voice.gateOn();
      activeVoices.push(voice);
      sharedFilter1.gateOn(time);
    },
    noteOff(noteNumber, time = ac.currentTime) {
      const voice = activeVoices.find((it) => it.noteNumber === noteNumber);
      if (voice) {
        voice.gateOff(time);
        removeArrayItem(activeVoices, voice);
      }
      sharedFilter1.gateOff(time);
    },
    cleanup() {
      voiceMixNode1.disconnect();
      effectChain.outputNode.disconnect();
    },
  };
}
