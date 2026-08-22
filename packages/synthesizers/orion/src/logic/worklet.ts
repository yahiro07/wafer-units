import { numWaveModes, WaveMode } from "@/defs/definitions";
import { createInterpolator } from "@/logic/interpolator";
import { phaseTweakers } from "@/logic/phase-tweakers";
import { mapUnaryTo } from "@/logic/synth-math-utils";
import { linearInterpolate, lowClip } from "@/utils/helpers";

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
    return Math.sin(2.0 * Math.PI * distortedPhase + Math.PI);
  } else {
    return -Math.cos(2.0 * Math.PI * distortedPhase + Math.PI);
  }
}

const SHAPE_EG_MAX_SECONDS = 1.5;

type OscFn = (
  shape: number,
  shapeEgValue: number,
  phase: number,
  envDecay: number,
  phaseInc: number,
) => number;

function processOscPD(shape: number, shapeEgValue: number, phase: number) {
  const pdLevel = mapUnaryTo(shapeEgValue, shape, 1);
  return computePD(phase, pdLevel);
}

function processOscFM(shape: number, shapeEgValue: number, phase: number) {
  const fmLevel = mapUnaryTo(shapeEgValue ** 2, shape, 1);
  const modDepth = fmLevel * 12.0;
  const ratio = 1.0 + Math.floor(shape * 7.0); // Ratio: 1x to 8x.
  return Math.sin(
    2.0 * Math.PI * phase + Math.sin(2.0 * Math.PI * phase * ratio) * modDepth,
  );
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
  [WaveMode.PTM2]: ["pw", "rect", 1],
  [WaveMode.PTM3]: ["sub-pw", "saw", 1],
  [WaveMode.PTM4]: ["sfm", "saw", 0.5],
  [WaveMode.PTM5]: ["sdm", "sine", 0.7],
  [WaveMode.PTM6]: ["screw", "saw", 1],
  [WaveMode.PTM7]: ["squash", "saw", 0.6],
  // [WaveMode.PTM7]: ["drill", "saw", 0.8],
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

  return (shape, shapeEgValue, phase, envDecay, phaseInc) => {
    if (1) {
      const ptmLevel =
        envDecay === 0
          ? shape
          : mapUnaryTo(shapeEgValue, 0, shape) * ptmLevelScaling;
      return getPtmWave2x(phase, ptmKind, ptmLevel, baseWaveKind, phaseInc);
    } else {
      const ptmLevel = mapUnaryTo(shapeEgValue, shape, 1) * ptmLevelScaling;
      return getPtmWave2x(phase, ptmKind, ptmLevel, baseWaveKind, phaseInc);
    }
  };
}

