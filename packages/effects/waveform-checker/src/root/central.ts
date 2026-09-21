import { ChannelId } from "@/root/definitions";
import { createAudioAnalysisEngine, createDummyEngine } from "@/root/engine";
import { useEffect } from "preact/hooks";
import { createStore } from "snap-store/preact";
import { queryUnitInterface } from "wafer-host/unit-types";

const unitInterface = queryUnitInterface("wafer-v01");

export const engine = unitInterface
  ? createAudioAnalysisEngine(unitInterface)
  : createDummyEngine();

const store = createStore<{
  barLength: number;
  hostBpm: number;
  activeChannelId: ChannelId;
  altMetersLayout: boolean;
  viewActive: boolean;
}>({
  barLength: 1,
  hostBpm: 0,
  activeChannelId: "ch1",
  altMetersLayout: false,
  viewActive: false,
});

export const useStoreSnapshot = store.useSnapshot;

function setViewActive(active: boolean) {
  store.setViewActive(active);
  engine.setDrawingActive(active);
}

function setupUnit() {
  engine.setup();
  engine.setBarLength(store.state.barLength);
  engine.setActiveChannel(store.state.activeChannelId);
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [1024, 492],
      },
      hostCallbacks: {
        setBpm(bpm: number) {
          store.setHostBpm(bpm);
          engine.setBpm(bpm);
        },
      },
      clockHandlers: {
        start: engine.hostStarted,
      },
      unitCallbacks: {
        setViewActive,
      },
      cleanup: engine.cleanup,
    });
    if (store.state.viewActive) {
      setViewActive(true);
    }
  } else {
    setViewActive(true);
  }
}
export function useSetupDrivers() {
  useEffect(setupUnit, []);
}

export const actions = {
  setActiveChannelId(channelId: ChannelId) {
    store.setActiveChannelId(channelId);
    engine.setActiveChannel(channelId);
  },
  toggleMetersLayout() {
    store.toggleAltMetersLayout();
  },
  setBarLength(barLength: number) {
    store.setBarLength(barLength);
    engine.setBarLength(barLength);
  },
};
