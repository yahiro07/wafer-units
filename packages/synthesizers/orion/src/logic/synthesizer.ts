import { UnitInterface } from "wafer-host/unit-types";
import workletUrl from "./worklet?worker&url";
import lofiWorkletUrl from "./lofi-worklet?worker&url";
import { createEffectChain, EffectChain } from "@/logic/effect-chain";
import { defaultSynthParameters, SynthParameters } from "@/defs/definitions";
import { midiToFrequency } from "@/logic/synth-math-utils";

const MAX_VOICES = 4;
const ACTIVE_STEAL_RESET_SECONDS = 0.001;
const RELEASE_IDLE_MARGIN_SECONDS = 0.1;
const PARAM_SMOOTHING_SECONDS = 0.005;

type VoiceState = "idle" | "active" | "releasing";

type Voice = {
  readonly noteNumber: number | null;
  readonly state: VoiceState;
  readonly startedAt: number;
  readonly releasedAt: number;
  noteOn(noteNumber: number, time?: number): void;
  noteOff(time?: number): void;
  applyParametersToNodes(): void;
  cleanup(): void;
};

type ISynthesizer = {
  setParameters(params: SynthParameters): void;
  noteOn(noteNumber: number, time?: number): void;
  noteOff(noteNumber: number, time?: number): void;
  cleanup(): void;
  setBpm(bpm: number): void;
};

function createVoice(
  audioCtx: AudioContext,
  mainOutputNode: GainNode,
  synthParameters: SynthParameters,
): Voice {
  if (!audioCtx || !mainOutputNode) {
    throw new Error("Audio context is not initialized");
  }

  const workletNode = new AudioWorkletNode(audioCtx, "synth-processor", {
    numberOfInputs: 0,
    numberOfOutputs: 1,
    outputChannelCount: [1],
  });
  const gateParam = workletNode.parameters.get("gate");
  if (!gateParam) {
    throw new Error("synth-processor is missing the gate parameter");
  }

  let noteNumber: number | null = null;
  let state: VoiceState = "idle";
  let startedAt = 0;
  let releasedAt = 0;
  let idleTimerId: number | undefined;

  const now = audioCtx.currentTime;
  gateParam.setValueAtTime(0.0, now);
  workletNode.connect(mainOutputNode);

  const internal = {
    resolveTime(time?: number) {
      return time && time > audioCtx.currentTime ? time : audioCtx.currentTime;
    },

    setParamAtTime(key: string, value: number, time: number, smooth: boolean) {
      const param = workletNode.parameters.get(key);
      if (!param) return;

      if (smooth) {
        param.setTargetAtTime(value, time, PARAM_SMOOTHING_SECONDS);
      } else {
        param.setValueAtTime(value, time);
      }
    },

    applyVoiceParameters(time: number, smooth: boolean) {
      (Object.keys(synthParameters) as Array<keyof SynthParameters>).forEach(
        (key) => {
          if (
            key === "chorus" ||
            key === "delay" ||
            key === "reverb" ||
            key === "master" ||
            key === "loFi"
          ) {
            return;
          }
          const value = synthParameters[key];
          internal.setParamAtTime(
            key,
            typeof value === "boolean" ? (value ? 1 : 0) : value,
            time,
            smooth,
          );
        },
      );
    },

    clearIdleTimer() {
      if (idleTimerId === undefined) return;
      window.clearTimeout(idleTimerId);
      idleTimerId = undefined;
    },

    scheduleIdle(releasedAtTime: number) {
      internal.clearIdleTimer();
      const releaseSeconds = Math.max(0.01, synthParameters.release);
      const idleAt =
        releasedAtTime + releaseSeconds * 10 + RELEASE_IDLE_MARGIN_SECONDS;
      const delaySeconds = Math.max(0, idleAt - audioCtx.currentTime);

      idleTimerId = window.setTimeout(() => {
        if (state === "releasing") {
          state = "idle";
          noteNumber = null;
        }
        idleTimerId = undefined;
      }, delaySeconds * 1000);
    },

    prepareGateEdge(time: number) {
      if (state === "idle") return time;

      // Force a gate edge so the worklet envelope retriggers cleanly.
      gateParam.setValueAtTime(0.0, time);
      return time + ACTIVE_STEAL_RESET_SECONDS;
    },

    startNote(targetNoteNumber: number, time: number) {
      internal.clearIdleTimer();

      const targetTime = internal.prepareGateEdge(time);
      internal.setParamAtTime(
        "frequency",
        midiToFrequency(targetNoteNumber),
        targetTime,
        false,
      );
      internal.applyVoiceParameters(targetTime, false);
      gateParam.setValueAtTime(1.0, targetTime);

      noteNumber = targetNoteNumber;
      state = "active";
      startedAt = targetTime;
    },

    releaseNote(time: number) {
      const targetTime = Math.max(time, audioCtx.currentTime);
      gateParam.setValueAtTime(0.0, targetTime);
      state = "releasing";
      releasedAt = targetTime;
      internal.scheduleIdle(targetTime);
    },
  };

  internal.setParamAtTime("frequency", 440.0, now, false);
  internal.applyVoiceParameters(now, false);

  return {
    get noteNumber() {
      return noteNumber;
    },
    get state() {
      return state;
    },
    get startedAt() {
      return startedAt;
    },
    get releasedAt() {
      return releasedAt;
    },

    noteOn(targetNoteNumber, time) {
      internal.startNote(targetNoteNumber, internal.resolveTime(time));
    },

    noteOff(time) {
      if (state !== "active") return;
      internal.releaseNote(internal.resolveTime(time));
      noteNumber = null;
    },

    applyParametersToNodes() {
      internal.applyVoiceParameters(audioCtx.currentTime, true);
      if (state === "releasing") {
        internal.scheduleIdle(releasedAt);
      }
    },

    cleanup() {
      internal.clearIdleTimer();
      workletNode.port.postMessage({ type: "stop" });
      try {
        workletNode.disconnect();
      } finally {
        workletNode.port.close();
      }
      noteNumber = null;
      state = "idle";
    },
  };
}

