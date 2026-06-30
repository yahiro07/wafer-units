import { UnitInterface } from "wafer-host/unit-types";
import { createDrumSequencer } from "@/audio/drum-sequencer";
import { appConfig } from "@/base/app-config";
import { defaultPieces } from "@/base/constants";
import { CssVariablesFrame } from "@/components";
import { createActions } from "@/store/actions";
import { AppProvider } from "@/store/app-context";
import { createAppStore } from "@/store/store";
import { DebugUi } from "@/ui/debug-ui";
import { MainPanelUi } from "@/ui/main-panel-ui";

export function createApp(unitInterface: UnitInterface | undefined) {
  const sequencer = createDrumSequencer(unitInterface, defaultPieces);
  const store = createAppStore(defaultPieces);
  const actions = createActions(store, sequencer);
  sequencer.preloadFirst();

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "instrument",
      categoryHint: "drumMachine",
      outputs: ["audio"],
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
