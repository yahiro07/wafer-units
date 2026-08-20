import { SynthParameters } from "@/defs/definitions";
import { getVoicePitches } from "@/engine/poly-voice";

const LPF_TWO_STAGE = false;
const MIN_CUTOFF_HZ = 20;
const MAX_CUTOFF_HZ = 18000;
const MIN_Q = 0.1;
const MAX_Q = 18;
const MAX_FILTER_ENV_CENTS = 4800;
const SHAPER_CURVE_SIZE = 1024;

function createTransferCurve(
  map: (x: number) => number,
): Float32Array<ArrayBuffer> {
  const curve = new Float32Array(
    new ArrayBuffer(SHAPER_CURVE_SIZE * Float32Array.BYTES_PER_ELEMENT),
  );
  for (let i = 0; i < curve.length; i += 1) {
    const x = (i / (curve.length - 1)) * 2 - 1;
    curve[i] = map(x);
  }
  return curve;
}

const identityShaperCurve = createTransferCurve((x) => x);
const tanhShaperCurve = createTransferCurve((x) => Math.tanh(x));

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

export function createEffectChain(
  audioContext: AudioContext,
  destination: AudioNode,
) {
  const nyquist = audioContext.sampleRate * 0.5 - 1;
  const input = audioContext.createGain();
  const hpf = audioContext.createBiquadFilter();
  const lpf1 = audioContext.createBiquadFilter();
  const lpf2 = LPF_TWO_STAGE ? audioContext.createBiquadFilter() : null;
  const saturator = audioContext.createWaveShaper();
  const globalGain = audioContext.createGain();
  const filterEnvScale = audioContext.createGain();

  input.gain.value = 1;
  hpf.type = "highpass";
  lpf1.type = "lowpass";
  if (lpf2) {
    lpf2.type = "lowpass";
  }
  saturator.curve = identityShaperCurve;
  saturator.oversample = "2x";
  filterEnvScale.gain.value = 0;
  globalGain.gain.value = 1;

  input.connect(hpf);
  hpf.connect(lpf1);
  if (lpf2) {
    lpf1.connect(lpf2);
    lpf2.connect(globalGain);
  } else {
    lpf1.connect(globalGain);
  }
  globalGain.connect(destination);
  filterEnvScale.connect(lpf1.detune);
  if (lpf2) {
    filterEnvScale.connect(lpf2.detune);
  }

  return {
    input,
    filterEnvScale,
    apply(parameters: SynthParameters, time: number, lastNote: number) {
      const { osc1Hz, osc2Hz } = getVoicePitches(lastNote, parameters);
      const lpfMinHz = Math.min(osc1Hz, osc2Hz) / 2;
      hpf.frequency.setValueAtTime(
        mapCutoffHz(parameters.hpfCutoff, nyquist, 40, nyquist * 0.3),
        time,
      );
      hpf.Q.setValueAtTime(mapQ(parameters.hpfQ), time);
      const lpfHz = mapCutoffHz(parameters.lpfCutoff, nyquist, lpfMinHz);
      const lpfQ = mapQ(parameters.lpfQ);
      lpf1.frequency.setValueAtTime(lpfHz, time);
      lpf1.Q.setValueAtTime(lpfQ, time);
      if (lpf2) {
        lpf2.frequency.setValueAtTime(lpfHz, time);
        lpf2.Q.setValueAtTime(lpfQ, time);
      }
      filterEnvScale.gain.setValueAtTime(
        clamp01(parameters.lpfEnvMod) * MAX_FILTER_ENV_CENTS,
        time,
      );
      globalGain.gain.setValueAtTime(clamp01(parameters.voiceVolume), time);
    },
    setPunchCurve(punch: number) {
      const punchCurve = punch > 0 ? tanhShaperCurve : identityShaperCurve;
      if (saturator.curve !== punchCurve) {
        saturator.curve = punchCurve;
      }
    },
    cleanup() {
      input.disconnect();
      hpf.disconnect();
      lpf1.disconnect();
      lpf2?.disconnect();
      saturator.disconnect();
      globalGain.disconnect();
      filterEnvScale.disconnect();
    },
  };
}
