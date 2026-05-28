import type { SynthParams } from "./synth-params";

export interface Voice {
  outputNode: GainNode;
  noteOn(frequency: number, params: SynthParams, velocity?: number): void;
  noteOff(params: SynthParams): void;
  updateParams(params: SynthParams): void;
  forceStop(): void;
}

// Map 0–1 to ~80Hz – ~10000Hz on a log scale
function cutoffParamToHz(param: number): number {
  return 80 * Math.pow(125, param);
}

export function createVoice(audioContext: AudioContext): Voice {
  const ctx = audioContext;

  // --- Oscillators ---
  const mainOsc = ctx.createOscillator();
  const detuneOsc = ctx.createOscillator();
  const subOsc = ctx.createOscillator();
  subOsc.type = "triangle";

  // --- Oscillator mix gains ---
  const mainGain = ctx.createGain();
  const detuneGain = ctx.createGain();
  const subGain = ctx.createGain();
  mainGain.gain.value = 1;
  detuneGain.gain.value = 0;
  subGain.gain.value = 0;

  const mixGain = ctx.createGain();
  mixGain.gain.value = 0.4;

  // --- Drift LFO: one per voice, shared across oscillators ---
  const driftLfo = ctx.createOscillator();
  const driftGain = ctx.createGain();
  driftLfo.type = "sine";
  // Randomize rate slightly per voice for organic variation
  driftLfo.frequency.value = 0.07 + Math.random() * 0.25;
  driftGain.gain.value = 0;

  // Connect drift LFO output to all oscillator detune params (summed additively)
  driftLfo.connect(driftGain);
  driftGain.connect(mainOsc.detune);
  driftGain.connect(detuneOsc.detune);
  driftGain.connect(subOsc.detune);

  // --- Filter ---
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 8000;
  filter.Q.value = 1;

  // --- Amp envelope gain ---
  const ampEnv = ctx.createGain();
  ampEnv.gain.value = 0;

  // --- Output ---
  const outputNode = ctx.createGain();
  outputNode.gain.value = 1;

  // --- Signal routing ---
  mainOsc.connect(mainGain);
  detuneOsc.connect(detuneGain);
  subOsc.connect(subGain);
  mainGain.connect(mixGain);
  detuneGain.connect(mixGain);
  subGain.connect(mixGain);
  mixGain.connect(filter);
  filter.connect(ampEnv);
  ampEnv.connect(outputNode);

  // Start all oscillators and drift LFO
  driftLfo.start();
  mainOsc.start();
  detuneOsc.start();
  subOsc.start();

  let currentFrequency = 261.63;

  function getWaveType(wave: number): OscillatorType {
    const types: OscillatorType[] = ["sawtooth", "square", "triangle", "sine"];
    return types[wave] ?? "sawtooth";
  }

  // Apply parameters that don't depend on note frequency
  function applyStaticParams(params: SynthParams): void {
    const t = ctx.currentTime;

    mainOsc.type = getWaveType(params.oscWave);
    detuneOsc.type = getWaveType(params.oscWave);

    // Unison detune: main is flat by half, detune osc is sharp by half
    const detuneCents = params.oscDetune * 50;
    if (params.oscDetune > 0) {
      detuneGain.gain.setValueAtTime(1, t);
      mainOsc.detune.cancelScheduledValues(t);
      mainOsc.detune.setValueAtTime(-detuneCents / 2, t);
      detuneOsc.detune.cancelScheduledValues(t);
      detuneOsc.detune.setValueAtTime(detuneCents / 2, t);
    } else {
      detuneGain.gain.setValueAtTime(0, t);
      mainOsc.detune.cancelScheduledValues(t);
      mainOsc.detune.setValueAtTime(0, t);
      detuneOsc.detune.cancelScheduledValues(t);
      detuneOsc.detune.setValueAtTime(0, t);
    }

    subGain.gain.setValueAtTime(params.subLevel, t);

    // Drift depth: 0–30 cents (added on top of intrinsic detune by LFO connection)
    driftGain.gain.setValueAtTime(params.drift * 30, t);
  }

  function noteOn(frequency: number, params: SynthParams, velocity = 1): void {
    currentFrequency = frequency;
    const t = ctx.currentTime;
    const attackTime = 0.003;

    applyStaticParams(params);

    // Set oscillator frequencies
    mainOsc.frequency.setValueAtTime(frequency, t);
    detuneOsc.frequency.setValueAtTime(frequency, t);
    subOsc.frequency.setValueAtTime(frequency / 2, t); // one octave below

    // --- Filter setup with key tracking ---
    // Key tracking: cutoff scales with note frequency relative to C4 (261.63Hz)
    const baseCutoffHz = cutoffParamToHz(params.filterCutoff);
    const keyTrackedCutoff = Math.min(
      baseCutoffHz * (frequency / 261.63),
      ctx.sampleRate / 2 - 100,
    );

    filter.frequency.cancelScheduledValues(t);
    filter.frequency.setValueAtTime(Math.max(keyTrackedCutoff, 20), t);
    filter.Q.cancelScheduledValues(t);
    filter.Q.setValueAtTime(0.5 + params.filterPeak * 20, t);

    // TB-303 style EnvMod via filter.detune (cents, independent of filter.frequency)
    // envModCents = up to 4 octaves (4800 cents) of filter sweep
    const envModCents = params.filterEnvMod * 4800;
    filter.detune.cancelScheduledValues(t);

    if (envModCents > 0.1) {
      const decayTime = params.ampDecay < 1 ? 0.05 + params.ampDecay * 1.95 : 4;
      filter.detune.setValueAtTime(envModCents, t);
      // Ramp to near-zero (exponential cannot ramp to 0)
      filter.detune.exponentialRampToValueAtTime(
        0.5,
        t + attackTime + decayTime,
      );
    } else {
      filter.detune.setValueAtTime(0, t);
    }

    // --- Amp envelope ---
    ampEnv.gain.cancelScheduledValues(t);
    ampEnv.gain.setValueAtTime(0.0001, t);
    ampEnv.gain.linearRampToValueAtTime(velocity, t + attackTime);

    if (params.ampDecay < 1) {
      const decayTime = 0.05 + params.ampDecay * 1.95;
      ampEnv.gain.exponentialRampToValueAtTime(
        0.0001,
        t + attackTime + decayTime,
      );
    }
    // If ampDecay === 1: sustain at full level indefinitely
  }

  function noteOff(params: SynthParams): void {
    const t = ctx.currentTime;
    const releaseTime = 0.05 + params.ampRelease * 1.95;
    const current = ampEnv.gain.value;
    ampEnv.gain.cancelScheduledValues(t);
    ampEnv.gain.setValueAtTime(Math.max(current, 0.0001), t);
    ampEnv.gain.exponentialRampToValueAtTime(0.0001, t + releaseTime);
  }

  function updateParams(params: SynthParams): void {
    applyStaticParams(params);
    // Update filter cutoff in real-time (key-tracked)
    const baseCutoffHz = cutoffParamToHz(params.filterCutoff);
    const keyTrackedCutoff = Math.min(
      baseCutoffHz * (currentFrequency / 261.63),
      ctx.sampleRate / 2 - 100,
    );
    filter.frequency.setValueAtTime(
      Math.max(keyTrackedCutoff, 20),
      ctx.currentTime,
    );
    filter.Q.setValueAtTime(0.5 + params.filterPeak * 20, ctx.currentTime);
  }

  function forceStop(): void {
    const t = ctx.currentTime;
    const current = ampEnv.gain.value;
    ampEnv.gain.cancelScheduledValues(t);
    ampEnv.gain.setValueAtTime(Math.max(current, 0.0001), t);
    ampEnv.gain.exponentialRampToValueAtTime(0.0001, t + 0.02);
  }

  return { outputNode, noteOn, noteOff, updateParams, forceStop };
}
