import { EffectParameters } from "./definitions";
import workletUrl from "./noise-mix-processor?worker&url";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function mapExponential(value: number, min: number, max: number) {
  const normalized = clamp01(value);
  return min * (max / min) ** normalized;
}

function createWhiteNoiseBuffer(audioContext: AudioContext) {
  const bufferLength = audioContext.sampleRate * 4;
  const buffer = audioContext.createBuffer(1, bufferLength, audioContext.sampleRate);
  const samples = buffer.getChannelData(0);

  for (let i = 0; i < samples.length; i++) {
    samples[i] = Math.random() * 2 - 1;
  }

  return buffer;
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

export function createEffect(
  audioContext: AudioContext,
  initialParameters: EffectParameters,
) {
  const state = {
    parameters: { ...initialParameters },
    controlNode: null as AudioWorkletNode | null,
  };
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();
  const noiseSource = audioContext.createBufferSource();
  const noiseALpf = audioContext.createBiquadFilter();
  const noiseAGain = audioContext.createGain();
  const noiseAEnvelopeAmount = audioContext.createGain();
  const noiseBHpf = audioContext.createBiquadFilter();
  const noiseBGain = audioContext.createGain();
  const noiseBModulatorAmount = audioContext.createGain();

  noiseSource.buffer = createWhiteNoiseBuffer(audioContext);
  noiseSource.loop = true;
  noiseALpf.type = "lowpass";
  noiseALpf.Q.value = Math.SQRT1_2;
  noiseBHpf.type = "highpass";
  noiseBHpf.Q.value = Math.SQRT1_2;
  noiseAGain.gain.value = 0;
  noiseBGain.gain.value = 0;

  inputNode.connect(outputNode);
  noiseSource.connect(noiseALpf);
  noiseALpf.connect(noiseAGain);
  noiseAGain.connect(outputNode);
  noiseSource.connect(noiseBHpf);
  noiseBHpf.connect(noiseBGain);
  noiseBGain.connect(outputNode);
  noiseAEnvelopeAmount.connect(noiseAGain.gain);
  noiseBModulatorAmount.connect(noiseBGain.gain);
  noiseSource.start();

  audioContext.audioWorklet
    .addModule(workletUrl)
    .then(() => {
      const controlNode = new AudioWorkletNode(
        audioContext,
        "noise-mix-processor",
        {
          numberOfInputs: 1,
          numberOfOutputs: 2,
          outputChannelCount: [1, 1],
        },
      );

      inputNode.connect(controlNode);
      controlNode.connect(noiseAEnvelopeAmount, 0);
      controlNode.connect(noiseBModulatorAmount, 1);
      state.controlNode = controlNode;
      applyParameters();
    })
    .catch((error) =>
      console.error("Failed to load NoiseMix AudioWorklet:", error),
    );

  function applyParameters() {
    const parameters = state.parameters;
    const noiseALpfCutoff = mapExponential(
      parameters.noiseALpfCutoff,
      180,
      12000,
    );
    const noiseBHpfCutoff = mapExponential(
      parameters.noiseBHpfCutoff,
      400,
      12000,
    );
    const noiseAGainValue = parameters.noiseAOn
      ? clamp01(parameters.noiseAGain) ** 2 * 0.45
      : 0;
    const noiseBGainValue = parameters.noiseBOn
      ? clamp01(parameters.noiseBGain) ** 2 * 0.35
      : 0;

    setSmoothValue(noiseALpf.frequency, noiseALpfCutoff, audioContext);
    setSmoothValue(noiseBHpf.frequency, noiseBHpfCutoff, audioContext);
    setSmoothValue(noiseAEnvelopeAmount.gain, noiseAGainValue, audioContext);
    setSmoothValue(noiseBModulatorAmount.gain, noiseBGainValue, audioContext);

    const controlNode = state.controlNode;
    controlNode?.parameters
      .get("envAttack")
      ?.setTargetAtTime(
        clamp01(parameters.envAttack),
        audioContext.currentTime,
        0.015,
      );
    controlNode?.parameters
      .get("envRelease")
      ?.setTargetAtTime(
        clamp01(parameters.envRelease),
        audioContext.currentTime,
        0.015,
      );
    controlNode?.parameters
      .get("noiseBAbs")
      ?.setValueAtTime(parameters.noiseBAbs ? 1 : 0, audioContext.currentTime);
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
