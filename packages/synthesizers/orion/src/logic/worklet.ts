import { numWaveModes, ShapeEnvRange, WaveMode } from "@/defs/definitions";
import { createInterpolator } from "@/logic/interpolator";
import { phaseTweakers } from "@/logic/phase-tweakers";
import { mapUnaryTo, power2 } from "@/logic/synth-math-utils";
import { iife, linearInterpolate, lowClip } from "@/utils/helpers";

const pi = Math.PI;
const twoPi = 2 * Math.PI;

function fracPart(value: number) {
  return value - Math.floor(value);
}

const lerp2 = linearInterpolate;

// PD (Phase Distortion) calculation
function computePD(phase: number, amount: number): number {
  // Shift the midpoint pivot forward based on the amount value.
  const pivot = 0.5 + amount * 0.45; // 0.5 to 0.95
  let distortedPhase = 0.0;

  if (phase < pivot) {
    distortedPhase = (phase / pivot) * 0.5;
  } else {
    distortedPhase = 0.5 + ((phase - pivot) / (1.0 - pivot)) * 0.5;
  }
  // Feed the warped phase into a sine shape to morph toward a saw-like waveform.
  if (0) {
    return Math.sin(twoPi * distortedPhase + pi);
  } else {
    return -Math.cos(twoPi * distortedPhase + pi);
  }
}

function computePdSquare(phase: number, level: number): number {
  let pp = phase;
  const p0 = 0.5 - level * 0.45;
  const p1 = 0.5;
  const p2 = 1 - level * 0.45;
  // const p3 = 1;
  const pp2 = iife(() => {
    if (pp < p0) return (pp / p0) * 0.5;
    else if (pp < p1) return 0.5;
    else if (pp < p2) return lerp2(pp, p1, p2, 0.5, 1);
    else return 1;
  });
  return -Math.cos(twoPi * pp2);
}

function computePdSpike(phase: number, level: number): number {
  let pp = phase;
  const p0 = 0.5 - level * 0.45;
  const p1 = 0.5 + level * 0.45;
  const pp2 = iife(() => {
    if (pp < p0) {
      return lerp2(pp, 0, p0, 0, 0.5);
    } else if (pp < p1) {
      return 0.5;
    } else {
      return lerp2(pp, p1, 1, 0.5, 1);
    }
  });
  return -Math.cos(twoPi * pp2);
}

function computePdDualCosine(pp: number, level: number): number {
  const p0 = 0.5 - level * 0.45;
  if (0) {
    const pp2 = pp < p0 ? lerp2(pp, 0, p0, 0, 0.5) : lerp2(pp, p0, 1, 0.5, 1);
    return -Math.cos(4.0 * pi * pp2);
  } else {
    const pp2 = pp < p0 ? lerp2(pp, 0, p0, 0, 1) : lerp2(pp, p0, 1, 0, 1);
    return -Math.cos(2.0 * pi * pp2);
  }
}

function computePdHalfSaw(phase: number, level: number): number {
  let pp = phase;
  const p1 = 0.5;
  const p2 = 1 - level * 0.45;
  const pp2 = iife(() => {
    if (pp < p1) return (pp / p1) * 0.5;
    else if (pp < p2) return lerp2(pp, p1, p2, 0.5, 1);
    else return 1;
  });
  return -Math.cos(twoPi * pp2);
}

function riseInvCosine(t: number) {
  return Math.cos(-pi + pi * t) * 0.5 + 0.5;
}
function fallInvCosine(t: number) {
  return Math.cos(pi * t) * 0.5 + 0.5;
}

function computePdSpeedHann(pp: number, level: number): number {
  let pp2 = 0;
  let win = 0;
  const pivot = 0.5 - level * 0.4;
  if (pp < pivot) {
    pp2 = (pp / pivot) * 0.5;
    win = 1;
  } else {
    pp2 = fracPart(0.5 + (pp - pivot) * (1 + level * 8));
    win = fallInvCosine((pp - pivot) / (1 - pivot));
  }
  return (-Math.cos(twoPi * pp2) + 1) * win - 1;
}

