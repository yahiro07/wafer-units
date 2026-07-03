export type IChorusEffect = {
  inputNode: GainNode;
  outputNode: GainNode;
  setLevel(level: number): void;
  cleanupNodes?(): void;
};
