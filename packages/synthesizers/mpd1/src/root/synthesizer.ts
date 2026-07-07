import { SynthParameters } from "@/root/synth-common";
import workletUrl from "./worklet?worker&url";

type WorkletParameterName =
  | "frequency"
  | "gate"
  | "wave"
  | "shape"
  | "detune2"
  | "pitchDrift";

type VoiceState = "idle" | "active" | "releasing";

type AmpEnvelopeState =
  | {
      type: "attackDecay";
      startedAt: number;
      attackSeconds: number;
      decaySeconds: number;
      sustain: number;
    }
  | {
      type: "release";
      startedAt: number;
      releaseSeconds: number;
      startGain: number;
    };

type Voice = {
  workletNode: AudioWorkletNode;
  gateParam: AudioParam;
  shapeParam: AudioParam;
  ampGainNode: GainNode;
  subGainNode: GainNode;
  subOscillator: OscillatorNode | undefined;
  noteNumber: number | null;
  state: VoiceState;
  startedAt: number;
  releasedAt: number;
  ampEnvelope: AmpEnvelopeState | undefined;
  idleTimerId: number | undefined;
};

const MAX_VOICES = 6;
const PARAM_SMOOTHING_SECONDS = 0.005;
const ATTACK_DECLICK_SECONDS = 0.005;
const RELEASE_DECLICK_SECONDS = 0.015;
const VOICE_STEAL_DECLICK_SECONDS = 0.005;
const GATE_CLOSE_MARGIN_SECONDS = 0.005;
const ACTIVE_STEAL_RESET_SECONDS = 0.001;
const RELEASE_IDLE_MARGIN_SECONDS = 0.1;
const SILENCE_GAIN = 0.0;
const MAX_ATTACK_SECONDS = 4.0;
const MAX_DECAY_SECONDS = 8.0;
const MAX_RELEASE_SECONDS = 4.0;
const MAX_TONE_FREQUENCY = 14000.0;
const MIN_TONE_FREQUENCY = 800.0;
const CHORUS_BASE_DELAY_SECONDS = 0.018;
const CHORUS_MOD_DEPTH_SECONDS = 0.006;
const VOICE_SUM_GAIN = 1.0 / Math.sqrt(MAX_VOICES * 2.0);

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function clamp01(value: number): number {
  return clamp(value, 0.0, 1.0);
}

function mapEnvelopeTime(value: number, maxSeconds: number): number {
  const normalized = clamp01(value);
  return normalized * normalized * maxSeconds;
}

function mapDecayTime(value: number, maxSeconds: number): number {
  const normalized = clamp01(value);
  return normalized * normalized * maxSeconds;
}

function midiNoteNumberToFrequency(noteNumber: number): number {
  return 440.0 * Math.pow(2.0, (noteNumber - 69) / 12.0);
}

function setParamAtTime(
  workletNode: AudioWorkletNode,
  name: WorkletParameterName,
  value: number,
  time: number,
  smooth: boolean,
) {
  const param = workletNode.parameters.get(name);
  if (!param) return;

  param.cancelScheduledValues(time);
  if (smooth) {
    param.setTargetAtTime(value, time, PARAM_SMOOTHING_SECONDS);
  } else {
    param.setValueAtTime(value, time);
  }
}

function setGateAtTime(param: AudioParam, value: number, time: number) {
  param.cancelScheduledValues(time);
  param.setValueAtTime(value, time);
}

function getAmpEnvelopeValueAtTime(
  envelope: AmpEnvelopeState | undefined,
  time: number,
): number {
  if (!envelope) return SILENCE_GAIN;

  const elapsed = Math.max(0.0, time - envelope.startedAt);
  if (envelope.type === "release") {
    if (elapsed >= envelope.releaseSeconds) return SILENCE_GAIN;
    return envelope.startGain * (1.0 - elapsed / envelope.releaseSeconds);
  }

  if (elapsed < envelope.attackSeconds) {
    return elapsed / envelope.attackSeconds;
  }

  const decayElapsed = elapsed - envelope.attackSeconds;
  if (decayElapsed < envelope.decaySeconds) {
    const decayProgress = decayElapsed / envelope.decaySeconds;
    return 1.0 + (envelope.sustain - 1.0) * decayProgress;
  }

  return envelope.sustain;
}