function computePdAccelHann(pp: number, level: number): number {
  let pp2 = 0;
  const pivot = 0.5 - level * 0.45;
  if (pp < pivot) {
    pp2 = (pp / pivot) * 0.5;
  } else {
    const ppLatter = (pp - pivot) / (1 - pivot);
    pp2 = fracPart(0.5 + power2(ppLatter) * level * 15);
  }
  const pivot2 = 0.5 + level * 0.4;
  const win = pp < pivot2 ? 1 : fallInvCosine((pp - pivot2) / (1 - pivot2));
  return (-Math.cos(twoPi * pp2) + 1) * win - 1;
}

function computePdPtmHann(
  pp: number,
  level: number,
  ptmKey: keyof typeof phaseTweakers,
): number {
  const pp2 = phaseTweakers[ptmKey](pp, level)[0];
  const pivot2 = 0.5 + level * 0.4;
  const win = pp < pivot2 ? 1 : fallInvCosine((pp - pivot2) / (1 - pivot2));
  return (-Math.cos(twoPi * pp2) + 1) * win - 1;
}

function computePdPtmHann2(
  pp: number,
  level: number,
  ptmKey: keyof typeof phaseTweakers,
): number {
  const pp2 = phaseTweakers[ptmKey](pp, level)[0];
  const win = iife(() => {
    const p0 = 0.5 - level * 0.4;
    const p1 = 0.5 + level * 0.4;
    if (pp < p0) return riseInvCosine(pp / p0);
    else if (pp < p1) return 1;
    else return fallInvCosine((pp - p1) / (1 - p1));
  });
  return (-Math.cos(twoPi * pp2) + 1) * win - 1;
}

const SHAPE_EG_MAX_SECONDS = 1.5;

type OscFn = (
  shape: number,
  shapeEgValue: number,
  phase: number,
  envRange: ShapeEnvRange,
  envDecay: number,
  phaseInc: number,
) => number;

function bindProcessOscPD(waveMode: WaveMode): OscFn {
  function processOscPD(
    shape: number,
    shapeEgValue: number,
    phase: number,
    envRange: ShapeEnvRange,
  ) {
    const pdLevel =
      envRange === ShapeEnvRange.High
        ? mapUnaryTo(shapeEgValue, shape, 1)
        : mapUnaryTo(shapeEgValue, 0, shape);
    const fn = (
      {
        [WaveMode.PD1]: computePD,
        [WaveMode.PD2]: computePdSquare,
        [WaveMode.PD3]: computePdSpike,
        [WaveMode.PD4]: computePdHalfSaw,
        [WaveMode.PD5]: computePdDualCosine,
        [WaveMode.PD6]: computePdSpeedHann,
        [WaveMode.PD7]: computePdAccelHann,
        // [WaveMode.PD8]: computePdPtmHann,
      } as any
    )[waveMode];
    if (fn) {
      return fn(phase, pdLevel);
    }

    if (waveMode === WaveMode.PDM1) {
      return computePdPtmHann(phase, pdLevel, "sfm");
    } else if (waveMode === WaveMode.PDM2) {
      return computePdPtmHann(phase, pdLevel, "sdm");
    } else if (waveMode === WaveMode.PDM3) {
      return computePdPtmHann(phase, pdLevel, "accel");
    } else if (waveMode === WaveMode.PDM4) {
      return computePdPtmHann2(phase, pdLevel * 0.55, "squash");
    } else if (waveMode === WaveMode.PDM5) {
      return computePdPtmHann2(phase, pdLevel * 0.5, "sinus");
    } else if (waveMode === WaveMode.PDM6) {
      return computePdPtmHann2(phase, pdLevel * 0.6, "ridge");
    }
    // else if (waveMode === WaveMode.PDM7) {
    //   return computePdPtmHann(phase, pdLevel, "drill");
    // } else if (waveMode === WaveMode.PDM8) {
    //   return computePdPtmHann(phase, pdLevel, "screw");
    // }
    return computePD(phase, pdLevel);

    // return computePD(phase, pdLevel);
    // return computePdSquare(phase, pdLevel);
    // return computePdSpike(phase, pdLevel);
    // return computePdHalfSaw(phase, pdLevel);
    // return computePdDualCosine(phase, pdLevel);
    // return computePdSpeedHann(phase, pdLevel);
    // return computePdAccelHann(phase, pdLevel);

    // return computePdPtmHann(phase, pdLevel, "accel");
    // return computePdPtmHann(phase, pdLevel, "sfm");
    // return computePdPtmHann(phase, pdLevel, "sdm");
    // return computePdPtmHann2(phase, pdLevel * 0.7, "squash");
    // return computePdPtmHann2(phase, pdLevel * 0.5, "sinus");
    // return computePdPtmHann2(phase, pdLevel * 0.6, "ridge");

    // return computePdPtmHann(phase, pdLevel, "speed");
    // return computePdPtmHann(phase, pdLevel, "drill");
    // return computePdPtmHann2(phase, pdLevel, "screw");
  }
  return processOscPD;
}

