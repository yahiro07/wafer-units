import { SynthParameters } from "@/defs/definitions";
import { createChorus5 } from "@/engine/chorus5";
import { createDensityShaper } from "@/engine/density-shaper";
import { getVoicePitches } from "@/engine/poly-voice";
import { createReverb } from "@/engine/reverb";
import { createSineLfo } from "@/engine/sine-lfo";

const MIN_CUTOFF_HZ = 20;
const MAX_CUTOFF_HZ = 18000;
const MIN_Q = 0.1;
// const MAX_Q = 18;
const MAX_Q = 9;
const MAX_FILTER_ENV_CENTS = 4800;
const MAX_FILTER_LFO_CENTS = 2400;
const PRESENCE_LOW_HZ = 400;
const PRESENCE_HIGH_HZ = 2500;
const MAX_PRESENCE_DB = 8;

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
  const lpf2 = audioContext.createBiquadFilter();
  const densityShaper = createDensityShaper(audioContext);
  const chorus = createChorus5(audioContext);
  const reverb = createReverb(audioContext);
  const compressor = audioContext.createDynamicsCompressor();
  const compressorMakeup = audioContext.createGain();
  const presenceLow = audioContext.createBiquadFilter();
  const presenceHigh = audioContext.createBiquadFilter();
  const globalGain = audioContext.createGain();
  const filterEnvScale = audioContext.createGain();
  const filterLfo = createSineLfo(audioContext);

  input.gain.value = 1;
  hpf.type = "highpass";
  lpf1.type = "lowpass";
  lpf2.type = "lowpass";
  filterEnvScale.gain.value = 0;
  compressor.threshold.value = -18;
  compressor.ratio.value = 4;
  compressor.knee.value = 8;
  compressor.attack.value = 0.02;
  compressor.release.value = 0.2;
  compressorMakeup.gain.value = 2;
  presenceLow.type = "lowshelf";
  presenceLow.frequency.value = PRESENCE_LOW_HZ;
  presenceLow.gain.value = 0;
  presenceHigh.type = "highshelf";
  presenceHigh.frequency.value = PRESENCE_HIGH_HZ;
  presenceHigh.gain.value = 0;
  globalGain.gain.value = 1;
  densityShaper.updateNodeParameters(0);

  input.connect(hpf);
  hpf.connect(lpf1);
  let lpfSteep = false;
  function connectLpf(steep: boolean) {
    lpf1.disconnect();
    lpf2.disconnect();
    if (steep) {
      lpf1.connect(lpf2);
      lpf2.connect(densityShaper.shaperNode);
    } else {
      lpf1.connect(densityShaper.shaperNode);
    }
    lpfSteep = steep;
  }
  connectLpf(false);
  densityShaper.shaperNode.connect(chorus.inputNode);
  chorus.outputNode.connect(reverb.input);
  reverb.output.connect(compressor);
  compressor.connect(compressorMakeup);
  compressorMakeup.connect(presenceLow);
  presenceLow.connect(presenceHigh);
  presenceHigh.connect(globalGain);
  globalGain.connect(destination);
  filterEnvScale.connect(lpf1.detune);
  filterEnvScale.connect(lpf2.detune);
  filterLfo.output.connect(lpf1.detune);
  filterLfo.output.connect(lpf2.detune);

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
      lpf2.frequency.setValueAtTime(lpfHz, time);
      lpf2.Q.setValueAtTime(lpfQ, time);
      if (parameters.lpfSteep !== lpfSteep) {
        connectLpf(parameters.lpfSteep);
      }
      filterEnvScale.gain.setValueAtTime(
        clamp01(parameters.lpfEnvMod) * MAX_FILTER_ENV_CENTS,
        time,
      );
      filterLfo.apply(
        parameters.filterLfoRate,
        clamp01(parameters.filterLfoDepth ** 2) * MAX_FILTER_LFO_CENTS,
        time,
      );
      densityShaper.updateNodeParameters(clamp01(parameters.density));
      chorus.setLevel(clamp01(parameters.chorusLevel));
      reverb.apply(
        parameters.reverbDecay,
        parameters.reverbMix,
        parameters.reverbDamp,
        time,
      );
      const tiltDb = clamp01(parameters.presence) * MAX_PRESENCE_DB;
      presenceLow.gain.setValueAtTime(-tiltDb, time);
      presenceHigh.gain.setValueAtTime(tiltDb, time);
      globalGain.gain.setValueAtTime(clamp01(parameters.globalVolume), time);
    },
    cleanup() {
      input.disconnect();
      hpf.disconnect();
      lpf1.disconnect();
      lpf2.disconnect();
      densityShaper.shaperNode.disconnect();
      chorus.cleanupNodes();
      chorus.inputNode.disconnect();
      chorus.outputNode.disconnect();
      reverb.cleanup();
      compressor.disconnect();
      compressorMakeup.disconnect();
      presenceLow.disconnect();
      presenceHigh.disconnect();
      globalGain.disconnect();
      filterEnvScale.disconnect();
      filterLfo.cleanup();
    },
  };
}
