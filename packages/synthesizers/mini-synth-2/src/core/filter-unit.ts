import { SynthParameters } from "@/core/definitions";

const helpers = {
  calcFilterBaseFreq: (cutoff: number, oscsBottomFreq: number) => {
    //exponential filter frequency mapping
    const topFreq = 10000;
    const bottomFreq = oscsBottomFreq / 2;
    return bottomFreq * Math.pow(topFreq / bottomFreq, cutoff);
  },
  calcFilterQ: (peak: number) => 0.707 + peak * 16,
};

export type FilterUnit = {
  filterNode: BiquadFilterNode;
  outputNode: GainNode;
  update: (t?: number) => void;
  triggerEnvelope: (t: number) => void;
  cleanup: () => void;
};

export function createFilterUnit(
  audioContext: AudioContext,
  params: SynthParameters,
  oscsBottomFreq: number,
) {
  const inputNode = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  filter.type = "lowpass";
  const outputNode = audioContext.createGain();
  inputNode.connect(filter);
  filter.connect(outputNode);

  return {
    inputNode,
    outputNode,
    update(t?: number) {
      const nextBaseFreq = helpers.calcFilterBaseFreq(
        params.filterCutoff,
        oscsBottomFreq,
      );
      const nextFilterQ = helpers.calcFilterQ(params.filterPeak);
      if (t !== undefined) {
        filter.frequency.setTargetAtTime(nextBaseFreq, t, 0.01);
        filter.Q.setTargetAtTime(nextFilterQ, t, 0.01);
      } else {
        filter.frequency.value = nextBaseFreq;
        filter.Q.value = nextFilterQ;
      }
    },
    triggerEnvelope(t: number) {
      // Filter Envelope
      if (params.filterDecay > 0) {
        const filterDecayTime = params.filterDecay ** 2 * 4;
        const envModCents = 1200 * 4; // max 4 octaves
        filter.detune.setValueAtTime(envModCents, t);
        filter.detune.exponentialRampToValueAtTime(1, t + filterDecayTime); // ramp detune back to 0 implicitly
      } else {
        filter.detune.value = 0;
      }
    },
    cleanup() {
      inputNode.disconnect();
      filter.disconnect();
    },
  };
}