function processOscFM(
  shape: number,
  shapeEgValue: number,
  phase: number,
  envRange: ShapeEnvRange,
) {
  const fmLevel =
    envRange === ShapeEnvRange.High
      ? mapUnaryTo(shapeEgValue, shape, 1)
      : mapUnaryTo(shapeEgValue, 0, shape);
  const modDepth = fmLevel * 12.0;
  const ratio = 1.0 + Math.floor(shape * 7.0); // Ratio: 1x to 8x.
  return Math.sin(
    2.0 * Math.PI * phase + Math.sin(2.0 * Math.PI * phase * ratio) * modDepth,
  );
}

type OscFnWithReset = OscFn & { reset(): void };

function createProcessOscFmFeedbackSaw(): OscFnWithReset {
  let prev = 0;
  const fn: OscFnWithReset = (shape, shapeEgValue, phase, envRange) => {
    const level =
      envRange === ShapeEnvRange.High
        ? mapUnaryTo(shapeEgValue, shape, 1)
        : mapUnaryTo(shapeEgValue, 0, shape);
    const beta = level * Math.PI * 0.4;
    prev = Math.sin(twoPi * phase + beta * prev);
    return prev;
  };
  fn.reset = () => {
    prev = 0;
  };
  return fn;
}

type PtmBaseWaveKind = "saw" | "sine" | "rect";
type PtmKind = keyof typeof phaseTweakers;

// 2nd-order PolyBLEP residual for a unit discontinuity at phase wrap.
function polyBlep(t: number, dt: number): number {
  if (dt <= 0) return 0;
  if (t < dt) {
    t /= dt;
    return t + t - t * t - 1;
  }
  if (t > 1 - dt) {
    t = (t - 1) / dt;
    return t * t + t + t + 1;
  }
  return 0;
}

function getPtmWave(
  pp: number,
  ptmKind: PtmKind,
  ptmLevel: number,
  baseWaveKind: PtmBaseWaveKind,
  phaseInc: number,
) {
  let [phase, maxSlope] = phaseTweakers[ptmKind](pp, ptmLevel);
  phase -= Math.floor(phase);
  if (baseWaveKind === "sine") {
    return -Math.cos(phase * Math.PI * 2);
  }
  const dt = Math.min(0.49, maxSlope * phaseInc);
  if (baseWaveKind === "saw") {
    return 1 - phase * 2 + polyBlep(phase, dt);
  }
  return (
    (phase < 0.5 ? 1 : -1) +
    polyBlep(phase, dt) -
    polyBlep((phase + 0.5) % 1, dt)
  );
}

function wrapUnitPhase(phase: number) {
  return phase - Math.floor(phase);
}

// 2x oversample, then [1, 2, 1]/4 decimate. The extra tap is the previous
// 2x sample (recomputed) so osc1/osc2 do not need shared filter state.
function getPtmWave2x(
  pp: number,
  ptmKind: PtmKind,
  ptmLevel: number,
  baseWaveKind: PtmBaseWaveKind,
  phaseInc: number,
) {
  const dt2 = phaseInc * 0.5;
  const y0 = getPtmWave(
    wrapUnitPhase(pp - phaseInc),
    ptmKind,
    ptmLevel,
    baseWaveKind,
    dt2,
  );
  const y1 = getPtmWave(
    wrapUnitPhase(pp - dt2),
    ptmKind,
    ptmLevel,
    baseWaveKind,
    dt2,
  );
  const y2 = getPtmWave(pp, ptmKind, ptmLevel, baseWaveKind, dt2);
  return (y0 + y1 * 2 + y2) * 0.25;
}

