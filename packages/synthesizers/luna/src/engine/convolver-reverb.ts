import { mapReverbDecaySec, Reverb } from "@/engine/reverb";
import { invPower2 } from "@/engine/synth-math-utils";

const DECAY_STEPS = 40;

function createImpulseResponse(
  audioContext: AudioContext,
  decaySec: number,
): AudioBuffer {
  const sampleRate = audioContext.sampleRate;
  if (0) {
    const length = Math.max(1, Math.floor(sampleRate * decaySec));
    const buffer = audioContext.createBuffer(2, length, sampleRate);
    const decayRate = Math.log(1000) / length;

    for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
      const data = buffer.getChannelData(channel);
      for (let i = 0; i < length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i * decayRate);
      }
    }
    return buffer;
  } else {
    const length = sampleRate * decaySec;
    const buffer = audioContext.createBuffer(2, length, sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 1.8);
      }
    }
    return buffer;
  }
}

export function createConvolverReverb(audioContext: AudioContext): Reverb {
  const input = audioContext.createGain();
  const output = audioContext.createGain();
  const dryGain = audioContext.createGain();
  const wetGain = audioContext.createGain();
  const convolver = audioContext.createConvolver();
  convolver.normalize = true;
  dryGain.gain.value = 1;
  wetGain.gain.value = 0;

  let decayKey = -1;
  convolver.buffer = createImpulseResponse(
    audioContext,
    mapReverbDecaySec(0.5),
  );
  decayKey = Math.round(0.5 * DECAY_STEPS);

  input.connect(dryGain);
  input.connect(convolver);
  convolver.connect(wetGain);
  dryGain.connect(output);
  wetGain.connect(output);

  return {
    input,
    output,
    apply(decay: number, mix: number, time: number) {
      decay = invPower2(decay);
      const nextKey = Math.round(Math.min(1, Math.max(0, decay)) * DECAY_STEPS);
      if (nextKey !== decayKey) {
        decayKey = nextKey;
        convolver.buffer = createImpulseResponse(
          audioContext,
          mapReverbDecaySec(decay),
        );
      }
      wetGain.gain.setValueAtTime(mix, time);
    },
    cleanup() {
      convolver.disconnect();
      dryGain.disconnect();
      wetGain.disconnect();
      input.disconnect();
      output.disconnect();
    },
  };
}
