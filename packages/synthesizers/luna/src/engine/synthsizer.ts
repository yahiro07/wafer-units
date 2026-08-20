import {
  defaultSynthParameters,
  ISynthesizer,
  OscWave,
  SynthParameters,
} from "@/defs/definitions";
import { createEnvelopeGenerator } from "@/engine/envelope-generator";
import { createSuperSawOscillator } from "@/engine/super-saw-oscillator";
import { UnitInterface } from "wafer-host/unit-types";

const LPF_TWO_STAGE = false;

const MIN_CUTOFF_HZ = 20;
const MAX_CUTOFF_HZ = 18000;
const MIN_Q = 0.1;
const MAX_Q = 18;
const MAX_OSC_DETUNE_CENTS = 50;
const MAX_FILTER_ENV_CENTS = 4800;
const MAX_ATTACK_SECONDS = 4;
const MAX_DECAY_SECONDS = 8;
const MAX_RELEASE_SECONDS = 4;
const MAX_PUNCH_GAIN = 16;
const MAX_PUNCH_DECAY_SECONDS = 0.12;
const SHAPER_CURVE_SIZE = 1024;

function createTransferCurve(
  map: (x: number) => number,
): Float32Array<ArrayBuffer> {
  const curve = new Float32Array(
    new ArrayBuffer(SHAPER_CURVE_SIZE * Float32Array.BYTES_PER_ELEMENT),
  );
  for (let i = 0; i < curve.length; i += 1) {
    const x = (i / (curve.length - 1)) * 2 - 1;
    curve[i] = map(x);
  }
  return curve;
}

const identityShaperCurve = createTransferCurve((x) => x);
const tanhShaperCurve = createTransferCurve((x) => Math.tanh(x));

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

function mapCutoffHz(
  value: number,
  nyquist: number,
  minHz: number = MIN_CUTOFF_HZ,
  maxHz?: number,
): number {
  const min = clamp(minHz, 10, nyquist);
  const max = Math.max(min, Math.min(MAX_CUTOFF_HZ, maxHz ?? nyquist));
  const hz = min * (max / min) ** clamp01(value);
  return clamp(hz, min, max);
}

function mapQ(value: number): number {
  return MIN_Q + clamp01(value) * (MAX_Q - MIN_Q);
}

function midiToFrequency(noteNumber: number): number {
  return 440 * 2 ** ((noteNumber - 69) / 12);
}

function waveToOscillatorType(wave: OscWave): OscillatorType {
  switch (Math.round(wave)) {
    case OscWave.Rect:
      return "square";
    case OscWave.Tri:
      return "triangle";
    case OscWave.Sine:
      return "sine";
    default:
      return "sawtooth";
  }
}

function isNoiseWave(wave: OscWave): boolean {
  return Math.round(wave) === OscWave.Ex;
}

function isSuperSawWave(wave: OscWave): boolean {
  return Math.round(wave) === OscWave.Ex;
}

function isSineWave(wave: OscWave): boolean {
  return Math.round(wave) === OscWave.Sine;
}