const ptmKindMap = {
  [WaveMode.PTM1]: ["sfm", "saw", 0.5],
  [WaveMode.PTM2]: ["sdm", "sine", 0.7],
  // [WaveMode.PTM3]: ["speed", "saw", 0.7],
  [WaveMode.PTM3]: ["accel", "saw", 0.7],
  [WaveMode.PTM4]: ["squash", "saw", 0.6],
  [WaveMode.PTM5]: ["screw", "saw", 1],
  [WaveMode.PTM6]: ["sub-pw", "saw", 1],
  // [WaveMode.PTM8]: ["pw", "rect", 1],
  // [WaveMode.PTM9]: ["drill", "saw", 0.8],
} satisfies { [key in WaveMode]?: [PtmKind, PtmBaseWaveKind, number] };

let kindTextOut = "";
function bindOscFunctionForExWaves(waveMode: WaveMode): OscFn {
  const [ptmKind, baseWaveKind, ptmLevelScaling] =
    ptmKindMap[waveMode as keyof typeof ptmKindMap] ??
    ptmKindMap[WaveMode.PTM2];

  if (0) {
    const kindsText = `${waveMode}-${ptmKind}-${baseWaveKind}`;
    if (kindTextOut !== kindsText) {
      kindTextOut = kindsText;
      console.log(kindsText);
    }
  }

  return (shape, shapeEgValue, phase, envRange, envDecay, phaseInc) => {
    if (envRange === ShapeEnvRange.High) {
      const ptmLevel = mapUnaryTo(shapeEgValue, shape, 1) * ptmLevelScaling;
      return getPtmWave2x(phase, ptmKind, ptmLevel, baseWaveKind, phaseInc);
    } else {
      const ptmLevel =
        envDecay === 0
          ? shape
          : mapUnaryTo(shapeEgValue, 0, shape) * ptmLevelScaling;
      return getPtmWave2x(phase, ptmKind, ptmLevel, baseWaveKind, phaseInc);
    }
  };
}

function createOscillators() {
  let phase1 = 0.0;
  let phase2 = 0.0;
  const fmFeedbackSaw1 = createProcessOscFmFeedbackSaw();
  const fmFeedbackSaw2 = createProcessOscFmFeedbackSaw();
  let waveMode: WaveMode;
  let oscFn: OscFn;

  return {
    reset() {
      phase1 = 0.0;
      phase2 = 0.0;
      fmFeedbackSaw1.reset();
      fmFeedbackSaw2.reset();
    },
    setWaveMode(newWaveMode: WaveMode) {
      waveMode = newWaveMode;
      if (
        (WaveMode.PD1 <= waveMode && waveMode <= WaveMode.PD7) ||
        (WaveMode.PDM1 <= waveMode && waveMode <= WaveMode.PDM6)
      ) {
        oscFn = bindProcessOscPD(waveMode);
      } else if (waveMode === WaveMode.FM1) {
        oscFn = fmFeedbackSaw1;
      } else if (waveMode === WaveMode.FM2) {
        oscFn = processOscFM;
      } else {
        oscFn = bindOscFunctionForExWaves(waveMode);
      }
    },
    process(args: {
      isDualOsc: boolean;
      f1: number;
      f2: number;
      shape: number;
      shapeEgValue: number;
      envRange: ShapeEnvRange;
      envDecay: number;
      sampleRate: number;
      panWidth: number;
    }) {
      const {
        isDualOsc,
        f1,
        f2,
        shape,
        shapeEgValue,
        envRange,
        envDecay,
        sampleRate,
        panWidth,
      } = args;
      phase1 += f1 / sampleRate;
      if (phase1 >= 1.0) phase1 -= 1.0;

      if (isDualOsc) {
        phase2 += f2 / sampleRate;
        if (phase2 >= 1.0) phase2 -= 1.0;
      }

      const osc1Out = oscFn(
        shape,
        shapeEgValue,
        phase1,
        envRange,
        envDecay,
        f1 / sampleRate,
      );
      const osc2Out = isDualOsc
        ? (waveMode === WaveMode.FM1 ? fmFeedbackSaw2 : oscFn)(
            shape,
            shapeEgValue,
            phase2,
            envRange,
            envDecay,
            f2 / sampleRate,
          )
        : 0.0;

      let left: number;
      let right: number;
      if (isDualOsc) {
        const pan1 = -panWidth;
        const pan2 = panWidth;
        left = osc1Out * (1.0 - pan1) * 0.5 + osc2Out * (1.0 - pan2) * 0.5;
        right = osc1Out * (1.0 + pan1) * 0.5 + osc2Out * (1.0 + pan2) * 0.5;
      } else {
        left = osc1Out;
        right = osc1Out;
      }
      return { left, right };
    },
  };
}

