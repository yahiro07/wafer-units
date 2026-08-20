import {
  applyReverbMix,
  createReverbWetChain,
  mapReverbDecaySec,
  Reverb,
} from "@/engine/reverb";

const COMB_DELAY_SAMPLES = [
  1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617,
];
const ALLPASS_DELAY_SAMPLES = [556, 441, 341, 225];
const BASE_SAMPLE_RATE = 44100;
const ALLPASS_GAIN = 0.5;
const DAMPING_HZ = 3200;
const COMB_MIX_GAIN = 1 / Math.sqrt(COMB_DELAY_SAMPLES.length);

function onePoleLowpassCoeffs(cutoffHz: number, sampleRate: number) {
  const x = Math.exp((-2 * Math.PI * cutoffHz) / sampleRate);
  return {
    feedforward: [1 - x],
    feedback: [1, -x],
  };
}

function combFeedback(delaySec: number, decaySec: number): number {
  return Math.min(0.98, 0.001 ** (delaySec / Math.max(decaySec, 0.05)));
}

export function createIirReverb(audioContext: AudioContext): Reverb {
  const sampleRate = audioContext.sampleRate;
  const { feedforward, feedback } = onePoleLowpassCoeffs(
    DAMPING_HZ,
    sampleRate,
  );

  const input = audioContext.createGain();
  const output = audioContext.createGain();
  const dryGain = audioContext.createGain();
  const wetGain = audioContext.createGain();
  const combMix = audioContext.createGain();
  const wetChain = createReverbWetChain(audioContext);
  combMix.gain.value = COMB_MIX_GAIN;
  dryGain.gain.value = 1;
  wetGain.gain.value = 0;

  const combFeedbacks: GainNode[] = [];
  const combDelays: DelayNode[] = [];
  const combFilters: IIRFilterNode[] = [];

  for (const samples of COMB_DELAY_SAMPLES) {
    const delaySec = samples / BASE_SAMPLE_RATE;
    const delay = audioContext.createDelay(0.1);
    delay.delayTime.value = delaySec;
    const damp = audioContext.createIIRFilter(feedforward, feedback);
    const fb = audioContext.createGain();
    fb.gain.value = combFeedback(delaySec, mapReverbDecaySec(0.5));

    input.connect(delay);
    delay.connect(damp);
    damp.connect(fb);
    fb.connect(delay);
    damp.connect(combMix);

    combDelays.push(delay);
    combFilters.push(damp);
    combFeedbacks.push(fb);
  }

  const allpassNodes: AudioNode[] = [];
  let allpassInput: AudioNode = combMix;
  for (const samples of ALLPASS_DELAY_SAMPLES) {
    const delaySec = samples / BASE_SAMPLE_RATE;
    const sum = audioContext.createGain();
    const delay = audioContext.createDelay(0.1);
    delay.delayTime.value = delaySec;
    const fb = audioContext.createGain();
    fb.gain.value = ALLPASS_GAIN;
    const ff = audioContext.createGain();
    ff.gain.value = -ALLPASS_GAIN;
    const apOut = audioContext.createGain();

    allpassInput.connect(sum);
    sum.connect(delay);
    delay.connect(fb);
    fb.connect(sum);
    delay.connect(apOut);
    allpassInput.connect(ff);
    ff.connect(apOut);

    allpassNodes.push(sum, delay, fb, ff, apOut);
    allpassInput = apOut;
  }

  input.connect(dryGain);
  dryGain.connect(output);
  allpassInput.connect(wetChain.input);
  wetChain.output.connect(wetGain);
  wetGain.connect(output);

  return {
    input,
    output,
    apply(decay: number, mix: number, time: number) {
      const decaySec = mapReverbDecaySec(decay);
      for (let i = 0; i < COMB_DELAY_SAMPLES.length; i += 1) {
        const delaySec = COMB_DELAY_SAMPLES[i] / BASE_SAMPLE_RATE;
        combFeedbacks[i].gain.setValueAtTime(
          combFeedback(delaySec, decaySec),
          time,
        );
      }
      applyReverbMix(dryGain.gain, wetGain.gain, mix, time);
    },
    cleanup() {
      input.disconnect();
      output.disconnect();
      dryGain.disconnect();
      wetGain.disconnect();
      combMix.disconnect();
      wetChain.cleanup();
      for (const node of combDelays) node.disconnect();
      for (const node of combFilters) node.disconnect();
      for (const node of combFeedbacks) node.disconnect();
      for (const node of allpassNodes) node.disconnect();
    },
  };
}
