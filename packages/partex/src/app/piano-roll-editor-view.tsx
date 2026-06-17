import { getSortOrder, seqNumbers } from "mofur/ax";
import { npx, startDragSession } from "mofur/ax-ui";
import React, { useEffect, useRef } from "react";
import { PageShiftButton } from "@/components/page-shift-button";
import { PianoRollBackgroundOctaveBlock } from "@/components/piano-roll-background-octave-block";
import { store } from "@/store/store";
import { Note } from "@/store/types";

const configs = {
  cellW: 20,
  cellH: 32,
  nx: 32,
  numOctaves: 3,
  scrollPartHeight: 320,
};

const editActions = {
  shiftPage(dir: -1 | 1) {
    const pageNum = Math.max(1, store.state.loopBars / 2);
    store.setCurrentPageIndex((prev) => (prev + dir + pageNum) % pageNum);
  },
  setDraftNote(note: Note | null) {
    store.setDraftNote(note);
  },
  patchDraftNote(attrs: Partial<Note>) {
    store.setDraftNote((prev) => (prev ? { ...prev, ...attrs } : null));
  },
  addNote(note: Note) {
    store.setInputNotes((prev) => [...prev, note]);
  },
  patchNote(id: number, attrs: Partial<Note>) {
    store.produceInputNotes((draft) => {
      const note = draft.find((n) => n.id === id);
      if (note) {
        Object.assign(note, attrs);
      }
    });
  },
  removeNote(id: number) {
    store.setInputNotes((prev) => prev.filter((n) => n.id !== id));
  },
};

const BackgroundGridLayer = () => {
  const { cellW, cellH, nx } = configs;
  return (
    <div className="flex-v">
      {seqNumbers(configs.numOctaves).map((i) => (
        <PianoRollBackgroundOctaveBlock
          key={i}
          cellW={cellW * 4}
          cellH={cellH}
          nx={nx / 4}
        />
      ))}
    </div>
  );
};

const NoteBar = ({
  note,
  stepOffset,
  isDraft,
}: {
  note: Note;
  stepOffset: number;
  isDraft?: boolean;
}) => {
  const { cellW, cellH, numOctaves } = configs;
  const x = (note.position - stepOffset) * cellW;
  const y = (7 * numOctaves - note.pitch - 1) * cellH;
  const w = note.duration * cellW;
  const h = cellH;
  let bg: string | undefined;
  if (isDraft) {
    bg = "orange";
  }
  if (note.duration <= 0) {
    bg = "red";
  }
  return (
    <div
      className="absolute bg-cyan-500/60"
      style={{
        left: x,
        top: y + 1,
        width: w - 1,
        height: h - 1,
        background: bg,
      }}
    />
  );
};

const NotesLayer = ({
  notes,
  stepOffset,
  draftNote,
}: {
  notes: Note[];
  stepOffset: number;
  draftNote: Note | null;
}) => {
  const notesInView = notes.filter(
    (note) => stepOffset <= note.position && note.position <= stepOffset + 32,
  );
  return (
    <div>
      {notesInView.map((note, i) => {
        return <NoteBar key={i} note={note} stepOffset={stepOffset} />;
      })}
      {draftNote && (
        <NoteBar note={draftNote} stepOffset={stepOffset} isDraft />
      )}
    </div>
  );
};

type LineEntry = { y: number; relNote: number };

function generateYLinesMap(): LineEntry[] {
  const numLanes = configs.numOctaves * 7;
  const totalH = numLanes * configs.cellH;
  const lines = new Map(
    seqNumbers(numLanes).map((i) => {
      const y = totalH - i * configs.cellH - configs.cellH / 2;
      return [i, y] as const;
    }),
  );
  function addMiddleLine(i: number) {
    const a = lines.get(i);
    const b = lines.get(i + 1);
    if (a !== undefined && b !== undefined) {
      lines.set((i + (i + 1)) / 2, (a + b) / 2);
    }
  }
  for (let i = 0; i < configs.numOctaves; i++) {
    const base = i * 7;
    const indices = [0, 1, 3, 4, 5];
    indices.forEach((idx) => {
      addMiddleLine(base + idx);
    });
  }
  return [...lines.entries()].map(([relNote, y]) => ({ relNote, y }));
}
const noteYLines = generateYLinesMap();

function findNearestYLineNote(y: number): number {
  let nearest = noteYLines[0];
  for (const line of noteYLines) {
    if (Math.abs(line.y - y) < Math.abs(nearest.y - y)) {
      nearest = line;
    }
  }
  return nearest.relNote;
}

function getModifiedDuration(
  originalNoteStepPosition: number,
  x: number,
  stepOffset: number,
) {
  const stepPosition = Math.floor(x / configs.cellW) + stepOffset;
  return stepPosition - originalNoteStepPosition + 1;
}

