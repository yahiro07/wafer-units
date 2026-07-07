type WorkletParameters = {
  frequency: number;
  gate: number; //1:on, 0:off

  op1Ratio: number; //positive value, default:1
  op1ModEgSpeedRate: number; //positive value, default:1
  op1ModAmount: number; //0~1, FM 2-->1
  op1Volume: number; //0~1

  op2Ratio: number;
  op2ModEgSpeedRate: number;
  op2ModAmount: number;
  op2Volume: number;

  ampEgAttack: number; //seconds
  ampEgDecay: number; //seconds
  ampEgSustain: number; //0~1
  ampEgRelease: number; //seconds
};

type Interpolator = {
  feed(nextValue: number, n: number, reset?: boolean): void;
  advance(): number;
};

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

const TWO_PI = Math.PI * 2.0;
const SQRT2 = Math.sqrt(2.0);
const MIX_GAIN = 1.0 / SQRT2;
const MOD_AMOUNT_SCALE = 8.0;
const MIN_AMP_FADE_SECONDS = 0.005;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function wrapPhase(phase: number): number {
  return phase - Math.floor(phase);
}

function computeAdsrValue(
  time: number,
  attack: number,
  decay: number,
  sustain: number,
): number {
  const safeAttack = Math.max(0.0, attack);
  const safeDecay = Math.max(0.0, decay);
  const safeSustain = clamp(sustain, 0.0, 1.0);

  if (safeAttack > 0.0 && time < safeAttack) {
    return time / safeAttack;
  }

  const decayTime = time - safeAttack;
  if (safeDecay > 0.0 && decayTime < safeDecay) {
    const decayProgress = decayTime / safeDecay;
    return 1.0 + (safeSustain - 1.0) * decayProgress;
  }

  return safeSustain;
}