const DECLICK_ATTACK_SECONDS = 0.001;
const DECLICK_ATTACK_SECONDS_NAIVE_WAVE = 0.01;

function createAmpEg() {
  let egValue = 0.0;
  let isReleased = false;
  let releaseStartValue = 0.0;
  let egTime = 0.0; // Elapsed seconds since note-on or note-off.
  let hasStarted = false;

  return {
    reset() {
      egValue = 0.0;
      isReleased = false;
      releaseStartValue = 0.0;
      egTime = 0.0;
      hasStarted = false;
    },
    process(args: {
      gateOn: boolean;
      decay: number;
      sustain: number;
      release: number;
      sampleRate: number;
      isNaiveWave: boolean;
    }) {
      const { gateOn, decay, sustain, release, sampleRate, isNaiveWave } = args;

      if (gateOn) {
        hasStarted = true;
        if (isReleased) {
          // Reset when a note is triggered again.
          isReleased = false;
          egTime = 0.0;
        }
        // Decay phase with exponential falloff. Attack is intentionally instantaneous.
        egValue = Math.exp(-egTime / Math.max(0.01, decay));

        egValue = lowClip(egValue, sustain);
        const deClickTime = isNaiveWave
          ? DECLICK_ATTACK_SECONDS_NAIVE_WAVE
          : DECLICK_ATTACK_SECONDS;
        if (egTime < deClickTime) {
          const t = egTime / deClickTime;
          const riseCurve = 0.5 - 0.5 * Math.cos(Math.PI * t);
          egValue *= riseCurve;
        }
        egTime += 1.0 / sampleRate;
      } else if (hasStarted) {
        if (!isReleased) {
          // Latch the envelope value at the moment note-off is triggered.
          isReleased = true;
          releaseStartValue = egValue;
          egTime = 0.0;
        }
        // Release phase.
        egValue =
          releaseStartValue * Math.exp(-egTime / Math.max(0.004, release));
        egTime += 1.0 / sampleRate;
      } else {
        egValue = 0.0;
      }

      return { hasStarted, egValue };
    },
  };
}

function createShapeEg() {
  let shapeEgValue = 0.0;
  let shapeEgTime = 0.0;
  return {
    reset() {
      shapeEgValue = 0.0;
      shapeEgTime = 0.0;
    },
    process(args: {
      hasStarted: boolean;
      envDecay: number;
      sampleRate: number;
    }) {
      const { hasStarted, envDecay, sampleRate } = args;
      if (hasStarted && envDecay > 0) {
        const tau = Math.max(0.01, envDecay ** 2 * SHAPE_EG_MAX_SECONDS);
        shapeEgValue = Math.exp(-shapeEgTime / tau);
        shapeEgTime += 1.0 / sampleRate;
      } else {
        shapeEgValue = 0.0;
      }
      return shapeEgValue;
    },
  };
}

const DC_BLOCK_CUTOFF_HZ = 12;

function createOnePoleDcBlocker() {
  let prevX = 0.0;
  let prevY = 0.0;
  return {
    process(x: number, pole: number) {
      const y = x - prevX + pole * prevY;
      prevX = x;
      prevY = y;
      return y;
    },
  };
}

