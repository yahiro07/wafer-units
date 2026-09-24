import { UnitInterface } from "wafer-host/unit-types";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import { EffectEngine } from "@/core/interfaces";

type ThreeBandEq = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  update(params: { low: number; mid: number; high: number }): void;
  cleanup(): void;
};

function createThreeBandEq(ac: AudioContext): ThreeBandEq {
  const eqLow = ac.createBiquadFilter();
  const eqMid = ac.createBiquadFilter();
  const eqHigh = ac.createBiquadFilter();
  connectNodes(eqLow, eqMid, eqHigh);
  eqLow.type = "lowshelf";
  eqLow.frequency.value = 200;
  eqMid.type = "peaking";
  eqMid.frequency.value = 1000;
  eqMid.Q.value = 1.0;
  eqHigh.type = "highshelf";
  eqHigh.frequency.value = 5000;

  return {
    inputNode: eqLow,
    outputNode: eqHigh,
    update(pr) {
      const mapToGainDb = (val: number) => (val - 0.5) * 24;
      eqLow.gain.setValueAtTime(mapToGainDb(pr.low), ac.currentTime);
      eqMid.gain.setValueAtTime(mapToGainDb(pr.mid), ac.currentTime);
      eqHigh.gain.setValueAtTime(mapToGainDb(pr.high), ac.currentTime);
    },
    cleanup() {
      disconnectNodes(eqLow, eqMid, eqHigh);
    },
  };
}

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;
  const eq = createThreeBandEq(ac);

  connectNodes(inputNode, eq, outputNode);

  return {
    setParameters(params) {
      eq.update(params);
    },
    cleanup() {
      disconnectNodes(inputNode, eq, outputNode);
    },
  };
}
