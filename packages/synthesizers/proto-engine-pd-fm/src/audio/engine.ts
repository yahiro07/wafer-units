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

const MAX_WORKLET_VOICES = 8;
const WORKLET_CLOSE_DELAY_MS = 100;

interface ActiveVoice {
  noteNumber: number;
  workletNode: AudioWorkletNode;
  gateParam: AudioParam;
  startedAt: number;
  cleanupTimerId?: number;
  closeTimerId?: number;
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
};

export function createSynthEngine(): EngineApi {
  let audioCtx: AudioContext | null = null;
  let mainOutputNode: GainNode | null = null;
  let effectChain: ReturnType<typeof createEffectChain> | undefined;

  const activeVoices = new Map<number, ActiveVoice>();
  const liveVoices = new Set<ActiveVoice>();
  const synthParameters: SynthParameters = { ...defaultParams };

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
  }

  function updateVoiceParameter(key: keyof SynthParameters, value: number) {
    const now = audioCtx?.currentTime || 0;
    liveVoices.forEach((voice) => {
      const param = voice.workletNode.parameters.get(key);
      if (param) {
        param.setTargetAtTime(value, now, 0.005);
      }
    });
  }

  function updateEffectParameter(key: keyof SynthParameters, value: number) {
    if (key === "chorus" || key === "delay" || key === "reverb") {
      effectChain?.updateParameters({ [key]: value });
    }
  }

  function forgetVoice(voice: ActiveVoice) {
    liveVoices.delete(voice);
    if (activeVoices.get(voice.noteNumber) === voice) {
      activeVoices.delete(voice.noteNumber);
    }
  }

  function stopVoice(voice: ActiveVoice) {
    if (voice.cleanupTimerId !== undefined) {
      window.clearTimeout(voice.cleanupTimerId);
      voice.cleanupTimerId = undefined;
    }
    if (voice.closeTimerId !== undefined) return;

    forgetVoice(voice);
    voice.workletNode.port.postMessage({ type: "stop" });
    voice.closeTimerId = window.setTimeout(() => {
      try {
        voice.workletNode.disconnect();
      } finally {
        voice.workletNode.port.close();
      }
    }, WORKLET_CLOSE_DELAY_MS);
  }

  function scheduleVoiceCleanup(voice: ActiveVoice, targetTime: number) {
    if (!audioCtx) return;

    const releaseTimeConstant = Math.max(0.01, synthParameters.release);
    const releaseTailSeconds = releaseTimeConstant * 10 + 0.1;
    const delaySeconds =
      Math.max(0, targetTime - audioCtx.currentTime) + releaseTailSeconds;

    voice.cleanupTimerId = window.setTimeout(() => {
      stopVoice(voice);
    }, delaySeconds * 1000);
  }

  function findOldestLiveVoice(): ActiveVoice | undefined {
    let oldestVoice: ActiveVoice | undefined;
    liveVoices.forEach((voice) => {
      if (!oldestVoice || voice.startedAt < oldestVoice.startedAt) {
        oldestVoice = voice;
      }
    });
    return oldestVoice;
  }

  function reserveVoiceSlot() {
    while (liveVoices.size >= MAX_WORKLET_VOICES) {
      const oldestVoice = findOldestLiveVoice();
      if (!oldestVoice) return;
      stopVoice(oldestVoice);
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
          mainOutputNode.gain.setTargetAtTime(value, now, 0.005);
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
        mainOutputNode.gain.setTargetAtTime(synthParameters.master, now, 0.005);
      }

      (Object.keys(synthParameters) as Array<keyof SynthParameters>).forEach(
        (key) => {
          updateVoiceParameter(key, synthParameters[key]);
        },
      );

      effectChain?.updateParameters({
        chorus: synthParameters.chorus,
        delay: synthParameters.delay,
        reverb: synthParameters.reverb,
      });
    },
    noteOn(noteNumber, time) {
      if (!audioCtx || !mainOutputNode) {
        console.warn(
          "SynthEngine is not initialized. Call init() before using the engine.",
        );
        return;
      }

      this.resumeIfNeeded();

      const existingVoice = activeVoices.get(noteNumber);
      if (existingVoice) {
        stopVoice(existingVoice);
      }

      reserveVoiceSlot();

      const workletNode = new AudioWorkletNode(audioCtx, "synth-processor", {
        numberOfInputs: 0,
        numberOfOutputs: 1,
        outputChannelCount: [1],
      });

      const targetTime =
        time && time > audioCtx.currentTime ? time : audioCtx.currentTime;

      const freqParam = workletNode.parameters.get("frequency");
      if (freqParam)
        freqParam.setValueAtTime(
          midiNoteNumberToFrequency(noteNumber),
          targetTime,
        );

      (Object.keys(synthParameters) as Array<keyof SynthParameters>).forEach(
        (key) => {
          const p = workletNode.parameters.get(key);
          if (p) p.setValueAtTime(synthParameters[key], targetTime);
        },
      );

      const gateParam = workletNode.parameters.get("gate")!;
      if (targetTime > audioCtx.currentTime) {
        gateParam.setValueAtTime(0.0, audioCtx.currentTime);
      }
      gateParam.setValueAtTime(1.0, targetTime);

      workletNode.connect(mainOutputNode);

      const voice: ActiveVoice = {
        noteNumber,
        workletNode,
        gateParam,
        startedAt: targetTime,
      };
      activeVoices.set(noteNumber, voice);
      liveVoices.add(voice);
    },
    noteOff(noteNumber, time) {
      const voice = activeVoices.get(noteNumber);
      if (!voice) return;

      const targetTime =
        time && audioCtx && time > audioCtx.currentTime
          ? time
          : audioCtx?.currentTime || 0;
      voice.gateParam.setValueAtTime(0.0, targetTime);
      scheduleVoiceCleanup(voice, targetTime);

      activeVoices.delete(noteNumber);
    },
    getNumActiveNotes() {
      return activeVoices.size;
    },
  };
}

export const synthEngine = createSynthEngine();
