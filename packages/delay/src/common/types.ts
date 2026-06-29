//0.5: 1/8th note
//1: 1/4th note
//...
//export type DelayTime = 0.5 | 0.75 | 1 | 1.5;
export type DelayTime = 0.333 | 0.5 | 0.666 | 0.75 | 1 | 1.5 | 2 | 2.5 | 3;

export type EffectParameters = {
  isOn: boolean;
  time: DelayTime;
  feed: number; //0~1
  tone: number; //0~1
  mix: number; //0~1
  lfoOn: boolean;
  lfoRate: number; //0~1
  lfoDepth: number; //0~1
};
