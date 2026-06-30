import { UnitInterface } from "wafer-host/unit-types";
import { createDrumSequencer } from "@/audio/drum-sequencer";
import { appConfig } from "@/base/app-config";
import { initialPreset } from "@/base/presets";
import { CssVariablesFrame } from "@/components";
import { createActions } from "@/store/actions";
import { AppProvider } from "@/store/app-context";
import { createAutomationInput } from "@/store/automation-input";
import { createPersistence } from "@/store/persistence";
import { createAppStore } from "@/store/store";
import { DebugUi } from "@/ui/debug-ui";
import { MainPanelUi } from "@/ui/main-panel-ui";

export function createApp(unitInterface: UnitInterface | undefined) {
  const sequencer = createDrumSequencer(
    unitInterface,
    initialPreset.pieceItems,
  );
  const store = createAppStore(initialPreset.pieceItems);
  const actions = createActions(store, sequencer);
  sequencer.preloadFirst();
  sequencer.setMasterVolume(store.state.masterVolume);
  const persistence = createPersistence(store, sequencer);
  const automationInput = createAutomationInput(store, actions);

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "instrument",
      categoryHint: "drumMachine",
      outputs: ["audio"],
      inputs: ["automation"],
    },
    clockHandlers: {
      start: actions.start,
      processStep: actions.processStep,
      stop: actions.stop,
    },
    persistence,
    automationInput,
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
