import { seqNumbers, mapUnaryTo } from "@lib/mu2609/utils/helpers";
import { OscParameters } from "./definitions";

type UnisonPartialSpec = {
  octave: number;
  detune: number;
  panning: number;
  volume: number;
  isCore: boolean;
};

const unisonBaseSpecs: Record<
  1 | 2 | 3 | 4 | 5 | 6 | 7,
  {
    coreIndex: number;
    subIndices?: number[];
    detuneMap?: number[];
    altIndices?: number[];
  }
> = {
  [1]: {
    coreIndex: 0,
  },
  [2]: {
    coreIndex: 0,
    subIndices: [1],
  },
  [3]: {
    coreIndex: 1,
    subIndices: [2],
    detuneMap: [-0.971, 0, 0.997],
  },
  [4]: {
    coreIndex: 1,
    subIndices: [2],
    detuneMap: [-0.971, -0.331, 0.338, 0.997],
  },
  [5]: {
    coreIndex: 2,
    subIndices: [0, 3],
    detuneMap: [-0.971, -0.331, 0, 0.338, 0.997],
  },
  [6]: {
    coreIndex: 2,
    subIndices: [1, 4],
    detuneMap: [-0.971, -0.571, 0.191, 0.198, 0.578, 0.997],
  },
  [7]: {
    coreIndex: 3,
    subIndices: [0, 2, 5],
    detuneMap: [-0.971, -0.571, 0.191, 0, 0.198, 0.578, 0.997],
  },
};

export function buildUnisonPartialSpecs(
  pr: OscParameters,
): UnisonPartialSpec[] {
  const prOctave = pr.octave;
  const numUnison = pr.unison;
  const prDetune = pr.detune;
  const isStereo = pr.spread;
  const mixLevel = pr.full ? 1 : 0.5;
  const subEnabled = pr.sub;

  const baseSpec =
    unisonBaseSpecs[numUnison as keyof typeof unisonBaseSpecs] ??
    unisonBaseSpecs[1];

  const baseVolume = Math.sqrt(1 / numUnison) + numUnison * 0.03;
  const sideLevel = mixLevel;
  const specs = seqNumbers(numUnison).map((i) => {
    const pos = numUnison === 1 ? 0 : mapUnaryTo(i / (numUnison - 1), -1, 1);
    const isCore = i === baseSpec.coreIndex;
    const isSub = baseSpec.subIndices?.includes(i);
    const detunePos = true ? (baseSpec.detuneMap?.[i] ?? pos) : pos;
    const detune = detunePos * prDetune ** 2;
    const octave = subEnabled && isSub ? prOctave - 1 : prOctave;
    let panning = isStereo ? pos : 0;
    const volume = (isCore ? 1 : sideLevel) * baseVolume;

    return { octave, detune, panning, volume, isCore };
  });

  const rms = Math.sqrt(
    specs.reduce((acc, spec) => acc + spec.volume * spec.volume, 0),
  );
  const scale = (rms > 0 ? 1 / rms : 1) * 0.707;
  return specs.map((spec) => ({
    ...spec,
    volume: spec.volume * scale,
  }));
}
