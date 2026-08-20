import {
  defaultSynthParameters,
  ISynthesizer,
  SynthParameters,
} from "@/defs/definitions";
import {
  createPolyVoice,
  getVoicePitches,
  PolyVoice,
  resolveAttackAndPunch,
} from "@/engine/poly-voice";
import { UnitInterface } from "wafer-host/unit-types";

const LPF_TWO_STAGE = false;
const MAX_POLY_VOICES = 4;

const MIN_CUTOFF_HZ = 20;
const MAX_CUTOFF_HZ = 18000;
const MIN_Q = 0.1;
const MAX_Q = 18;
const MAX_FILTER_ENV_CENTS = 4800;
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

function createNoiseBuffer(audioContext: AudioContext): AudioBuffer {
  const length = audioContext.sampleRate * 2;
  const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

export function createSynthesizerEngine(
  unitInterface: UnitInterface | undefined,
): ISynthesizer {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const destination =
    unitInterface?.audioOutputNode ?? audioContext.destination;
  const nyquist = audioContext.sampleRate * 0.5 - 1;

  const noiseBuffer = createNoiseBuffer(audioContext);
  const mix = audioContext.createGain();
  const voices: PolyVoice[] = [];
  for (let i = 0; i < MAX_POLY_VOICES; i += 1) {
    voices.push(createPolyVoice(audioContext, mix, noiseBuffer));
  }

  const hpf = audioContext.createBiquadFilter();
  const lpf1 = audioContext.createBiquadFilter();
  const lpf2 = LPF_TWO_STAGE ? audioContext.createBiquadFilter() : null;
  const saturator = audioContext.createWaveShaper();
  const voiceGain = audioContext.createGain();
  const filterEnvScale = audioContext.createGain();

  mix.gain.value = 1;
  hpf.type = "highpass";
  lpf1.type = "lowpass";
  if (lpf2) {
    lpf2.type = "lowpass";
  }
  saturator.curve = identityShaperCurve;
  saturator.oversample = "2x";
  filterEnvScale.gain.value = 0;

  mix.connect(hpf);
  hpf.connect(lpf1);
  if (lpf2) {
    lpf1.connect(lpf2);
    lpf2.connect(voiceGain);
  } else {
    lpf1.connect(voiceGain);
  }
  voiceGain.connect(destination);
  filterEnvScale.connect(lpf1.detune);
  if (lpf2) {
    filterEnvScale.connect(lpf2.detune);
  }

  const state: {
    parameters: SynthParameters;
    lastNote: number;
    allocOrder: number;
    filterEnvVoice: PolyVoice | null;
  } = {
    parameters: { ...defaultSynthParameters },
    lastNote: 69,
    allocOrder: 0,
    filterEnvVoice: null,
  };

  function heldVoices(): PolyVoice[] {
    return voices.filter((voice) => voice.noteNumber !== null);
  }

  function allocateVoice(noteNumber: number): PolyVoice {
    const existing = voices.find((voice) => voice.noteNumber === noteNumber);
    if (existing) return existing;
    const free = voices.filter((voice) => voice.noteNumber === null);
    const idle = free.find((voice) => voice !== state.filterEnvVoice);
    if (idle) return idle;
    if (free[0]) return free[0];
    return voices.reduce((oldest, voice) =>
      voice.order < oldest.order ? voice : oldest,
    );
  }

  function routeFilterEnvelope(voice: PolyVoice) {
    if (state.filterEnvVoice === voice) return;
    state.filterEnvVoice?.envelopeNode.disconnect(filterEnvScale);
    voice.envelopeNode.connect(filterEnvScale);
    state.filterEnvVoice = voice;
  }

  function applyOscillatorMix(parameters: SynthParameters, time: number) {
    for (const voice of voices) {
      voice.applyMix(parameters, time, voice.noteNumber !== null);
    }
  }

  function applyHeldPitches(parameters: SynthParameters, time: number) {
    for (const voice of heldVoices()) {
      voice.applyPitch(voice.noteNumber as number, parameters, time);
    }
  }

  function applyFilter(parameters: SynthParameters, time: number) {
    const { osc1Hz, osc2Hz } = getVoicePitches(state.lastNote, parameters);
    const lpfMinHz = Math.min(osc1Hz, osc2Hz) / 2;
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
    for (const voice of voices) {
      voice.applyEnvelopeParameters(parameters);
    }
    const { punch } = resolveAttackAndPunch(parameters);
    const punchCurve = punch > 0 ? tanhShaperCurve : identityShaperCurve;
    if (saturator.curve !== punchCurve) {
      saturator.curve = punchCurve;
    }
  }

  function applyParameters(parameters: SynthParameters, time: number) {
    applyOscillatorMix(parameters, time);
    applyHeldPitches(parameters, time);
    applyFilter(parameters, time);
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
      const parameters = state.parameters;
      const voice = allocateVoice(noteNumber);
      voice.noteNumber = noteNumber;
      voice.order = ++state.allocOrder;
      state.lastNote = noteNumber;

      voice.applyPitch(noteNumber, parameters, startTime);
      voice.applyMix(parameters, startTime, true);
      routeFilterEnvelope(voice);
      applyFilter(parameters, startTime);
      voice.triggerAttack(parameters, startTime);
    },
    noteOff(noteNumber, time) {
      const voice = voices.find((slot) => slot.noteNumber === noteNumber);
      if (!voice) return;
      voice.noteNumber = null;
      voice.triggerRelease(resolveTime(time));
    },
    cleanup() {
      for (const voice of voices) {
        voice.stopSources();
      }
      for (const voice of voices) {
        voice.disconnect();
      }
      mix.disconnect();
      hpf.disconnect();
      lpf1.disconnect();
      lpf2?.disconnect();
      saturator.disconnect();
      voiceGain.disconnect();
      filterEnvScale.disconnect();
    },
  };
}
