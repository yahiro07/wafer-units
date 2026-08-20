import {
  defaultSynthParameters,
  ISynthesizer,
  OscWave,
  SynthParameters,
} from "@/root/definitions";
import { createEnvelopeGenerator } from "@/root/envelope-generator";
import { UnitInterface } from "wafer-host/unit-types";

const MIN_CUTOFF_HZ = 20;
const MAX_CUTOFF_HZ = 18000;
const MIN_Q = 0.1;
const MAX_Q = 18;
const MAX_OSC_DETUNE_CENTS = 50;
const MAX_FILTER_ENV_CENTS = 4800;
const MAX_ATTACK_SECONDS = 4;
const MAX_DECAY_SECONDS = 8;
const MAX_RELEASE_SECONDS = 4;

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
  return Math.round(wave) === OscWave.Noise;
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

  const osc1Gain = audioContext.createGain();
  const osc2Gain = audioContext.createGain();
  const noise1Gain = audioContext.createGain();
  const noise2Gain = audioContext.createGain();
  const mix = audioContext.createGain();
  const hpf = audioContext.createBiquadFilter();
  const lpf = audioContext.createBiquadFilter();
  const amp = audioContext.createGain();
  const voiceGain = audioContext.createGain();
  const envelope = audioContext.createConstantSource();
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
  lpf.type = "lowpass";
  amp.gain.value = 0;
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
  mix.connect(hpf);
  hpf.connect(lpf);
  lpf.connect(amp);
  amp.connect(voiceGain);
  voiceGain.connect(destination);

  envelope.connect(amp.gain);
  envelope.connect(filterEnvScale);
  filterEnvScale.connect(lpf.detune);

  osc1.start();
  osc2.start();
  noise1.start();
  noise2.start();
  envelope.start();

  const ampEnvelope = createEnvelopeGenerator(envelope.offset, {
    attackSec: MAX_ATTACK_SECONDS,
    decaySec: MAX_DECAY_SECONDS,
    releaseSec: MAX_RELEASE_SECONDS,
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
    const osc1IsNoise = isNoiseWave(parameters.osc1Wave);
    const osc2IsNoise = isNoiseWave(parameters.osc2Wave);
    const osc2Level = clamp01(parameters.osc2Volume);

    osc1Gain.gain.setValueAtTime(osc1IsNoise ? 0 : 1, time);
    noise1Gain.gain.setValueAtTime(osc1IsNoise ? 1 : 0, time);
    osc2Gain.gain.setValueAtTime(osc2IsNoise ? 0 : osc2Level, time);
    noise2Gain.gain.setValueAtTime(osc2IsNoise ? osc2Level : 0, time);

    if (!osc1IsNoise) {
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
    osc1.detune.setValueAtTime(-detuneCents, time);
    osc2.detune.setValueAtTime(detuneCents, time);
  }

  function applyFilterAndAmp(parameters: SynthParameters, time: number) {
    const { osc1Hz, osc2Hz } = getOscillatorPitches(parameters);
    const bottomF0Hz = Math.min(osc1Hz, osc2Hz);
    const lpfMinHz = bottomF0Hz / 2;
    const hpfMinHz = bottomF0Hz / 4;
    const hpfMaxHz = bottomF0Hz * 16;
    hpf.frequency.setValueAtTime(
      mapCutoffHz(parameters.hpfCutoff, nyquist, hpfMinHz, hpfMaxHz),
      time,
    );
    hpf.Q.setValueAtTime(mapQ(parameters.hpfQ), time);
    lpf.frequency.setValueAtTime(
      mapCutoffHz(parameters.lpfCutoff, nyquist, lpfMinHz),
      time,
    );
    lpf.Q.setValueAtTime(mapQ(parameters.lpfQ), time);
    filterEnvScale.gain.setValueAtTime(
      clamp01(parameters.lpfEnvMod) * MAX_FILTER_ENV_CENTS,
      time,
    );
    voiceGain.gain.setValueAtTime(clamp01(parameters.voiceVolume), time);
  }

  function applyEnvelopeParameters(parameters: SynthParameters) {
    const osc2Sounding = clamp01(parameters.osc2Volume) > 0;
    ampEnvelope.setParameters({
      attack: clamp01(parameters.ampAttack) ** 2,
      decay: clamp01(parameters.ampDecay) ** 2,
      sustain: clamp01(parameters.ampSustain),
      release: clamp01(parameters.ampRelease) ** 2,
      hasNaiveWave:
        isSineWave(parameters.osc1Wave) ||
        (osc2Sounding && isSineWave(parameters.osc2Wave)),
    });
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
      ampEnvelope.triggerAttack(startTime);
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
      lpf.disconnect();
      amp.disconnect();
      voiceGain.disconnect();
      envelope.disconnect();
      filterEnvScale.disconnect();
    },
  };
}
