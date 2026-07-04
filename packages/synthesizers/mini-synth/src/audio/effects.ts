import type { SynthParams } from "./synth-params";

// Generate a random exponential-decay impulse response for convolution reverb
function generateImpulseResponse(
  ctx: AudioContext,
  durationSec: number,
  decay: number,
): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * durationSec);
  const buffer = ctx.createBuffer(2, length, sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return buffer;
}

function createChorus(ctx: AudioContext) {
  const inputNode = ctx.createGain();
  const outputNode = ctx.createGain();

  const dryGain = ctx.createGain();
  const wetGain = ctx.createGain();
  dryGain.gain.value = 1;
  wetGain.gain.value = 0;

  // Two modulated delay lines for stereo width
  const delayL = ctx.createDelay(0.05);
  const delayR = ctx.createDelay(0.05);
  delayL.delayTime.value = 0.012;
  delayR.delayTime.value = 0.018;

  const lfoL = ctx.createOscillator();
  const lfoR = ctx.createOscillator();
  const lfoGainL = ctx.createGain();
  const lfoGainR = ctx.createGain();
  lfoL.type = "sine";
  lfoR.type = "sine";
  lfoL.frequency.value = 0.7;
  lfoR.frequency.value = 1.0;
  lfoGainL.gain.value = 0.003;
  lfoGainR.gain.value = 0.003;

  lfoL.connect(lfoGainL);
  lfoR.connect(lfoGainR);
  lfoGainL.connect(delayL.delayTime);
  lfoGainR.connect(delayR.delayTime);
  lfoL.start();
  lfoR.start();

  // Merge L/R delays into stereo wet signal
  const merger = ctx.createChannelMerger(2);
  inputNode.connect(dryGain);
  inputNode.connect(delayL);
  inputNode.connect(delayR);
  delayL.connect(merger, 0, 0);
  delayR.connect(merger, 0, 1);
  merger.connect(wetGain);
  dryGain.connect(outputNode);
  wetGain.connect(outputNode);

  return {
    inputNode,
    outputNode,
    updateWet(amount: number): void {
      wetGain.gain.value = amount * 0.6;
      lfoGainL.gain.value = amount * 0.005;
      lfoGainR.gain.value = amount * 0.005;
    },
    cleanup() {
      lfoL.stop();
      lfoR.stop();
      lfoL.disconnect();
      lfoR.disconnect();
      lfoGainL.disconnect();
      lfoGainR.disconnect();
      delayL.disconnect();
      delayR.disconnect();
      dryGain.disconnect();
      wetGain.disconnect();
      inputNode.disconnect();
    },
  };
}

function createReverb(ctx: AudioContext) {
  const inputNode = ctx.createGain();
  const outputNode = ctx.createGain();

  const convolver = ctx.createConvolver();
  convolver.buffer = generateImpulseResponse(ctx, 2.5, 1.8);

  const dryGain = ctx.createGain();
  const wetGain = ctx.createGain();
  dryGain.gain.value = 1;
  wetGain.gain.value = 0;

  inputNode.connect(dryGain);
  inputNode.connect(convolver);
  convolver.connect(wetGain);
  dryGain.connect(outputNode);
  wetGain.connect(outputNode);

  return {
    inputNode,
    outputNode,
    updateWet(amount: number): void {
      wetGain.gain.value = amount * 0.8;
    },
    cleanup() {
      convolver.disconnect();
      dryGain.disconnect();
      wetGain.disconnect();
      inputNode.disconnect();
    },
  };
}

// Soft saturation clip using a modified sigmoid curve
function createSoftClipper(ctx: AudioContext) {
  const inputNode = ctx.createGain();
  const waveShaper = ctx.createWaveShaper();

  const n = 1024;
  const curve = new Float32Array(n);
  const k = 2.0;
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = ((Math.PI + k) * x) / (Math.PI + k * Math.abs(x));
  }
  waveShaper.curve = curve;
  waveShaper.oversample = "4x";
  inputNode.connect(waveShaper);

  return {
    inputNode,
    outputNode: waveShaper as AudioNode,
    cleanup() {
      waveShaper.disconnect();
    },
  };
}

export interface EffectsChain {
  inputNode: GainNode;
  outputNode: GainNode;
  updateParams(params: SynthParams): void;
  cleanup(): void;
}

export function createEffectsChain(ctx: AudioContext): EffectsChain {
  const inputNode = ctx.createGain();
  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.8;

  const chorus = createChorus(ctx);
  const reverb = createReverb(ctx);
  const softClipper = createSoftClipper(ctx);

  // Signal chain: input → chorus → reverb → softclip → master
  inputNode.connect(chorus.inputNode);
  chorus.outputNode.connect(reverb.inputNode);
  reverb.outputNode.connect(softClipper.inputNode);
  softClipper.outputNode.connect(masterGain);

  return {
    inputNode,
    outputNode: masterGain,
    updateParams(params: SynthParams): void {
      chorus.updateWet(params.chorus);
      reverb.updateWet(params.reverb);
      masterGain.gain.setValueAtTime(params.masterVolume, ctx.currentTime);
    },
    cleanup() {
      chorus.outputNode.disconnect();
      reverb.outputNode.disconnect();
      softClipper.outputNode.disconnect();
      chorus.cleanup();
      reverb.cleanup();
      softClipper.cleanup();
      inputNode.disconnect();
    },
  };
}
