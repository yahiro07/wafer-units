import { connectNodes, disconnectNodes } from "@/engine/webaudio-helpers";

export type FilterCoreType = "lp12" | "lp24";

export type FilterCore = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  detuneInputNode: AudioNode;
  setFilterType(filterType: FilterCoreType): void;
  setCutoff(frequency: number): void;
  setQ(q: number): void;
  cleanup(): void;
};

export function createFilterCore(ac: AudioContext): FilterCore {
  const inputNode = ac.createGain();
  const lpf1 = ac.createBiquadFilter();
  const lpf2 = ac.createBiquadFilter();
  const detuneInputNode = ac.createGain();
  const outputNode = ac.createGain();
  lpf1.type = "lowpass";
  lpf2.type = "lowpass";

  type WiringState = FilterCoreType | null | undefined;
  let wiring: WiringState = undefined;

  const internal = {
    updateWiring(nextWiring: WiringState) {
      if (nextWiring === wiring) return;
      if (wiring) {
        disconnectNodes(detuneInputNode, lpf1, lpf2);
      }
      if (nextWiring === "lp12") {
        connectNodes(inputNode, lpf1, outputNode);
        detuneInputNode.connect(lpf1.detune);
      } else if (nextWiring === "lp24") {
        connectNodes(inputNode, lpf1, lpf2, outputNode);
        detuneInputNode.connect(lpf1.detune);
        detuneInputNode.connect(lpf2.detune);
      }
      wiring = nextWiring;
    },
  };
  return {
    inputNode,
    outputNode,
    detuneInputNode,
    setFilterType(filterType) {
      internal.updateWiring(filterType);
    },
    setCutoff(frequency) {
      if (frequency !== lpf1.frequency.value) {
        lpf1.frequency.linearRampToValueAtTime(
          frequency,
          ac.currentTime + 0.02,
        );
        lpf2.frequency.linearRampToValueAtTime(
          frequency,
          ac.currentTime + 0.02,
        );
      }
    },
    setQ(q) {
      if (q !== lpf1.Q.value) {
        lpf1.Q.linearRampToValueAtTime(q, ac.currentTime + 0.02);
        lpf2.Q.linearRampToValueAtTime(q, ac.currentTime + 0.02);
      }
    },
    cleanup() {
      internal.updateWiring(null);
    },
  };
}
