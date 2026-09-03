import { SynthParameters } from "@/defs/definitions";
import { linearInterpolate } from "@/utils/helpers";

const configs = {
  decayTimeMax: 3,
  releaseTimeMax: 3,
};

export type AmplifierUnit = {
  inputNode: GainNode;
  outputNode: GainNode;
  triggerEnvelope: (t: number) => void;
  release: (time: number) => { tOff: number; releaseTime: number };
  cleanup: () => void;
};

const helpers = {
  getDecayAndSustain(prAmpDecay: number) {
    const th = 0.5;
    if (prAmpDecay < th) {
      return {
        ampDecay: linearInterpolate(prAmpDecay, 0, th, 0, 1),
        sustain: 0,
      };
    } else {
      return {
        ampDecay: linearInterpolate(prAmpDecay, th, 1, 0.2, 0),
        sustain: linearInterpolate(prAmpDecay, th, 1, 0, 1) ** 2,
      };
    }
  },
};

export function createAmplifierUnit(
  context: AudioContext,
  params: SynthParameters,
  velocity: number,
): AmplifierUnit {
  const inputNode = context.createGain(); //automated for A-D-S
  inputNode.gain.value = 0;

  const outputNode = context.createGain(); //automated for R
  outputNode.gain.value = 1;
  inputNode.connect(outputNode);

  return {
    inputNode,
    outputNode,
    triggerEnvelope(t) {
      const riseTime = 0.001;
      const { ampDecay, sustain } = helpers.getDecayAndSustain(params.ampDecay);
      const decayTime =
        ampDecay < 1
          ? Math.max(0.01, ampDecay * configs.decayTimeMax)
          : configs.decayTimeMax;
      inputNode.gain.setValueAtTime(0, t);
      inputNode.gain.linearRampToValueAtTime(
        Math.max(0.001, velocity),
        t + riseTime,
      );
      inputNode.gain.exponentialRampToValueAtTime(
        Math.max(sustain, 0.001),
        t + riseTime + decayTime,
      );
    },
    release(time) {
      const tOff =
        time && time > context.currentTime ? time : context.currentTime;
      const releaseTime = Math.max(
        0.01,
        params.ampRelease * configs.releaseTimeMax,
      );
      outputNode.gain.setValueAtTime(1, tOff);
      outputNode.gain.exponentialRampToValueAtTime(1e-4, tOff + releaseTime);
      outputNode.gain.setValueAtTime(0, tOff + releaseTime);
      return { tOff, releaseTime };
    },
    cleanup() {
      inputNode.disconnect();
      outputNode.disconnect();
    },
  };
}
