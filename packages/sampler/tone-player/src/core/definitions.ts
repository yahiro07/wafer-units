export type SamplerParameters = {
  noteShift: number;
  volume: number;
  release: number;
};

export const defaultEffectParameters: SamplerParameters = {
  noteShift: 0,
  volume: 0.5,
  release: 0,
};

export type SamplerEngine = {
  loadSampleFile(file: File): void;
  setParameters(parameters: SamplerParameters): void;
  cleanup(): void;
  noteOn(noteNumber: number, time?: number): void;
  noteOff(noteNumber: number, time?: number): void;
};
