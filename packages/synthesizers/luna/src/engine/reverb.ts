export type Reverb = {
  input: GainNode;
  output: GainNode;
  apply(decay: number, mix: number, time: number): void;
  cleanup(): void;
};

export const REVERB_WET_EQ = true;
export const REVERB_PREDELAY = true;
export const REVERB_WET_HPF_HZ = 180;
export const REVERB_WET_LPF_HZ = 6000;
export const REVERB_PREDELAY_SEC = 0.03;

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

export function createReverbWetChain(audioContext: AudioContext) {
  const input = audioContext.createGain();
  const output = audioContext.createGain();
  const nodes: AudioNode[] = [input, output];
  let current: AudioNode = input;

  if (REVERB_PREDELAY) {
    const delay = audioContext.createDelay(0.1);
    delay.delayTime.value = REVERB_PREDELAY_SEC;
    current.connect(delay);
    nodes.push(delay);
    current = delay;
  }
  if (REVERB_WET_EQ) {
    const hpf = audioContext.createBiquadFilter();
    hpf.type = "highpass";
    hpf.frequency.value = REVERB_WET_HPF_HZ;
    hpf.Q.value = Math.SQRT1_2;
    const lpf = audioContext.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.value = REVERB_WET_LPF_HZ;
    lpf.Q.value = Math.SQRT1_2;
    current.connect(hpf);
    hpf.connect(lpf);
    nodes.push(hpf, lpf);
    current = lpf;
  }
  current.connect(output);

  return {
    input,
    output,
    cleanup() {
      for (const node of nodes) {
        node.disconnect();
      }
    },
  };
}
