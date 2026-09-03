export type SynthParameters = {
  wave: number; //0:saw, 1:square
  cutoff: number; //0~1
  peak: number; //0~1
  decay: number; //0~1
  envMod: number; //0~1
  glide: number; //0~1
  accent: number; //0~1
};

export const defaultSynthParameters: SynthParameters = {
  wave: 0,
  cutoff: 1,
  peak: 0,
  decay: 0.5,
  envMod: 0,
  glide: 0,
  accent: 0,
};
