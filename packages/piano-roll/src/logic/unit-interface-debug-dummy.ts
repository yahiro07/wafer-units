import { UnitInterface } from "wafer-host/unit-types";

export function createUnitInterfaceDebugDummy(): UnitInterface {
  const audioContext = new AudioContext();
  const audioSourceNode = audioContext.createGain();

  return {
    audioContext,
    audioOutputNode: audioContext.destination,
    audioInputNode: audioSourceNode,
    noteOutputPort: {
      noteOn() {},
      noteOff() {},
    },
    emitMetaAttributes() {},
    completeSetup() {},
  };
}
