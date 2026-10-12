import { UnitInterface } from "wafer-host/unit-types";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import { mapKnobCurveCenterUnity } from "@lib/mu2609/utils/volume-curve";

export type EffectParameters = {
  volume: number;
};

export const defaultEffectParameters: EffectParameters = {
  volume: 0.5,
};

export type EffectEngine = {
  setParameter<K extends keyof EffectParameters>(
    key: K,
    value: EffectParameters[K],
  ): void;
  cleanup(): void;
};

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;
  const volumeNode = ac.createGain();

  connectNodes(inputNode, volumeNode, outputNode);

  return {
    setParameter(key, value) {
      if (key === "volume") {
        const g = mapKnobCurveCenterUnity(value);
        volumeNode.gain.linearRampToValueAtTime(g, ac.currentTime + 0.01);
      }
    },
    cleanup() {
      disconnectNodes(inputNode, volumeNode, outputNode);
    },
  };
}
