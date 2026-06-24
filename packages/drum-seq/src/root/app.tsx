import { UnitInterface } from "wafer-host/unit-types";
import { appConfig } from "@/common/app-config";
import { CssVariablesFrame } from "@/components";
import { createActions } from "@/root/actions";
import { AppProvider } from "@/root/app-context";
import { defaultPieces } from "@/root/constants";
import { DebugUi } from "@/root/debug-ui";
import { createDrumSequencer } from "@/root/drum-sequencer";
import { MainPanelUi } from "@/root/main-panel-ui";
import { createAppStore } from "@/root/store";

// const unitInterface = queryUnitInterface("wafer-v01");

export function createApp(unitInterface: UnitInterface | undefined) {
  const sequencer = createDrumSequencer(unitInterface, defaultPieces);

  const store = createAppStore();
  const actions = createActions(store, sequencer);

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      categoryHint: "drumMachine",
      outputs: ["note"],
    },
    clockHandlers: {
      start: actions.start,
      processStep: actions.processStep,
      stop: actions.stop,
    },
  });

  const Render = () => {
    return (
      <AppProvider store={store} actions={actions}>
        <CssVariablesFrame>
          <MainPanelUi />
          {appConfig.isDevelopment && <DebugUi />}
        </CssVariablesFrame>
      </AppProvider>
    );
  };

  return { Render };
}
