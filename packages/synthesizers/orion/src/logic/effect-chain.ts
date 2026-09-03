import { createChorus5 } from "@/logic/chorus5";
import { createDelay } from "@/logic/delay-1a";
import { createLoFi } from "@/logic/lofi";
import { createOutputSaturator } from "@/logic/output-saturator";
import { createReverberator } from "@/logic/reverbrator";

export interface EffectParameters {
  loFi: number; // 0.0 ~ 1.0
  chorus: number; // 0.0 ~ 1.0
  delay: number; // 0.0 ~ 1.0
  reverb: number; // 0.0 ~ 1.0
}

export type EffectChain = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  updateParameters(params: Partial<EffectParameters>): void;
  setBpm(bpm: number): void;
  cleanup(): void;
};

export function createEffectChain(audioContext: AudioContext): EffectChain {
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();
  const lofi = createLoFi(audioContext);
  const chorus = createChorus5(audioContext);
  const delay = createDelay(audioContext);
  const reverb = createReverberator(audioContext);
  const saturator = createOutputSaturator(audioContext);

  inputNode.connect(lofi.inputNode);
  lofi.outputNode.connect(chorus.inputNode);
  chorus.outputNode.connect(delay.inputNode);
  delay.outputNode.connect(reverb.inputNode);
  reverb.outputNode.connect(saturator.inputNode);
  saturator.outputNode.connect(outputNode);

  return {
    inputNode,
    outputNode,
    updateParameters(params: Partial<EffectParameters>): void {
      if (params.loFi !== undefined) {
        lofi.setLevel(params.loFi);
      }

      if (params.chorus !== undefined) {
        chorus.setLevel(params.chorus);
      }

      if (params.delay !== undefined) {
        delay.setLevel(params.delay);
      }

      if (params.reverb !== undefined) {
        reverb.setLevel(params.reverb);
      }
    },
    setBpm(bpm: number): void {
      const safeBpm = Math.max(bpm, 1);
      // Dotted eighth note: 3/4 of a quarter-note beat.
      delay.setDelayTime((60 / safeBpm) * 0.75);
    },
    cleanup() {
      lofi.cleanup();
      chorus.cleanup();
      delay.cleanup();
      reverb.cleanup();
      inputNode.disconnect();
      saturator.cleanup();
    },
  };
}
