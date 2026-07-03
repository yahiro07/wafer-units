import { EffectParameters } from "./definitions";
import envelopeWorkletUrl from "./lofi-envelope-processor?worker&url";
import workletUrl from "./lofi-processor?worker&url";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function mapLinear(value: number, min: number, max: number) {
  return min + (max - min) * clamp01(value);
}

function mapExponential(value: number, min: number, max: number) {
  const normalized = clamp01(value);
  return min * (max / min) ** normalized;
}

function setSmoothValue(
  audioParam: AudioParam,
  value: number,
  audioContext: AudioContext,
) {
  const now = audioContext.currentTime;
  audioParam.cancelScheduledValues(now);
  audioParam.setTargetAtTime(value, now, 0.015);
}

function createWhiteNoiseBuffer(audioContext: AudioContext) {
  const buffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate * 4,
    audioContext.sampleRate,
  );
  const samples = buffer.getChannelData(0);

  for (let i = 0; i < samples.length; i++) {
    samples[i] = Math.random() * 2 - 1;
  }

  return buffer;
}

function makeSaturationCurve(drive: number) {
  const amount = clamp01(drive);
  const curve = new Float32Array(2048);
  const inputGain = 1 + amount * 4;
  const outputGain = 1 / Math.sqrt(inputGain);

  for (let i = 0; i < curve.length; i++) {
    const x = (i / (curve.length - 1)) * 2 - 1;
    curve[i] = amount === 0 ? x : Math.tanh(x * inputGain) * outputGain;
  }

  return curve;
}

