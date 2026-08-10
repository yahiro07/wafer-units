import { UnitInterface } from "wafer-host/unit-types";
import workletUrl from "./worklet?worker&url";
import { createEffectChain } from "@/logic/effect-chain";
import { defaultSynthParameters, SynthParameters } from "@/defs/definitions";
import { midiToFrequency } from "@/logic/synth-math-utils";

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

type ISynthesizer = {
  setParameters(params: SynthParameters): void;
  noteOn(noteNumber: number, time?: number): void;
  noteOff(noteNumber: number, time?: number): void;
  cleanup(): void;
};

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
  // let audioCtx: AudioContext | null = null;
  // let mainOutputNode: GainNode | null = null;

  const mainOutputNode = audioCtx.createGain();
  mainOutputNode.gain.setValueAtTime(
    synthParameters.master,
    audioCtx.currentTime,
  );
  const effectChain = createEffectChain(audioCtx);
  mainOutputNode.connect(effectChain.inputNode);
  effectChain.outputNode.connect(destinationNode);

  let voices: Voice[] = [];
  const activeVoices = new Map<number, Voice>();

  async function init(): Promise<void> {
    await audioCtx.audioWorklet.addModule(workletUrl);
    voices = Array.from({ length: MAX_VOICES }, () =>
      createVoice(audioCtx, mainOutputNode, synthParameters),
    );
  }
  void init();

  function clearIdleTimer(voice: Voice) {
    if (voice.idleTimerId === undefined) return;
    window.clearTimeout(voice.idleTimerId);
    voice.idleTimerId = undefined;
  }

  function scheduleIdle(voice: Voice, releasedAt: number) {
    clearIdleTimer(voice);
    const releaseSeconds = Math.max(0.01, synthParameters.release);
    const idleAt =
      releasedAt + releaseSeconds * 10 + RELEASE_IDLE_MARGIN_SECONDS;
    const delaySeconds = Math.max(0, idleAt - audioCtx.currentTime);

    voice.idleTimerId = window.setTimeout(() => {
      if (voice.state === "releasing") {
        voice.state = "idle";
        voice.noteNumber = null;
      }
      voice.idleTimerId = undefined;
    }, delaySeconds * 1000);
  }

  function releaseVoice(voice: Voice, time: number) {
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

  // function updateVoiceParameter(key: keyof SynthParameters, value: number) {
  //   if (!audioCtx) return;
  //   const now = audioCtx.currentTime;
  //   voices.forEach((voice) => {
  //     if (voice.state === "idle") return;
  //     setParamAtTime(voice.workletNode, key, value, now, true);
  //   });
  // }

  // function updateEffectParameter(key: keyof SynthParameters, value: number) {
  //   if (key === "chorus" || key === "delay" || key === "reverb") {
  //     effectChain?.updateParameters({ [key]: value });
  //   }
  // }

  return {
    setParameters(params) {
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

      const existingVoice = activeVoices.get(noteNumber);
      if (existingVoice) {
        releaseVoice(existingVoice, time ?? audioCtx.currentTime);
      }

      const voice = pickVoice(voices);
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
        midiToFrequency(noteNumber),
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
