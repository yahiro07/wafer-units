import { allPartKeys, PartItem, PartKey } from "@/model/defs";
import { createDefaultPartItem } from "@/model/generator/initializer";
import { generatePartItem } from "@/model/generator/scene";
import { sampleVariationsMap } from "@/ui/common/ui-data";
import { storeReaders } from "@/ui/store/readers";
import { store } from "@/ui/store/store";
import { iife, seqNumbers } from "@/utils/helpers";

const actionsInternal = {
  patchPartItem(partKey: PartKey, attrs: Partial<PartItem>) {
    store.producePartItems((draft) => {
      const item = draft.find((item) => item.partKey === partKey);
      if (item) {
        Object.assign(item, attrs);
      }
    });
  },
  patchCurrentPartItem(attrs: Partial<PartItem>) {
    const partKey = store.state.currentPartKey;
    actionsInternal.patchPartItem(partKey, attrs);
  },
  replacePartItem(newPartItem: PartItem) {
    store.setPartItems((prev) =>
      prev.map((item) =>
        item.partKey === newPartItem.partKey ? newPartItem : item,
      ),
    );
  },
};

export const actions = {
  togglePlayState() {
    store.toggleLocalPlaying();
  },
  clearAll() {
    const newPartItems = allPartKeys.map(createDefaultPartItem);
    store.setPartItems(newPartItems);
  },
  randomizeAll() {
    const newPartItems = allPartKeys.map(generatePartItem);
    store.setPartItems(newPartItems);
  },
  toggleSoloMode() {
    store.toggleSoloMode();
  },
  setMasterVolume(volume: number) {
    store.setMasterVolume(volume);
  },
  selectPart(partKey: PartKey) {
    store.setCurrentPartKey(partKey);
  },
  togglePartOutput(partKey: PartKey) {
    const part = storeReaders.getPartItem(partKey);
    actionsInternal.patchPartItem(partKey, {
      outputActive: !part.outputActive,
    });
  },
};

export const partActions = {
  setSample(sampleKey: string) {
    actionsInternal.patchCurrentPartItem({ sampleKey });
  },
  shiftSample() {
    const part = storeReaders.getCurrentPart();
    const variationKeys = sampleVariationsMap[part.partKey];
    const index = variationKeys.indexOf(part.sampleKey);
    const newIndex = (index + 1) % variationKeys.length;
    const newSampleKey = variationKeys[newIndex];
    actionsInternal.patchCurrentPartItem({ sampleKey: newSampleKey });
  },
  setPitchTweak(pitchTweak: number) {
    actionsInternal.patchCurrentPartItem({ pitchTweak });
  },
  setWeakVelocity(weakVelocity: number) {
    actionsInternal.patchCurrentPartItem({ weakVelocity });
  },
  setVolume(volume: number) {
    actionsInternal.patchCurrentPartItem({ volume });
  },
  setStepLength(stepLength: number) {
    const part = storeReaders.getCurrentPart();
    const curr = part.stepLength;
    const next = stepLength;
    let notes = [...part.notes];
    if (next < curr) {
      notes = notes.slice(0, next);
    } else if (next > curr) {
      const numAdding = next - curr;
      for (let i = 0; i < numAdding; i++) {
        notes[curr + i] = notes[i] ? { ...notes[i]! } : null;
      }
    }
    actionsInternal.patchCurrentPartItem({ stepLength, notes });
  },
  clearPartNotes() {
    const part = storeReaders.getCurrentPart();
    actionsInternal.patchCurrentPartItem({
      notes: seqNumbers(part.stepLength).map(() => null),
    });
  },
  randomizePart() {
    const partKey = store.state.currentPartKey;
    const newPart = generatePartItem(partKey);
    actionsInternal.replacePartItem(newPart);
  },
  shiftStepValue(index: number) {
    const part = storeReaders.getCurrentPart();
    const note = part.notes[index];
    const newNote = iife(() => {
      if (note === null) {
        return { pitch: 0, velocity: 1 };
      } else if (note.velocity === 1) {
        return { ...note, velocity: 0.5 };
      } else if (note.velocity === 0.5) {
        return null;
      }
      return null;
    });
    const newNotes = part.notes.map((note, i) =>
      i === index ? newNote : note,
    );
    actionsInternal.patchCurrentPartItem({ notes: newNotes });
  },
  toggleWeakAll() {
    const part = storeReaders.getCurrentPart();
    const newNotes = part.notes.map((note) =>
      note ? { ...note, velocity: note.velocity === 1 ? 0.5 : 1 } : null,
    );
    actionsInternal.patchCurrentPartItem({ notes: newNotes });
  },
};
