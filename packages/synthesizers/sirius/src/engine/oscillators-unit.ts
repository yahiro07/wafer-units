import { OscWave, SynthParameters } from "@/defs/definitions";
import { midiToFreq, tunableSigmoid } from "./synthesis-utils";
import { getOscWaveformPdSaw } from "@/engine/pd-saw";

const periodicWaveCache: Partial<Record<OscWave, PeriodicWave | null>> = {};

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

function getSaturatedSawWave(context: AudioContext, k: number) {
  const n = 2048;
  const terms = 64;
  const time = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (2 * i) / n - 1;
    time[i] = tunableSigmoid(x, k);
  }
  const real = new Float32Array(terms);
  const imag = new Float32Array(terms);
  for (let h = 0; h < terms; h++) {
    let re = 0;
    let im = 0;
    for (let i = 0; i < n; i++) {
      const phi = (2 * Math.PI * h * i) / n;
      re += time[i] * Math.cos(phi);
      im += time[i] * Math.sin(phi);
    }
    real[h] = re / n;
    imag[h] = im / n;
  }
  return context.createPeriodicWave(real, imag, {
    disableNormalization: false,
  });
}

function getPdSawWave(context: AudioContext, pdLevel: number) {
  const n = 2048;
  const terms = 64;
  const time = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    time[i] = getOscWaveformPdSaw(i / n, pdLevel);
  }
  const real = new Float32Array(terms);
  const imag = new Float32Array(terms);
  for (let h = 0; h < terms; h++) {
    let re = 0;
    let im = 0;
    for (let i = 0; i < n; i++) {
      const phi = (2 * Math.PI * h * i) / n;
      re += time[i] * Math.cos(phi);
      im += time[i] * Math.sin(phi);
    }
    real[h] = re / n;
    imag[h] = im / n;
  }
  return context.createPeriodicWave(real, imag, {
    disableNormalization: false,
  });
}

function getWave(context: AudioContext, wave: OscWave) {
  if (wave === OscWave.sawtooth) {
    return "sawtooth";
  } else if (wave === OscWave.sawtoothR) {
    return (periodicWaveCache[wave] ??= getSaturatedSawWave(context, -0.55));
  } else if (wave === OscWave.sawtoothR2) {
    return (periodicWaveCache[wave] ??= getPdSawWave(context, 0.98));
  } else if (wave === OscWave.pulse125) {
    return (periodicWaveCache[wave] ??= getPulseWave(context, 0.125));
  } else if (wave === OscWave.pulse25) {
    return (periodicWaveCache[wave] ??= getPulseWave(context, 0.25));
  } else if (wave === OscWave.square) {
    return "square";
  } else if (wave === OscWave.triangle) {
    return "triangle";
  }
  return "sine"; //fallback, not used
}

const configs = {
  detuneCentsMax: 40,
};

const helpers = {
  getDetuneCents: (detune: number) => detune ** 2 * configs.detuneCentsMax,
};

function applyWave(osc: OscillatorNode, wave: string | PeriodicWave) {
  if (typeof wave === "string") {
    osc.type = wave as OscillatorType;
  } else {
    osc.setPeriodicWave(wave);
  }
}

export type OscillatorsUnit = {
  outputNode: GainNode;
  bottomFreq: number;
  update: (t?: number) => void;
  start: (t: number) => void;
  stop: (t: number) => void;
  cleanup: () => void;
};

export function createOscillatorsUnit(
  context: AudioContext,
  params: SynthParameters,
  noteNumber: number,
): OscillatorsUnit {
  const useDualOsc = params.oscDetune > 0;
  const osc1 = context.createOscillator();
  const osc2 = useDualOsc ? context.createOscillator() : null;
  const sub = context.createOscillator();

  const wave = getWave(context, params.oscWave);
  applyWave(osc1, wave);
  if (osc2) applyWave(osc2, wave);
  applyWave(sub, wave);

  const detuneCents = helpers.getDetuneCents(params.oscDetune);
  if (osc2) {
    osc1.detune.value = detuneCents;
    osc2.detune.value = -detuneCents;
  } else {
    osc1.detune.value = 0;
  }

  const lfo = context.createOscillator();
  const lfoGain = context.createGain();
  lfo.type = "sine";
  lfo.frequency.value = 0.5 + Math.random();
  lfoGain.gain.value = params.oscDrift * 30;
  lfo.connect(lfoGain);
  lfoGain.connect(osc1.detune);
  if (osc2) lfoGain.connect(osc2.detune);

  const osc1Gain = context.createGain();
  osc1Gain.gain.value = 0.5;
  const osc2Gain = osc2 ? context.createGain() : null;
  if (osc2Gain) osc2Gain.gain.value = 0.5;

  const subOscGain = context.createGain();
  subOscGain.gain.value = params.oscSub * 0.5;

  const panL = osc2 ? context.createStereoPanner() : null;
  const panR = osc2 ? context.createStereoPanner() : null;
  if (osc2 && osc2Gain && panL && panR) {
    panL.pan.value = -0.5;
    panR.pan.value = 0.5;
    osc1.connect(panL);
    osc2.connect(panR);
    panL.connect(osc1Gain);
    panR.connect(osc2Gain);
  } else {
    osc1.connect(osc1Gain);
  }
  sub.connect(subOscGain);

  const freq = midiToFreq(noteNumber);
  osc1.frequency.value = freq;
  if (osc2) osc2.frequency.value = freq;
  sub.frequency.value = freq / 2;
  const bottomFreq = params.oscSub > 0 ? freq / 2 : freq;

  const outputNode = context.createGain();
  outputNode.gain.value = 1;
  osc1Gain.connect(outputNode);
  osc2Gain?.connect(outputNode);
  subOscGain.connect(outputNode);

  return {
    outputNode,
    bottomFreq,
    update(t?: number) {
      const nextWave = getWave(context, params.oscWave);
      applyWave(osc1, nextWave);
      if (osc2) applyWave(osc2, nextWave);

      const nextDetuneCents = helpers.getDetuneCents(params.oscDetune);
      if (t !== undefined) {
        if (osc2) {
          osc1.detune.setTargetAtTime(nextDetuneCents, t, 0.01);
          osc2.detune.setTargetAtTime(-nextDetuneCents, t, 0.01);
        }
        lfoGain.gain.setTargetAtTime(params.oscDrift * 30, t, 0.01);
        subOscGain.gain.setTargetAtTime(params.oscSub * 0.5, t, 0.01);
      } else {
        if (osc2) {
          osc1.detune.value = nextDetuneCents;
          osc2.detune.value = -nextDetuneCents;
        }
        lfoGain.gain.value = params.oscDrift * 30;
        subOscGain.gain.value = params.oscSub * 0.5;
      }
    },
    start(t) {
      lfo.start(t);
      osc1.start(t);
      osc2?.start(t);
      sub.start(t);
    },
    stop(t) {
      lfo.stop(t);
      osc1.stop(t);
      osc2?.stop(t);
      sub.stop(t);
    },
    cleanup() {
      lfo.disconnect();
      lfoGain.disconnect();
      osc1.disconnect();
      osc2?.disconnect();
      sub.disconnect();
      panL?.disconnect();
      panR?.disconnect();
      osc1Gain.disconnect();
      osc2Gain?.disconnect();
      subOscGain.disconnect();
      outputNode.disconnect();
    },
  };
}
