type SynthParameters = {
  octave: number; // -2, -1, 0, 1, 2
  unisonDetune: number; // 0~1
  unisonSpread: number; // 0~1
  unisonMix: number; // 0~1
  phaseRandom: boolean;
  ampRelease: number; // 0~1 (秒数へのマッピング)
  volume: number; // 0~1
};

type Voice = {
  noteNumber: number;
  oscillators: OscillatorNode[];
  gains: GainNode[];
  panners: StereoPannerNode[];
  envelopeGain: GainNode;
  stopTimer: ReturnType<typeof setTimeout> | undefined;
};

const UNISON_DETUNE_RATIOS = [
  -0.11002313, -0.06288439, -0.01952356, 0, 0.01991221, 0.06216538, 0.10745242,
];
const UNISON_PAN_POSITIONS = [-1, -0.66, -0.33, 0, 0.33, 0.66, 1];
const CENTER_OSCILLATOR_INDEX = 3;
const DETUNE_CENTS_SCALE = 1200;
const MAX_RELEASE_SECONDS = 4;
const SILENCE_GAIN = 0.0001;

export function createSynthesizerGpMono(
  audioContext: AudioContext,
  initialParameters: SynthParameters,
) {
  const state: {
    parameters: SynthParameters;
    voice: Voice | undefined;
  } = {
    parameters: initialParameters,
    voice: undefined,
  };

  const outputNode = audioContext.createGain();
  outputNode.gain.value = initialParameters.volume;

  function clamp01(value: number): number {
    return Math.min(1, Math.max(0, value));
  }

  function midiNoteToFrequency(noteNumber: number): number {
    return 440 * 2 ** ((noteNumber - 69) / 12);
  }

  function getReleaseSeconds(parameters: SynthParameters): number {
    return clamp01(parameters.ampRelease) * MAX_RELEASE_SECONDS;
  }

  function getSuperSawDetuneAmount(value: number): number {
    const x = clamp01(value);

    return (
      10028.7312891634 * x ** 11 -
      50818.8652045924 * x ** 10 +
      111363.4808729368 * x ** 9 -
      138150.6761080548 * x ** 8 +
      106649.6679158292 * x ** 7 -
      53046.9642751875 * x ** 6 +
      17019.951858008 * x ** 5 -
      3425.0836591318 * x ** 4 +
      404.2703938388 * x ** 3 -
      24.1878824391 * x ** 2 +
      0.6717417634 * x
    );
  }

  function createBrightSawWave(phaseRadians: number): PeriodicWave {
    const harmonicCount = 64;
    const real = new Float32Array(harmonicCount + 1);
    const imag = new Float32Array(harmonicCount + 1);

    for (let harmonic = 1; harmonic <= harmonicCount; harmonic += 1) {
      const amplitude = 1 / harmonic;
      const phase = phaseRadians * harmonic;

      real[harmonic] = amplitude * Math.sin(phase);
      imag[harmonic] = -amplitude * Math.cos(phase);
    }

    return audioContext.createPeriodicWave(real, imag, {
      disableNormalization: false,
    });
  }

  function getOscillatorGain(
    index: number,
    parameters: SynthParameters,
  ): number {
    const sideGain =
      index === CENTER_OSCILLATOR_INDEX ? 1 : clamp01(parameters.unisonMix);
    const totalGain = 1 + clamp01(parameters.unisonMix) * 6;

    return sideGain / totalGain;
  }

  function applyParametersToVoice(voice: Voice, time: number): void {
    const parameters = state.parameters;
    const detuneAmount = getSuperSawDetuneAmount(parameters.unisonDetune);
    const spreadAmount = clamp01(parameters.unisonSpread);

    for (let index = 0; index < voice.oscillators.length; index += 1) {
      const oscillator = voice.oscillators[index];
      const gain = voice.gains[index];
      const panner = voice.panners[index];

      oscillator.detune.cancelScheduledValues(time);
      oscillator.detune.setTargetAtTime(
        UNISON_DETUNE_RATIOS[index] * DETUNE_CENTS_SCALE * detuneAmount,
        time,
        0.01,
      );

      gain.gain.cancelScheduledValues(time);
      gain.gain.setTargetAtTime(
        getOscillatorGain(index, parameters),
        time,
        0.01,
      );

      panner.pan.cancelScheduledValues(time);
      panner.pan.setTargetAtTime(
        UNISON_PAN_POSITIONS[index] * spreadAmount,
        time,
        0.01,
      );
    }
  }

  function stopVoice(voice: Voice, time: number, releaseSeconds: number): void {
    const stopTime = Math.max(time, audioContext.currentTime);
    const finishTime = stopTime + releaseSeconds;

    if (voice.stopTimer) {
      clearTimeout(voice.stopTimer);
    }

    voice.envelopeGain.gain.cancelScheduledValues(stopTime);
    voice.envelopeGain.gain.setValueAtTime(
      Math.max(voice.envelopeGain.gain.value, SILENCE_GAIN),
      stopTime,
    );
    voice.envelopeGain.gain.exponentialRampToValueAtTime(
      SILENCE_GAIN,
      finishTime + 0.001,
    );

    for (const oscillator of voice.oscillators) {
      oscillator.stop(finishTime + 0.02);
    }

    const cleanupDelay = Math.max(
      0,
      finishTime - audioContext.currentTime + 0.1,
    );
    voice.stopTimer = setTimeout(() => {
      for (const oscillator of voice.oscillators) {
        oscillator.disconnect();
      }
      for (const gain of voice.gains) {
        gain.disconnect();
      }
      for (const panner of voice.panners) {
        panner.disconnect();
      }
      voice.envelopeGain.disconnect();
    }, cleanupDelay * 1000);
  }

  return {
    outputNode,
    setParameters(parameters: SynthParameters) {
      state.parameters = parameters;
      const time = audioContext.currentTime;

      outputNode.gain.cancelScheduledValues(time);
      outputNode.gain.setTargetAtTime(clamp01(parameters.volume), time, 0.01);

      if (state.voice) {
        applyParametersToVoice(state.voice, time);
      }
    },
    noteOn(noteNumber: number, time: number) {
      const startTime = Math.max(time, audioContext.currentTime);
      const previousVoice = state.voice;

      if (previousVoice) {
        stopVoice(previousVoice, startTime, 0.012);
      }

      const parameters = state.parameters;
      const baseFrequency = midiNoteToFrequency(
        noteNumber + parameters.octave * 12,
      );
      const envelopeGain = audioContext.createGain();
      const voice: Voice = {
        noteNumber,
        oscillators: [],
        gains: [],
        panners: [],
        envelopeGain,
        stopTimer: undefined,
      };

      envelopeGain.gain.setValueAtTime(1, startTime);
      envelopeGain.connect(outputNode);

      const detuneAmount = getSuperSawDetuneAmount(parameters.unisonDetune);

      for (let index = 0; index < UNISON_DETUNE_RATIOS.length; index += 1) {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const panner = audioContext.createStereoPanner();
        const phase = parameters.phaseRandom ? Math.random() * Math.PI * 2 : 0;

        oscillator.setPeriodicWave(createBrightSawWave(phase));
        oscillator.frequency.setValueAtTime(baseFrequency, startTime);
        oscillator.detune.setValueAtTime(
          UNISON_DETUNE_RATIOS[index] * DETUNE_CENTS_SCALE * detuneAmount,
          startTime,
        );

        gain.gain.setValueAtTime(
          getOscillatorGain(index, parameters),
          startTime,
        );
        panner.pan.setValueAtTime(
          UNISON_PAN_POSITIONS[index] * clamp01(parameters.unisonSpread),
          startTime,
        );

        oscillator.connect(gain);
        gain.connect(panner);
        panner.connect(envelopeGain);
        oscillator.start(startTime);

        voice.oscillators.push(oscillator);
        voice.gains.push(gain);
        voice.panners.push(panner);
      }

      state.voice = voice;
    },
    noteOff(noteNumber: number, time: number) {
      const voice = state.voice;

      if (!voice || voice.noteNumber !== noteNumber) {
        return;
      }

      state.voice = undefined;
      stopVoice(voice, time, getReleaseSeconds(state.parameters));
    },
    cleanup() {
      if (state.voice) {
        stopVoice(state.voice, audioContext.currentTime, 0);
        state.voice = undefined;
      }

      outputNode.disconnect();
    },
  };
}
