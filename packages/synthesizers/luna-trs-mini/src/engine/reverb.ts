import { invPower2 } from "@/utils/synth-math-utils";

const configs = {
  decaySteps: 9,
  minDecaySec: 0.25,
  maxDecaySec: 1.25,
  wetEq: true,
  wetHpfHz: 180,
  preDelay: true,
  preDelaySec: 0.03,
  minDampLpfHz: 500,
  maxDampLpfHz: 18000,
};

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function mapReverbDecaySec(value: number): number {
  return (
    configs.minDecaySec *
    (configs.maxDecaySec / configs.minDecaySec) ** clamp01(value)
  );
}

function mapDampLpfHz(damp: number): number {
  return (
    configs.minDampLpfHz *
    (configs.maxDampLpfHz / configs.minDampLpfHz) ** clamp01(damp)
  );
}

function createReverbWetChain(audioContext: AudioContext) {
  const input = audioContext.createGain();
  const output = audioContext.createGain();
  const nodes: AudioNode[] = [input, output];
  let current: AudioNode = input;

  if (configs.preDelay) {
    const delay = audioContext.createDelay(0.1);
    delay.delayTime.value = configs.preDelaySec;
    current.connect(delay);
    nodes.push(delay);
    current = delay;
  }
  if (configs.wetEq) {
    const hpf = audioContext.createBiquadFilter();
    hpf.type = "highpass";
    hpf.frequency.value = configs.wetHpfHz;
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
      mapReverbDecaySec(decayKey / configs.decaySteps),
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

  let decayKey = Math.round(0.5 * configs.decaySteps);
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
    inputNode: input,
    outputNode: output,
    apply(args: { decay?: number; mix?: number; damp?: number }, time: number) {
      if (args.decay !== undefined) {
        const decay = invPower2(args.decay);
        const nextKey = Math.round(
          Math.min(1, Math.max(0, decay)) * configs.decaySteps,
        );
        if (nextKey !== decayKey) {
          decayKey = nextKey;
          if (wetEnabled) {
            convolver.buffer = getImpulseResponse(audioContext, decayKey);
          }
        }
      }
      if (args.mix !== undefined) {
        setWetEnabled(args.mix > 0);
        wetGain.gain.setValueAtTime(args.mix, time);
      }
      if (args.damp !== undefined) {
        wetChain.dampLpf.frequency.setValueAtTime(
          mapDampLpfHz(args.damp),
          time,
        );
      }
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
