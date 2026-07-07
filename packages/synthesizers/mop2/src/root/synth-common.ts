export type SynthParameters = {
  octave: number; // -2, -1, 0, 1, 2
  op1Ratio: number; //0.5, 1, 2, 3, 4, 5, 7, 9, 11, 13
  op1ModSpeed: number; //0~1, 0.5 for 1x
  op1Mod: number; //0~1
  op1Volume: number; //0~1

  op2Ratio: number;
  op2ModSpeed: number;
  op2Mod: number;
  op2Volume: number;

  egAttack: number; //0~1
  egDecay: number; //0~1, <1 for sustain=0, 1 for sustain=1
  egRelease: number; //0~1
};

export const defaultSynthParameters: SynthParameters = {
  octave: 0,
  op1Ratio: 1,
  op1ModSpeed: 0.5,
  op1Mod: 0,
  op1Volume: 1,
  op2Ratio: 1,
  op2ModSpeed: 0.5,
  op2Mod: 0,
  op2Volume: 0,
  egAttack: 0,
  egDecay: 1,
  egRelease: 0,
};
