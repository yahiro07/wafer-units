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

interface ActiveVoice {
  workletNode: AudioWorkletNode;
  gateParam: AudioParam;
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
    activeVoices.forEach((voice) => {
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

  return {
    async init() {
      await init();
    },
    async resumeIfNeeded() {
      if (audioCtx && audioCtx.state === "suspended") {
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

      if (activeVoices.has(noteNumber)) {
        this.noteOff(noteNumber, time);
      }

      if (audioCtx.state === "suspended") {
        void audioCtx.resume();
      }

      const workletNode = new AudioWorkletNode(audioCtx, "synth-processor", {
        numberOfInputs: 0,
        numberOfOutputs: 1,
        outputChannelCount: [1],
      });

      const now =
        time && time > audioCtx.currentTime ? time : audioCtx.currentTime;

      const freqParam = workletNode.parameters.get("frequency");
      if (freqParam)
        freqParam.setValueAtTime(midiNoteNumberToFrequency(noteNumber), now);

      (Object.keys(synthParameters) as Array<keyof SynthParameters>).forEach(
        (key) => {
          const p = workletNode.parameters.get(key);
          if (p) p.setValueAtTime(synthParameters[key], now);
        },
      );

      const gateParam = workletNode.parameters.get("gate")!;
      gateParam.setValueAtTime(1.0, now);

      workletNode.connect(mainOutputNode);

      activeVoices.set(noteNumber, { workletNode, gateParam });
    },
    noteOff(noteNumber, time) {
      const voice = activeVoices.get(noteNumber);
      if (!voice) return;

      const now =
        time && audioCtx && time > audioCtx.currentTime
          ? time
          : audioCtx?.currentTime || 0;
      voice.gateParam.setValueAtTime(0.0, now);

      activeVoices.delete(noteNumber);
    },
    getNumActiveNotes() {
      return activeVoices.size;
    },
  };
}

export const synthEngine = createSynthEngine();
