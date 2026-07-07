export type SynthParameters = {
  octave: number; //-2,-1,0,1,2
  //
  wave: number; //0,1,2,3,4,5,6,7
  shape: number; //0~1
  detune2: number; //0~1, >0 for two oscillator unison
  pitchDrift: number; // 0~1, slow pitch instability
  //
  shapeEgAttack: number; //0~1
  shapeEgDecay: number; //0~1, <1 for decay and sustain:0, =1 for decay:0, sustain:1
  shapeModAmount: number; //0~1, 0 based unipolar
  subOscWave: number; //0:sine, 1:tri, 2:square, 3:saw
  subOscVolume: number; //0~1, sub oscillator volume
  ampAttack: number; //0~1
  ampDecay: number; //0~1
  ampSustain: number; //0~1
  ampRelease: number; //0~1
  //
  tone: number; //0~1
  chorus: number; //0~1
  outputVolume: number; //0~1
};

export const defaultSynthParameters: SynthParameters = {
  octave: 0,
  wave: 0,
  shape: 0.5,
  detune2: 0,
  pitchDrift: 0,
  shapeEgAttack: 0,
  shapeEgDecay: 0.5,
  shapeModAmount: 0,
  subOscWave: 0,
  subOscVolume: 0,
  ampAttack: 0,
  ampDecay: 0,
  ampSustain: 1,
  ampRelease: 0,
  tone: 0.5,
  chorus: 0,
  outputVolume: 1,
};
