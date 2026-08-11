import { ParameterItem } from "@/defs/types";
import { store } from "@/root/store";
import { useEffect } from "preact/hooks";
import { queryUnitInterface } from "wafer-host/unit-types";

const unitInterface = queryUnitInterface("wafer-v01");
const automationOutputPort = unitInterface?.createAutomationOutputPort();

function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [800, 600],
    },
    unitCallbacks: {
      onConnectedTo(srcPortId) {
        if (srcPortId === "automationOutput") {
          const port = automationOutputPort!;
          const parameterSpecs = port.getParameterSpecs();
          if (parameterSpecs) {
            const parameterItems: ParameterItem[] = parameterSpecs.map(
              (spec) => {
                const { id, steps } = spec;
                const value = port.getParameter(id) ?? 0;
                return { id, value, steps };
              },
            );
            store.setParameterItems(parameterItems);
          }
        }
      },
    },
  });
}

function setupSynchronization() {
  return store.subscribe(() => {});
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
