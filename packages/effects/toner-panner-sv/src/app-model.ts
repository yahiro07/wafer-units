import { queryUnitInterface } from "wafer-host/unit-types";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";

type SynthParameters = {
  volume: number;
  pan: number;
};
type SynthParameterKey = keyof SynthParameters;

export const defaultSynthParameters: SynthParameters = {
  volume: 0.5,
  pan: 0,
};

type AppModel = {
  parameters: SynthParameters;
  setParameter<K extends SynthParameterKey>(
    key: K,
    value: SynthParameters[K],
  ): void;
};

export function createAppModel(): AppModel {
  const unitInterface = queryUnitInterface("wafer-v01");
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;
  const pannerNode = ac.createStereoPanner();
  connectNodes(inputNode, pannerNode, outputNode);

  const parameters = $state(defaultSynthParameters);

  const internal = {
    affectParametersToNodes(keys: SynthParameterKey[]) {
      for (const key of keys) {
        if (key === "pan") {
          pannerNode.pan.setValueAtTime(parameters[key], ac.currentTime + 0.01);
        } else if (key === "volume") {
          const gainNode = outputNode as GainNode;
          gainNode.gain.setValueAtTime(parameters[key], ac.currentTime + 0.01);
        }
      }
    },
  };
  internal.affectParametersToNodes(["pan", "volume"]);

  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [100, 100],
      },
      cleanup() {
        disconnectNodes(inputNode, pannerNode, outputNode);
      },
    });
  }

  return {
    parameters,
    setParameter(key, value) {
      parameters[key] = value;
      internal.affectParametersToNodes([key]);
    },
  };
}
