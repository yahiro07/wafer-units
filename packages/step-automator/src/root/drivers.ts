import { queryUnitInterface } from "wafer-host/unit-types";
import { createSequencer } from "@/root/sequencer";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");

const sequencer = createSequencer(unitInterface);
sequencer.setAutomationLanes(store.state.lanes);

export function setupSynchronization() {
  return store.subscribe(({ lanes }) => {
    if (lanes) {
      sequencer.setAutomationLanes(lanes);
    }
  });
}

export function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      outputs: ["automation"],
    },
    clockHandlers: {
      processStep(stepIndexInput, time, unitDuration) {
        sequencer.clockHandlers.processStep?.(
          stepIndexInput,
          time,
          unitDuration,
        );
        const lane = store.state.lanes[0];
        const playPos = ((stepIndexInput / lane.clockDivision) >>> 0) % 16;
        store.setPlaybackStepIndex(playPos);
      },
      stop() {
        store.setPlaybackStepIndex(-1);
      },
    },
    unitCallbacks: {
      onConnectedTo(linkedPortSubtypes) {
        if (linkedPortSubtypes.includes("automation")) {
          const parameterSpecs =
            unitInterface?.automationOutputPort?.getParameterSpecs();
          if (parameterSpecs) {
            store.setParameterIds(parameterSpecs.map((spec) => spec.id));
          }
        }
        store.setConnected(true);
      },
      onDisconnectedTo() {
        store.setParameterIds([]);
        store.setConnected(false);
      },
    },
  });
}