function createNoiseBuffer(audioContext: AudioContext): AudioBuffer {
  const length = audioContext.sampleRate * 2;
  const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function createNoiseSource(
  audioContext: AudioContext,
  buffer: AudioBuffer,
): AudioBufferSourceNode {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

export function createSynthesizerEngine(
  unitInterface: UnitInterface | undefined,
): ISynthesizer {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const destination =
    unitInterface?.audioOutputNode ?? audioContext.destination;
  const nyquist = audioContext.sampleRate * 0.5 - 1;

  const osc1 = audioContext.createOscillator();
  const osc2 = audioContext.createOscillator();
  const noiseBuffer = createNoiseBuffer(audioContext);
  const noise1 = createNoiseSource(audioContext, noiseBuffer);
  const noise2 = createNoiseSource(audioContext, noiseBuffer);
  const superSaw = createSuperSawOscillator(audioContext);

  const osc1Gain = audioContext.createGain();
  const osc2Gain = audioContext.createGain();
  const noise1Gain = audioContext.createGain();
  const noise2Gain = audioContext.createGain();
  const mix = audioContext.createGain();
  const hpf = audioContext.createBiquadFilter();
  const lpf1 = audioContext.createBiquadFilter();
  const lpf2 = LPF_TWO_STAGE ? audioContext.createBiquadFilter() : null;
  const amp = audioContext.createGain();
  const punchGain = audioContext.createGain();
  const punchAmount = audioContext.createGain();
  const saturator = audioContext.createWaveShaper();
  const voiceGain = audioContext.createGain();
  const envelope = audioContext.createConstantSource();
  const punchEnv = audioContext.createConstantSource();
  const filterEnvScale = audioContext.createGain();

  osc1.type = "sawtooth";
  osc2.type = "sawtooth";
  osc1.frequency.value = 440;
  osc2.frequency.value = 440;
  osc1Gain.gain.value = 1;
  osc2Gain.gain.value = 0;
  noise1Gain.gain.value = 0;
  noise2Gain.gain.value = 0;
  mix.gain.value = 1;

  hpf.type = "highpass";
  lpf1.type = "lowpass";
  if (lpf2) {
    lpf2.type = "lowpass";
  }
  amp.gain.value = 0;
  punchGain.gain.value = 1;
  punchAmount.gain.value = 0;
  punchEnv.offset.value = 0;
  saturator.curve = identityShaperCurve;
  saturator.oversample = "2x";
  envelope.offset.value = 0;
  filterEnvScale.gain.value = 0;

  osc1.connect(osc1Gain);
  osc2.connect(osc2Gain);
  noise1.connect(noise1Gain);
  noise2.connect(noise2Gain);
  osc1Gain.connect(mix);
  osc2Gain.connect(mix);
  noise1Gain.connect(mix);
  noise2Gain.connect(mix);
  superSaw.outputNode.connect(mix);
  mix.connect(hpf);
  hpf.connect(lpf1);
  if (lpf2) {
    lpf1.connect(lpf2);
    lpf2.connect(amp);
  } else {
    lpf1.connect(amp);
  }
  amp.connect(punchGain);
  // punchGain.connect(saturator);
  // saturator.connect(voiceGain);
  punchGain.connect(voiceGain);
  voiceGain.connect(destination);

  envelope.connect(amp.gain);
  envelope.connect(filterEnvScale);
  filterEnvScale.connect(lpf1.detune);
  if (lpf2) {
    filterEnvScale.connect(lpf2.detune);
  }
  punchEnv.connect(punchAmount);
  punchAmount.connect(punchGain.gain);

  osc1.start();
  osc2.start();
  noise1.start();
  noise2.start();
  envelope.start();
  punchEnv.start();

  const ampEnvelope = createEnvelopeGenerator(envelope.offset, {
    attackSec: MAX_ATTACK_SECONDS,
    decaySec: MAX_DECAY_SECONDS,
    releaseSec: MAX_RELEASE_SECONDS,
  });
  const punchEnvelope = createEnvelopeGenerator(punchEnv.offset, {
    attackSec: 0,
    decaySec: MAX_PUNCH_DECAY_SECONDS,
    releaseSec: 0,
  });

  const state: {
    parameters: SynthParameters;
    currentNote: number | null;
    lastNote: number;
  } = {
    parameters: { ...defaultSynthParameters },
    currentNote: null,
    lastNote: 69,
  };

  function applyOscillatorMix(parameters: SynthParameters, time: number) {
    const osc1IsSuperSaw = isSuperSawWave(parameters.osc1Wave);
    const osc2IsNoise = isNoiseWave(parameters.osc2Wave);
    const osc2Level = clamp01(parameters.osc2Volume);

    osc1Gain.gain.setValueAtTime(osc1IsSuperSaw ? 0 : 1, time);
    noise1Gain.gain.setValueAtTime(0, time);
    osc2Gain.gain.setValueAtTime(osc2IsNoise ? 0 : osc2Level, time);
    noise2Gain.gain.setValueAtTime(osc2IsNoise ? osc2Level : 0, time);
    superSaw.setEnabled(osc1IsSuperSaw, time);

    if (!osc1IsSuperSaw) {
      osc1.type = waveToOscillatorType(parameters.osc1Wave);
    }
    if (!osc2IsNoise) {
      osc2.type = waveToOscillatorType(parameters.osc2Wave);
    }
  }

  function getOscillatorPitches(parameters: SynthParameters): {
    osc1Hz: number;
    osc2Hz: number;
    detuneCents: number;
  } {
    const noteNumber = state.lastNote;
    const osc1Note = noteNumber + parameters.voiceOctave * 12;
    const osc2Note = osc1Note + parameters.osc2Octave * 12;
    const detuneCents =
      clamp01(parameters.oscDetune ** 2) * MAX_OSC_DETUNE_CENTS;
    return {
      osc1Hz: midiToFrequency(osc1Note),
      osc2Hz: midiToFrequency(osc2Note),
      detuneCents,
    };
  }

  function applyPitch(parameters: SynthParameters, time: number) {
    const { osc1Hz, osc2Hz, detuneCents } = getOscillatorPitches(parameters);
    osc1.frequency.setValueAtTime(osc1Hz, time);
    osc2.frequency.setValueAtTime(osc2Hz, time);
    if (isSuperSawWave(parameters.osc1Wave)) {
      osc1.detune.setValueAtTime(0, time);
      osc2.detune.setValueAtTime(0, time);
      superSaw.setPitch(osc1Hz, parameters.oscDetune, time);
    } else {
      osc1.detune.setValueAtTime(-detuneCents, time);
      osc2.detune.setValueAtTime(detuneCents, time);
    }
  }

  function applyFilterAndAmp(parameters: SynthParameters, time: number) {
    const { osc1Hz, osc2Hz } = getOscillatorPitches(parameters);
    const bottomF0Hz = Math.min(osc1Hz, osc2Hz);
    const lpfMinHz = bottomF0Hz / 2;
    hpf.frequency.setValueAtTime(
      mapCutoffHz(parameters.hpfCutoff, nyquist, 40, nyquist * 0.3),
      time,
    );
    hpf.Q.setValueAtTime(mapQ(parameters.hpfQ), time);
    const lpfHz = mapCutoffHz(parameters.lpfCutoff, nyquist, lpfMinHz);
    const lpfQ = mapQ(parameters.lpfQ);
    lpf1.frequency.setValueAtTime(lpfHz, time);
    lpf1.Q.setValueAtTime(lpfQ, time);
    if (lpf2) {
      lpf2.frequency.setValueAtTime(lpfHz, time);
      lpf2.Q.setValueAtTime(lpfQ, time);
    }
    filterEnvScale.gain.setValueAtTime(
      clamp01(parameters.lpfEnvMod) * MAX_FILTER_ENV_CENTS,
      time,
    );
    voiceGain.gain.setValueAtTime(clamp01(parameters.voiceVolume), time);
  }

  function applyEnvelopeParameters(parameters: SynthParameters) {
    const osc2Sounding = clamp01(parameters.osc2Volume) > 0;
    const hasNaiveWave =
      isSineWave(parameters.osc1Wave) ||
      (osc2Sounding && isSineWave(parameters.osc2Wave));
    ampEnvelope.setParameters({
      attack: clamp01(parameters.ampAttack) ** 2,
      decay: clamp01(parameters.ampDecay) ** 2,
      sustain: clamp01(parameters.ampSustain),
      release: clamp01(parameters.ampRelease) ** 2,
      hasNaiveWave,
    });

    const punch = clamp01(parameters.punch);
    const punchSquared = punch ** 2;
    punchEnvelope.setParameters({
      attack: 0,
      decay: 0.15 + 1.85 * punch,
      sustain: 0,
      release: 0,
      hasNaiveWave,
    });
    punchAmount.gain.setValueAtTime(
      punchSquared * MAX_PUNCH_GAIN,
      audioContext.currentTime,
    );
    const punchCurve = punch > 0 ? tanhShaperCurve : identityShaperCurve;
    if (saturator.curve !== punchCurve) {
      saturator.curve = punchCurve;
    }
  }

  function applyParameters(parameters: SynthParameters, time: number) {
    applyOscillatorMix(parameters, time);
    applyPitch(parameters, time);
    applyFilterAndAmp(parameters, time);
    applyEnvelopeParameters(parameters);
  }

  function resolveTime(time?: number): number {
    return Math.max(time ?? 0, audioContext.currentTime);
  }

  applyParameters(state.parameters, audioContext.currentTime);

  return {
    setParameters(parameters) {
      state.parameters = { ...parameters };
      applyParameters(state.parameters, audioContext.currentTime);
    },
    noteOn(noteNumber, time) {
      const startTime = resolveTime(time);
      state.currentNote = noteNumber;
      state.lastNote = noteNumber;
      applyPitch(state.parameters, startTime);
      applyFilterAndAmp(state.parameters, startTime);
      if (isSuperSawWave(state.parameters.osc1Wave)) {
        const { osc1Hz } = getOscillatorPitches(state.parameters);
        superSaw.retrigger(osc1Hz, state.parameters.oscDetune, startTime);
      }
      ampEnvelope.triggerAttack(startTime);
      punchEnvelope.triggerAttack(startTime);
    },
    noteOff(noteNumber, time) {
      if (noteNumber !== state.currentNote) return;
      state.currentNote = null;
      ampEnvelope.triggerRelease(resolveTime(time));
    },
    cleanup() {
      try {
        osc1.stop();
        osc2.stop();
        noise1.stop();
        noise2.stop();
        envelope.stop();
        punchEnv.stop();
      } catch {
        // already stopped
      }
      osc1.disconnect();
      osc2.disconnect();
      noise1.disconnect();
      noise2.disconnect();
      osc1Gain.disconnect();
      osc2Gain.disconnect();
      noise1Gain.disconnect();
      noise2Gain.disconnect();
      mix.disconnect();
      hpf.disconnect();
      lpf1.disconnect();
      lpf2?.disconnect();
      amp.disconnect();
      punchGain.disconnect();
      punchAmount.disconnect();
      saturator.disconnect();
      voiceGain.disconnect();
      envelope.disconnect();
      punchEnv.disconnect();
      filterEnvScale.disconnect();
      superSaw.cleanup();
    },
  };
}
