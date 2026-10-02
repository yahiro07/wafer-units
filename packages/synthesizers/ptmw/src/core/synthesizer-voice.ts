import { connectNodes } from "@lib/mu2609/utils/webaudio-helper";
import { OscId, OscParameters, SynthesisBus } from "./definitions";
import { createAmplifierUnit } from "./envelope-unit";
import { createOscillatorUnit } from "./oscillator-unit";

type SynthesizerVoice = {
  getGateOnTime(): number;
  updateOscParameters(oscId: OscId, parameters: OscParameters): void;
  noteOn(noteNumber: number, time: number): void;
  noteOff(time: number): void;
  cleanup(): void;
};

export function createSynthesizerVoice(
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
