export interface IInstrumentParameters {
  volume: number;
  release: number;
}

export type INoteSampleSourceLoopSpec = {
  posLoopStart: number;
  posLoopEnd: number;
};

export type INoteSampleSource = {
  noteNumber: number;
  samples: AudioBuffer;
  loopSpec?: INoteSampleSourceLoopSpec;
};

export type IInstrumentData = {
  sampleSources: INoteSampleSource[];
  gainAdjustment: number;
  releaseParam: number;
};
