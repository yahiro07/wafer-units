import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import type { UnitInterface } from "wafer-host/unit-types";
import type {
  SynthParameters,
  EffectEngine,
  SynthParameterKey,
} from "./definitions";

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
  parameters: SynthParameters,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;
  const pannerNode = ac.createStereoPanner();
  const gainNode = ac.createGain();
  connectNodes(inputNode, pannerNode, gainNode, outputNode);

  const internal = {
    affectParameters(keys: SynthParameterKey[]) {
      // for (const key of keys) {
      //   if (key === "pan") {
      //     pannerNode.pan.setValueAtTime(parameters[key], ac.currentTime + 0.01);
      //   } else if (key === "volume") {
      //     gainNode.gain.setValueAtTime(parameters[key], ac.currentTime + 0.01);
      //   }
      // }
    },
    affectParametersAll() {
      // internal.affectParameters(["pan", "volume"]);
    },
  };
  internal.affectParametersAll();

  return {
    affectParameters: internal.affectParameters,
    affectParametersAll: internal.affectParametersAll,
    cleanup() {
      disconnectNodes(inputNode, pannerNode, gainNode, outputNode);
    },
  };
}
