import { createInterpolator } from "@/audio/interpolator";
import { phaseTweakers } from "@/audio/phase-tweakers";
import { power2 } from "@/audio/synth-math-utils";
import { WaveMode } from "@/constants";
import { clampValue, linearInterpolate, lowClip } from "@/utils/helpers";

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

// PD_RESO (pseudo resonance) calculation
function computePDReso(phase: number, amount: number): number {
  // Set the high-harmonic multiplier from the current index value.
  const resoMultiplier = 1.0 + Math.floor(amount * 15.0);
  // Apply a trailing decay window across the cycle, similar to CZ behavior.
  const window = 1.0 - phase;

  return Math.sin(phase * resoMultiplier * 2.0 * Math.PI) * window;
}

type OscFn = (
  shape: number,
  egValue: number,
  envMod: number,
  phase: number,
) => number;

function processOscPD(
  shape: number,
  egValue: number,
  envMod: number,
  phase: number,
) {
  // Let envelope modulation overshoot at attack, then settle back during decay.
  let currentIndex = shape + egValue * envMod;
  currentIndex = clampValue(currentIndex, 0, 1); // Safety clamp.
  // CZ-style phase distortion that bends toward a saw waveform.
  return computePD(phase, currentIndex);
}

function processOscFM(
  shape: number,
  egValue: number,
  envMod: number,
  phase: number,
) {
  const currentIndex = shape + egValue * power2(envMod);
  const modDepth = currentIndex * 5.0;
  const ratio = 1.0 + Math.floor(shape * 7.0); // Ratio: 1x to 8x.
  return Math.sin(
    2.0 * Math.PI * phase + Math.sin(2.0 * Math.PI * phase * ratio) * modDepth,
  );
}

type PtmBaseWaveKind = "saw" | "sine" | "rect";
type PtmKind = keyof typeof phaseTweakers;

function getPtmWave(
  pp: number,
  ptmKind: PtmKind,
  ptmLevel: number,
  baseWaveKind: PtmBaseWaveKind,
) {
  let [phase] = phaseTweakers[ptmKind](pp, ptmLevel);
  phase -= Math.floor(phase);
  if (baseWaveKind === "saw") {
    return 1 - phase * 2;
  } else if (baseWaveKind === "rect") {
    return phase < 0.5 ? 1 : -1;
  } else {
    return -Math.cos(phase * Math.PI * 2);
  }
}

const ptmKindMap = {
  [WaveMode.PTM2]: ["sfm", "sine"],
  [WaveMode.PTM3]: ["sdm", "sine"],
  [WaveMode.PTM4]: ["pw", "rect"],
  [WaveMode.PTM5]: ["accel", "saw"],
  [WaveMode.PTM6]: ["screw", "saw"],
  [WaveMode.PTM7]: ["drill", "rect"],
  [WaveMode.PTM8]: ["squash", "saw"],
  [WaveMode.PTM9]: ["creep", "sine"],
  [WaveMode.PTM10]: ["creep2", "saw"],
  [WaveMode.PTM11]: ["sub-pw", "rect"],
} satisfies { [key in WaveMode]?: [PtmKind, PtmBaseWaveKind] };

let kindTextOut = "";
function bindOscFunctionForExWaves(waveMode: WaveMode): OscFn {
  const [ptmKind, baseWaveKind] =
    ptmKindMap[waveMode as keyof typeof ptmKindMap] ??
    ptmKindMap[WaveMode.PTM2];

  if (0) {
    const kindsText = `${waveMode}-${ptmKind}-${baseWaveKind}`;
    if (kindTextOut !== kindsText) {
      kindTextOut = kindsText;
      console.log(kindsText);
    }
  }

  return (shape, egLevel, envMod, phase) => {
    const ptmLevel = clampValue(shape + egLevel * envMod, 0, 1);
    return getPtmWave(phase, ptmKind, ptmLevel, baseWaveKind);
  };
}

function createSynthesizerCore() {
  // Oscillator phase state for two main oscillators plus the sub oscillator.
  let phase1 = 0.0;
  let phase2 = 0.0;
  let phaseSub = 0.0;

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

  const interpolators = {
    shape: createInterpolator(),
    envMod: createInterpolator(),
  };

  function resetVoiceState() {
    phase1 = 0.0;
    phase2 = 0.0;
    phaseSub = 0.0;
    driftPhase1 = 0.0;
    driftPhase2 = 0.0;
    sampleCount = 0;
    heldSample = 0.0;
    egValue = 0.0;
    isReleased = false;
    releaseStartValue = 0.0;
    egTime = 0.0;
    hasStarted = false;
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
      const _envMod = parameters["envMod"][0];
      const detune = parameters["detune"][0];
      const subVol = parameters["sub"][0];
      const decay = parameters["decay"][0];
      const release = parameters["release"][0];
      const driftAmount = parameters["drift"][0];
      const _loFiAmount = parameters["loFi"][0];
      const loFiAmount = _loFiAmount * _loFiAmount;

      interpolators.shape.feed(_shape, bufferSize);
      interpolators.envMod.feed(_envMod, bufferSize);

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
        const envMod = interpolators.envMod.advance();
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
        // Shut down OSC2 completely when detune is effectively zero.
        const isDualOsc = detune > 0.005;
        const detuneFactor = 1.0 + detune * 0.015; // Up to roughly 1.5% detune.

        const f1 = baseFreq * (1.0 + pitchDrift);
        const f2 = baseFreq * detuneFactor * (1.0 + pitchDrift);
        const fSub = baseFreq * 0.5 * (1.0 + pitchDrift); // One octave below.

        // Advance oscillator phases.
        phase1 += f1 / sampleRate;
        if (phase1 >= 1.0) phase1 -= 1.0;

        if (isDualOsc) {
          phase2 += f2 / sampleRate;
          if (phase2 >= 1.0) phase2 -= 1.0;
        }

        phaseSub += fSub / sampleRate;
        if (phaseSub >= 1.0) phaseSub -= 1.0;

        // -------------------------------------------------------------
        // 4. Modulation value combination (knob + envelope modulation)
        // -------------------------------------------------------------

        // -------------------------------------------------------------
        // 5. Waveform generation for each algorithm
        // -------------------------------------------------------------

        const osc1Out = oscFn(shape, egValue, envMod, phase1);
        const osc2Out = isDualOsc ? oscFn(shape, egValue, envMod, phase2) : 0.0;

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
        // 7. Sub oscillator mix and final amplitude envelope
        // -------------------------------------------------------------
        // Use a triangle wave for the sub oscillator and bypass lo-fi processing to keep the low end stable.
        let subOut = 0.0;
        if (subVol > 0.005) {
          subOut = phaseSub < 0.5 ? 4.0 * phaseSub - 1.0 : 3.0 - 4.0 * phaseSub;
        }

        // Apply the main amplitude envelope to the final mix.
        const finalSample = (mainMix + subOut * subVol * 0.6) * egValue;

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
        maxValue: WaveMode.NumWaveModes - 1,
      },
      { name: "shape", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "envMod", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "detune", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "sub", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "decay", defaultValue: 0.5, minValue: 0.001, maxValue: 1.0 },
      { name: "release", defaultValue: 0.3, minValue: 0.001, maxValue: 1.0 },
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
