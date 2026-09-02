import { SynthParameters } from "@/root/synth-common";

const DEFAULT_BPM = 120;
const OUTPUT_GAIN = 0.8;
const AMP_ATTACK_SECONDS = 0.003;
const AMP_RELEASE_SECONDS = 0.018;
const MIN_FILTER_FREQUENCY = 70;
const MAX_FILTER_FREQUENCY = 8000;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

function midiNoteNumberToFrequency(noteNumber: number): number {
  return 440 * Math.pow(2, (noteNumber - 69) / 12);
}

function mapCutoff(value: number): number {
  const normalized = clamp01(value);
  return (
    MIN_FILTER_FREQUENCY *
    Math.pow(MAX_FILTER_FREQUENCY / MIN_FILTER_FREQUENCY, normalized)
  );
}

function mapPeak(value: number): number {
  const normalized = clamp01(value);
  return 0.7 + normalized * normalized * 24;
}

function mapFilterDecay(value: number): number {
  const normalized = clamp01(value);
  return 0.045 + normalized * normalized * 1.2;
}

function mapWave(value: number): OscillatorType {
  return value < 0.5 ? "sawtooth" : "square";
}

function cancelAndHoldParam(
  param: AudioParam,
  time: number,
  fallbackValue: number,
) {
  const maybeParamWithHold = param as AudioParam & {
    cancelAndHoldAtTime?: (cancelTime: number) => AudioParam;
  };

  if (typeof maybeParamWithHold.cancelAndHoldAtTime === "function") {
    maybeParamWithHold.cancelAndHoldAtTime(time);
    return;
  }

  param.cancelScheduledValues(time);
  param.setValueAtTime(fallbackValue, time);
}

