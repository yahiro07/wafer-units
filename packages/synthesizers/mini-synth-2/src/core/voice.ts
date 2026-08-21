import { SynthParameters } from "@/core/definitions";
import { midiToFreq } from "./synthesis-utils";

let pulse125Wave: PeriodicWave | null = null;
let sawWave: PeriodicWave | null = null;

function getPulseWave(context: AudioContext, duty: number) {
  const terms = 64;
  const real = new Float32Array(terms);
  const imag = new Float32Array(terms);
  real[0] = duty;
  for (let i = 1; i < terms; i++) {
    const n = i;
    real[i] = (2 / (n * Math.PI)) * Math.sin(Math.PI * n * duty);
    imag[i] = 0;
  }
  return context.createPeriodicWave(real, imag, {
    disableNormalization: false,
  });
}

function getWave(context: AudioContext, waveParam: number) {
  if (waveParam < 0.5) {
    if (!sawWave) sawWave = getPulseWave(context, 1.0); // using standard sawtooth logic or periodic wave
    return "sawtooth";
  } else if (waveParam < 1.5) {
    return "square";
  } else {
    if (!pulse125Wave) pulse125Wave = getPulseWave(context, 0.125);
    return pulse125Wave;
  }
}

export type Voice = {
  outputNode: GainNode;
  updateNodeParameters: (params: SynthParameters) => void;
  noteOn: (noteNumber: number, time: number, velocity: number) => void;
  noteOff: (time: number) => void;
};

export function createVoice(
  context: AudioContext,
  params: SynthParameters,
): Voice {
  let currentParams = params;
  const outputNode = context.createGain();
  outputNode.gain.value = 1; // fix output node gain so sound passes through

  // Oscillators
  const osc1 = context.createOscillator();
  const osc2 = context.createOscillator();
  const sub = context.createOscillator();

  const wave = getWave(context, params.oscWave);
  if (typeof wave === "string") {
    osc1.type = wave as OscillatorType;
    osc2.type = wave as OscillatorType;
    sub.type = wave as OscillatorType;
  } else {
    osc1.setPeriodicWave(wave);
    osc2.setPeriodicWave(wave);
    sub.setPeriodicWave(wave);
  }

  // Detune amount
  // 0~1 maps to 0 ~ 50 cents max
  const detuneCents = params.oscDetune * 50;
  if (params.oscDetune > 0) {
    osc1.detune.value = detuneCents;
    osc2.detune.value = -detuneCents;
  } else {
    osc1.detune.value = 0;
    osc2.detune.value = 0;
  }

  // Drift
  const lfo = context.createOscillator();
  const lfoGain = context.createGain();
  lfo.type = "sine";
  lfo.frequency.value = 0.5 + Math.random(); // slightly random phase/rate per note
  lfoGain.gain.value = params.oscDrift * 30; // max 30 cents drift
  lfo.connect(lfoGain);
  lfoGain.connect(osc1.detune);
  lfoGain.connect(osc2.detune);

  const mainOscGain = context.createGain();
  mainOscGain.gain.value = 0.5;

  const subOscGain = context.createGain();
  subOscGain.gain.value = params.oscSub;

  osc1.connect(mainOscGain);
  osc2.connect(mainOscGain);
  sub.connect(subOscGain);

  const filter = context.createBiquadFilter();
  filter.type = "lowpass";

  // Cutoff Mapping
  // Frequency mapping: 0~1 => 20Hz ~ 10000Hz (exponential)
  const baseFreq = 40 * Math.pow(10000 / 40, params.filterCutoff);
  filter.frequency.value = baseFreq;
  filter.Q.value = 0.707 + params.filterPeak * 20;

  mainOscGain.connect(filter);
  subOscGain.connect(filter);

  const ampGain = context.createGain();
  ampGain.gain.value = 0;

  filter.connect(ampGain);
  ampGain.connect(outputNode);

  let released = false;

  function updateNodeParameters(nextParams: SynthParameters) {
    currentParams = nextParams;
    const updateTime = context.currentTime;

    const nextWave = getWave(context, nextParams.oscWave);
    if (typeof nextWave === "string") {
      osc1.type = nextWave as OscillatorType;
      osc2.type = nextWave as OscillatorType;
    } else {
      osc1.setPeriodicWave(nextWave);
      osc2.setPeriodicWave(nextWave);
    }

    const nextDetuneCents = nextParams.oscDetune * 50;
    osc1.detune.setTargetAtTime(nextDetuneCents, updateTime, 0.01);
    osc2.detune.setTargetAtTime(-nextDetuneCents, updateTime, 0.01);
    lfoGain.gain.setTargetAtTime(nextParams.oscDrift * 30, updateTime, 0.01);
    subOscGain.gain.setTargetAtTime(nextParams.oscSub, updateTime, 0.01);

    const nextBaseFreq = 40 * Math.pow(10000 / 40, nextParams.filterCutoff);
    filter.frequency.setTargetAtTime(nextBaseFreq, updateTime, 0.01);
    filter.Q.setTargetAtTime(nextParams.filterPeak * 20, updateTime, 0.01);
  }

  return {
    outputNode,
    updateNodeParameters,
    noteOn(noteNumber, time, velocity) {
      const freq = midiToFreq(noteNumber);
      osc1.frequency.value = freq;
      osc2.frequency.value = freq;
      sub.frequency.value = freq / 2;

      // Amp Envelope
      const decayTime =
        params.ampDecay < 1 ? Math.max(0.01, params.ampDecay * 3) : 3;
      const sustain = params.ampDecay === 1 ? 1 : 0;
      const t = time && time > context.currentTime ? time : context.currentTime;
      ampGain.gain.setValueAtTime(0, t);
      ampGain.gain.linearRampToValueAtTime(Math.max(0.001, velocity), t + 0.01);
      if (sustain === 0) {
        ampGain.gain.exponentialRampToValueAtTime(0.001, t + 0.01 + decayTime);
      }

      // Filter Envelope
      const envModCents = params.filterEnvMod * 4800; // max 4 octaves
      if (envModCents > 0) {
        filter.detune.setValueAtTime(envModCents, t);
        filter.detune.exponentialRampToValueAtTime(1, t + 0.01 + decayTime); // ramp detune back to 0 implicitly
      } else {
        filter.detune.value = 0;
      }

      lfo.start(t);
      osc1.start(t);
      osc2.start(t);
      sub.start(t);
    },
    noteOff(time: number) {
      if (released) return;
      released = true;
      const tOff =
        time && time > context.currentTime ? time : context.currentTime;
      const releaseTime = Math.max(0.01, currentParams.ampRelease * 3);

      ampGain.gain.cancelScheduledValues(tOff);
      ampGain.gain.setValueAtTime(ampGain.gain.value, tOff);
      ampGain.gain.exponentialRampToValueAtTime(0.001, tOff + releaseTime);

      const stopTime = tOff + releaseTime + 0.1;
      lfo.stop(stopTime);
      osc1.stop(stopTime);
      osc2.stop(stopTime);
      sub.stop(stopTime);

      const delayMs = (tOff - context.currentTime + releaseTime + 0.2) * 1000;
      setTimeout(
        () => {
          outputNode.disconnect();
        },
        Math.max(0, delayMs),
      );
    },
  };
}
