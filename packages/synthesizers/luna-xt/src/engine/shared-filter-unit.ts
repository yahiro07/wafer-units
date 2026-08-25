import { SynthesisBus } from "@/engine/engine-defs";

type SharedFilterUnit = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  update(time?: number): void;
  //for latest note
  gateOn(time: number): void;
  gateOff(time: number): void;
  cleanup(): void;
};

export function createSharedFilterUnit(bus: SynthesisBus): SharedFilterUnit {
  const ac = bus.audioContext;
  const inputNode = ac.createGain();
  const outputNode = ac.createGain();
  inputNode.connect(outputNode);
  return {
    inputNode,
    outputNode,
    update(time) {},
    gateOn(time) {},
    gateOff(time) {},
    cleanup() {
      inputNode.disconnect();
    },
  };
}
