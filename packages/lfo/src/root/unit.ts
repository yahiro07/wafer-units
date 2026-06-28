import { queryUnitInterface } from "wafer-host/unit-types";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");

unitInterface?.completeSetup({
  unitAspects: {
    unitType: "sequencer",
    outputs: ["automation"],
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
