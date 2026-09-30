import { SamplerEngine } from "@/definitions/interfaces";
import { defaultStoreState, StoreState } from "@/model/store-states";
import { SlotParameters } from "@/definitions/definitions";
import { createAudioFetcher } from "@/engine/audio-fetcher";
import { createLevelsLoader } from "@/engine/levels-loader";
import { createPreviewPlayer } from "@/engine/preview-player";
import { createSamplerEngine } from "@/engine/sampler-engine";
import { createActions } from "@/model/actions";
import { setupMidiKeyboardInput } from "@lib/mu2609/utils/midi-keyboard-input";
import { createStore } from "snap-store";
import { queryUnitInterface, UnitInterface } from "wafer-host/unit-types";

function setupUnit(
  unitInterface: UnitInterface | undefined,
  samplerEngine: SamplerEngine,
) {
  const handleNoteOn = (noteNumber: number) => {
    const index = noteNumber % 12;
    samplerEngine.trigger(index);
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
      cleanup: samplerEngine.cleanup,
    });
  } else {
    return setupMidiKeyboardInput({
      noteOn: handleNoteOn,
    });
  }
}

// function setupSynchronization(store: Store<StoreState>, engine: SamplerEngine) {
//   return store.subscribe(({ slots, commonParameters }) => {
//     // if (slots) {
//     //   engine.setSlots(slots);
//     // }
//     // if (commonParameters) {
//     //   engine.setCommonParameters(commonParameters);
//     // }
//   }, true);
// }

type AppModel = {
  useSnapshot(): StoreState;
  loadAudioSourceText(text: string, fromUi?: boolean): void;
  setupDrivers(): () => void;
  playSourcePreview(audioIndex: number): void;
  getLevels(audioIndex: number): Promise<number[]>;
  assignAudio(slotIndex: number, audioIndex: number): void;
  setSlotParameter<K extends keyof SlotParameters>(
    slotIndex: number,
    key: K,
    value: SlotParameters[K],
  ): void;
  triggerSlot(slotIndex: number): void;
};

const helpers = {
  decodeAudioSourceText(text: string): {
    audioBaseUrl: string;
    audioPaths: string[];
  } {
    const lines = text.split("\n");
    let audioBaseUrl = lines[0].replace("@base ", "");
    if (audioBaseUrl.startsWith("https://github.com")) {
      audioBaseUrl = audioBaseUrl
        .replace("https://github.com", "https://cdn.jsdelivr.net/gh")
        .replace("/tree/main", "");
    }

    const index = lines.findIndex((line) => line.startsWith("@samples"));
    const audioPaths = [];
    for (let i = index + 1; i < lines.length; i++) {
      const line = lines[i];
      if (line && !line.startsWith("@")) {
        audioPaths.push(line);
      } else {
        break;
      }
    }
    return { audioBaseUrl, audioPaths };
  },
};

function createAppModel(): AppModel {
  const unitInterface = queryUnitInterface("wafer-v01");
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const audioFetcher = createAudioFetcher(audioContext);
  const samplerEngine = createSamplerEngine(unitInterface, audioContext);
  const levelsLoader = createLevelsLoader(audioFetcher);
  const previewPlayer = createPreviewPlayer(audioContext, audioFetcher);
  const store = createStore<StoreState>(defaultStoreState);
  const actions = createActions(store);

  const internal = {
    getAudioUri(audioIndex: number) {
      const { audioBaseUrl, audioPaths } = store.state;
      return `${audioBaseUrl}${audioPaths[audioIndex]}`;
    },
  };

  return {
    useSnapshot: store.useSnapshot,
    loadAudioSourceText(text: string, fromUi?: boolean) {
      const { audioBaseUrl, audioPaths } = helpers.decodeAudioSourceText(text);
      store.setAudioBaseUrl(audioBaseUrl);
      store.setAudioPaths(audioPaths);
      if (fromUi) {
        store.setAudioSourceText(text);
      }
    },
    setupDrivers() {
      const unsub1 = setupUnit(unitInterface, samplerEngine);
      // const unsub2 = setupSynchronization(store, engine);
      return () => {
        unsub1?.();
        // unsub2();
      };
    },
    playSourcePreview(audioIndex) {
      const uri = internal.getAudioUri(audioIndex);
      previewPlayer.play(uri);
    },
    getLevels(audioIndex) {
      const uri = internal.getAudioUri(audioIndex);
      return levelsLoader.loadLevels(uri);
    },
    assignAudio(slotIndex, audioIndex) {
      const uri = internal.getAudioUri(audioIndex);
      samplerEngine.setSlotAudio(slotIndex, uri);
      store.produceSlots((draft) => (draft[slotIndex].audioIndex = audioIndex));
    },
    setSlotParameter(slotIndex, key, value) {
      const slot = store.state.slots[slotIndex];
      const parameters = { ...slot.parameters, [key]: value };
      samplerEngine.setSlotParameters(slotIndex, parameters);
      store.produceSlots((draft) => (draft[slotIndex].parameters = parameters));
    },
    triggerSlot(slotIndex) {
      samplerEngine.trigger(slotIndex);
    },
  };
}

export const appModel = createAppModel();
