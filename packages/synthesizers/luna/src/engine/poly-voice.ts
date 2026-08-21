import { OscWave, SynthParameters } from "@/defs/definitions";
import { createEnvelopeGenerator } from "@/engine/envelope-generator";
import { createSuperSawOscillator } from "@/engine/super-saw-oscillator";

const MAX_OSC_DETUNE_CENTS = 50;
const MAX_ATTACK_SECONDS = 2;
const MAX_DECAY_SECONDS = 6;
const MAX_RELEASE_SECONDS = 6;
const MAX_PUNCH_GAIN = 16;
const MAX_PUNCH_DECAY_SECONDS = 0.12;
const PITCH_EG_OCTAVE_CENTS = 1200;
const MAX_PITCH_EG_DECAY_SECONDS = 0.4;

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

function stopAudioSource(
  source: OscillatorNode | AudioBufferSourceNode,
  time?: number,
) {
  source.onended = () => {
    source.disconnect();
  };
  try {
    if (time === undefined) {
      source.stop();
    } else {
      source.stop(time);
    }
  } catch {
    source.disconnect();
  }
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
  pitchMod: AudioNode,
): PolyVoice {
  const superSaw = createSuperSawOscillator(audioContext);
  const osc1Gain = audioContext.createGain();
  const osc2Gain = audioContext.createGain();
  const noise2Gain = audioContext.createGain();
  const oscMix = audioContext.createGain();
  const amp = audioContext.createGain();
  const punchGain = audioContext.createGain();
  const punchAmount = audioContext.createGain();
  const envelope = audioContext.createConstantSource();
  const punchEnv = audioContext.createConstantSource();
  const pitchEg = audioContext.createConstantSource();

  osc1Gain.gain.value = 1;
  osc2Gain.gain.value = 0;
  noise2Gain.gain.value = 0;
  oscMix.gain.value = 1;
  amp.gain.value = 0;
  punchGain.gain.value = 1;
  punchAmount.gain.value = 0;
  envelope.offset.value = 0;
  punchEnv.offset.value = 0;
  pitchEg.offset.value = 0;

  osc1Gain.connect(oscMix);
  osc2Gain.connect(oscMix);
  noise2Gain.connect(oscMix);
  superSaw.outputNode.connect(oscMix);
  oscMix.connect(amp);
  amp.connect(punchGain);
  punchGain.connect(mix);

  envelope.connect(amp.gain);
  punchEnv.connect(punchAmount);
  punchAmount.connect(punchGain.gain);
  superSaw.connectPitchMod(pitchMod);
  superSaw.connectPitchMod(pitchEg);

  envelope.start();
  punchEnv.start();
  pitchEg.start();

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

  let osc1: OscillatorNode | null = null;
  let osc2: OscillatorNode | null = null;
  let noise2: AudioBufferSourceNode | null = null;
  let playing = false;
  let superSawRunning = false;
  let pitchedNote = 69;
  let sourcesStopAt: number | null = null;

  function bindPitchMods(osc: OscillatorNode) {
    pitchMod.connect(osc.detune);
    pitchEg.connect(osc.detune);
  }

  function stopOsc1(time?: number) {
    if (!osc1) return;
    stopAudioSource(osc1, time);
    osc1 = null;
  }

  function stopOsc2(time?: number) {
    if (!osc2) return;
    stopAudioSource(osc2, time);
    osc2 = null;
  }

  function stopNoise2(time?: number) {
    if (!noise2) return;
    stopAudioSource(noise2, time);
    noise2 = null;
  }

  function stopSuperSaw(time?: number) {
    if (!superSawRunning) return;
    superSaw.setEnabled(false, time ?? audioContext.currentTime);
    superSawRunning = false;
  }

  function stopVoiceSources(time?: number) {
    stopOsc1(time);
    stopOsc2(time);
    stopNoise2(time);
    stopSuperSaw(time);
  }

  function startOsc1(
    type: OscillatorType,
    frequencyHz: number,
    detuneCents: number,
    time: number,
  ) {
    const osc = audioContext.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(frequencyHz, time);
    osc.detune.setValueAtTime(detuneCents, time);
    osc.connect(osc1Gain);
    bindPitchMods(osc);
    osc.start(time);
    if (sourcesStopAt !== null) {
      osc.stop(sourcesStopAt);
    }
    osc1 = osc;
  }

  function startOsc2(
    type: OscillatorType,
    frequencyHz: number,
    detuneCents: number,
    time: number,
  ) {
    const osc = audioContext.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(frequencyHz, time);
    osc.detune.setValueAtTime(detuneCents, time);
    osc.connect(osc2Gain);
    bindPitchMods(osc);
    osc.start(time);
    if (sourcesStopAt !== null) {
      osc.stop(sourcesStopAt);
    }
    osc2 = osc;
  }

  function startNoise2(time: number) {
    const source = audioContext.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;
    source.connect(noise2Gain);
    source.start(time);
    if (sourcesStopAt !== null) {
      source.stop(sourcesStopAt);
    }
    noise2 = source;
  }

  function applyPitchToSources(
    noteNumber: number,
    parameters: SynthParameters,
    time: number,
  ) {
    pitchedNote = noteNumber;
    const { osc1Hz, osc2Hz, detuneCents } = getVoicePitches(
      noteNumber,
      parameters,
    );
    if (isSuperSawWave(parameters.osc1Wave)) {
      superSaw.setPitch(osc1Hz, parameters.oscDetune, time);
    } else if (osc1) {
      osc1.frequency.setValueAtTime(osc1Hz, time);
      osc1.detune.setValueAtTime(-detuneCents, time);
    }
    if (osc2) {
      osc2.frequency.setValueAtTime(osc2Hz, time);
      osc2.detune.setValueAtTime(detuneCents, time);
    }
  }

  function applyMixGains(
    parameters: SynthParameters,
    time: number,
  ): {
    osc1IsSuperSaw: boolean;
    osc2IsNoise: boolean;
    osc2Active: boolean;
    osc1Level: number;
    osc2Level: number;
  } {
    const osc1IsSuperSaw = isSuperSawWave(parameters.osc1Wave);
    const osc2IsNoise = isNoiseWave(parameters.osc2Wave);
    const osc2Raw = clamp01(parameters.osc2Volume);
    const osc2Active = osc2Raw > 0;
    const oscScale = 1 / (1 + osc2Raw);
    const osc1Level = oscScale;
    const osc2Level = osc2Raw * oscScale;

    osc1Gain.gain.setValueAtTime(osc1IsSuperSaw ? 0 : osc1Level, time);
    osc2Gain.gain.setValueAtTime(
      osc2Active && !osc2IsNoise ? osc2Level : 0,
      time,
    );
    noise2Gain.gain.setValueAtTime(
      osc2Active && osc2IsNoise ? osc2Level : 0,
      time,
    );
    return { osc1IsSuperSaw, osc2IsNoise, osc2Active, osc1Level, osc2Level };
  }

  function ensureSources(parameters: SynthParameters, time: number) {
    const { osc1Hz, osc2Hz, detuneCents } = getVoicePitches(
      voice.noteNumber ?? pitchedNote,
      parameters,
    );
    const { osc1IsSuperSaw, osc2IsNoise, osc2Active, osc1Level } =
      applyMixGains(parameters, time);

    if (osc1IsSuperSaw) {
      stopOsc1(time);
      if (!superSawRunning) {
        superSaw.retrigger(
          osc1Hz,
          parameters.oscDetune,
          time,
          shouldRandomizeSuperSawPhase(parameters),
        );
        superSawRunning = true;
      }
      superSaw.setEnabled(true, time, osc1Level);
    } else {
      stopSuperSaw(time);
      if (!osc1) {
        startOsc1(
          waveToOscillatorType(parameters.osc1Wave),
          osc1Hz,
          -detuneCents,
          time,
        );
      } else {
        osc1.type = waveToOscillatorType(parameters.osc1Wave);
      }
    }

    if (osc2Active && !osc2IsNoise) {
      stopNoise2(time);
      if (!osc2) {
        startOsc2(
          waveToOscillatorType(parameters.osc2Wave),
          osc2Hz,
          detuneCents,
          time,
        );
      } else {
        osc2.type = waveToOscillatorType(parameters.osc2Wave);
      }
    } else if (osc2Active && osc2IsNoise) {
      stopOsc2(time);
      if (!noise2) {
        startNoise2(time);
      }
    } else {
      stopOsc2(time);
      stopNoise2(time);
    }
  }

  function triggerPitchEg(parameters: SynthParameters, time: number) {
    pitchEg.offset.cancelScheduledValues(time);
    const decayAmount = clamp01(parameters.pitchLfoDepth);
    if (!parameters.pitchLfoAltPitchEg || decayAmount === 0) {
      pitchEg.offset.setValueAtTime(0, time);
      return;
    }
    const decaySec = Math.max(
      0.005,
      decayAmount ** 2 * MAX_PITCH_EG_DECAY_SECONDS,
    );
    pitchEg.offset.setValueAtTime(PITCH_EG_OCTAVE_CENTS, time);
    pitchEg.offset.exponentialRampToValueAtTime(1, time + decaySec);
    pitchEg.offset.setValueAtTime(0, time + decaySec);
  }

  const voice: PolyVoice = {
    noteNumber: null,
    order: 0,
    envelopeNode: envelope,
    applyMix(parameters, time) {
      if (!playing) {
        applyMixGains(parameters, time);
        return;
      }
      ensureSources(parameters, time);
    },
    applyPitch(noteNumber, parameters, time) {
      if (!playing) return;
      applyPitchToSources(noteNumber, parameters, time);
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
      if (!parameters.pitchLfoAltPitchEg) {
        pitchEg.offset.cancelScheduledValues(audioContext.currentTime);
        pitchEg.offset.setValueAtTime(0, audioContext.currentTime);
      }
    },
    triggerAttack(parameters, time) {
      sourcesStopAt = null;
      stopVoiceSources(time);
      playing = true;
      ensureSources(parameters, time);
      applyPitchToSources(voice.noteNumber ?? pitchedNote, parameters, time);
      ampEnvelope.triggerAttack(time);
      punchEnvelope.triggerAttack(time);
      triggerPitchEg(parameters, time);
    },
    triggerRelease(time) {
      ampEnvelope.triggerRelease(time);
      const stopAt = time + ampEnvelope.getReleaseDuration();
      sourcesStopAt = stopAt;
      playing = false;
      if (osc1) stopAudioSource(osc1, stopAt);
      if (osc2) stopAudioSource(osc2, stopAt);
      if (noise2) stopAudioSource(noise2, stopAt);
      if (superSawRunning) {
        superSaw.setEnabled(false, stopAt);
        superSawRunning = false;
      }
    },
    stopSources() {
      sourcesStopAt = null;
      playing = false;
      stopVoiceSources();
      try {
        envelope.stop();
        punchEnv.stop();
        pitchEg.stop();
      } catch {
        // already stopped
      }
    },
    disconnect() {
      stopVoiceSources();
      osc1Gain.disconnect();
      osc2Gain.disconnect();
      noise2Gain.disconnect();
      oscMix.disconnect();
      amp.disconnect();
      punchGain.disconnect();
      punchAmount.disconnect();
      envelope.disconnect();
      punchEnv.disconnect();
      pitchEg.disconnect();
      superSaw.cleanup();
    },
  };

  return voice;
}
