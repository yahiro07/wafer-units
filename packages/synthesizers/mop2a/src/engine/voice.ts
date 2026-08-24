import { SynthParameters } from "@/defs/definitions";

export type Voice = {
  affectParameters(): void;
  start(time: number): void;
  stop(time: number): void;
};

function createOperatorEg(destParam: AudioParam) {
  return {
    trigger(time: number, prDecay: number) {
      if (prDecay < 1) {
        const decayTime = prDecay * 2;
        destParam.setValueAtTime(1, time);
        destParam.exponentialRampToValueAtTime(1e-3, time + decayTime);
        destParam.linearRampToValueAtTime(0, time + decayTime + 0.01);
      } else {
        //sustain
        destParam.setValueAtTime(1, time);
      }
    },
  };
}

export function createVoice(
  audioContext: AudioContext,
  destinationNode: AudioNode,
  parameters: SynthParameters,
  noteNumber: number,
): Voice {
  const ac = audioContext;
  const pr = parameters;

  const carrier = ac.createOscillator();
  const carrierGain = ac.createGain();
  const carrierEg = createOperatorEg(carrierGain.gain);
  carrier.connect(carrierGain);
  carrierGain.connect(destinationNode);

  const modulator = ac.createOscillator();
  const modulatorGain = ac.createGain();
  modulator.connect(modulatorGain);

  const modulatorEgGain = ac.createGain();
  const modulatorEg = createOperatorEg(modulatorEgGain.gain);
  modulatorGain.connect(modulatorEgGain);
  modulatorEgGain.connect(carrier.frequency);

  return {
    affectParameters() {
      if (pr.osc1Wave !== "noise") {
        modulator.type = pr.osc1Wave;
      }
      if (pr.osc2Wave !== "noise") {
        carrier.type = pr.osc2Wave;
      }
      const noteFrequency = 440 * 2 ** ((noteNumber - 69) / 12);
      carrier.frequency.value = noteFrequency;
      const modulatorFrequency = noteFrequency * pr.osc1Ratio;
      modulator.frequency.value = modulatorFrequency;
      modulatorGain.gain.value = pr.osc2Mod ** 2 * modulatorFrequency * 4;
    },
    start(time: number) {
      modulator.start(time);
      carrier.start(time);
      modulatorEg.trigger(time, pr.osc1Decay);
      carrierEg.trigger(time, pr.osc2Decay);
    },
    stop(time: number) {
      modulator.stop(time);
      carrier.stop(time);
    },
  };
}
