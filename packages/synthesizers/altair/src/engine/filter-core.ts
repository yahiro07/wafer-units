import {
  connectNodes,
  createNodeParameterSetter,
  disconnectNodes,
} from "@/engine/webaudio-helpers";

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

  const setters = {
    lpf1Freq: createNodeParameterSetter(ac, lpf1.frequency, 0.02),
    lpf2Freq: createNodeParameterSetter(ac, lpf2.frequency, 0.02),
    lpf1Q: createNodeParameterSetter(ac, lpf1.Q, 0.02),
    lpf2Q: createNodeParameterSetter(ac, lpf2.Q, 0.02),
  };

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
      setters.lpf1Freq.set(frequency);
      setters.lpf2Freq.set(frequency);
    },
    setQ(q) {
      setters.lpf1Q.set(q);
      setters.lpf2Q.set(q);
    },
    cleanup() {
      internal.updateWiring(null);
    },
  };
}