function pickVoice(voices: Voice[]): Voice | undefined {
  const idleVoice = voices.find((voice) => voice.state === "idle");
  if (idleVoice) return idleVoice;

  const releasingVoice = voices
    .filter((voice) => voice.state === "releasing")
    .sort((a, b) => a.releasedAt - b.releasedAt)[0];
  if (releasingVoice) return releasingVoice;

  return voices
    .filter((voice) => voice.state === "active")
    .sort((a, b) => a.startedAt - b.startedAt)[0];
}

export function createSynthesizerEngine(
  unitInterface: UnitInterface | undefined,
): ISynthesizer {
  const audioCtx = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioCtx.destination;

  const synthParameters: SynthParameters = { ...defaultSynthParameters };

  const mainOutputNode = audioCtx.createGain();
  mainOutputNode.gain.setValueAtTime(
    synthParameters.master,
    audioCtx.currentTime,
  );

  let effectChain: EffectChain | undefined;
  let voices: Voice[] = [];
  const activeVoices = new Map<number, Voice>();
  let disposed = false;

  async function init(): Promise<void> {
    await Promise.all([
      audioCtx.audioWorklet.addModule(workletUrl),
      audioCtx.audioWorklet.addModule(lofiWorkletUrl),
    ]);
    if (disposed) return;
    effectChain = createEffectChain(audioCtx);
    mainOutputNode.connect(effectChain.inputNode);
    effectChain.outputNode.connect(destinationNode);
    effectChain.updateParameters({
      loFi: synthParameters.loFi,
      chorus: synthParameters.chorus,
      delay: synthParameters.delay,
      reverb: synthParameters.reverb,
    });
    voices = Array.from({ length: MAX_VOICES }, () =>
      createVoice(audioCtx, mainOutputNode, synthParameters),
    );
  }
  void init();

  return {
    setParameters(params) {
      Object.assign(synthParameters, params);

      const now = audioCtx.currentTime;
      mainOutputNode.gain.setTargetAtTime(
        synthParameters.master * 0.7,
        now,
        PARAM_SMOOTHING_SECONDS,
      );
      voices.forEach((voice) => {
        voice.applyParametersToNodes();
      });
      effectChain?.updateParameters({
        loFi: synthParameters.loFi,
        chorus: synthParameters.chorus,
        delay: synthParameters.delay,
        reverb: synthParameters.reverb,
      });
    },

    noteOn(noteNumber, time) {
      if (voices.length === 0) {
        console.warn(
          "SynthEngine is not initialized. Call init() before using the engine.",
        );
        return;
      }

      const targetTime = time ?? audioCtx.currentTime;
      const existingVoice = activeVoices.get(noteNumber);
      if (existingVoice) {
        existingVoice.noteOff(targetTime);
        activeVoices.delete(noteNumber);
      }

      const voice = pickVoice(voices);
      if (!voice) return;

      if (
        voice.noteNumber !== null &&
        activeVoices.get(voice.noteNumber) === voice
      ) {
        activeVoices.delete(voice.noteNumber);
      }

      voice.noteOn(noteNumber, targetTime);
      activeVoices.set(noteNumber, voice);
    },

    noteOff(noteNumber, time) {
      const voice = activeVoices.get(noteNumber);
      if (!voice) return;
      voice.noteOff(time);
      if (activeVoices.get(noteNumber) === voice) {
        activeVoices.delete(noteNumber);
      }
    },

    setBpm(bpm) {
      effectChain?.setBpm(bpm);
    },

    cleanup() {
      disposed = true;
      activeVoices.clear();
      voices.forEach((voice) => {
        voice.cleanup();
      });
      voices = [];
      effectChain?.cleanup();
      effectChain = undefined;
      mainOutputNode.disconnect();
    },
  };
}
