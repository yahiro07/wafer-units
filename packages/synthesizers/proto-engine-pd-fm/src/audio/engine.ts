import { queryUnitInterfaceForModule } from "wafer-host/unit-types";
import { createEffectChain } from "@/audio/effect-chain";
import { defaultParams, SynthParameters } from "../state";
import workletUrl from "./worklet?worker&url";

export const unitInterface = queryUnitInterfaceForModule(
  "wafer-v01",
  import.meta.url,
);

const midiNoteNumberToFrequency = (note: number): number =>
  440.0 * Math.pow(2.0, (note - 69) / 12.0);

const MAX_VOICES = 4;
const ACTIVE_STEAL_RESET_SECONDS = 0.001;
const RELEASE_IDLE_MARGIN_SECONDS = 0.1;
const PARAM_SMOOTHING_SECONDS = 0.005;

type VoiceState = "idle" | "active" | "releasing";

interface Voice {
  workletNode: AudioWorkletNode;
  gateParam: AudioParam;
  noteNumber: number | null;
  state: VoiceState;
  startedAt: number;
  releasedAt: number;
  idleTimerId?: number;
}

type EngineApi = {
  init(): Promise<void>;
  resumeIfNeeded(): Promise<void>;
  setParameter<K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ): void;
  setAllParameters(params: SynthParameters): void;
  noteOn(noteNumber: number, time?: number): void;
  noteOff(noteNumber: number, time?: number): void;
  getNumActiveNotes(): number;
  cleanup(): void;
};