function getNoteCoordFromPointerPos(x: number, y: number, stepOffset: number) {
  const stepPosition = Math.floor(x / configs.cellW) + stepOffset;
  const relativeNoteNumber =
    7 * configs.numOctaves - 1 - Math.floor(y / configs.cellH);
  return { stepPosition, relativeNoteNumber };
}

function getNoteHit(
  stepPosition: number,
  relativeNoteNumber: number,
  y: number,
  notes: Note[],
) {
  const yLines = noteYLines.filter(
    (line) => Math.abs(line.relNote - relativeNoteNumber) < 0.75,
  );
  yLines.sort(getSortOrder((line) => Math.abs(line.y - y)));
  for (const line of yLines) {
    const hitNote = notes.find(
      (note) =>
        note.position <= stepPosition &&
        stepPosition < note.position + note.duration &&
        note.pitch === line.relNote,
    );
    if (hitNote) {
      return hitNote;
    }
  }
}

function startEditNote(e0: React.PointerEvent, note: Note, isNewNote: boolean) {
  const rect = (e0.target as HTMLDivElement).getBoundingClientRect();
  const scale = rect.width / (configs.cellW * configs.nx);

  const pageStepOffset = store.state.currentPageIndex * 32;
  editActions.setDraftNote(note);
  startDragSession(
    e0.nativeEvent,
    {
      onMove(e) {
        const x = (e.position.x - rect.left) / scale;
        const y = (e.position.y - rect.top) / scale;

        const relativeNoteNumber = findNearestYLineNote(y);
        const stepDuration = getModifiedDuration(
          note.position,
          x,
          pageStepOffset,
        );
        editActions.patchDraftNote({
          pitch: relativeNoteNumber,
          duration: stepDuration,
        });
      },
      onUp() {
        const draftNote = store.state.draftNote;
        if (!draftNote) return;
        if (isNewNote && draftNote.duration > 0) {
          editActions.addNote(draftNote);
        } else {
          if (
            draftNote.pitch !== note.pitch ||
            draftNote.duration !== note.duration
          ) {
            if (draftNote.duration <= 0) {
              editActions.removeNote(note.id);
            } else {
              editActions.patchNote(note.id, {
                pitch: draftNote.pitch,
                duration: draftNote.duration,
              });
            }
          }
        }
        editActions.setDraftNote(null);
      },
      onCancel() {
        editActions.setDraftNote(null);
      },
    },
    { coordinate: "page" },
  );
}

const handleInputLayerPointerDown = (e0: React.PointerEvent) => {
  const rect = (e0.target as HTMLDivElement).getBoundingClientRect();
  const scale = rect.width / (configs.cellW * configs.nx);
  const x = (e0.clientX - rect.left) / scale;
  const y = (e0.clientY - rect.top) / scale;
  const stepOffset = store.state.currentPageIndex * 32;
  const { stepPosition, relativeNoteNumber } = getNoteCoordFromPointerPos(
    x,
    y,
    stepOffset,
  );
  const hitNote = getNoteHit(
    stepPosition,
    relativeNoteNumber,
    y,
    store.state.inputNotes,
  );
  if (hitNote) {
    startEditNote(e0, hitNote, false);
  } else {
    const id = Math.max(0, ...store.state.inputNotes.map((n) => n.id)) + 1;
    const newNote: Note = {
      id,
      position: stepPosition,
      pitch: relativeNoteNumber,
      duration: 1,
    };
    startEditNote(e0, newNote, true);
  }
};

const InputLayer = () => {
  const width = configs.cellW * configs.nx;
  const height = configs.cellH * 7 * configs.numOctaves;
  return (
    <div
      className="absolute-full"
      style={{ width, height }}
      onPointerDown={handleInputLayerPointerDown}
    />
  );
};

const PianoRollEditor = () => {
  const { inputNotes, currentPageIndex, draftNote } = store.useSnapshot();
  const refBaseDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const baseDiv = refBaseDiv.current!;
    baseDiv.scrollTop = baseDiv.scrollHeight / 2 - baseDiv.clientHeight / 2;
  }, []);
  return (
    <div
      ref={refBaseDiv}
      css={{
        height: npx(configs.scrollPartHeight),
        overflowX: "hidden",
        overflowY: "scroll",
        position: "relative",
      }}
    >
      <BackgroundGridLayer />
      <NotesLayer
        notes={inputNotes}
        stepOffset={currentPageIndex * 32}
        draftNote={draftNote}
      />
      <InputLayer />
    </div>
  );
};

export const PianoRollEditorView = () => {
  const { loopBars } = store.useSnapshot();
  const pageNum = Math.max(1, loopBars / 2);
  const canShiftPage = pageNum > 1;

  return (
    <div className="flex-ha gap-2">
      <PageShiftButton
        direction="left"
        disabled={!canShiftPage}
        onClick={() => editActions.shiftPage(-1)}
      />
      <PianoRollEditor />
      <PageShiftButton
        direction="right"
        disabled={!canShiftPage}
        onClick={() => editActions.shiftPage(1)}
      />
    </div>
  );
};