function createPitchDriftLfo() {
  let driftPhase1 = 0.0;
  let driftPhase2 = 0.0;
  return {
    reset() {
      driftPhase1 = 0.0;
      driftPhase2 = 0.0;
    },
    process(args: { driftAmount: number; sampleRate: number }) {
      const { driftAmount, sampleRate } = args;
      let pitchDrift = 0.0;
      if (driftAmount > 0.0) {
        // Multiply LFOs with different rates to create less predictable drift.
        driftPhase1 += (2.0 * Math.PI * 0.73) / sampleRate; // 0.73Hz
        driftPhase2 += (2.0 * Math.PI * 3.14) / sampleRate; // 3.14Hz
        if (driftPhase1 > 2.0 * Math.PI) driftPhase1 -= 2.0 * Math.PI;
        if (driftPhase2 > 2.0 * Math.PI) driftPhase2 -= 2.0 * Math.PI;

        const slowWobble = Math.sin(driftPhase1) * Math.sin(driftPhase2);
        // Generate up to roughly 30 cents of pitch variation.
        pitchDrift = slowWobble * driftAmount * 0.018;
      }
      return pitchDrift;
    },
  };
}

function createVoiceStealEgFix() {
  let lastLeft = 0.0;
  let lastRight = 0.0;
  let stealHoldLeft = 0.0;
  let stealHoldRight = 0.0;
  let stealTail = 0.0;

  return {
    reset(isNaiveWave: boolean) {
      if (isNaiveWave) {
        stealHoldLeft = lastLeft;
        stealHoldRight = lastRight;
        stealTail = 1.0;
      } else {
        stealTail = 0.0;
      }
    },
    process(left: number, right: number, egValue: number, sampleRate: number) {
      let outLeft = left * egValue;
      let outRight = right * egValue;
      if (stealTail > 0) {
        const tailGain = 0.5 + 0.5 * Math.cos(Math.PI * (1.0 - stealTail));
        outLeft += stealHoldLeft * tailGain;
        outRight += stealHoldRight * tailGain;
        stealTail = Math.max(
          0,
          stealTail - 1 / (DECLICK_ATTACK_SECONDS_NAIVE_WAVE * sampleRate),
        );
      }
      lastLeft = outLeft;
      lastRight = outRight;
      return { outLeft, outRight };
    },
  };
}

