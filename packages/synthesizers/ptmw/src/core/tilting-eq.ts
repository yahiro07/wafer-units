import { mapUnaryTo } from "@lib/mu2609/utils/helpers";

type TiltingEq = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  update(params: { prFreq: number; prTilt: number }): void;
  cleanup(): void;
};

const cutoffHelper = {
  _mapCutoff(prFreqU: number, minFreq: number, maxFreq: number): number {
    const bottom = Math.log2(minFreq);
    const top = Math.log2(maxFreq);
    return Math.pow(2, mapUnaryTo(prFreqU, bottom, top));
  },
  mapCutoffTilt(prFreqU: number): number {
    return cutoffHelper._mapCutoff(prFreqU, 40, 14_000);
  },
};

export function createTiltingEq(ac: AudioContext): TiltingEq {
  const filter1 = ac.createBiquadFilter();
  const filter2 = ac.createBiquadFilter();
  filter1.connect(filter2);
  filter1.type = "lowshelf";
  filter2.type = "highshelf";
  return {
    inputNode: filter1,
    outputNode: filter2,
    update({ prFreq, prTilt }) {
      const freq = cutoffHelper.mapCutoffTilt(prFreq);
      filter1.frequency.value = freq;
      filter2.frequency.value = freq;
      const tiltDb = (prTilt * 2 - 1) * 12;
      filter1.gain.value = -tiltDb;
      filter2.gain.value = tiltDb;
    },
    cleanup() {
      filter1.disconnect();
    },
  };
}
