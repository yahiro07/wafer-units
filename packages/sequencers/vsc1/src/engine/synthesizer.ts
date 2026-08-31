import { ISynthesizer } from "@/defs/interfaces";
import { UnitInterface } from "wafer-host/unit-types";

const midiToFrequency = (note: number) => 440 * 2 ** ((note - 69) / 12);

export function createSynthesizer(
  unitInterface: UnitInterface | undefined,
  audioContext: AudioContext,
): ISynthesizer {
  const ac = audioContext;
  const destinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  let stopFn: ((time: number) => void) | undefined;

  const stopNote = (time: number) => {
    if (stopFn) {
      stopFn(time);
      stopFn = undefined;
    }
  };

  return {
    noteOn(noteNumber, time = ac.currentTime) {
      stopNote(time);
      const osc = ac.createOscillator();
      const freq = midiToFrequency(noteNumber);
      osc.type = "sawtooth";
      osc.frequency.value = freq;
      osc.start(time);
      const amp = ac.createGain();
      amp.gain.value = 0.2;
      osc.connect(amp).connect(destinationNode);
      osc.onended = () => {
        osc.disconnect();
        amp.disconnect();
      };
      stopFn = (time: number) => {
        osc.stop(time);
      };
    },
    noteOff(noteNumber, time = ac.currentTime) {
      stopNote(time);
    },
    cleanup() {},
  };
}
