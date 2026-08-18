import { css } from "@emotion/react";
import clsx from "clsx";
import { getSortOrder, seqNumbers } from "mofur/ax";
import { npx, startDragSession } from "mofur/ax-ui";
import React, { useEffect, useRef } from "react";
import { PageShiftButton } from "@/components/page-shift-button";
import { PianoRollBackgroundOctaveBlock } from "@/components/piano-roll-background-octave-block";
import { store } from "@/store/store";
import { Note } from "@/store/types";

const configs = {
  cellW: 16,
  cellH: 20,
  nx: 32,
  numOctaves: 3,
  scrollPartHeight: 240,
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
  const { keysMode } = store.useSnapshot();
  return (
    <div className="flex-v">
      {seqNumbers(configs.numOctaves).map((i) => (
        <PianoRollBackgroundOctaveBlock
          key={i}
          cellW={cellW * 4}
          cellH={cellH}
          nx={nx / 4}
          isComplementalMinorKey={keysMode === "minor"}
        />
      ))}
    </div>
  );
};

const NoteBar = ({
  note,
  stepOffset,
  isDraft,
  patternBars,
  ghostEnabled,
}: {
  note: Note;
  stepOffset: number;
  isDraft?: boolean;
  patternBars: number;
  ghostEnabled: boolean;
}) => {
  const { cellW, cellH, numOctaves } = configs;
  const x = (note.position - stepOffset) * cellW;
  const y = (7 * numOctaves - note.pitch - 1) * cellH;
  const w = note.duration * cellW;
  const h = cellH;
  const isDeleting = note.duration <= 0;
  const isGhostHead = ghostEnabled && note.noteType === "ghostHead";
  const isGhostTails = ghostEnabled && note.noteType === "ghostTails";
  const isHeadNote = note.position + note.duration <= patternBars * 16;
  const isInputHead = !note.noteType && isHeadNote;
  const isInputTails = !ghostEnabled && !note.noteType && !isHeadNote;
  const isInputTailsInGhostMode = ghostEnabled && !note.noteType && !isHeadNote;
  return (
    <div
      className={clsx(
        isDraft && "--draft",
        isDeleting && "--deleting",
        isGhostHead && "--ghost-head",
        isGhostTails && "--ghost-tails",
        isInputHead && "--input-head",
        isInputTails && "--input-tails",
        isInputTailsInGhostMode && "--input-tails-in-ghost-mode",
      )}
      style={{
        left: x,
        top: y + 1,
        width: w - 1,
        height: h - 1,
      }}
      css={noteStyles}
    />
  );
};
const noteColors = {
  main: "#0bd8",
  alt: "#cf68",
};
const noteStyles = css({
  position: "absolute",
  "&.--input-head": {
    background: noteColors.main,
    // border: `solid 1px ${noteColors.main}`,
  },
  "&.--input-tails": {
    background: noteColors.main,
    // border: `solid 1px ${noteColors.main}`,
  },
  "&.--input-tails-in-ghost-mode": {
    background: noteColors.alt,
    // border: `solid 1px ${noteColors.main}`,
  },
  "&.--draft": {
    background: "#f80a",
  },
  "&.--deleting": {
    background: "#f008",
  },
  "&.--ghost-head": {
    // background: noteColors.main,
    // background: "none",
  },
  "&.--ghost-tails": {
    background: "#fff4",
    // background: noteColors.alt,
    // marginTop: "2px",
    // marginBottom: "4px",
    border: `solid 1px ${noteColors.main}`,
  },
});

const NotesLayer = ({
  notes,
  stepOffset,
  draftNote,
  patternBars,
  ghostEnabled,
}: {
  notes: Note[];
  stepOffset: number;
  draftNote: Note | null;
  patternBars: number;
  ghostEnabled: boolean;
}) => {
  const notesInView = notes.filter(
    (note) => stepOffset <= note.position && note.position <= stepOffset + 32,
  );
  return (
    <div>
      {notesInView.map((note, i) => {
        return (
          <NoteBar
            key={i}
            note={note}
            stepOffset={stepOffset}
            patternBars={patternBars}
            ghostEnabled={ghostEnabled}
          />
        );
      })}
      {draftNote && (
        <NoteBar
          note={draftNote}
          stepOffset={stepOffset}
          isDraft
          patternBars={patternBars}
          ghostEnabled={ghostEnabled}
        />
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

const isMobile = "ontouchstart" in document;

const PianoRollEditor = () => {
  const {
    inputNotes,
    currentPageIndex,
    draftNote,
    mappedNotes,
    patternBars,
    ghostEnabled,
  } = store.useSnapshot();
  const refBaseDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const baseDiv = refBaseDiv.current!;
    baseDiv.scrollTop = baseDiv.scrollHeight / 2 - baseDiv.clientHeight / 2;
  }, []);
  return (
    <div
      ref={refBaseDiv}
      className={clsx(
        "bg-white overflow-x-hidden overflow-y-scroll",
        "border border-gray-300",
      )}
      style={{ height: npx(configs.scrollPartHeight) }}
      onWheel={(e) => e.preventDefault()}
    >
      <div className="flex-h">
        <div className="relative grow touch-none">
          <BackgroundGridLayer />
          <NotesLayer
            notes={inputNotes}
            stepOffset={currentPageIndex * 32}
            draftNote={draftNote}
            patternBars={patternBars}
            ghostEnabled={ghostEnabled}
          />
          {ghostEnabled && (
            <NotesLayer
              notes={mappedNotes}
              stepOffset={currentPageIndex * 32}
              draftNote={null}
              patternBars={patternBars}
              ghostEnabled={ghostEnabled}
            />
          )}
          <InputLayer />
        </div>
        {isMobile && <div className="w-[24px] bg-[#eee]" />}
      </div>
    </div>
  );
};

export const PianoRollEditorView = () => {
  const { loopBars } = store.useSnapshot();
  const pageNum = Math.max(1, loopBars / 2);
  const canShiftPage = pageNum > 1;

  return (
    <div className="flex-ha gap-1.5">
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
