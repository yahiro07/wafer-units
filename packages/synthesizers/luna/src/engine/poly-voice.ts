import { OscWave, SynthParameters } from "@/defs/definitions";
import { createEnvelopeGenerator } from "@/engine/envelope-generator";
import { createSuperSawOscillator } from "@/engine/super-saw-oscillator";

const MAX_OSC_DETUNE_CENTS = 50;
const MAX_ATTACK_SECONDS = 2;
const MAX_DECAY_SECONDS = 6;
const MAX_RELEASE_SECONDS = 6;
const MAX_PUNCH_GAIN = 16;
const MAX_PUNCH_DECAY_SECONDS = 0.12;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
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

export function isSuperSawWave(wave: OscWave): boolean {
  return Math.round(wave) === OscWave.Ex;
}

function isSineWave(wave: OscWave): boolean {
  return Math.round(wave) === OscWave.Sine;
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

export function resolveAttackAndPunch(parameters: SynthParameters): {
  attack: number;
  punch: number;
} {
  const ampAttack = clamp01(parameters.ampAttack);
  if (parameters.attackAltPunch) {
    return { attack: 0, punch: ampAttack };
  }
  return { attack: ampAttack, punch: 0 };
}

function shouldRandomizeSuperSawPhase(parameters: SynthParameters): boolean {
  return !(parameters.attackAltPunch && clamp01(parameters.ampAttack) >= 0.5);
}

export function getVoicePitches(
  noteNumber: number,
  parameters: SynthParameters,
): {
  osc1Hz: number;
  osc2Hz: number;
  detuneCents: number;
} {
  const osc1Note = noteNumber + parameters.voiceOctave * 12;
  const osc2Note = osc1Note + parameters.osc2Octave * 12;
  const detuneCents = clamp01(parameters.oscDetune ** 2) * MAX_OSC_DETUNE_CENTS;
  return {
    osc1Hz: midiToFrequency(osc1Note),
    osc2Hz: midiToFrequency(osc2Note),
    detuneCents,
  };
}

export type PolyVoice = {
  noteNumber: number | null;
  order: number;
  envelopeNode: ConstantSourceNode;
  applyMix: (
    parameters: SynthParameters,
    time: number,
    sounding: boolean,
  ) => void;
  applyPitch: (
    noteNumber: number,
    parameters: SynthParameters,
    time: number,
  ) => void;
  applyEnvelopeParameters: (parameters: SynthParameters) => void;
  triggerAttack: (parameters: SynthParameters, time: number) => void;
  triggerRelease: (time: number) => void;
  stopSources: () => void;
  disconnect: () => void;
};

export function createPolyVoice(
  audioContext: AudioContext,
  mix: GainNode,
  noiseBuffer: AudioBuffer,
): PolyVoice {
  const osc1 = audioContext.createOscillator();
  const osc2 = audioContext.createOscillator();
  const noise1 = createNoiseSource(audioContext, noiseBuffer);
  const noise2 = createNoiseSource(audioContext, noiseBuffer);
  const superSaw = createSuperSawOscillator(audioContext);
  const osc1Gain = audioContext.createGain();
  const osc2Gain = audioContext.createGain();
  const noise1Gain = audioContext.createGain();
  const noise2Gain = audioContext.createGain();
  const oscMix = audioContext.createGain();
  const amp = audioContext.createGain();
  const punchGain = audioContext.createGain();
  const punchAmount = audioContext.createGain();
  const envelope = audioContext.createConstantSource();
  const punchEnv = audioContext.createConstantSource();

  osc1.type = "sawtooth";
  osc2.type = "sawtooth";
  osc1.frequency.value = 440;
  osc2.frequency.value = 440;
  osc1Gain.gain.value = 1;
  osc2Gain.gain.value = 0;
  noise1Gain.gain.value = 0;
  noise2Gain.gain.value = 0;
  oscMix.gain.value = 1;
  amp.gain.value = 0;
  punchGain.gain.value = 1;
  punchAmount.gain.value = 0;
  envelope.offset.value = 0;
  punchEnv.offset.value = 0;

  osc1.connect(osc1Gain);
  osc2.connect(osc2Gain);
  noise1.connect(noise1Gain);
  noise2.connect(noise2Gain);
  osc1Gain.connect(oscMix);
  osc2Gain.connect(oscMix);
  noise1Gain.connect(oscMix);
  noise2Gain.connect(oscMix);
  superSaw.outputNode.connect(oscMix);
  oscMix.connect(amp);
  amp.connect(punchGain);
  punchGain.connect(mix);

  envelope.connect(amp.gain);
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

  let superSawRunning = false;

  const voice: PolyVoice = {
    noteNumber: null,
    order: 0,
    envelopeNode: envelope,
    applyMix(parameters, time, sounding) {
      const osc1IsSuperSaw = isSuperSawWave(parameters.osc1Wave);
      const osc2IsNoise = isNoiseWave(parameters.osc2Wave);
      const osc2Level = clamp01(parameters.osc2Volume);
      const wantSuperSaw = sounding && osc1IsSuperSaw;

      osc1Gain.gain.setValueAtTime(osc1IsSuperSaw ? 0 : 1, time);
      noise1Gain.gain.setValueAtTime(0, time);
      osc2Gain.gain.setValueAtTime(osc2IsNoise ? 0 : osc2Level, time);
      noise2Gain.gain.setValueAtTime(osc2IsNoise ? osc2Level : 0, time);

      if (wantSuperSaw && !superSawRunning) {
        const { osc1Hz } = getVoicePitches(voice.noteNumber ?? 69, parameters);
        superSaw.retrigger(
          osc1Hz,
          parameters.oscDetune,
          time,
          shouldRandomizeSuperSawPhase(parameters),
        );
        superSawRunning = true;
      }
      superSaw.setEnabled(wantSuperSaw, time);
      if (!wantSuperSaw) {
        superSawRunning = false;
      }

      if (!osc1IsSuperSaw) {
        osc1.type = waveToOscillatorType(parameters.osc1Wave);
      }
      if (!osc2IsNoise) {
        osc2.type = waveToOscillatorType(parameters.osc2Wave);
      }
    },
    applyPitch(noteNumber, parameters, time) {
      const { osc1Hz, osc2Hz, detuneCents } = getVoicePitches(
        noteNumber,
        parameters,
      );
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
    },
    applyEnvelopeParameters(parameters) {
      const osc2Sounding = clamp01(parameters.osc2Volume) > 0;
      const hasNaiveWave =
        isSineWave(parameters.osc1Wave) ||
        (osc2Sounding && isSineWave(parameters.osc2Wave));
      const { attack, punch } = resolveAttackAndPunch(parameters);
      ampEnvelope.setParameters({
        attack: attack,
        decay: clamp01(parameters.ampDecay),
        sustain: clamp01(parameters.ampSustain),
        release: clamp01(parameters.ampRelease),
        hasNaiveWave,
      });

      punchEnvelope.setParameters({
        attack: 0,
        decay: 0.15 + 1.85 * punch,
        sustain: 0,
        release: 0,
        hasNaiveWave,
      });
      punchAmount.gain.setValueAtTime(
        punch ** 2 * MAX_PUNCH_GAIN,
        audioContext.currentTime,
      );
    },
    triggerAttack(parameters, time) {
      if (isSuperSawWave(parameters.osc1Wave)) {
        const { osc1Hz } = getVoicePitches(voice.noteNumber ?? 69, parameters);
        superSaw.retrigger(
          osc1Hz,
          parameters.oscDetune,
          time,
          shouldRandomizeSuperSawPhase(parameters),
        );
        superSawRunning = true;
      }
      ampEnvelope.triggerAttack(time);
      punchEnvelope.triggerAttack(time);
    },
    triggerRelease(time) {
      ampEnvelope.triggerRelease(time);
    },
    stopSources() {
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
    },
    disconnect() {
      osc1.disconnect();
      osc2.disconnect();
      noise1.disconnect();
      noise2.disconnect();
      osc1Gain.disconnect();
      osc2Gain.disconnect();
      noise1Gain.disconnect();
      noise2Gain.disconnect();
      oscMix.disconnect();
      amp.disconnect();
      punchGain.disconnect();
      punchAmount.disconnect();
      envelope.disconnect();
      punchEnv.disconnect();
      superSaw.cleanup();
    },
  };

  return voice;
}