function createSynthesizerCore() {
  const oscillators = createOscillators();

  let previousGate = 0.0;
  const ampEg = createAmpEg();
  const shapeEg = createShapeEg();
  const pitchDriftLfo = createPitchDriftLfo();
  const dcBlockLeft = createOnePoleDcBlocker();
  const dcBlockRight = createOnePoleDcBlocker();
  const voiceStealEgFix = createVoiceStealEgFix();

  const interpolators = {
    shape: createInterpolator(),
    envDecay: createInterpolator(),
  };

  function resetVoiceState() {
    oscillators.reset();
    ampEg.reset();
    shapeEg.reset();
    pitchDriftLfo.reset();
  }

  return {
    reset: resetVoiceState,
    process(
      _inputs: Float32Array[][],
      outputs: Float32Array[][],
      parameters: Record<string, Float32Array>,
    ): boolean {
      const output = outputs[0];
      const leftChannel = output[0];
      const rightChannel = output[1] ?? leftChannel;
      const sampleRate = globalThis.sampleRate; // Global value provided by the Web Audio API.
      const bufferSize = leftChannel.length; // Usually fixed at 128 samples.
      const dcBlockPole = Math.exp(
        (-2.0 * Math.PI * DC_BLOCK_CUTOFF_HZ) / sampleRate,
      );

      // Capture steady parameter values once to reduce repeated array access overhead.
      let baseFreq = parameters["frequency"][0];
      // baseFreq /= 2;

      const gate = parameters["gate"][0];
      const waveMode = Math.floor(parameters["waveMode"][0]) as WaveMode;
      const _shape = parameters["shape"][0];
      const envRange =
        parameters["envRange"][0] > 0.5
          ? ShapeEnvRange.High
          : ShapeEnvRange.Low;
      const _envDecay = parameters["envDecay"][0];
      const detune = parameters["detune"][0];
      const sub = parameters["sub"][0] > 0.5;
      const originalDecay = parameters["decay"][0];
      const release = parameters["release"][0];
      const driftAmount = parameters["drift"][0];

      interpolators.shape.feed(_shape, bufferSize);
      interpolators.envDecay.feed(_envDecay, bufferSize);

      oscillators.setWaveMode(waveMode);

      let decay = 0;
      let sustain = 1;
      let ampVolume = 1;
      let egParamTh = 0.5;
      if (originalDecay > egParamTh) {
        sustain = linearInterpolate(originalDecay, egParamTh, 1, 0, 1) ** 2;
        decay = linearInterpolate(originalDecay, egParamTh, 1, 1, 0);
        ampVolume = linearInterpolate(originalDecay, egParamTh, 1, 1, 0.7);
      } else {
        decay = linearInterpolate(originalDecay, 0, egParamTh, 0.05, 1);
        sustain = 0;
        ampVolume = 1;
      }

      // Process the current audio block.
      for (let i = 0; i < bufferSize; i++) {
        const shape = interpolators.shape.advance();
        const envDecay = interpolators.envDecay.advance();
        // -------------------------------------------------------------
        // 1. Envelope update
        // -------------------------------------------------------------

        const gateOn = gate > 0.5;
        const isNaiveWave = shape < 0.2 && envRange === ShapeEnvRange.Low;
        if (gateOn && previousGate <= 0.5) {
          // Rising gate edge: hard-reset voice state for pooled reuse / steal.
          voiceStealEgFix.reset(isNaiveWave);
          resetVoiceState();
        }
        previousGate = gateOn ? 1.0 : 0.0;

        let { hasStarted, egValue } = ampEg.process({
          gateOn,
          decay,
          sustain,
          release,
          sampleRate,
          isNaiveWave,
        });
        egValue *= ampVolume;

        const shapeEgValue = shapeEg.process({
          hasStarted,
          envDecay,
          sampleRate,
        });

        const pitchDrift = pitchDriftLfo.process({
          driftAmount,
          sampleRate,
        });

        // -------------------------------------------------------------
        // 3. Oscillator frequency setup with detune handling
        // -------------------------------------------------------------
        const isDualOsc = sub || detune > 0.005;
        const detuneAmount = detune * 0.015;
        const f1 = baseFreq * (1.0 - detuneAmount) * (1.0 + pitchDrift);
        const f2 =
          baseFreq *
          (sub ? 0.5 : 1.0) *
          (1.0 + detuneAmount) *
          (1.0 + pitchDrift);
        const panWidth = Math.min(detune, 0.5);

        const { left, right } = oscillators.process({
          isDualOsc,
          f1,
          f2,
          shape,
          shapeEgValue,
          envRange,
          envDecay,
          sampleRate,
          panWidth,
        });
        const { outLeft, outRight } = voiceStealEgFix.process(
          left,
          right,
          egValue,
          sampleRate,
        );
        leftChannel[i] = dcBlockLeft.process(outLeft, dcBlockPole);
        if (rightChannel !== leftChannel) {
          rightChannel[i] = dcBlockRight.process(outRight, dcBlockPole);
        }
      }

      // Keep the processor alive so pooled voices can be reused.
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
      { name: "gate", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 }, // 1.0 = note on, 0.0 = note off
      {
        name: "waveMode",
        defaultValue: 0,
        minValue: 0,
        maxValue: numWaveModes - 1,
      },
      { name: "shape", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "envRange", defaultValue: 1.0, minValue: 0.0, maxValue: 1.0 },
      { name: "envDecay", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "detune", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "sub", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "decay", defaultValue: 0.5, minValue: 0.0, maxValue: 1.0 },
      { name: "release", defaultValue: 0.3, minValue: 0.0, maxValue: 1.0 },
      { name: "drift", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
    ];
  }
  private synthesizerCore = createSynthesizerCore();
  private shouldStop = false;

  constructor() {
    super();

    this.port.onmessage = (event: MessageEvent) => {
      if (event.data?.type === "reset") {
        this.synthesizerCore.reset();
      } else if (event.data?.type === "stop") {
        this.shouldStop = true;
      }
    };
  }

  process(
    _inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ): boolean {
    if (this.shouldStop) {
      const output = outputs[0];
      output[0]?.fill(0.0);
      output[1]?.fill(0.0);
      return false;
    }

    return this.synthesizerCore.process(_inputs, outputs, parameters);
  }
}

// Register the worklet processor.
registerProcessor("synth-processor", SynthProcessor);