export function createSynthesizer(
  audioContext: AudioContext,
  initialParameters: SynthParameters,
) {
  const state: {
    parameters: SynthParameters;
    bpm: number;
    activeNoteNumber: number | null;
    currentNoteOnTime: number;
    currentFrequency: number;
    previousNoteNumber: number | null;
    previousNoteOnTime: number;
    previousNoteOffTime: number;
    previousDuration: number;
    disposed: boolean;
  } = {
    parameters: { ...initialParameters },
    bpm: DEFAULT_BPM,
    activeNoteNumber: null,
    currentNoteOnTime: 0,
    currentFrequency: midiNoteNumberToFrequency(48),
    previousNoteNumber: null,
    previousNoteOnTime: 0,
    previousNoteOffTime: 0,
    previousDuration: 0,
    disposed: false,
  };

  const outputNode = audioContext.createGain();
  const oscillator = audioContext.createOscillator();
  const filterNode = audioContext.createBiquadFilter();
  const ampNode = audioContext.createGain();

  outputNode.gain.setValueAtTime(OUTPUT_GAIN, audioContext.currentTime);
  oscillator.type = mapWave(state.parameters.wave);
  oscillator.frequency.setValueAtTime(
    state.currentFrequency,
    audioContext.currentTime,
  );
  filterNode.type = "lowpass";
  filterNode.frequency.setValueAtTime(
    mapCutoff(state.parameters.cutoff),
    audioContext.currentTime,
  );
  filterNode.Q.setValueAtTime(
    mapPeak(state.parameters.peak),
    audioContext.currentTime,
  );
  ampNode.gain.setValueAtTime(0, audioContext.currentTime);

  oscillator.connect(filterNode);
  filterNode.connect(ampNode);
  ampNode.connect(outputNode);
  oscillator.start();

  function getStepSeconds() {
    return 60 / Math.max(1, state.bpm) / 4;
  }

  function scheduleFilterEnvelope(time: number, accentAmount: number) {
    const p = state.parameters;
    const baseCutoff = mapCutoff(p.cutoff);
    const accentedBaseCutoff = clamp(
      baseCutoff * (1 + accentAmount * 0.5),
      MIN_FILTER_FREQUENCY,
      MAX_FILTER_FREQUENCY,
    );
    const envelopeAmount =
      (clamp01(p.envMod) * 5200 + accentAmount * 2400) * (1 + accentAmount);
    const peakCutoff = clamp(
      accentedBaseCutoff + envelopeAmount,
      MIN_FILTER_FREQUENCY,
      Math.min(MAX_FILTER_FREQUENCY, audioContext.sampleRate * 0.45),
    );

    filterNode.frequency.cancelScheduledValues(time);
    filterNode.frequency.setValueAtTime(peakCutoff, time);
    filterNode.frequency.exponentialRampToValueAtTime(
      accentedBaseCutoff,
      time + mapFilterDecay(p.decay),
    );
  }

  function applyStaticParameters(time: number) {
    const p = state.parameters;
    oscillator.type = mapWave(p.wave);
    filterNode.Q.setTargetAtTime(mapPeak(p.peak), time, 0.01);

    if (state.activeNoteNumber === null) {
      filterNode.frequency.setTargetAtTime(mapCutoff(p.cutoff), time, 0.01);
    }
  }

  function calculateTransition(noteNumber: number, time: number) {
    const p = state.parameters;
    const stepSeconds = getStepSeconds();
    const previousNoteNumber =
      state.activeNoteNumber === null
        ? state.previousNoteNumber
        : state.activeNoteNumber;
    const previousDuration =
      state.activeNoteNumber === null
        ? state.previousDuration
        : Math.max(0, time - state.currentNoteOnTime);
    const gap =
      state.activeNoteNumber === null && state.previousNoteOffTime > 0
        ? Math.max(0, time - state.previousNoteOffTime)
        : 0;
    const gapSteps = gap / stepSeconds;
    const previousDurationSteps = previousDuration / stepSeconds;
    const interval =
      previousNoteNumber === null ? 0 : noteNumber - previousNoteNumber;
    const glideAmount = clamp01(p.glide);
    const maxSlideGapSteps = 0.05 + glideAmount * 0.35;
    const minSlideDurationSteps = 0.8 - glideAmount * 0.55;
    const shouldSlide =
      glideAmount > 0 &&
      previousNoteNumber !== null &&
      interval !== 0 &&
      gapSteps <= maxSlideGapSteps &&
      previousDurationSteps >= minSlideDurationSteps;
    const intervalScore = clamp(Math.abs(interval) / 12, 0, 1);
    const restScore = clamp(gapSteps, 0, 1);
    const longNoteScore = clamp(previousDurationSteps / 2, 0, 1);
    const firstNoteScore = previousNoteNumber === null ? 0.35 : 0;
    const upwardScore = interval > 0 ? 0.15 : 0;
    const accentRuleAmount = clamp01(
      firstNoteScore +
        intervalScore * 0.35 +
        restScore * 0.25 +
        longNoteScore * 0.15 +
        (shouldSlide ? 0.25 : 0) +
        upwardScore,
    );

    return {
      shouldSlide,
      accentAmount: clamp01(p.accent) * accentRuleAmount,
      slideTime: clamp(stepSeconds * (0.08 + glideAmount * 0.55), 0.012, 0.28),
    };
  }

  return {
    outputNode,
    setParameters(parameters: SynthParameters) {
      if (state.disposed) return;
      state.parameters = { ...parameters };
      applyStaticParameters(audioContext.currentTime);
    },
    setBpm(bpm: number) {
      state.bpm = Number.isFinite(bpm) ? Math.max(1, bpm) : DEFAULT_BPM;
    },
    noteOn(noteNumber: number, time: number) {
      if (state.disposed) return;

      const startTime = Math.max(time, audioContext.currentTime);
      const frequency = midiNoteNumberToFrequency(noteNumber);
      const transition = calculateTransition(noteNumber, startTime);

      applyStaticParameters(startTime);

      if (transition.shouldSlide) {
        cancelAndHoldParam(
          oscillator.frequency,
          startTime,
          state.currentFrequency,
        );
        oscillator.frequency.linearRampToValueAtTime(
          frequency,
          startTime + transition.slideTime,
        );
      } else {
        oscillator.frequency.cancelScheduledValues(startTime);
        oscillator.frequency.setValueAtTime(frequency, startTime);
      }

      if (!transition.shouldSlide || state.activeNoteNumber === null) {
        ampNode.gain.cancelScheduledValues(startTime);
        ampNode.gain.setTargetAtTime(
          1 + transition.accentAmount * 0.25,
          startTime,
          AMP_ATTACK_SECONDS,
        );
        scheduleFilterEnvelope(startTime, transition.accentAmount);
      } else if (transition.accentAmount > 0) {
        scheduleFilterEnvelope(startTime, transition.accentAmount);
      }

      state.activeNoteNumber = noteNumber;
      state.currentNoteOnTime = startTime;
      state.currentFrequency = frequency;
    },
    noteOff(noteNumber: number, time: number) {
      if (state.disposed || noteNumber !== state.activeNoteNumber) return;

      const stopTime = Math.max(time, audioContext.currentTime);
      ampNode.gain.cancelScheduledValues(stopTime);
      ampNode.gain.setTargetAtTime(0, stopTime, AMP_RELEASE_SECONDS);

      state.previousNoteNumber = noteNumber;
      state.previousNoteOnTime = state.currentNoteOnTime;
      state.previousNoteOffTime = stopTime;
      state.previousDuration = Math.max(0, stopTime - state.currentNoteOnTime);
      state.activeNoteNumber = null;
    },
    cleanup() {
      if (state.disposed) return;

      state.disposed = true;
      oscillator.stop(audioContext.currentTime);
      oscillator.disconnect();
      filterNode.disconnect();
      ampNode.disconnect();
      outputNode.disconnect();
    },
  };
}
