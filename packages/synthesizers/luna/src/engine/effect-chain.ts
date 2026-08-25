import { SynthParameters } from "@/defs/definitions";
import { createChorus5 } from "@/engine/chorus5";
import { createDensityShaper } from "@/engine/density-shaper";
import { getVoicePitches } from "@/engine/poly-voice";
import { createOutputSaturator } from "@/engine/output-saturator";
import { createReverb } from "@/engine/reverb";
import { createSineLfo } from "@/engine/sine-lfo";
import { mapKnobCurveCenterUnity } from "@/utils/volume-curve";

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
const DENSITY_SHAPER_ENABLED = true;
const COMPRESSOR_ENABLED = true;
const OUTPUT_SATURATOR_ENABLED = true;

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

function has(patch: Partial<SynthParameters>, key: keyof SynthParameters) {
  return key in patch;
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
  const densityShaper = DENSITY_SHAPER_ENABLED
    ? createDensityShaper(audioContext)
    : null;
  const chorus = createChorus5(audioContext);
  const reverb = createReverb(audioContext);
  const compressor = COMPRESSOR_ENABLED
    ? audioContext.createDynamicsCompressor()
    : null;
  const compressorMakeup = COMPRESSOR_ENABLED
    ? audioContext.createGain()
    : null;
  const presenceLow = audioContext.createBiquadFilter();
  const presenceHigh = audioContext.createBiquadFilter();
  const globalGain = audioContext.createGain();
  const outputSaturator = OUTPUT_SATURATOR_ENABLED
    ? createOutputSaturator(audioContext)
    : null;
  const filterEnvScale = audioContext.createGain();
  const filterLfo = createSineLfo(audioContext);

  input.gain.value = 1;
  hpf.type = "highpass";
  lpf1.type = "lowpass";
  lpf2.type = "lowpass";
  filterEnvScale.gain.value = 0;
  if (compressor && compressorMakeup) {
    compressor.threshold.value = -18;
    compressor.ratio.value = 4;
    compressor.knee.value = 8;
    compressor.attack.value = 0.02;
    compressor.release.value = 0.2;
    compressorMakeup.gain.value = 2;
  }
  presenceLow.type = "lowshelf";
  presenceLow.frequency.value = PRESENCE_LOW_HZ;
  presenceLow.gain.value = 0;
  presenceHigh.type = "highshelf";
  presenceHigh.frequency.value = PRESENCE_HIGH_HZ;
  presenceHigh.gain.value = 0;
  globalGain.gain.value = 1;
  densityShaper?.updateNodeParameters(0);

  input.connect(hpf);
  hpf.connect(lpf1);
  const postFilter = densityShaper?.inputNode ?? chorus.inputNode;
  let lpfSteep = false;
  function connectLpf(steep: boolean) {
    lpf1.disconnect();
    lpf2.disconnect();
    if (steep) {
      lpf1.connect(lpf2);
      lpf2.connect(postFilter);
    } else {
      lpf1.connect(postFilter);
    }
    lpfSteep = steep;
  }
  connectLpf(false);
  densityShaper?.outputNode.connect(chorus.inputNode);
  chorus.outputNode.connect(reverb.input);
  if (compressor && compressorMakeup) {
    reverb.output.connect(compressor);
    compressor.connect(compressorMakeup);
    compressorMakeup.connect(presenceLow);
  } else {
    reverb.output.connect(presenceLow);
    reverb.output.gain.value = 3;
  }
  presenceLow.connect(presenceHigh);
  presenceHigh.connect(globalGain);
  if (outputSaturator) {
    globalGain.connect(outputSaturator.inputNode);
    outputSaturator.outputNode.connect(destination);
    outputSaturator.setEnabled(true, 0);
  } else {
    globalGain.connect(destination);
  }
  filterEnvScale.connect(lpf1.detune);
  filterEnvScale.connect(lpf2.detune);
  filterLfo.output.connect(lpf1.detune);
  filterLfo.output.connect(lpf2.detune);

  function applyLpfFrequency(
    parameters: SynthParameters,
    time: number,
    lastNote: number,
  ) {
    const { osc1Hz, osc2Hz } = getVoicePitches(lastNote, parameters);
    const lpfMinHz = Math.min(osc1Hz, osc2Hz) / 2;
    const lpfHz = mapCutoffHz(parameters.lpfCutoff, nyquist, lpfMinHz);
    lpf1.frequency.setValueAtTime(lpfHz, time);
    lpf2.frequency.setValueAtTime(lpfHz, time);
  }

  return {
    input,
    filterEnvScale,
    applyLpfFrequency,
    apply(
      patch: Partial<SynthParameters>,
      parameters: SynthParameters,
      time: number,
      lastNote: number,
    ) {
      if (has(patch, "hpfCutoff")) {
        hpf.frequency.setValueAtTime(
          mapCutoffHz(parameters.hpfCutoff, nyquist, 40, nyquist * 0.3),
          time,
        );
      }
      if (has(patch, "hpfQ")) {
        hpf.Q.setValueAtTime(mapQ(parameters.hpfQ), time);
      }
      if (
        has(patch, "lpfCutoff") ||
        has(patch, "voiceOctave") ||
        has(patch, "osc2Octave")
      ) {
        applyLpfFrequency(parameters, time, lastNote);
      }
      if (has(patch, "lpfQ")) {
        const lpfQ = mapQ(parameters.lpfQ);
        lpf1.Q.setValueAtTime(lpfQ, time);
        lpf2.Q.setValueAtTime(lpfQ, time);
      }
      if (has(patch, "lpfSteep") && parameters.lpfSteep !== lpfSteep) {
        connectLpf(parameters.lpfSteep);
      }
      if (has(patch, "lpfEnvMod")) {
        filterEnvScale.gain.setValueAtTime(
          clamp01(parameters.lpfEnvMod) * MAX_FILTER_ENV_CENTS,
          time,
        );
      }
      if (has(patch, "filterLfoRate") || has(patch, "filterLfoDepth")) {
        filterLfo.apply(
          parameters.filterLfoRate,
          clamp01(parameters.filterLfoDepth ** 2) * MAX_FILTER_LFO_CENTS,
          time,
        );
      }
      if (has(patch, "density")) {
        densityShaper?.updateNodeParameters(clamp01(parameters.density));
      }
      if (has(patch, "chorusLevel")) {
        chorus.setLevel(clamp01(parameters.chorusLevel));
      }
      if (
        has(patch, "reverbDecay") ||
        has(patch, "reverbMix") ||
        has(patch, "reverbDamp")
      ) {
        reverb.apply(
          {
            decay: has(patch, "reverbDecay")
              ? parameters.reverbDecay
              : undefined,
            mix: has(patch, "reverbMix")
              ? parameters.reverbMix ** 2
              : undefined,
            damp: has(patch, "reverbDamp") ? parameters.reverbDamp : undefined,
          },
          time,
        );
      }
      if (has(patch, "presence")) {
        const tiltDb = clamp01(parameters.presence) * MAX_PRESENCE_DB;
        presenceLow.gain.setValueAtTime(-tiltDb, time);
        presenceHigh.gain.setValueAtTime(tiltDb, time);
      }
      if (has(patch, "globalVolume")) {
        const gain = mapKnobCurveCenterUnity(parameters.globalVolume) * 0.5;
        globalGain.gain.setValueAtTime(gain, time);
      }
    },
    cleanup() {
      input.disconnect();
      hpf.disconnect();
      lpf1.disconnect();
      lpf2.disconnect();
      densityShaper?.cleanup();
      chorus.cleanupNodes();
      chorus.inputNode.disconnect();
      chorus.outputNode.disconnect();
      reverb.cleanup();
      compressor?.disconnect();
      compressorMakeup?.disconnect();
      presenceLow.disconnect();
      presenceHigh.disconnect();
      globalGain.disconnect();
      outputSaturator?.cleanup();
      filterEnvScale.disconnect();
      filterLfo.cleanup();
    },
  };
}
