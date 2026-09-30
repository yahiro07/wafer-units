import { defaultStoreState, StoreState } from "@/model/store-states";
import { CommonParameters, SlotParameters } from "@/definitions/definitions";
import { createAudioFetcher } from "@/engine/audio-fetcher";
import { createLevelsLoader } from "@/engine/levels-loader";
import { createPreviewPlayer } from "@/engine/preview-player";
import { createSamplerEngine } from "@/engine/sampler-engine";
import { setupMidiKeyboardInput } from "@lib/mu2609/utils/midi-keyboard-input";
import { createStore } from "snap-store";
import { queryUnitInterface } from "wafer-host/unit-types";
import { createMasterMixer } from "@/engine/master-mixer";

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
  getLevels(audioIndex: number): Promise<number[] | undefined>;
  assignAudio(slotIndex: number, audioIndex: number): void;
  setSlotParameter<K extends keyof SlotParameters>(
    slotIndex: number,
    key: K,
    value: SlotParameters[K],
  ): void;
  setCommonParameter<K extends keyof CommonParameters>(
    key: K,
    value: CommonParameters[K],
  ): void;
  triggerSlot(slotIndex: number): void;
  unTriggerSlot(slotIndex: number): void;
  selectSlot(slotIndex: number): void;
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
  const masterMixer = createMasterMixer(unitInterface, audioContext);

  const audioFetcher = createAudioFetcher(audioContext);
  const samplerEngine = createSamplerEngine(
    audioContext,
    masterMixer,
    audioFetcher,
  );
  const levelsLoader = createLevelsLoader(audioFetcher);
  const previewPlayer = createPreviewPlayer(
    audioContext,
    masterMixer.mainInputNode,
    audioFetcher,
  );
  const store = createStore<StoreState>(defaultStoreState);
  // const actions = createActions(store);

  const internal = {
    getAudioUri(audioIndex: number) {
      const { audioBaseUrl, audioPaths } = store.state;
      const path = audioPaths[audioIndex];
      if (!path) return undefined;
      return `${audioBaseUrl}${path}`;
    },
    setupUnit() {
      const handlers = {
        noteOn(noteNumber: number) {
          const slotIndex = noteNumber % 12;
          samplerEngine.trigger(slotIndex);
          store.producePadHoldStates((draft) => (draft[slotIndex] = true));
        },
        noteOff(noteNumber: number) {
          const slotIndex = noteNumber % 12;
          store.producePadHoldStates((draft) => (draft[slotIndex] = false));
        },
      };
      if (unitInterface) {
        unitInterface.completeSetup({
          unitAspects: {
            unitType: "effect",
            viewSize: [800, 500],
          },
          noteInput: {
            noteOn: handlers.noteOn,
            noteOff: handlers.noteOff,
          },
          cleanup() {
            samplerEngine.cleanup();
            masterMixer.cleanup();
          },
        });
      } else {
        return setupMidiKeyboardInput({
          noteOn: handlers.noteOn,
          noteOff: handlers.noteOff,
        });
      }
    },
  };

  for (let i = 0; i < 12; i++) {
    const slot = store.state.slots[i];
    samplerEngine.setSlotParameters(i, slot.parameters);
  }
  masterMixer.setCommonParameters(store.state.commonParameters);

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
      const unsub1 = internal.setupUnit();
      // const unsub2 = setupSynchronization(store, engine);
      return () => {
        unsub1?.();
        // unsub2();
      };
    },
    playSourcePreview(audioIndex) {
      const uri = internal.getAudioUri(audioIndex);
      if (uri) {
        previewPlayer.play(uri);
      }
    },
    async getLevels(audioIndex) {
      const uri = internal.getAudioUri(audioIndex);
      if (uri) {
        return await levelsLoader.loadLevels(uri);
      }
      return undefined;
    },
    assignAudio(slotIndex, audioIndex) {
      const uri = internal.getAudioUri(audioIndex);
      if (uri) {
        samplerEngine.setSlotAudio(slotIndex, uri);
      }
      store.produceSlots((draft) => (draft[slotIndex].audioIndex = audioIndex));
    },
    setSlotParameter(slotIndex, key, value) {
      const slot = store.state.slots[slotIndex];
      const parameters = { ...slot.parameters, [key]: value };
      samplerEngine.setSlotParameters(slotIndex, parameters);
      store.produceSlots((draft) => (draft[slotIndex].parameters = parameters));
    },
    setCommonParameter(key, value) {
      store.patchCommonParameters({ [key]: value });
      masterMixer.setCommonParameters(store.state.commonParameters);
    },
    triggerSlot(slotIndex) {
      samplerEngine.trigger(slotIndex);
      store.producePadHoldStates((draft) => (draft[slotIndex] = true));
    },
    unTriggerSlot(slotIndex) {
      store.producePadHoldStates((draft) => (draft[slotIndex] = false));
    },
    selectSlot(slotIndex) {
      store.setCurrentSlotIndex(slotIndex);
    },
  };
}

export const appModel = createAppModel();
