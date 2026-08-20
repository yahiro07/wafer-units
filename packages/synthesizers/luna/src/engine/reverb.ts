export type Reverb = {
  input: GainNode;
  output: GainNode;
  apply(decay: number, mix: number, time: number): void;
  cleanup(): void;
};

export const MIN_REVERB_DECAY_SEC = 0.25;
export const MAX_REVERB_DECAY_SEC = 5;
export const REVERB_WET_SCALE = 0.55;

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function mapReverbDecaySec(value: number): number {
  return (
    MIN_REVERB_DECAY_SEC *
    (MAX_REVERB_DECAY_SEC / MIN_REVERB_DECAY_SEC) ** clamp01(value)
  );
}

export function applyReverbMix(
  dryGain: AudioParam,
  wetGain: AudioParam,
  mix: number,
  time: number,
) {
  const mixAmount = clamp01(mix);
  dryGain.setValueAtTime(1 - mixAmount * 0.65, time);
  wetGain.setValueAtTime(mixAmount * REVERB_WET_SCALE, time);
}