function getOscillatorType(value: number): OscillatorType {
  switch (Math.round(value)) {
    case 1:
      return "triangle";
    case 2:
      return "square";
    case 3:
      return "sawtooth";
    default:
      return "sine";
  }
}

export function createSynthesizer(
  audioContext: AudioContext,
  initialParameters: SynthParameters,
) {
  const state: {
    parameters: SynthParameters;
    voices: Voice[];
    activeVoices: Map<number, Voice>;
    workletLoaded: boolean;
    disposed: boolean;
  } = {
    parameters: { ...initialParameters },
    voices: [],
    activeVoices: new Map(),
    workletLoaded: false,
    disposed: false,
  };

  const outputNode = audioContext.createGain();
  const voiceSumGainNode = audioContext.createGain();
  const toneFilterNode = audioContext.createBiquadFilter();
  const chorusDryGainNode = audioContext.createGain();
  const chorusWetGainNode = audioContext.createGain();
  const chorusDelayNode = audioContext.createDelay(0.05);
  const chorusFeedbackGainNode = audioContext.createGain();
  const chorusLfoNode = audioContext.createOscillator();
  const chorusLfoGainNode = audioContext.createGain();

  voiceSumGainNode.gain.setValueAtTime(
    VOICE_SUM_GAIN,
    audioContext.currentTime,
  );
  toneFilterNode.type = "lowpass";
  toneFilterNode.Q.setValueAtTime(0.35, audioContext.currentTime);
  chorusDelayNode.delayTime.setValueAtTime(
    CHORUS_BASE_DELAY_SECONDS,
    audioContext.currentTime,
  );
  chorusLfoNode.frequency.setValueAtTime(0.33, audioContext.currentTime);
  chorusLfoNode.connect(chorusLfoGainNode);
  chorusLfoGainNode.connect(chorusDelayNode.delayTime);
  chorusLfoNode.start();

  voiceSumGainNode.connect(toneFilterNode);
  toneFilterNode.connect(chorusDryGainNode);
  toneFilterNode.connect(chorusDelayNode);
  chorusDelayNode.connect(chorusWetGainNode);
  chorusDelayNode.connect(chorusFeedbackGainNode);
  chorusFeedbackGainNode.connect(chorusDelayNode);
  chorusDryGainNode.connect(outputNode);
  chorusWetGainNode.connect(outputNode);

  function getReleaseSeconds(parameters: SynthParameters): number {
    return mapEnvelopeTime(parameters.ampRelease, MAX_RELEASE_SECONDS);
  }

  function applyGlobalParameters(parameters: SynthParameters, time: number) {
    const tone = clamp01(parameters.tone);
    const toneFrequency =
      MIN_TONE_FREQUENCY *
      Math.pow(MAX_TONE_FREQUENCY / MIN_TONE_FREQUENCY, tone);
    const chorus = clamp01(parameters.chorus);

    toneFilterNode.frequency.setTargetAtTime(
      toneFrequency,
      time,
      PARAM_SMOOTHING_SECONDS,
    );
    chorusDryGainNode.gain.setTargetAtTime(
      1.0 - chorus * 0.35,
      time,
      PARAM_SMOOTHING_SECONDS,
    );
    chorusWetGainNode.gain.setTargetAtTime(
      chorus * 0.65,
      time,
      PARAM_SMOOTHING_SECONDS,
    );
    chorusFeedbackGainNode.gain.setTargetAtTime(
      chorus * 0.22,
      time,
      PARAM_SMOOTHING_SECONDS,
    );
    chorusLfoGainNode.gain.setTargetAtTime(
      chorus * CHORUS_MOD_DEPTH_SECONDS,
      time,
      PARAM_SMOOTHING_SECONDS,
    );
    outputNode.gain.setTargetAtTime(
      clamp01(parameters.outputVolume),
      time,
      PARAM_SMOOTHING_SECONDS,
    );
  }

  function applyWorkletParameters(
    voice: Voice,
    parameters: SynthParameters,
    time: number,
    smooth: boolean,
  ) {
    setParamAtTime(
      voice.workletNode,
      "wave",
      clamp(parameters.wave, 0, 7),
      time,
      smooth,
    );
    setParamAtTime(
      voice.workletNode,
      "detune2",
      clamp01(parameters.detune2),
      time,
      smooth,
    );
    setParamAtTime(
      voice.workletNode,
      "pitchDrift",
      clamp01(parameters.pitchDrift),
      time,
      smooth,
    );
  }

  function scheduleShapeEnvelope(
    voice: Voice,
    parameters: SynthParameters,
    time: number,
  ) {
    const topShape = clamp01(parameters.shape);
    const bottomShape = topShape * (1.0 - clamp01(parameters.shapeModAmount));
    const attackSeconds = mapEnvelopeTime(
      parameters.shapeEgAttack,
      MAX_ATTACK_SECONDS,
    );
    const holdsAtTop = parameters.shapeEgDecay >= 1.0;
    const decaySeconds = holdsAtTop
      ? 0.0
      : mapDecayTime(parameters.shapeEgDecay, MAX_DECAY_SECONDS);
    const attackEndTime = time + attackSeconds;

    voice.shapeParam.cancelScheduledValues(time);
    voice.shapeParam.setValueAtTime(
      attackSeconds > 0.0 ? bottomShape : topShape,
      time,
    );
    if (attackSeconds > 0.0) {
      voice.shapeParam.linearRampToValueAtTime(topShape, attackEndTime);
    }
    if (!holdsAtTop) {
      voice.shapeParam.linearRampToValueAtTime(
        bottomShape,
        attackEndTime + decaySeconds,
      );
    }
  }

  function scheduleAmpEnvelope(
    voice: Voice,
    parameters: SynthParameters,
    time: number,
  ) {
    const attackSeconds = Math.max(
      mapEnvelopeTime(parameters.ampAttack, MAX_ATTACK_SECONDS),
      ATTACK_DECLICK_SECONDS,
    );
    const decaySeconds = mapDecayTime(parameters.ampDecay, MAX_DECAY_SECONDS);
    const sustain = clamp01(parameters.ampSustain);
    const attackEndTime = time + attackSeconds;

    voice.ampEnvelope = {
      type: "attackDecay",
      startedAt: time,
      attackSeconds,
      decaySeconds,
      sustain,
    };
    voice.ampGainNode.gain.cancelScheduledValues(time);
    voice.ampGainNode.gain.setValueAtTime(SILENCE_GAIN, time);
    voice.ampGainNode.gain.linearRampToValueAtTime(1.0, attackEndTime);
    voice.ampGainNode.gain.linearRampToValueAtTime(
      sustain,
      attackEndTime + decaySeconds,
    );
  }

  function clearIdleTimer(voice: Voice) {
    if (voice.idleTimerId === undefined) return;
    window.clearTimeout(voice.idleTimerId);
    voice.idleTimerId = undefined;
  }

  function stopSubOscillator(voice: Voice, time: number) {
    if (!voice.subOscillator) return;

    voice.subOscillator.stop(time);
    voice.subOscillator.disconnect();
    voice.subOscillator = undefined;
  }

  function scheduleIdle(voice: Voice, releasedAt: number) {
    clearIdleTimer(voice);
    const idleAt =
      releasedAt +
      getReleaseSeconds(state.parameters) +
      RELEASE_IDLE_MARGIN_SECONDS;
    const delaySeconds = Math.max(0.0, idleAt - audioContext.currentTime);

    voice.idleTimerId = window.setTimeout(() => {
      if (voice.state === "releasing") {
        voice.state = "idle";
        voice.noteNumber = null;
        voice.ampEnvelope = undefined;
      }
      voice.idleTimerId = undefined;
    }, delaySeconds * 1000);
  }

  function createVoice(): Voice {
    const workletNode = new AudioWorkletNode(audioContext, "mpd1-processor", {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [2],
    });
    const gateParam = workletNode.parameters.get("gate");
    const shapeParam = workletNode.parameters.get("shape");
    if (!gateParam || !shapeParam) {
      throw new Error("mpd1-processor is missing a required parameter");
    }

    const ampGainNode = audioContext.createGain();
    const subGainNode = audioContext.createGain();
    const now = audioContext.currentTime;

    gateParam.setValueAtTime(0.0, now);
    ampGainNode.gain.setValueAtTime(SILENCE_GAIN, now);
    subGainNode.gain.setValueAtTime(0.0, now);
    workletNode.connect(ampGainNode);
    subGainNode.connect(ampGainNode);
    ampGainNode.connect(voiceSumGainNode);

    const voice: Voice = {
      workletNode,
      gateParam,
      shapeParam,
      ampGainNode,
      subGainNode,
      subOscillator: undefined,
      noteNumber: null,
      state: "idle",
      startedAt: 0.0,
      releasedAt: 0.0,
      ampEnvelope: undefined,
      idleTimerId: undefined,
    };
    applyWorkletParameters(voice, state.parameters, now, false);
    setParamAtTime(workletNode, "frequency", 440.0, now, false);

    return voice;
  }

  function initializeVoices() {
    if (state.disposed || state.workletLoaded) return;
    state.voices = Array.from({ length: MAX_VOICES }, () => createVoice());
    state.workletLoaded = true;
  }

  audioContext.audioWorklet
    .addModule(workletUrl)
    .then(initializeVoices)
    .catch((error) =>
      console.error("Failed to load MPD1 AudioWorklet:", error),
    );

  function pickVoice(): Voice | undefined {
    const idleVoice = state.voices.find((voice) => voice.state === "idle");
    if (idleVoice) return idleVoice;

    const releasingVoice = state.voices
      .filter((voice) => voice.state === "releasing")
      .sort((a, b) => a.releasedAt - b.releasedAt)[0];
    if (releasingVoice) return releasingVoice;

    return state.voices
      .filter((voice) => voice.state === "active")
      .sort((a, b) => a.startedAt - b.startedAt)[0];
  }

  function releaseVoice(voice: Voice, time: number) {
    const targetTime = Math.max(time, audioContext.currentTime);
    const releaseSeconds = Math.max(
      getReleaseSeconds(state.parameters),
      RELEASE_DECLICK_SECONDS,
    );
    const finishTime = targetTime + releaseSeconds;
    const gateCloseTime = finishTime + GATE_CLOSE_MARGIN_SECONDS;
    const startGain = getAmpEnvelopeValueAtTime(voice.ampEnvelope, targetTime);

    voice.gateParam.cancelScheduledValues(targetTime);
    voice.gateParam.setValueAtTime(1.0, targetTime);
    voice.gateParam.setValueAtTime(0.0, gateCloseTime);
    voice.ampGainNode.gain.cancelScheduledValues(targetTime);
    voice.ampGainNode.gain.setValueAtTime(startGain, targetTime);
    voice.ampGainNode.gain.linearRampToValueAtTime(SILENCE_GAIN, finishTime);
    if (voice.subOscillator) {
      const subOscillator = voice.subOscillator;
      subOscillator.stop(gateCloseTime + 0.02);
      subOscillator.onended = () => subOscillator.disconnect();
      voice.subOscillator = undefined;
    }

    voice.state = "releasing";
    voice.releasedAt = targetTime;
    voice.ampEnvelope = {
      type: "release",
      startedAt: targetTime,
      releaseSeconds,
      startGain,
    };
    scheduleIdle(voice, targetTime);

    if (
      voice.noteNumber !== null &&
      state.activeVoices.get(voice.noteNumber) === voice
    ) {
      state.activeVoices.delete(voice.noteNumber);
    }
  }

  function prepareVoiceForNoteOn(voice: Voice, time: number): number {
    const targetTime = Math.max(time, audioContext.currentTime);

    if (voice.state === "idle") {
      if (voice.subOscillator) {
        stopSubOscillator(voice, targetTime);
      }
      setGateAtTime(voice.gateParam, 0.0, targetTime);
      voice.ampGainNode.gain.cancelScheduledValues(targetTime);
      voice.ampGainNode.gain.setValueAtTime(SILENCE_GAIN, targetTime);
      voice.ampEnvelope = undefined;
      return targetTime;
    }

    const fadeEndTime = targetTime + VOICE_STEAL_DECLICK_SECONDS;
    const gateCloseTime = fadeEndTime + GATE_CLOSE_MARGIN_SECONDS;
    const startTime = gateCloseTime + ACTIVE_STEAL_RESET_SECONDS;
    const startGain = getAmpEnvelopeValueAtTime(voice.ampEnvelope, targetTime);

    voice.gateParam.cancelScheduledValues(targetTime);
    voice.gateParam.setValueAtTime(1.0, targetTime);
    voice.gateParam.setValueAtTime(0.0, gateCloseTime);
    voice.ampGainNode.gain.cancelScheduledValues(targetTime);
    voice.ampGainNode.gain.setValueAtTime(startGain, targetTime);
    voice.ampGainNode.gain.linearRampToValueAtTime(SILENCE_GAIN, fadeEndTime);
    voice.ampGainNode.gain.setValueAtTime(SILENCE_GAIN, startTime);
    voice.ampEnvelope = {
      type: "release",
      startedAt: targetTime,
      releaseSeconds: VOICE_STEAL_DECLICK_SECONDS,
      startGain,
    };

    if (voice.subOscillator) {
      const subOscillator = voice.subOscillator;
      subOscillator.stop(gateCloseTime);
      subOscillator.onended = () => subOscillator.disconnect();
      voice.subOscillator = undefined;
    }

    return startTime;
  }

  applyGlobalParameters(state.parameters, audioContext.currentTime);

  return {
    outputNode,
    setParameters(parameters: SynthParameters) {
      state.parameters = { ...parameters };
      const now = audioContext.currentTime;

      applyGlobalParameters(state.parameters, now);
      state.voices.forEach((voice) => {
        if (voice.state !== "idle") {
          applyWorkletParameters(voice, state.parameters, now, true);
          voice.subGainNode.gain.setTargetAtTime(
            clamp01(state.parameters.subOscVolume),
            now,
            PARAM_SMOOTHING_SECONDS,
          );
          if (voice.subOscillator) {
            voice.subOscillator.type = getOscillatorType(
              state.parameters.subOscWave,
            );
          }
        }
        if (voice.state === "releasing") {
          scheduleIdle(voice, voice.releasedAt);
        }
      });
    },
    noteOn(noteNumber: number, time: number) {
      if (!state.workletLoaded) return;

      const existingVoice = state.activeVoices.get(noteNumber);
      if (existingVoice) {
        releaseVoice(existingVoice, time);
      }

      const voice = pickVoice();
      if (!voice) return;

      clearIdleTimer(voice);
      if (voice.noteNumber !== null) {
        state.activeVoices.delete(voice.noteNumber);
      }
      const targetTime = prepareVoiceForNoteOn(voice, time);

      const parameters = state.parameters;
      const octaveNoteNumber = noteNumber + parameters.octave * 12;
      const frequency = midiNoteNumberToFrequency(octaveNoteNumber);
      const subOscillator = audioContext.createOscillator();

      subOscillator.type = getOscillatorType(parameters.subOscWave);
      subOscillator.frequency.setValueAtTime(frequency * 0.5, targetTime);
      subOscillator.connect(voice.subGainNode);
      subOscillator.start(targetTime);
      voice.subOscillator = subOscillator;

      voice.subGainNode.gain.cancelScheduledValues(targetTime);
      voice.subGainNode.gain.setValueAtTime(
        clamp01(parameters.subOscVolume),
        targetTime,
      );
      setParamAtTime(
        voice.workletNode,
        "frequency",
        frequency,
        targetTime,
        false,
      );
      applyWorkletParameters(voice, parameters, targetTime, false);
      scheduleShapeEnvelope(voice, parameters, targetTime);
      scheduleAmpEnvelope(voice, parameters, targetTime);
      setGateAtTime(voice.gateParam, 1.0, targetTime);

      voice.noteNumber = noteNumber;
      voice.state = "active";
      voice.startedAt = targetTime;
      voice.releasedAt = 0.0;
      state.activeVoices.set(noteNumber, voice);
    },
    noteOff(noteNumber: number, time: number) {
      const voice = state.activeVoices.get(noteNumber);
      if (!voice) return;

      releaseVoice(voice, time);
    },
    cleanup() {
      state.disposed = true;
      state.activeVoices.clear();
      state.voices.forEach((voice) => {
        clearIdleTimer(voice);
        if (voice.subOscillator) {
          stopSubOscillator(voice, audioContext.currentTime);
        }
        voice.workletNode.port.postMessage({ type: "stop" });
        voice.workletNode.disconnect();
        voice.workletNode.port.close();
        voice.ampGainNode.disconnect();
        voice.subGainNode.disconnect();
      });
      state.voices = [];
      chorusLfoNode.stop();
      chorusLfoNode.disconnect();
      chorusLfoGainNode.disconnect();
      voiceSumGainNode.disconnect();
      toneFilterNode.disconnect();
      chorusDryGainNode.disconnect();
      chorusWetGainNode.disconnect();
      chorusDelayNode.disconnect();
      chorusFeedbackGainNode.disconnect();
      outputNode.disconnect();
    },
  };
}
