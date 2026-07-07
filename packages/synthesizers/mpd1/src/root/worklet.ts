type WorkletParameters = {
  frequency: number;
  gate: number; //stated as 1 for a note, then set to 0 for note off
  wave: number; //0,1,2,3,4,5,6,7
  shape: number; //0~1
  detune2: number; //0~1, >0 for two oscillator unison
  pitchDrift: number; // 0~1, slow pitch instability
};

type Interpolator = {
  feed(nextValue: number, n: number, reset?: boolean): void;
  advance(): number;
};

const TWO_PI = Math.PI * 2.0;
const HALF_PI = Math.PI * 0.5;
const DETUNE2_MAX_CENTS = 18.0;
const PITCH_DRIFT_MAX_CENTS = 16.0;
const SILENCE_GATE_THRESHOLD = 0.5;
const MIX_GAIN = 0.5;

function createInterpolator(): Interpolator {
  let value: number | undefined;
  let delta = 0.0;

  return {
    feed(nextValue, n, reset) {
      if (value === undefined || reset) {
        value = nextValue;
      }
      delta = (nextValue - value) / Math.max(1, n);
    },
    advance() {
      if (value === undefined) return 0.0;
      const currentValue = value;
      value += delta;
      return currentValue;
    },
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function clamp01(value: number): number {
  return clamp(value, 0.0, 1.0);
}

function wrapPhase(phase: number): number {
  return phase - Math.floor(phase);
}

function centsToRatio(cents: number): number {
  return Math.pow(2.0, cents / 1200.0);
}

function pdSkewPhase(phase: number, shape: number): number {
  const pivot = clamp(0.5 - shape * 0.46, 0.04, 0.96);

  if (phase < pivot) {
    return phase / (pivot * 2.0);
  }

  return 0.5 + (phase - pivot) / ((1.0 - pivot) * 2.0);
}

function pdFoldPhase(phase: number, shape: number): number {
  const skewed = pdSkewPhase(phase, shape);
  const fold = Math.sin(TWO_PI * phase) * shape * 0.18;

  return wrapPhase(skewed + fold);
}

function phaseDistortionSample(
  phase: number,
  wave: number,
  shape: number,
): number {
  const safeShape = clamp01(shape);
  const pdPhase = pdFoldPhase(phase, safeShape);
  const radians = TWO_PI * pdPhase;
  const waveIndex = clamp(Math.round(wave), 0, 7);

  switch (waveIndex) {
    case 0:
      return Math.sin(radians);
    case 1:
      return Math.sin(radians) * 0.78 + Math.sin(radians * 2.0) * 0.22;
    case 2:
      return Math.sin(radians) * 0.62 + Math.sin(radians * 3.0) * 0.28;
    case 3:
      return (
        Math.sin(radians) * 0.56 +
        Math.sin(radians * 2.0) * 0.34 +
        Math.sin(radians * 4.0) * 0.1
      );
    case 4:
      return Math.tanh(
        (Math.sin(radians) + Math.sin(radians * 3.0) * safeShape) * 1.7,
      );
    case 5:
      return Math.sin(radians + Math.sin(radians) * safeShape * Math.PI);
    case 6:
      return (
        Math.sin(radians) * Math.cos(HALF_PI * safeShape * Math.sin(radians))
      );
    case 7:
      return (
        Math.sin(radians) * (1.0 - safeShape * 0.45) +
        Math.sign(Math.sin(radians)) * safeShape * 0.45
      );
    default:
      return Math.sin(radians);
  }
}

function createSynthesizerCore() {
  let phase1 = 0.0;
  let phase2 = 0.0;
  let driftPhase1 = Math.random();
  let driftPhase2 = Math.random();
  let driftPhase3 = Math.random();
  let lastGateOn = false;

  const interpolators: Record<
    Exclude<keyof WorkletParameters, "gate" | "shape">,
    Interpolator
  > = {
    frequency: createInterpolator(),
    wave: createInterpolator(),
    detune2: createInterpolator(),
    pitchDrift: createInterpolator(),
  };

  function resetPhases() {
    phase1 = 0.0;
    phase2 = 0.0;
    driftPhase1 = Math.random();
    driftPhase2 = Math.random();
    driftPhase3 = Math.random();
  }

  return {
    process(
      _inputs: Float32Array[][],
      outputs: Float32Array[][],
      parameters: Record<string, Float32Array>,
    ): boolean {
      const output = outputs[0];
      const leftChannel = output[0];
      if (!leftChannel) return false;

      const rightChannel = output[1];
      const sampleRate = globalThis.sampleRate;
      const bufferSize = leftChannel.length;
      const gate = parameters["gate"][0] ?? 0.0;
      const isGateOn = gate > SILENCE_GATE_THRESHOLD;

      if (isGateOn && !lastGateOn) {
        resetPhases();
      }
      lastGateOn = isGateOn;

      for (const key of Object.keys(interpolators) as Array<
        keyof typeof interpolators
      >) {
        interpolators[key].feed(parameters[key][0] ?? 0.0, bufferSize);
      }

      for (let i = 0; i < bufferSize; i++) {
        if (!isGateOn) {
          leftChannel[i] = 0.0;
          if (rightChannel) rightChannel[i] = 0.0;
          continue;
        }

        const frequency = Math.max(0.0, interpolators.frequency.advance());
        const wave = interpolators.wave.advance();
        const shapeValues = parameters["shape"];
        const shape = clamp01(
          shapeValues.length > 1 ? shapeValues[i] : shapeValues[0],
        );
        const detune2 = clamp01(interpolators.detune2.advance());
        const pitchDrift = clamp01(interpolators.pitchDrift.advance());

        const driftAmount = pitchDrift * PITCH_DRIFT_MAX_CENTS;
        const drift =
          Math.sin(TWO_PI * driftPhase1) * 0.55 +
          Math.sin(TWO_PI * driftPhase2) * 0.3 +
          Math.sin(TWO_PI * driftPhase3) * 0.15;
        const driftRatio = centsToRatio(drift * driftAmount);
        const detuneRatio = centsToRatio(detune2 * DETUNE2_MAX_CENTS);
        const osc1Frequency = frequency * driftRatio;
        const osc2Frequency = frequency * driftRatio * detuneRatio;

        const osc1 = phaseDistortionSample(phase1, wave, shape);
        const osc2 = phaseDistortionSample(phase2, wave, shape);
        const sample = (osc1 + osc2) * MIX_GAIN;

        leftChannel[i] = sample;
        if (rightChannel) rightChannel[i] = sample;

        phase1 = wrapPhase(phase1 + osc1Frequency / sampleRate);
        phase2 = wrapPhase(phase2 + osc2Frequency / sampleRate);
        driftPhase1 = wrapPhase(driftPhase1 + 0.17 / sampleRate);
        driftPhase2 = wrapPhase(driftPhase2 + 0.31 / sampleRate);
        driftPhase3 = wrapPhase(driftPhase3 + 0.071 / sampleRate);
      }

      return true;
    },
  };
}

class SynthProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "frequency",
        defaultValue: 440.0,
        minValue: 0.0,
        maxValue: 22000.0,
        automationRate: "k-rate",
      },
      {
        name: "gate",
        defaultValue: 0.0,
        minValue: 0.0,
        maxValue: 1.0,
        automationRate: "k-rate",
      },
      {
        name: "wave",
        defaultValue: 0.0,
        minValue: 0.0,
        maxValue: 7.0,
        automationRate: "k-rate",
      },
      {
        name: "shape",
        defaultValue: 0.0,
        minValue: 0.0,
        maxValue: 1.0,
        automationRate: "a-rate",
      },
      {
        name: "detune2",
        defaultValue: 0.0,
        minValue: 0.0,
        maxValue: 1.0,
        automationRate: "k-rate",
      },
      {
        name: "pitchDrift",
        defaultValue: 0.0,
        minValue: 0.0,
        maxValue: 1.0,
        automationRate: "k-rate",
      },
    ];
  }

  private synthesizerCore = createSynthesizerCore();
  private shouldStop = false;

  constructor() {
    super();

    this.port.onmessage = (event: MessageEvent) => {
      if (event.data?.type === "stop") {
        this.shouldStop = true;
      }
    };
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ): boolean {
    if (this.shouldStop) {
      const output = outputs[0];
      output[0]?.fill(0.0);
      output[1]?.fill(0.0);
      return false;
    }

    return this.synthesizerCore.process(inputs, outputs, parameters);
  }
}

registerProcessor("mpd1-processor", SynthProcessor);
