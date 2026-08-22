import { OscWave, SynthParameters } from "@/core/definitions";
import { midiToFreq } from "./synthesis-utils";

let pulse125Wave: PeriodicWave | null = null;
let pulse25Wave: PeriodicWave | null = null;

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

function getWave(context: AudioContext, wave: OscWave) {
  if (wave === OscWave.sawtooth) {
    return "sawtooth";
  } else if (wave === OscWave.square) {
    return "square";
  } else if (wave === OscWave.triangle) {
    return "triangle";
  } else if (wave === OscWave.pulse125) {
    return (pulse125Wave ??= getPulseWave(context, 0.125));
  } else {
    return (pulse25Wave ??= getPulseWave(context, 0.25));
  }
}

const configs = {
  detuneCentsMax: 40,
  decayTimeMax: 3,
  releaseTimeMax: 3,
};

const helpers = {
  getDetuneCents: (detune: number) => detune ** 2 * configs.detuneCentsMax,
  calcFilterBaseFreq: (cutoff: number, oscsBottomFreq: number) => {
    //exponential filter frequency mapping
    const topFreq = 10000;
    const bottomFreq = oscsBottomFreq / 2;
    return bottomFreq * Math.pow(topFreq / bottomFreq, cutoff);
  },
  calcFilterQ: (peak: number) => 0.707 + peak * 16,
};

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
  const useDualOsc = params.oscDetune > 0;
  const osc1 = context.createOscillator();
  const osc2 = useDualOsc ? context.createOscillator() : null;
  const sub = context.createOscillator();

  const applyWave = (osc: OscillatorNode, wave: string | PeriodicWave) => {
    if (typeof wave === "string") {
      osc.type = wave as OscillatorType;
    } else {
      osc.setPeriodicWave(wave);
    }
  };

  const wave = getWave(context, params.oscWave);
  applyWave(osc1, wave);
  if (osc2) applyWave(osc2, wave);
  applyWave(sub, wave);

  // Detune amount: 0~1 maps to 0 ~ 50 cents max (squared)
  const detuneCents = helpers.getDetuneCents(params.oscDetune);
  if (osc2) {
    osc1.detune.value = detuneCents;
    osc2.detune.value = -detuneCents;
  } else {
    osc1.detune.value = 0;
  }

  // Drift
  const lfo = context.createOscillator();
  const lfoGain = context.createGain();
  lfo.type = "sine";
  lfo.frequency.value = 0.5 + Math.random(); // slightly random phase/rate per note
  lfoGain.gain.value = params.oscDrift * 30; // max 30 cents drift
  lfo.connect(lfoGain);
  lfoGain.connect(osc1.detune);
  if (osc2) lfoGain.connect(osc2.detune);

  const mainOscGain = context.createGain();
  mainOscGain.gain.value = 0.5;

  const subOscGain = context.createGain();
  subOscGain.gain.value = params.oscSub;

  if (osc2) {
    const panL = context.createStereoPanner();
    const panR = context.createStereoPanner();
    panL.pan.value = -0.5;
    panR.pan.value = 0.5;
    osc1.connect(panL);
    osc2.connect(panR);
    panL.connect(mainOscGain);
    panR.connect(mainOscGain);
  } else {
    osc1.connect(mainOscGain);
  }
  sub.connect(subOscGain);

  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.Q.value = helpers.calcFilterQ(params.filterPeak);

  mainOscGain.connect(filter);
  subOscGain.connect(filter);

  const ampGain = context.createGain();
  ampGain.gain.value = 0;

  filter.connect(ampGain);
  ampGain.connect(outputNode);

  let released = false;
  let oscsBottomFreq = 1;

  function updateNodeParameters(nextParams: SynthParameters) {
    currentParams = nextParams;
    const updateTime = context.currentTime;

    const nextWave = getWave(context, nextParams.oscWave);
    applyWave(osc1, nextWave);
    if (osc2) applyWave(osc2, nextWave);

    const nextDetuneCents = helpers.getDetuneCents(nextParams.oscDetune);
    if (osc2) {
      osc1.detune.setTargetAtTime(nextDetuneCents, updateTime, 0.01);
      osc2.detune.setTargetAtTime(-nextDetuneCents, updateTime, 0.01);
    }
    lfoGain.gain.setTargetAtTime(nextParams.oscDrift * 30, updateTime, 0.01);
    subOscGain.gain.setTargetAtTime(nextParams.oscSub, updateTime, 0.01);

    const nextBaseFreq = helpers.calcFilterBaseFreq(
      nextParams.filterCutoff,
      oscsBottomFreq,
    );
    filter.frequency.setTargetAtTime(nextBaseFreq, updateTime, 0.01);
    const nextFilterQ = helpers.calcFilterQ(nextParams.filterPeak);
    filter.Q.setTargetAtTime(nextFilterQ, updateTime, 0.01);
  }

  return {
    outputNode,
    updateNodeParameters,
    noteOn(noteNumber, time, velocity) {
      const freq = midiToFreq(noteNumber);
      osc1.frequency.value = freq;
      if (osc2) osc2.frequency.value = freq;
      sub.frequency.value = freq / 2;
      oscsBottomFreq = params.oscSub > 0 ? freq / 2 : freq;

      const baseFreq = helpers.calcFilterBaseFreq(
        params.filterCutoff,
        oscsBottomFreq,
      );
      filter.frequency.value = baseFreq;

      // Amp Envelope
      const riseTime = 0.001;
      const decayTime =
        params.ampDecay < 1
          ? Math.max(0.01, params.ampDecay * configs.decayTimeMax)
          : configs.decayTimeMax;
      const sustain = params.ampDecay === 1 ? 1 : 0;
      const t = time && time > context.currentTime ? time : context.currentTime;
      ampGain.gain.setValueAtTime(0, t);
      ampGain.gain.linearRampToValueAtTime(
        Math.max(0.001, velocity),
        t + riseTime,
      );
      if (sustain === 0) {
        ampGain.gain.exponentialRampToValueAtTime(
          0.001,
          t + riseTime + decayTime,
        );
      }

      // Filter Envelope
      if (params.filterDecay > 0) {
        const filterDecayTime = params.filterDecay ** 2 * 4;
        const envModCents = 1200 * 4; // max 4 octaves
        filter.detune.setValueAtTime(envModCents, t);
        filter.detune.exponentialRampToValueAtTime(
          1,
          t + riseTime + filterDecayTime,
        ); // ramp detune back to 0 implicitly
      } else {
        filter.detune.value = 0;
      }

      lfo.start(t);
      osc1.start(t);
      if (osc2) {
        osc2.start(t);
      }
      sub.start(t);
    },
    noteOff(time: number) {
      if (released) return;
      released = true;
      const tOff =
        time && time > context.currentTime ? time : context.currentTime;
      const releaseTime = Math.max(
        0.01,
        currentParams.ampRelease * configs.releaseTimeMax,
      );

      ampGain.gain.cancelScheduledValues(tOff);
      ampGain.gain.setValueAtTime(ampGain.gain.value, tOff);
      ampGain.gain.exponentialRampToValueAtTime(0.001, tOff + releaseTime);

      const stopTime = tOff + releaseTime + 0.1;
      lfo.stop(stopTime);
      osc1.stop(stopTime);
      osc2?.stop(stopTime);
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
