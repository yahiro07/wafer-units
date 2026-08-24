import { OscWaveType, SynthParameters } from "@/defs/definitions";
import { midiToFrequency } from "@/engine/synthesis-helper";

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

type OscillatorUnitParameters = {
  wave: OscWaveType;
  decay: number;
  frequency: number;
  gain: number;
};
const defaultOscillatorUnitParameters: OscillatorUnitParameters = {
  wave: "sine",
  decay: 0,
  frequency: 440,
  gain: 1,
};

function createOscillatorUnit(ac: AudioContext) {
  const oscNode = ac.createOscillator();
  const gainNode = ac.createGain();
  oscNode.connect(gainNode);
  const eg = createOperatorEg(gainNode.gain);
  const outputNode = ac.createGain();
  gainNode.connect(outputNode);

  let params = defaultOscillatorUnitParameters;
  return {
    frequencyAudioParam: oscNode.frequency,
    outputNode,
    update(pr: OscillatorUnitParameters) {
      params = pr;
      if (pr.wave !== "noise") {
        oscNode.type = pr.wave;
      }
      oscNode.frequency.value = pr.frequency;
      outputNode.gain.value = pr.gain;
    },
    start(time: number) {
      oscNode.start(time);
      eg.trigger(time, params.decay);
    },
    stop(time: number) {
      oscNode.stop(time);
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
  const osc1 = createOscillatorUnit(ac);
  const osc2 = createOscillatorUnit(ac);

  const mode = parameters.osc2ModAltMix ? "mix" : "fm";
  if (mode === "fm") {
    osc1.outputNode.connect(osc2.frequencyAudioParam);
    osc2.outputNode.connect(destinationNode);
  } else {
    osc1.outputNode.connect(destinationNode);
    osc2.outputNode.connect(destinationNode);
  }

  const internal = {
    getWiringMode() {
      return parameters.osc2ModAltMix ? "mix" : "fm";
    },
    affectParameters() {
      const baseFreq = midiToFrequency(noteNumber);
      let osc1Freq = 1;
      let osc1Gain = 0;
      let osc2Gain = 0;
      if (mode === "fm") {
        osc1Freq = baseFreq * pr.osc1Ratio * 2 ** pr.patchOctave;
        osc1Gain = pr.osc2Mod ** 2 * osc1Freq * 4;
        osc2Gain = 1;
      } else {
        osc1Freq = baseFreq * 2 ** (pr.osc1Octave + pr.patchOctave);
        const prMix = pr.osc2Mod;
        const sum = 1 + prMix;
        osc1Gain = prMix / sum;
        osc2Gain = 1 / sum;
      }
      osc1.update({
        wave: pr.osc1Wave,
        decay: pr.osc1Decay,
        frequency: osc1Freq,
        gain: osc1Gain,
      });
      osc2.update({
        wave: pr.osc2Wave,
        decay: pr.osc2Decay,
        frequency: baseFreq,
        gain: osc2Gain,
      });
    },
  };

  return {
    affectParameters() {
      internal.affectParameters();
    },
    start(time: number) {
      osc1.start(time);
      osc2.start(time);
    },
    stop(time: number) {
      osc1.stop(time);
      osc2.stop(time);
      osc1.outputNode.disconnect();
      osc2.outputNode.disconnect();
    },
  };
}