export function createEffect(
  audioContext: AudioContext,
  initialParameters: EffectParameters,
) {
  const state = {
    parameters: { ...initialParameters },
    degradeNode: null as AudioWorkletNode | null,
    envelopeNode: null as AudioWorkletNode | null,
  };
  const inputNode = audioContext.createGain();
  const dryGain = audioContext.createGain();
  const wetGain = audioContext.createGain();
  const outputNode = audioContext.createGain();
  const wobbleDelay = audioContext.createDelay(0.06);
  const wowOscillator = audioContext.createOscillator();
  const wowGain = audioContext.createGain();
  const flutterOscillator = audioContext.createOscillator();
  const flutterGain = audioContext.createGain();
  const drivePreGain = audioContext.createGain();
  const driveShaper = audioContext.createWaveShaper();
  const highpassFilter = audioContext.createBiquadFilter();
  const lowpassFilter = audioContext.createBiquadFilter();
  const speakerPeak = audioContext.createBiquadFilter();
  const hiShelf = audioContext.createBiquadFilter();
  const compressor = audioContext.createDynamicsCompressor();
  const noiseSource = audioContext.createBufferSource();
  const noiseHighpass = audioContext.createBiquadFilter();
  const noiseEnvelopeAmount = audioContext.createGain();
  const noiseGain = audioContext.createGain();

  wowOscillator.type = "sine";
  wowOscillator.frequency.value = 0.75;
  flutterOscillator.type = "triangle";
  flutterOscillator.frequency.value = 6.5;
  wobbleDelay.delayTime.value = 0.001;
  driveShaper.oversample = "4x";
  highpassFilter.type = "highpass";
  lowpassFilter.type = "lowpass";
  speakerPeak.type = "peaking";
  hiShelf.type = "highshelf";
  noiseSource.buffer = createWhiteNoiseBuffer(audioContext);
  noiseSource.loop = true;
  noiseHighpass.type = "highpass";
  compressor.threshold.value = -18;
  compressor.knee.value = 18;
  compressor.ratio.value = 2.5;
  compressor.attack.value = 0.004;
  compressor.release.value = 0.12;
  noiseGain.gain.value = 0;
  noiseEnvelopeAmount.gain.value = 0;

  inputNode.connect(dryGain);
  dryGain.connect(outputNode);

  inputNode.connect(wobbleDelay);
  wobbleDelay.connect(drivePreGain);
  drivePreGain.connect(driveShaper);
  driveShaper.connect(highpassFilter);
  highpassFilter.connect(lowpassFilter);
  lowpassFilter.connect(speakerPeak);
  speakerPeak.connect(hiShelf);
  hiShelf.connect(compressor);
  compressor.connect(wetGain);
  wetGain.connect(outputNode);

  wowOscillator.connect(wowGain);
  wowGain.connect(wobbleDelay.delayTime);
  flutterOscillator.connect(flutterGain);
  flutterGain.connect(wobbleDelay.delayTime);

  noiseSource.connect(noiseHighpass);
  noiseHighpass.connect(noiseGain);
  noiseGain.connect(wetGain);
  noiseEnvelopeAmount.connect(noiseGain.gain);
  wowOscillator.start();
  flutterOscillator.start();
  noiseSource.start();

  audioContext.audioWorklet
    .addModule(workletUrl)
    .then(() => {
      const degradeNode = new AudioWorkletNode(audioContext, "lofi-processor");
      wobbleDelay.disconnect(drivePreGain);
      wobbleDelay.connect(degradeNode);
      degradeNode.connect(drivePreGain);
      state.degradeNode = degradeNode;
      applyParameters();
    })
    .catch((error) =>
      console.error("Failed to load LoFi AudioWorklet:", error),
    );

  audioContext.audioWorklet
    .addModule(envelopeWorkletUrl)
    .then(() => {
      const envelopeNode = new AudioWorkletNode(
        audioContext,
        "lofi-envelope-processor",
        {
          numberOfInputs: 1,
          numberOfOutputs: 1,
          outputChannelCount: [1],
        },
      );
      inputNode.connect(envelopeNode);
      envelopeNode.connect(noiseEnvelopeAmount);
      state.envelopeNode = envelopeNode;
      applyParameters();
    })
    .catch((error) =>
      console.error("Failed to load LoFi envelope AudioWorklet:", error),
    );

  function applyParameters() {
    const parameters = state.parameters;
    const p = {
      mix: parameters.isOn ? clamp01(parameters.mix) : 0,
      banded: clamp01(parameters.banded),
      hi: clamp01(parameters.hi),
      drive: clamp01(parameters.drive) ** 3,
      noise: clamp01(parameters.noise),
      wobble: clamp01(parameters.wobble) ** 2 * 0.7,
      degrade: clamp01(parameters.degrade),
    };

    setSmoothValue(dryGain.gain, 1 - p.mix, audioContext);
    setSmoothValue(wetGain.gain, p.mix, audioContext);

    const highpassFrequency = mapExponential(p.banded, 35, 520);
    const lowpassFrequency = mapExponential(p.banded, 18000, 3200);
    const speakerGain = p.banded * 7;
    const speakerQ = mapLinear(p.banded, 0.7, 2.2);
    const hiGain = p.hi * 11;
    const hiFrequency = mapExponential(p.hi, 6500, 3200);
    const noiseAmount = p.noise ** 2 * 0.03;

    setSmoothValue(highpassFilter.frequency, highpassFrequency, audioContext);
    setSmoothValue(
      highpassFilter.Q,
      mapLinear(p.banded, 0.5, 0.9),
      audioContext,
    );
    setSmoothValue(lowpassFilter.frequency, lowpassFrequency, audioContext);
    setSmoothValue(
      lowpassFilter.Q,
      mapLinear(p.banded, 0.5, 1.2),
      audioContext,
    );
    setSmoothValue(
      speakerPeak.frequency,
      mapLinear(p.banded, 900, 1300),
      audioContext,
    );
    setSmoothValue(speakerPeak.Q, speakerQ, audioContext);
    setSmoothValue(speakerPeak.gain, speakerGain, audioContext);
    setSmoothValue(hiShelf.frequency, hiFrequency, audioContext);
    setSmoothValue(hiShelf.gain, hiGain, audioContext);
    setSmoothValue(
      noiseHighpass.frequency,
      mapExponential(p.noise, 2200, 6200),
      audioContext,
    );
    setSmoothValue(noiseEnvelopeAmount.gain, noiseAmount, audioContext);

    setSmoothValue(
      wobbleDelay.delayTime,
      0.001 + p.wobble * 0.0035,
      audioContext,
    );
    setSmoothValue(wowGain.gain, p.wobble * 0.00275, audioContext);
    setSmoothValue(flutterGain.gain, p.wobble * 0.0006, audioContext);

    setSmoothValue(drivePreGain.gain, 1 + p.drive * 1.5, audioContext);
    driveShaper.curve = makeSaturationCurve(p.drive);

    state.degradeNode?.parameters
      .get("degrade")
      ?.setTargetAtTime(p.degrade, audioContext.currentTime, 0.015);
  }

  applyParameters();

  return {
    inputNode,
    outputNode,
    setParameters(parameters: EffectParameters) {
      state.parameters = { ...parameters };
      applyParameters();
    },
  };
}
