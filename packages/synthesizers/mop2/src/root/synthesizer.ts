import { SynthParameters } from "@/root/synth-common";
import workletUrl from "./worklet?worker&url";

const MAX_VOICES = 6;
const PARAM_SMOOTHING_SECONDS = 0.005;
const ACTIVE_STEAL_RESET_SECONDS = 0.001;
const RELEASE_IDLE_MARGIN_SECONDS = 0.1;
const MAX_ATTACK_SECONDS = 4.0;
const MAX_DECAY_SECONDS = 10.0;
const MAX_RELEASE_SECONDS = 4.0;

type WorkletParameterName =
  | "frequency"
  | "gate"
  | "op1Ratio"
  | "op1ModEgSpeedRate"
  | "op1ModAmount"
  | "op1Volume"
  | "op2Ratio"
  | "op2ModEgSpeedRate"
  | "op2ModAmount"
  | "op2Volume"
  | "ampEgAttack"
  | "ampEgDecay"
  | "ampEgSustain"
  | "ampEgRelease";

type VoiceState = "idle" | "active" | "releasing";

type Voice = {
  workletNode: AudioWorkletNode;
  gateParam: AudioParam;
  noteNumber: number | null;
  state: VoiceState;
  startedAt: number;
  releasedAt: number;
  idleTimerId: number | undefined;
};

type MappedWorkletParameters = Omit<
  Record<WorkletParameterName, number>,
  "frequency" | "gate"
>;

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

function mapDecayTime(value: number): number {
  const remaining = clamp01(value);
  return remaining ** 2 * MAX_DECAY_SECONDS;
}

function mapModEgSpeedRate(value: number): number {
  return Math.pow(2.0, (clamp01(value) - 0.5) * 4.0);
}

function midiNoteNumberToFrequency(noteNumber: number): number {
  return 440.0 * Math.pow(2.0, (noteNumber - 69) / 12.0);
}

function mapParameters(parameters: SynthParameters): MappedWorkletParameters {
  const sustain = parameters.egDecay >= 1.0 ? 1.0 : 0.0;

  return {
    op1Ratio: Math.max(0.0, parameters.op1Ratio),
    op1ModEgSpeedRate: mapModEgSpeedRate(parameters.op1ModSpeed),
    op1ModAmount: clamp01(parameters.op1Mod),
    op1Volume: clamp01(parameters.op1Volume),
    op2Ratio: Math.max(0.0, parameters.op2Ratio),
    op2ModEgSpeedRate: mapModEgSpeedRate(parameters.op2ModSpeed),
    op2ModAmount: clamp01(parameters.op2Mod),
    op2Volume: clamp01(parameters.op2Volume),
    ampEgAttack: mapEnvelopeTime(parameters.egAttack, MAX_ATTACK_SECONDS),
    ampEgDecay: sustain === 1.0 ? 0.0 : mapDecayTime(parameters.egDecay),
    ampEgSustain: sustain,
    ampEgRelease: mapEnvelopeTime(parameters.egRelease, MAX_RELEASE_SECONDS),
  };
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

  if (smooth) {
    param.setTargetAtTime(value, time, PARAM_SMOOTHING_SECONDS);
  } else {
    param.setValueAtTime(value, time);
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

  function applyParametersToVoice(
    voice: Voice,
    parameters: SynthParameters,
    time: number,
    smooth: boolean,
  ) {
    const mappedParameters = mapParameters(parameters);
    (
      Object.entries(mappedParameters) as Array<
        [keyof MappedWorkletParameters, number]
      >
    ).forEach(([key, value]) => {
      setParamAtTime(voice.workletNode, key, value, time, smooth);
    });
  }

  function clearIdleTimer(voice: Voice) {
    if (voice.idleTimerId === undefined) return;
    window.clearTimeout(voice.idleTimerId);
    voice.idleTimerId = undefined;
  }

  function scheduleIdle(voice: Voice, releasedAt: number) {
    clearIdleTimer(voice);
    const releaseSeconds = mapParameters(state.parameters).ampEgRelease;
    const idleAt = releasedAt + releaseSeconds + RELEASE_IDLE_MARGIN_SECONDS;
    const delaySeconds = Math.max(0.0, idleAt - audioContext.currentTime);

    voice.idleTimerId = window.setTimeout(() => {
      if (voice.state === "releasing") {
        voice.state = "idle";
        voice.noteNumber = null;
      }
      voice.idleTimerId = undefined;
    }, delaySeconds * 1000);
  }

  function createVoice(): Voice {
    const workletNode = new AudioWorkletNode(audioContext, "synth-processor", {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [2],
    });
    const gateParam = workletNode.parameters.get("gate");
    if (!gateParam) {
      throw new Error("synth-processor is missing the gate parameter");
    }

    const now = audioContext.currentTime;
    gateParam.setValueAtTime(0.0, now);
    setParamAtTime(workletNode, "frequency", 440.0, now, false);
    workletNode.connect(outputNode);

    const voice: Voice = {
      workletNode,
      gateParam,
      noteNumber: null,
      state: "idle",
      startedAt: 0.0,
      releasedAt: 0.0,
      idleTimerId: undefined,
    };
    applyParametersToVoice(voice, state.parameters, now, false);

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
      console.error("Failed to load MOP2 AudioWorklet:", error),
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
    voice.gateParam.setValueAtTime(0.0, targetTime);
    voice.state = "releasing";
    voice.releasedAt = targetTime;
    scheduleIdle(voice, targetTime);

    if (
      voice.noteNumber !== null &&
      state.activeVoices.get(voice.noteNumber) === voice
    ) {
      state.activeVoices.delete(voice.noteNumber);
    }
  }

  return {
    outputNode,
    setParameters(parameters: SynthParameters) {
      state.parameters = { ...parameters };
      const now = audioContext.currentTime;

      state.voices.forEach((voice) => {
        if (voice.state !== "idle") {
          applyParametersToVoice(voice, state.parameters, now, true);
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

      let targetTime = Math.max(time, audioContext.currentTime);
      if (voice.state === "active" || voice === existingVoice) {
        voice.gateParam.setValueAtTime(0.0, targetTime);
        targetTime += ACTIVE_STEAL_RESET_SECONDS;
      }

      const octaveNoteNumber = noteNumber + state.parameters.octave * 12;
      setParamAtTime(
        voice.workletNode,
        "frequency",
        midiNoteNumberToFrequency(octaveNoteNumber),
        targetTime,
        false,
      );
      applyParametersToVoice(voice, state.parameters, targetTime, false);
      voice.gateParam.setValueAtTime(1.0, targetTime);

      voice.noteNumber = noteNumber;
      voice.state = "active";
      voice.startedAt = targetTime;
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
        voice.workletNode.port.postMessage({ type: "stop" });
        voice.workletNode.disconnect();
        voice.workletNode.port.close();
      });
      state.voices = [];
    },
  };
}
