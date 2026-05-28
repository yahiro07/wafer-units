import { createStore } from "solid-js/store";
import { getHostInterface } from "wus-unit-types";
import { createEffectChain } from "@/audio/effect-chain";
import { defaultParams, SynthParameters } from "../state";
import workletUrl from "./worklet?worker&url";

export const hostInterface = getHostInterface();

const mtof = (note: number): number =>
  440.0 * Math.pow(2.0, (note - 69) / 12.0);

interface ActiveVoice {
  workletNode: AudioWorkletNode;
  gateParam: AudioParam;
}

type StoreState = SynthParameters & { numActiveNotes: number };

export class SynthEngine {
  private audioCtx: AudioContext | null = null;
  private mainOutputNode: GainNode | null = null;

  private activeVoices = new Map<number, ActiveVoice>();

  public state: StoreState;
  private setState: any;

  private effectChain?: ReturnType<typeof createEffectChain>;

  constructor() {
    const [store, setStore] = createStore<StoreState>({
      ...defaultParams,
      numActiveNotes: 0,
    });
    this.state = store;
    this.setState = setStore;
  }

  async init(): Promise<void> {
    if (this.audioCtx) return;

    this.audioCtx =
      hostInterface?.audioContext ||
      new (window.AudioContext || (window as any).webkitAudioContext)();

    const audioDestination =
      hostInterface?.audioDestinationNode || this.audioCtx.destination;

    await this.audioCtx.audioWorklet.addModule(workletUrl);

    this.mainOutputNode = this.audioCtx.createGain();
    this.mainOutputNode.gain.setValueAtTime(
      this.state.master,
      this.audioCtx.currentTime,
    );

    this.effectChain = createEffectChain(this.audioCtx);
    this.mainOutputNode.connect(this.effectChain.inputNode);
    this.effectChain.outputNode.connect(audioDestination);
  }

  async resumeOnUserAction() {
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      await this.audioCtx.resume();
    }
  }

  public uiActions = {
    setParameter: (key: keyof SynthParameters, value: number) => {
      this.setState(key, value);

      const now = this.audioCtx?.currentTime || 0;

      if (key === "master") {
        if (this.mainOutputNode) {
          this.mainOutputNode.gain.setTargetAtTime(value, now, 0.005);
        }
        return;
      }

      this.activeVoices.forEach((voice) => {
        const param = voice.workletNode.parameters.get(key);
        if (param) {
          param.setTargetAtTime(value, now, 0.005);
        }
      });

      if (key === "chorus" || key === "delay" || key === "reverb") {
        this.effectChain?.updateParameters({ [key]: value });
      }
    },

    noteOn: (noteNumber: number) => {
      if (!this.audioCtx || !this.mainOutputNode) {
        console.warn(
          "SynthEngineが初期化されていません。先にinit()を実行してください。",
        );
        return;
      }

      if (this.activeVoices.has(noteNumber)) {
        this.uiActions.noteOff(noteNumber);
      }

      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      const workletNode = new AudioWorkletNode(
        this.audioCtx,
        "synth-processor",
        {
          numberOfInputs: 0,
          numberOfOutputs: 1,
          outputChannelCount: [1],
        },
      );

      const now = this.audioCtx.currentTime;

      const freqParam = workletNode.parameters.get("frequency");
      if (freqParam) freqParam.setValueAtTime(mtof(noteNumber), now);

      (Object.keys(this.state) as Array<keyof SynthParameters>).forEach(
        (key) => {
          const p = workletNode.parameters.get(key);
          if (p) p.setValueAtTime(this.state[key], now);
        },
      );

      const gateParam = workletNode.parameters.get("gate")!;
      gateParam.setValueAtTime(1.0, now);

      workletNode.connect(this.mainOutputNode);

      this.activeVoices.set(noteNumber, { workletNode, gateParam });

      this.setState("numActiveNotes", this.activeVoices.size);
    },

    noteOff: (noteNumber: number) => {
      const voice = this.activeVoices.get(noteNumber);
      if (!voice) return;

      const now = this.audioCtx?.currentTime || 0;

      voice.gateParam.setValueAtTime(0.0, now);

      this.activeVoices.delete(noteNumber);

      this.setState("numActiveNotes", this.activeVoices.size);
    },
  };
}

export const synthEngine = new SynthEngine();