export function createSynthEngine(): EngineApi {
  let audioCtx: AudioContext | null = null;
  let mainOutputNode: GainNode | null = null;
  let effectChain: ReturnType<typeof createEffectChain> | undefined;
  let voices: Voice[] = [];

  const activeVoices = new Map<number, Voice>();
  const synthParameters: SynthParameters = { ...defaultParams };

  function setParamAtTime(
    workletNode: AudioWorkletNode,
    key: string,
    value: number,
    time: number,
    smooth: boolean,
  ) {
    const param = workletNode.parameters.get(key);
    if (!param) return;

    if (smooth) {
      param.setTargetAtTime(value, time, PARAM_SMOOTHING_SECONDS);
    } else {
      param.setValueAtTime(value, time);
    }
  }

  function applyParametersToVoice(
    voice: Voice,
    params: SynthParameters,
    time: number,
    smooth: boolean,
  ) {
    (Object.keys(params) as Array<keyof SynthParameters>).forEach((key) => {
      if (
        key === "chorus" ||
        key === "delay" ||
        key === "reverb" ||
        key === "master"
      ) {
        return;
      }
      setParamAtTime(voice.workletNode, key, params[key], time, smooth);
    });
  }

  function clearIdleTimer(voice: Voice) {
    if (voice.idleTimerId === undefined) return;
    window.clearTimeout(voice.idleTimerId);
    voice.idleTimerId = undefined;
  }

  function scheduleIdle(voice: Voice, releasedAt: number) {
    if (!audioCtx) return;

    clearIdleTimer(voice);
    const releaseSeconds = Math.max(0.01, synthParameters.release);
    const idleAt = releasedAt + releaseSeconds * 10 + RELEASE_IDLE_MARGIN_SECONDS;
    const delaySeconds = Math.max(0, idleAt - audioCtx.currentTime);

    voice.idleTimerId = window.setTimeout(() => {
      if (voice.state === "releasing") {
        voice.state = "idle";
        voice.noteNumber = null;
      }
      voice.idleTimerId = undefined;
    }, delaySeconds * 1000);
  }

  function createVoice(): Voice {
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

    const now = audioCtx.currentTime;
    gateParam.setValueAtTime(0.0, now);
    setParamAtTime(workletNode, "frequency", 440.0, now, false);
    workletNode.connect(mainOutputNode);

    const voice: Voice = {
      workletNode,
      gateParam,
      noteNumber: null,
      state: "idle",
      startedAt: 0,
      releasedAt: 0,
      idleTimerId: undefined,
    };
    applyParametersToVoice(voice, synthParameters, now, false);

    return voice;
  }

  function pickVoice(): Voice | undefined {
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

  function releaseVoice(voice: Voice, time: number) {
    if (!audioCtx) return;

    const targetTime = Math.max(time, audioCtx.currentTime);
    voice.gateParam.setValueAtTime(0.0, targetTime);
    voice.state = "releasing";
    voice.releasedAt = targetTime;
    scheduleIdle(voice, targetTime);

    if (
      voice.noteNumber !== null &&
      activeVoices.get(voice.noteNumber) === voice
    ) {
      activeVoices.delete(voice.noteNumber);
    }
  }

  async function init(): Promise<void> {
    if (audioCtx) return;

    audioCtx =
      unitInterface?.audioContext ||
      new (window.AudioContext || (window as any).webkitAudioContext)();

    const audioDestination =
      unitInterface?.audioOutputNode ?? audioCtx.destination;

    await audioCtx.audioWorklet.addModule(workletUrl);

    mainOutputNode = audioCtx.createGain();
    mainOutputNode.gain.setValueAtTime(
      synthParameters.master,
      audioCtx.currentTime,
    );

    effectChain = createEffectChain(audioCtx);
    mainOutputNode.connect(effectChain.inputNode);
    effectChain.outputNode.connect(audioDestination);

    voices = Array.from({ length: MAX_VOICES }, () => createVoice());
  }

  function updateVoiceParameter(key: keyof SynthParameters, value: number) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    voices.forEach((voice) => {
      if (voice.state === "idle") return;
      setParamAtTime(voice.workletNode, key, value, now, true);
    });
  }

  function updateEffectParameter(key: keyof SynthParameters, value: number) {
    if (key === "chorus" || key === "delay" || key === "reverb") {
      effectChain?.updateParameters({ [key]: value });
    }
  }

  return {
    async init() {
      await init();
    },
    async resumeIfNeeded() {
      if (
        audioCtx &&
        !(audioCtx instanceof OfflineAudioContext) &&
        audioCtx.state === "suspended"
      ) {
        await audioCtx.resume();
      }
    },
    setParameter(key, value) {
      synthParameters[key] = value;
      const now = audioCtx?.currentTime || 0;

      if (key === "master") {
        if (mainOutputNode) {
          mainOutputNode.gain.setTargetAtTime(
            value,
            now,
            PARAM_SMOOTHING_SECONDS,
          );
        }
        return;
      }

      updateVoiceParameter(key, value);
      updateEffectParameter(key, value);
    },
    setAllParameters(params) {
      Object.assign(synthParameters, params);

      const now = audioCtx?.currentTime || 0;
      if (mainOutputNode) {
        mainOutputNode.gain.setTargetAtTime(
          synthParameters.master,
          now,
          PARAM_SMOOTHING_SECONDS,
        );
      }

      voices.forEach((voice) => {
        if (voice.state === "idle") return;
        applyParametersToVoice(voice, synthParameters, now, true);
        if (voice.state === "releasing") {
          scheduleIdle(voice, voice.releasedAt);
        }
      });

      effectChain?.updateParameters({
        chorus: synthParameters.chorus,
        delay: synthParameters.delay,
        reverb: synthParameters.reverb,
      });
    },
    noteOn(noteNumber, time) {
      if (!audioCtx || !mainOutputNode || voices.length === 0) {
        console.warn(
          "SynthEngine is not initialized. Call init() before using the engine.",
        );
        return;
      }

      void this.resumeIfNeeded();

      const existingVoice = activeVoices.get(noteNumber);
      if (existingVoice) {
        releaseVoice(existingVoice, time ?? audioCtx.currentTime);
      }

      const voice = pickVoice();
      if (!voice) return;

      clearIdleTimer(voice);
      if (voice.noteNumber !== null) {
        activeVoices.delete(voice.noteNumber);
      }

      let targetTime =
        time && time > audioCtx.currentTime ? time : audioCtx.currentTime;

      // Force a gate edge so the worklet envelope retriggers cleanly.
      if (voice.state === "active" || voice === existingVoice) {
        voice.gateParam.setValueAtTime(0.0, targetTime);
        targetTime += ACTIVE_STEAL_RESET_SECONDS;
      }

      setParamAtTime(
        voice.workletNode,
        "frequency",
        midiNoteNumberToFrequency(noteNumber),
        targetTime,
        false,
      );
      applyParametersToVoice(voice, synthParameters, targetTime, false);
      voice.gateParam.setValueAtTime(1.0, targetTime);

      voice.noteNumber = noteNumber;
      voice.state = "active";
      voice.startedAt = targetTime;
      activeVoices.set(noteNumber, voice);
    },
    noteOff(noteNumber, time) {
      const voice = activeVoices.get(noteNumber);
      if (!voice || !audioCtx) return;

      const targetTime =
        time && time > audioCtx.currentTime ? time : audioCtx.currentTime;
      releaseVoice(voice, targetTime);
    },
    getNumActiveNotes() {
      return activeVoices.size;
    },
    cleanup() {
      activeVoices.clear();
      voices.forEach((voice) => {
        clearIdleTimer(voice);
        voice.workletNode.port.postMessage({ type: "stop" });
        try {
          voice.workletNode.disconnect();
        } finally {
          voice.workletNode.port.close();
        }
      });
      voices = [];
      effectChain?.cleanup();
      mainOutputNode?.disconnect();
    },
  };
}

export const synthEngine = createSynthEngine();
