import { ISynthesizer } from "@/defs/interfaces";
import { midiToFrequency } from "@/utils/synth-math-utils";
import { UnitInterface } from "wafer-host/unit-types";

export function createSynthesizer(
  unitInterface: UnitInterface | undefined,
  audioContext: AudioContext,
): ISynthesizer {
  const ac = audioContext;
  const destinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  let stopFn: (() => void) | undefined;

  return {
    noteOn(noteNumber, time = ac.currentTime) {
      const osc = ac.createOscillator();
      const freq = midiToFrequency(noteNumber);
      osc.type = "sawtooth";
      osc.frequency.value = freq;
      osc.start(time);
      const amp = ac.createGain();
      amp.gain.value = 0.5;
      osc.connect(amp).connect(destinationNode);
      stopFn = () => {
        osc.stop(time);
        osc.disconnect();
        amp.disconnect();
      };
    },
    noteOff(noteNumber, time = ac.currentTime) {
      stopFn?.();
    },
    cleanup() {},
  };
}
