import { ISynthesizer } from "@/defs/interfaces";
import { UnitInterface } from "wafer-host/unit-types";

const midiToFrequency = (note: number) => 440 * 2 ** ((note - 69) / 12);

export function createSynthesizer(
  unitInterface: UnitInterface | undefined,
  audioContext: AudioContext,
): ISynthesizer {
  const ac = audioContext;
  const destinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  let stopFn: (() => void) | undefined;

  const stopNote = () => {
    if (stopFn) {
      stopFn();
      stopFn = undefined;
    }
  };

  return {
    noteOn(noteNumber, time = ac.currentTime) {
      stopNote();
      const osc = ac.createOscillator();
      const freq = midiToFrequency(noteNumber);
      osc.type = "sawtooth";
      osc.frequency.value = freq;
      osc.start(time);
      const amp = ac.createGain();
      amp.gain.value = 0.2;
      osc.connect(amp).connect(destinationNode);
      stopFn = () => {
        osc.stop(time);
        osc.disconnect();
        amp.disconnect();
      };
    },
    noteOff(noteNumber, time = ac.currentTime) {
      stopNote();
    },
    cleanup() {},
  };
}
