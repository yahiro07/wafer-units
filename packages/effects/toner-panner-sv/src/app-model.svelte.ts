import { queryUnitInterface } from "wafer-host/unit-types";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";

type SynthParameters = {
  volume: number;
  pan: number;
};
export type SynthParameterKey = keyof SynthParameters;

type AppStates = {
  parameters: SynthParameters;
  viewActive: boolean;
};

const defaultAppStates: AppStates = {
  parameters: { volume: 0.5, pan: 0 },
  viewActive: false,
};

type AppModel = {
  states: AppStates;
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
  const gainNode = ac.createGain();
  connectNodes(inputNode, pannerNode, gainNode, outputNode);

  const states = $state(structuredClone(defaultAppStates));

  const internal = {
    affectParameters(keys: SynthParameterKey[]) {
      for (const key of keys) {
        if (key === "pan") {
          pannerNode.pan.setValueAtTime(
            states.parameters[key],
            ac.currentTime + 0.01,
          );
        } else if (key === "volume") {
          gainNode.gain.setValueAtTime(
            states.parameters[key],
            ac.currentTime + 0.01,
          );
        }
      }
    },
    affectParametersAll() {
      internal.affectParameters(["pan", "volume"]);
    },
  };
  internal.affectParametersAll();

  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [100, 100],
      },
      cleanup() {
        disconnectNodes(inputNode, pannerNode, gainNode, outputNode);
      },
      unitCallbacks: {
        setViewActive(value) {
          states.viewActive = value;
        },
      },
      persistence: {
        emitState() {
          return { parameters: { ...states.parameters } };
        },
        applyState(data) {
          Object.assign(states.parameters, data.parameters);
          internal.affectParametersAll();
        },
      },
    });
  } else {
    states.viewActive = true;
  }

  return {
    states,
    setParameter(key, value) {
      states.parameters[key] = value;
      internal.affectParameters([key]);
    },
  };
}
