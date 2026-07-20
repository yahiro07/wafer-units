import { queryUnitInterface } from "wafer-host/unit-types";
import { createSequencer } from "@/root/sequencer";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");
const automationOutputPort = unitInterface?.createAutomationOutputPort();

const sequencer = createSequencer(unitInterface, automationOutputPort);
sequencer.setLfoSlots(store.state.slots);

export function setupSynchronization() {
  return store.subscribe(({ slots }) => {
    if (slots) {
      sequencer.setLfoSlots(slots);
    }
  });
}

export function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [600, 350],
    },
    clockHandlers: sequencer.clockHandlers,
    unitCallbacks: {
      onConnectedTo(_, linkedPortSubtypes) {
        if (linkedPortSubtypes.includes("automation")) {
          const parameterSpecs = automationOutputPort?.getParameterSpecs();
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
    persistence: {
      emitState() {
        return { slots: store.state.slots };
      },
      applyState(data) {
        store.setSlots(data.slots);
      },
    },
  });
}
