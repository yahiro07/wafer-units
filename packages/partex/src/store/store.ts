import { createStore } from "snap-store";
import { Note, PatternMode, SongKey } from "@/store/types";

function getDefaultNotes() {
  if (0) {
    return [
      { id: 0, position: 0, duration: 2, pitch: 7 },
      { id: 1, position: 2, duration: 2, pitch: 8 },
      { id: 2, position: 4, duration: 2, pitch: 9 },
      { id: 3, position: 6, duration: 2, pitch: 10 },
      { id: 4, position: 8, duration: 8, pitch: 11 },
      { id: 5, position: 16, duration: 16, pitch: 5 },
      { id: 6, position: 32, duration: 16, pitch: 14 },
    ];
  }
  if (0) {
    return [
      { id: 0, position: 0, duration: 2, pitch: 5 },
      { id: 1, position: 2, duration: 2, pitch: 9 },
    ];
  }
  return [];
}

const defaultNotes: Note[] = getDefaultNotes();

export const store = createStore<{
  //persisted
  inputNotes: Note[];
  noteDuty: number;
  octaveShift: number;
  loopBars: number;
  patternBars: number;
  patternMode: PatternMode;
  ghostEnabled: boolean;
  realized: boolean;
  songKey: SongKey;
  //temporal
  currentPageIndex: number;
  draftNote: Note | null;
  mappedNotes: Note[];
  backupInputNotes: Note[] | null;
}>({
  inputNotes: defaultNotes,
  noteDuty: 1,
  octaveShift: 0,
  loopBars: 2,
  patternBars: 1,
  patternMode: "shift",
  ghostEnabled: true,
  realized: false,
  songKey: "Am",
  //
  currentPageIndex: 0,
  draftNote: null,
  mappedNotes: [],
  backupInputNotes: null,
});
