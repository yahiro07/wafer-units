export type SynthParameters = {
  octave: number; // -2, -1, 0, 1, 2
  unisonDetune: number; // 0~1
  unisonSpread: number; // 0~1
  unisonMix: number; // 0~1
  phaseRandom: boolean;
  ampRelease: number; // 0~1 (秒数へのマッピング)
  volume: number; // 0~1
};

export const defaultSynthParameters: SynthParameters = {
  octave: 0,
  unisonDetune: 0.5,
  unisonSpread: 1,
  unisonMix: 1,
  ampRelease: 0.5,
  volume: 0.5,
  phaseRandom: true,
};

export type ISynthesizer = {
  outputNode: GainNode;
  setParameters: (parameters: SynthParameters) => void;
  noteOn: (noteNumber: number, time: number) => void;
  noteOff: (noteNumber: number, time: number) => void;
  cleanup: () => void;
};
