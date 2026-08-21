import { invPower2 } from "@/engine/synth-math-utils";

const DECAY_STEPS = 9;
const MIN_REVERB_DECAY_SEC = 0.25;
const MAX_REVERB_DECAY_SEC = 1.25;

export const REVERB_WET_EQ = true;
export const REVERB_PREDELAY = true;
export const REVERB_WET_HPF_HZ = 180;
export const REVERB_PREDELAY_SEC = 0.03;
const MIN_DAMP_LPF_HZ = 500;
const MAX_DAMP_LPF_HZ = 18000;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function mapReverbDecaySec(value: number): number {
  return (
    MIN_REVERB_DECAY_SEC *
    (MAX_REVERB_DECAY_SEC / MIN_REVERB_DECAY_SEC) ** clamp01(value)
  );
}

function mapDampLpfHz(damp: number): number {
  return MIN_DAMP_LPF_HZ * (MAX_DAMP_LPF_HZ / MIN_DAMP_LPF_HZ) ** clamp01(damp);
}

function createReverbWetChain(audioContext: AudioContext) {
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
    current.connect(hpf);
    nodes.push(hpf);
    current = hpf;
  }
  const dampLpf = audioContext.createBiquadFilter();
  dampLpf.type = "lowpass";
  dampLpf.frequency.value = mapDampLpfHz(0.5);
  dampLpf.Q.value = Math.SQRT1_2;
  current.connect(dampLpf);
  nodes.push(dampLpf);
  dampLpf.connect(output);

  return {
    input,
    output,
    dampLpf,
    cleanup() {
      for (const node of nodes) {
        node.disconnect();
      }
    },
  };
}

const impulseResponseCache = new WeakMap<
  AudioContext,
  Map<number, AudioBuffer>
>();

function createImpulseResponse(
  audioContext: AudioContext,
  decaySec: number,
): AudioBuffer {
  const sampleRate = audioContext.sampleRate;
  const length = sampleRate * decaySec;
  const buffer = audioContext.createBuffer(2, length, sampleRate);
  for (let ch = 0; ch < 2; ch += 1) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 1.8;
    }
  }
  return buffer;
}

function getImpulseResponse(
  audioContext: AudioContext,
  decayKey: number,
): AudioBuffer {
  let byKey = impulseResponseCache.get(audioContext);
  if (!byKey) {
    byKey = new Map();
    impulseResponseCache.set(audioContext, byKey);
  }
  let buffer = byKey.get(decayKey);
  if (!buffer) {
    buffer = createImpulseResponse(
      audioContext,
      mapReverbDecaySec(decayKey / DECAY_STEPS),
    );
    byKey.set(decayKey, buffer);
  }
  return buffer;
}

export function createReverb(audioContext: AudioContext) {
  const input = audioContext.createGain();
  const output = audioContext.createGain();
  const dryGain = audioContext.createGain();
  const wetGain = audioContext.createGain();
  const convolver = audioContext.createConvolver();
  const wetChain = createReverbWetChain(audioContext);
  convolver.normalize = true;
  dryGain.gain.value = 1;
  wetGain.gain.value = 0;

  let decayKey = Math.round(0.5 * DECAY_STEPS);
  let wetEnabled = false;

  input.connect(dryGain);
  dryGain.connect(output);
  wetChain.output.connect(wetGain);
  wetGain.connect(output);

  function setWetEnabled(enabled: boolean) {
    if (enabled === wetEnabled) return;
    wetEnabled = enabled;
    if (enabled) {
      convolver.buffer = getImpulseResponse(audioContext, decayKey);
      input.connect(convolver);
      convolver.connect(wetChain.input);
      return;
    }
    input.disconnect(convolver);
    convolver.disconnect(wetChain.input);
  }

  return {
    input,
    output,
    apply(decay: number, mix: number, damp: number, time: number) {
      decay = invPower2(decay);
      const nextKey = Math.round(Math.min(1, Math.max(0, decay)) * DECAY_STEPS);
      const keyChanged = nextKey !== decayKey;
      if (keyChanged) {
        decayKey = nextKey;
      }
      const wasEnabled = wetEnabled;
      setWetEnabled(mix > 0);
      if (wetEnabled && wasEnabled && keyChanged) {
        convolver.buffer = getImpulseResponse(audioContext, decayKey);
      }
      wetChain.dampLpf.frequency.setValueAtTime(mapDampLpfHz(damp), time);
      wetGain.gain.setValueAtTime(mix, time);
    },
    cleanup() {
      convolver.disconnect();
      wetChain.cleanup();
      dryGain.disconnect();
      wetGain.disconnect();
      input.disconnect();
      output.disconnect();
    },
  };
}