function createSynthesizerCore() {
  // Oscillator phase state for two main oscillators.
  let phase1 = 0.0;
  let phase2 = 0.0;

  // Irregular LFO phase state for pitch drift.
  let driftPhase1 = 0.0;
  let driftPhase2 = 0.0;

  // Sample-and-hold state for the lo-fi downsampling effect.
  let sampleCount = 0;
  let heldSample = 0.0;

  // Envelope generator state.
  let egValue = 0.0;
  let isReleased = false;
  let releaseStartValue = 0.0;
  let egTime = 0.0; // Elapsed seconds since note-on or note-off.
  let hasStarted = false;
  let previousGate = 0.0;
  let shapeEgValue = 0.0;
  let shapeEgTime = 0.0;

  const interpolators = {
    shape: createInterpolator(),
    envDecay: createInterpolator(),
  };

  function resetVoiceState() {
    phase1 = 0.0;
    phase2 = 0.0;
    driftPhase1 = 0.0;
    driftPhase2 = 0.0;
    sampleCount = 0;
    heldSample = 0.0;
    egValue = 0.0;
    isReleased = false;
    releaseStartValue = 0.0;
    egTime = 0.0;
    hasStarted = false;
    shapeEgValue = 0.0;
    shapeEgTime = 0.0;
  }

  return {
    reset: resetVoiceState,
    process(
      _inputs: Float32Array[][],
      outputs: Float32Array[][],
      parameters: Record<string, Float32Array>,
    ): boolean {
      const output = outputs[0];
      const outputChannel = output[0]; // Mono output.
      const sampleRate = globalThis.sampleRate; // Global value provided by the Web Audio API.
      const bufferSize = outputChannel.length; // Usually fixed at 128 samples.

      // Capture steady parameter values once to reduce repeated array access overhead.
      const baseFreq = parameters["frequency"][0];
      const gate = parameters["gate"][0];
      const waveMode = Math.floor(parameters["waveMode"][0]) as WaveMode;
      const _shape = parameters["shape"][0];
      const _envDecay = parameters["envDecay"][0];
      const detune = parameters["detune"][0];
      const sub = parameters["sub"][0] > 0.5;
      const decay = parameters["decay"][0];
      const release = parameters["release"][0];
      const driftAmount = parameters["drift"][0];
      const _loFiAmount = parameters["loFi"][0];
      const loFiAmount = _loFiAmount * _loFiAmount;

      interpolators.shape.feed(_shape, bufferSize);
      interpolators.envDecay.feed(_envDecay, bufferSize);

      let oscFn: OscFn;
      if (waveMode === WaveMode.PD) {
        oscFn = processOscPD;
      } else if (waveMode === WaveMode.FM) {
        oscFn = processOscFM;
      } else {
        oscFn = bindOscFunctionForExWaves(waveMode);
      }

      // Process the current audio block.
      for (let i = 0; i < bufferSize; i++) {
        const shape = interpolators.shape.advance();
        const envDecay = interpolators.envDecay.advance();
        // -------------------------------------------------------------
        // 1. Envelope update
        // -------------------------------------------------------------
        const gateOn = gate > 0.5;
        if (gateOn && previousGate <= 0.5) {
          // Rising gate edge: hard-reset voice state for pooled reuse / steal.
          resetVoiceState();
        }
        previousGate = gateOn ? 1.0 : 0.0;

        if (gateOn) {
          hasStarted = true;
          if (isReleased) {
            // Reset when a note is triggered again.
            isReleased = false;
            egTime = 0.0;
          }
          // Decay phase with exponential falloff. Attack is intentionally instantaneous.
          egValue = Math.exp(-egTime / Math.max(0.01, decay));
          const sustain =
            decay < 0.75 ? 0 : linearInterpolate(decay, 0.75, 1, 0, 1);
          egValue = lowClip(egValue, sustain);
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
            releaseStartValue * Math.exp(-egTime / Math.max(0.01, release));
          egTime += 1.0 / sampleRate;
        } else {
          egValue = 0.0;
        }

        if (hasStarted && envDecay > 0) {
          const tau = Math.max(0.01, envDecay ** 2 * SHAPE_EG_MAX_SECONDS);
          shapeEgValue = Math.exp(-shapeEgTime / tau);
          shapeEgTime += 1.0 / sampleRate;
        } else {
          shapeEgValue = 0.0;
        }

        // -------------------------------------------------------------
        // 2. Pitch drift calculation
        // -------------------------------------------------------------
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

        // Advance oscillator phases.
        phase1 += f1 / sampleRate;
        if (phase1 >= 1.0) phase1 -= 1.0;

        if (isDualOsc) {
          phase2 += f2 / sampleRate;
          if (phase2 >= 1.0) phase2 -= 1.0;
        }

        // -------------------------------------------------------------
        // 4. Modulation value combination (knob + envelope modulation)
        // -------------------------------------------------------------

        // -------------------------------------------------------------
        // 5. Waveform generation for each algorithm
        // -------------------------------------------------------------

        const osc1Out = oscFn(
          shape,
          shapeEgValue,
          phase1,
          envDecay,
          f1 / sampleRate,
        );
        const osc2Out = isDualOsc
          ? oscFn(shape, shapeEgValue, phase2, envDecay, f2 / sampleRate)
          : 0.0;

        // Mix the main oscillators.
        let mainMix = isDualOsc ? (osc1Out + osc2Out) * 0.5 : osc1Out;

        // -------------------------------------------------------------
        // 6. Lo-fi processing on the main oscillator only
        // -------------------------------------------------------------
        if (loFiAmount > 0.005) {
          // A. Bit crushing from 16-bit down to as low as 4-bit.
          const bits = 16.0 - loFiAmount * 12.0;
          const step = Math.pow(2, bits);
          mainMix = Math.round(mainMix * step) / step;

          // B. Downsampling via sample hold.
          // Increase the hold interval with the lo-fi amount, up to 15 samples.
          const sampleHoldInterval = Math.floor(1 + loFiAmount * 14);
          if (sampleCount % sampleHoldInterval === 0) {
            heldSample = mainMix;
          }
          mainMix = heldSample;
          sampleCount++;
        }

        // -------------------------------------------------------------
        // 7. Final amplitude envelope
        // -------------------------------------------------------------
        const finalSample = mainMix * egValue;

        // Write the sample to the output channel.
        outputChannel[i] = finalSample;

        // Mirror the sample to the second channel when stereo output is present.
        if (output.length > 1) {
          output[1][i] = finalSample;
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
      { name: "envDecay", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "detune", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "sub", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "decay", defaultValue: 0.5, minValue: 0.0, maxValue: 1.0 },
      { name: "release", defaultValue: 0.3, minValue: 0.0, maxValue: 1.0 },
      { name: "drift", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "loFi", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
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
