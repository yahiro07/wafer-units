import { SynthParameters } from "@/defs/definitions";
import { createDensityShaper } from "@/engine/density-shaper";
import { getVoicePitches } from "@/engine/poly-voice";

const LPF_TWO_STAGE = false;
const MIN_CUTOFF_HZ = 20;
const MAX_CUTOFF_HZ = 18000;
const MIN_Q = 0.1;
const MAX_Q = 18;
const MAX_FILTER_ENV_CENTS = 4800;

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
  const densityShaper = createDensityShaper(audioContext);
  const compressor = audioContext.createDynamicsCompressor();
  const globalGain = audioContext.createGain();
  const filterEnvScale = audioContext.createGain();

  input.gain.value = 1;
  hpf.type = "highpass";
  lpf1.type = "lowpass";
  if (lpf2) {
    lpf2.type = "lowpass";
  }
  filterEnvScale.gain.value = 0;
  compressor.threshold.value = -18;
  compressor.ratio.value = 4;
  compressor.knee.value = 8;
  compressor.attack.value = 0.003;
  compressor.release.value = 0.15;
  globalGain.gain.value = 1;
  densityShaper.updateNodeParameters(0);

  input.connect(hpf);
  hpf.connect(lpf1);
  if (lpf2) {
    lpf1.connect(lpf2);
    lpf2.connect(densityShaper.shaperNode);
  } else {
    lpf1.connect(densityShaper.shaperNode);
  }
  densityShaper.shaperNode.connect(compressor);
  compressor.connect(globalGain);
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
      densityShaper.updateNodeParameters(clamp01(parameters.density));
      globalGain.gain.setValueAtTime(clamp01(parameters.globalVolume), time);
    },
    cleanup() {
      input.disconnect();
      hpf.disconnect();
      lpf1.disconnect();
      lpf2?.disconnect();
      densityShaper.shaperNode.disconnect();
      compressor.disconnect();
      globalGain.disconnect();
      filterEnvScale.disconnect();
    },
  };
}
