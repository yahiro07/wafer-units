import { calcDecayTime, SynthesisBus } from "@/engine/engine-defs";

type AmplifierUnit = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  gateOn(time: number, accent?: boolean): void;
  gateOff(time: number): number;
  mute(time: number): number;
  cleanup(): void;
};

export function createAmplifierUnit(bus: SynthesisBus): AmplifierUnit {
  const ac = bus.audioContext;

  const headNode = ac.createGain(); //automated for Decay
  headNode.gain.value = 0;

  const tailNode = ac.createGain(); //automated for Release
  tailNode.gain.value = 1;
  headNode.connect(tailNode);

  return {
    inputNode: headNode,
    outputNode: tailNode,
    gateOn(time, accent) {
      const pr = bus.parameters;
      const decay = pr.ampDecay;
      const decayTime = calcDecayTime(decay, accent ?? false);

      headNode.gain.cancelScheduledValues(time);
      headNode.gain.setValueAtTime(accent ? 1.5 : 1, time);
      headNode.gain.exponentialRampToValueAtTime(1e-4, time + decayTime);
      headNode.gain.setValueAtTime(0, time + decayTime);

      tailNode.gain.setValueAtTime(1, time);
    },
    gateOff(time) {
      const releaseTime = 0.01;
      tailNode.gain.cancelScheduledValues(time);
      tailNode.gain.setValueAtTime(1, time);
      tailNode.gain.exponentialRampToValueAtTime(1e-4, time + releaseTime);
      tailNode.gain.setValueAtTime(0, time + releaseTime);

      return time + releaseTime;
    },
    mute(time) {
      tailNode.gain.cancelScheduledValues(time);
      tailNode.gain.linearRampToValueAtTime(0, time + 0.001);
      tailNode.gain.setValueAtTime(0, time);
      return time + 0.001;
    },
    cleanup() {
      headNode.disconnect();
    },
  };
}
