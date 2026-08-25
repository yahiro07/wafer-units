import { SynthesisBus } from "@/engine/engine-defs";

type EffectChain = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  update(time?: number): void;
  cleanup(): void;
};

export function createEffectChain(bus: SynthesisBus): EffectChain {
  const ac = bus.audioContext;
  const inputNode = ac.createGain();
  const outputNode = ac.createGain();
  inputNode.connect(outputNode);
  return {
    inputNode,
    outputNode,
    update(time) {},
    cleanup() {
      inputNode.disconnect();
    },
  };
}
