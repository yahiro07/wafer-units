import { queryUnitInterface } from "wafer-host/unit-types";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";

type AppModel = {
  setPan(pan: number): void;
};

function createAppModel(): AppModel {
  const unitInterface = queryUnitInterface("wafer-v01");
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;
  const pannerNode = ac.createStereoPanner();
  connectNodes(inputNode, pannerNode, outputNode);

  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [100, 100],
      },
      unitCallbacks: {
        // setViewActive: store.setViewActive,
      },
      cleanup() {
        disconnectNodes(inputNode, pannerNode, outputNode);
      },
    });
  }

  return {
    setPan(pan) {
      pannerNode.pan.setValueAtTime(pan, ac.currentTime + 0.01);
    },
  };
}
export const appModel = createAppModel();
