export type EffectParameters = {
  noiseAOn: boolean;
  noiseALpfCutoff: number;
  noiseAGain: number;
  noiseBOn: boolean;
  noiseBHpfCutoff: number;
  noiseBGain: number;
  envAttack: number;
  envRelease: number;
};
/*
noiseA = lowpass(whiteNoise, noiseALpfCutoff)
noiseB = highpass(whiteNoise, noiseBHpfCutoff)
envelope = envelopeFollower(input, envAttack, envRelease)
output =
input
+ noiseA * envelope * noiseAGain
+ noiseB * input * envelope * noiseBGain
*/

export const defaultEffectParameters: EffectParameters = {
  noiseAOn: true,
  noiseBOn: true,
  noiseALpfCutoff: 0.5,
  noiseBHpfCutoff: 0.5,
  noiseAGain: 0.5,
  noiseBGain: 0.5,
  envAttack: 0.5,
  envRelease: 0.5,
};
