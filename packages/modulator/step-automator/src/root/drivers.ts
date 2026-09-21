import { queryUnitInterface } from "wafer-host/unit-types";
import { createSequencer } from "@/root/sequencer";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");

const sequencer = createSequencer(unitInterface);

export function setupUnit() {
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "sequencer",
        viewSize: [560, 220],
        preferJustSize: true,
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
        setViewActive: store.setViewActive,
      },
      persistence: {
        emitState() {
          return { lanes: store.state.lanes };
        },
        applyState(data) {
          store.setLanes(data.lanes);
        },
      },
    });
  } else {
    store.setViewActive(true);
  }
}

export function setupSynchronization() {
  return store.subscribe(({ lanes }) => {
    if (lanes) {
      sequencer.setAutomationLanes(lanes);
    }
  }, true);
}
