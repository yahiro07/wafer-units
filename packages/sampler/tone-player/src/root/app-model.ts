import { SamplerEngine } from "@/definitions/interfaces";
import { defaultStoreState, StoreState } from "@/definitions/store-states";
import { createAudioFetcher } from "@/engine/audio-fetcher";
import { createLevelsLoader } from "@/engine/levels-loader";
import { createSamplerEngine } from "@/engine/sampler-engine";
import { createActions } from "@/root/actions";
import { setupMidiKeyboardInput } from "@lib/mu2609/utils/midi-keyboard-input";
import { createStore, Store } from "snap-store";
import { queryUnitInterface, UnitInterface } from "wafer-host/unit-types";

function setupUnit(
  unitInterface: UnitInterface | undefined,
  engine: SamplerEngine,
) {
  const handleNoteOn = (noteNumber: number) => {
    const index = noteNumber % 12;
    engine.trigger(index);
  };

  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [800, 500],
      },
      noteInput: {
        noteOn: handleNoteOn,
        noteOff: () => {},
      },
      cleanup: engine.cleanup,
    });
  } else {
    return setupMidiKeyboardInput({
      noteOn: handleNoteOn,
    });
  }
}

function setupSynchronization(store: Store<StoreState>, engine: SamplerEngine) {
  return store.subscribe(({ slots, commonParameters }) => {
    if (slots) {
      engine.setSlots(slots);
    }
    if (commonParameters) {
      engine.setCommonParameters(commonParameters);
    }
  }, true);
}

function createAppModel() {
  const unitInterface = queryUnitInterface("wafer-v01");
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const audioFetcher = createAudioFetcher(audioContext);
  const engine = createSamplerEngine(unitInterface, audioContext);
  const levelsLoader = createLevelsLoader();
  const store = createStore<StoreState>(defaultStoreState);
  const actions = createActions(store);

  return {
    setAudioSourceText(text: string) {
      // store.setAudioSourceText(text);
    },
    setupDrivers() {
      const unsub1 = setupUnit(unitInterface, engine);
      const unsub2 = setupSynchronization(store, engine);

      return () => {
        unsub1?.();
        unsub2();
      };
    },
  };
}

export const appModel = createAppModel();
