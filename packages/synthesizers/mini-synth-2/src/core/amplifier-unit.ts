import { SynthParameters } from "@/core/definitions";

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

export function createAmplifierUnit(
  context: AudioContext,
  params: SynthParameters,
  velocity: number,
): AmplifierUnit {
  const inputNode = context.createGain();
  inputNode.gain.value = 0;

  const outputNode = context.createGain();
  outputNode.gain.value = 1;
  inputNode.connect(outputNode);

  return {
    inputNode,
    outputNode,
    triggerEnvelope(t) {
      const riseTime = 0.001;
      const decayTime =
        params.ampDecay < 1
          ? Math.max(0.01, params.ampDecay * configs.decayTimeMax)
          : configs.decayTimeMax;
      const sustain = params.ampDecay === 1 ? 1 : 0;
      inputNode.gain.setValueAtTime(0, t);
      inputNode.gain.linearRampToValueAtTime(
        Math.max(0.001, velocity),
        t + riseTime,
      );
      if (sustain === 0) {
        inputNode.gain.exponentialRampToValueAtTime(
          0.001,
          t + riseTime + decayTime,
        );
      }
    },
    release(time) {
      const tOff =
        time && time > context.currentTime ? time : context.currentTime;
      const releaseTime = Math.max(
        0.01,
        params.ampRelease * configs.releaseTimeMax,
      );

      inputNode.gain.cancelScheduledValues(tOff);
      inputNode.gain.setValueAtTime(inputNode.gain.value, tOff);
      inputNode.gain.exponentialRampToValueAtTime(0.001, tOff + releaseTime);

      return { tOff, releaseTime };
    },
    cleanup() {
      inputNode.disconnect();
      outputNode.disconnect();
    },
  };
}