function createSynthesizerCore() {
  let phase1 = 0.0;
  let phase2 = 0.0;
  let prevRaw1 = 0.0;
  let prevRaw2 = 0.0;

  let hasStarted = false;
  let isReleased = false;
  let noteOnTime = 0.0;
  let releaseTime = 0.0;
  let ampReleaseStartValue = 0.0;
  let ampEgValue = 0.0;
  let op1ModEgValue = 0.0;
  let op2ModEgValue = 0.0;

  const interpolators: Record<
    Exclude<keyof WorkletParameters, "gate">,
    Interpolator
  > = {
    frequency: createInterpolator(),
    op1Ratio: createInterpolator(),
    op1ModEgSpeedRate: createInterpolator(),
    op1ModAmount: createInterpolator(),
    op1Volume: createInterpolator(),
    op2Ratio: createInterpolator(),
    op2ModEgSpeedRate: createInterpolator(),
    op2ModAmount: createInterpolator(),
    op2Volume: createInterpolator(),
    ampEgAttack: createInterpolator(),
    ampEgDecay: createInterpolator(),
    ampEgSustain: createInterpolator(),
    ampEgRelease: createInterpolator(),
  };

  return {
    process(
      _inputs: Float32Array[][],
      outputs: Float32Array[][],
      parameters: Record<string, Float32Array>,
    ): boolean {
      const output = outputs[0];
      const outputChannel = output[0];
      if (!outputChannel) return false;

      const sampleRate = globalThis.sampleRate;
      const bufferSize = outputChannel.length;
      const gate = parameters["gate"][0];
      const isGateOn = gate > 0.5;

      for (const key of Object.keys(interpolators) as Array<
        keyof typeof interpolators
      >) {
        interpolators[key].feed(parameters[key][0], bufferSize);
      }

      for (let i = 0; i < bufferSize; i++) {
        const frequency = Math.max(0.0, interpolators.frequency.advance());
        const op1Ratio = Math.max(0.0, interpolators.op1Ratio.advance());
        const op2Ratio = Math.max(0.0, interpolators.op2Ratio.advance());
        const op1ModEgSpeedRate = Math.max(
          0.0001,
          interpolators.op1ModEgSpeedRate.advance(),
        );
        const op2ModEgSpeedRate = Math.max(
          0.0001,
          interpolators.op2ModEgSpeedRate.advance(),
        );
        const op1ModAmount = clamp(
          interpolators.op1ModAmount.advance(),
          0.0,
          1.0,
        );
        const op2ModAmount = clamp(
          interpolators.op2ModAmount.advance(),
          0.0,
          1.0,
        );
        const op1Volume = clamp(interpolators.op1Volume.advance(), 0.0, 1.0);
        const op2Volume = clamp(interpolators.op2Volume.advance(), 0.0, 1.0);
        const ampEgAttack = Math.max(
          0.0,
          interpolators.ampEgAttack.advance(),
        );
        const ampEgDecay = Math.max(0.0, interpolators.ampEgDecay.advance());
        const ampEgSustain = clamp(
          interpolators.ampEgSustain.advance(),
          0.0,
          1.0,
        );
        const ampEgRelease = Math.max(
          0.0,
          interpolators.ampEgRelease.advance(),
        );

        if (isGateOn) {
          hasStarted = true;
          if (isReleased) {
            noteOnTime = 0.0;
          }
          isReleased = false;
          const effectiveAmpEgAttack = Math.max(
            ampEgAttack,
            MIN_AMP_FADE_SECONDS,
          );
          ampEgValue = computeAdsrValue(
            noteOnTime,
            effectiveAmpEgAttack,
            ampEgDecay,
            ampEgSustain,
          );
          op1ModEgValue = computeAdsrValue(
            noteOnTime,
            ampEgAttack / op1ModEgSpeedRate,
            ampEgDecay / op1ModEgSpeedRate,
            ampEgSustain,
          );
          op2ModEgValue = computeAdsrValue(
            noteOnTime,
            ampEgAttack / op2ModEgSpeedRate,
            ampEgDecay / op2ModEgSpeedRate,
            ampEgSustain,
          );
          noteOnTime += 1.0 / sampleRate;
        } else if (hasStarted) {
          if (!isReleased) {
            isReleased = true;
            releaseTime = 0.0;
            ampReleaseStartValue = ampEgValue;
            // Modulation EGs intentionally hold their note-off values.
          }

          const effectiveAmpEgRelease = Math.max(
            ampEgRelease,
            MIN_AMP_FADE_SECONDS,
          );
          if (effectiveAmpEgRelease > 0.0) {
            const releaseProgress = clamp(
              releaseTime / effectiveAmpEgRelease,
              0.0,
              1.0,
            );
            ampEgValue = ampReleaseStartValue * (1.0 - releaseProgress);
          } else {
            ampEgValue = 0.0;
          }
          releaseTime += 1.0 / sampleRate;
        } else {
          ampEgValue = 0.0;
          op1ModEgValue = 0.0;
          op2ModEgValue = 0.0;
        }

        const raw1 = Math.sin(TWO_PI * phase1);
        const raw2 = Math.sin(TWO_PI * phase2);
        const op1ModDepth = op1ModAmount * op1ModEgValue * MOD_AMOUNT_SCALE;
        const op2ModDepth = op2ModAmount * op2ModEgValue * MOD_AMOUNT_SCALE;
        const op1Out = Math.sin(TWO_PI * phase1 + prevRaw2 * op1ModDepth);
        const op2Out = Math.sin(TWO_PI * phase2 + prevRaw1 * op2ModDepth);
        const mixed = (op1Out * op1Volume + op2Out * op2Volume) * MIX_GAIN;
        const finalSample = mixed * ampEgValue;

        outputChannel[i] = finalSample;
        if (output.length > 1) {
          output[1][i] = finalSample;
        }

        prevRaw1 = raw1;
        prevRaw2 = raw2;
        phase1 = wrapPhase(phase1 + (frequency * op1Ratio) / sampleRate);
        phase2 = wrapPhase(phase2 + (frequency * op2Ratio) / sampleRate);
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
      },
      { name: "gate", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "op1Ratio", defaultValue: 1.0, minValue: 0.0, maxValue: 32.0 },
      {
        name: "op1ModEgSpeedRate",
        defaultValue: 1.0,
        minValue: 0.0001,
        maxValue: 32.0,
      },
      { name: "op1ModAmount", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "op1Volume", defaultValue: 0.7, minValue: 0.0, maxValue: 1.0 },
      { name: "op2Ratio", defaultValue: 1.0, minValue: 0.0, maxValue: 32.0 },
      {
        name: "op2ModEgSpeedRate",
        defaultValue: 1.0,
        minValue: 0.0001,
        maxValue: 32.0,
      },
      { name: "op2ModAmount", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "op2Volume", defaultValue: 0.7, minValue: 0.0, maxValue: 1.0 },
      {
        name: "ampEgAttack",
        defaultValue: 0.01,
        minValue: 0.0,
        maxValue: 10.0,
      },
      {
        name: "ampEgDecay",
        defaultValue: 0.2,
        minValue: 0.0,
        maxValue: 10.0,
      },
      {
        name: "ampEgSustain",
        defaultValue: 0.7,
        minValue: 0.0,
        maxValue: 1.0,
      },
      {
        name: "ampEgRelease",
        defaultValue: 0.2,
        minValue: 0.0,
        maxValue: 10.0,
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

registerProcessor("synth-processor", SynthProcessor);
