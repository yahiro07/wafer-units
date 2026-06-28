import { queryUnitInterface } from "wafer-host/unit-types";
import { createSequencer } from "@/root/sequencer";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");

const sequencer = createSequencer(unitInterface);
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
      outputs: ["automation"],
    },
    clockHandlers: sequencer.clockHandlers,
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
