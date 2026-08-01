import { useEffect } from "preact/hooks";
import { beatSourceItems } from "@/root/definitions";
import { createLoopPlayerEngine } from "@/root/loop-player-engine";
import { store } from "@/root/store";

const player = createLoopPlayerEngine();
player.registerBeatSourceItems(beatSourceItems);

export function setupUnit() {
  player.unitInterface?.completeSetup({
    unitAspects: {
      unitType: "instrument",
      viewSize: [880, 480],
    },
    hostCallbacks: {
      setBpm: player.setBpm,
    },
    clockHandlers: player.clockHandlers,
    cleanup: player.cleanup,
  });
}

export function useAffectStoreToEngine() {
  const { selectedLoopKey } = store.useSnapshot();
  useEffect(() => {
    if (selectedLoopKey) {
      player.setBeatState(selectedLoopKey, true);
      return () => player.setBeatState(selectedLoopKey, false);
    }
  }, [selectedLoopKey]);
}
