import { cz } from "@/common/css-realm";
import { GridBackground } from "@/components/grid-background";
import { GridTonicHighlighter } from "@/components/grid-tonic-highlighter";
import { Note } from "@/root/definitions";
import { store } from "@/root/store";
import { startDragSession } from "@/utils/drag-session";
import { clampValue, seqNumbers } from "@/utils/helpers";
import { RefObject } from "preact";
import { useEffect, useRef } from "preact/hooks";

const uiConfigs = {
  stepCellWidth: 44,
  stepCellHeight: 28,
  numCellsY: 22,
  editorHeight: 0,
};
uiConfigs.editorHeight = uiConfigs.stepCellHeight * uiConfigs.numCellsY;

const tapConfigs = {
  maxDistance: 8,
  maxDurationMs: 250,
};

type StepsRange = {
  offset: number;
  length: number;
};

type Cell = { x: number; y: number };
type EditMode = "create" | "move" | "resize";

function rangeMinX(stepsRange: StepsRange) {
  return stepsRange.offset;
}

function rangeMaxX(stepsRange: StepsRange) {
  return stepsRange.offset + stepsRange.length - 1;
}

function rangeEndX(stepsRange: StepsRange) {
  return stepsRange.offset + stepsRange.length;
}

function cellFromPointer(
  pos: { x: number; y: number },
  stepsRange: StepsRange,
): Cell {
  return {
    x: clampValue(
      stepsRange.offset + Math.floor(pos.x / uiConfigs.stepCellWidth),
      rangeMinX(stepsRange),
      rangeMaxX(stepsRange),
    ),
    y: clampValue(
      Math.floor((uiConfigs.editorHeight - pos.y) / uiConfigs.stepCellHeight),
      0,
      uiConfigs.numCellsY - 1,
    ),
  };
}

function hitTestNote(notes: Note[], cell: Cell): Note | undefined {
  let hit: Note | undefined;
  for (const note of notes) {
    if (
      note.pitch === cell.y &&
      note.position <= cell.x &&
      cell.x < note.position + note.duration
    ) {
      hit = note;
    }
  }
  return hit;
}

function nextNoteId(notes: Note[]) {
  return notes.length > 0 ? Math.max(...notes.map((note) => note.id)) + 1 : 0;
}

function isResizeGrab(note: Note, cell: Cell) {
  return note.duration > 1 && cell.x === note.position + note.duration - 1;
}

function makeCreatePreview(
  id: number,
  start: Cell,
  current: Cell,
  stepsRange: StepsRange,
): Note {
  const left = clampValue(
    Math.min(start.x, current.x),
    rangeMinX(stepsRange),
    rangeMaxX(stepsRange),
  );
  const right = clampValue(
    Math.max(start.x, current.x),
    rangeMinX(stepsRange),
    rangeMaxX(stepsRange),
  );
  return {
    id,
    position: left,
    duration: right - left + 1,
    pitch: clampValue(current.y, 0, uiConfigs.numCellsY - 1),
  };
}

function makeMovePreview(
  original: Note,
  start: Cell,
  current: Cell,
  stepsRange: StepsRange,
): Note {
  let position = original.position + (current.x - start.x);
  const minX = rangeMinX(stepsRange);
  const maxEnd = rangeEndX(stepsRange);
  if (position < minX) position = minX;
  if (position + original.duration > maxEnd) {
    position = maxEnd - original.duration;
  }
  return {
    ...original,
    position,
    pitch: clampValue(
      original.pitch + (current.y - start.y),
      0,
      uiConfigs.numCellsY - 1,
    ),
  };
}

function makeResizePreview(
  original: Note,
  start: Cell,
  current: Cell,
  stepsRange: StepsRange,
): Note {
  let duration = original.duration + (current.x - start.x);
  const maxEnd = rangeEndX(stepsRange);
  if (original.position + duration > maxEnd) {
    duration = maxEnd - original.position;
  }
  return {
    ...original,
    duration,
    pitch: clampValue(current.y, 0, uiConfigs.numCellsY - 1),
  };
}

function commitEditedNote(preview: Note | null, originalId: number) {
  if (!preview || preview.duration < 1) {
    store.setNotes((prev) => prev.filter((note) => note.id !== originalId));
  } else {
    store.setNotes((prev) =>
      prev.map((note) => (note.id === preview.id ? preview : note)),
    );
  }
}

function handleStepsBarEditorPointerDown(
  e: PointerEvent,
  stepsRange: StepsRange,
) {
  if (e.button !== 0) return;

  const t0 = performance.now();
  let mode: EditMode = "create";
  let startCell: Cell = { x: 0, y: 0 };
  let originalNote: Note | null = null;

  startDragSession(
    e,
    {
      onDown(ev) {
        startCell = cellFromPointer(ev.position, stepsRange);
        const hit = hitTestNote(store.state.notes, startCell);
        if (!hit) {
          mode = "create";
          originalNote = {
            id: nextNoteId(store.state.notes),
            position: startCell.x,
            pitch: startCell.y,
            duration: 1,
          };
          store.setPreviewNote(originalNote);
          return;
        }
        mode = isResizeGrab(hit, startCell) ? "resize" : "move";
        originalNote = hit;
        store.setPreviewNote({ ...hit });
      },
      onMove(ev) {
        if (!originalNote) return;
        const current = cellFromPointer(ev.position, stepsRange);
        if (mode === "create") {
          store.setPreviewNote(
            makeCreatePreview(originalNote.id, startCell, current, stepsRange),
          );
        } else if (mode === "move") {
          store.setPreviewNote(
            makeMovePreview(originalNote, startCell, current, stepsRange),
          );
        } else {
          store.setPreviewNote(
            makeResizePreview(originalNote, startCell, current, stepsRange),
          );
        }
      },
      onUp(ev) {
        const preview = store.state.previewNote;
        if (mode === "create") {
          if (preview && preview.duration >= 1) {
            store.setNotes((prev) => [...prev, preview]);
          }
          store.setPreviewNote(null);
          return;
        }
        const distance = Math.hypot(
          ev.position.x - ev.originalPosition.x,
          ev.position.y - ev.originalPosition.y,
        );
        const elapsed = performance.now() - t0;
        if (
          originalNote &&
          distance <= tapConfigs.maxDistance &&
          elapsed <= tapConfigs.maxDurationMs
        ) {
          store.setNotes((prev) =>
            prev.filter((note) => note.id !== originalNote!.id),
          );
          store.setPreviewNote(null);
          return;
        }
        if (originalNote) {
          commitEditedNote(preview, originalNote.id);
        }
        store.setPreviewNote(null);
      },
      onCancel() {
        store.setPreviewNote(null);
      },
    },
    { coordinate: "relative" },
  );
}

function noteOverlapsRange(note: Note, stepsRange: StepsRange) {
  const rangeStart = stepsRange.offset;
  const rangeEnd = rangeEndX(stepsRange);
  return note.position < rangeEnd && note.position + note.duration > rangeStart;
}

const NotesLayer = ({
  stepsRange,
  isPrimaryNotes,
}: {
  stepsRange: StepsRange;
  isPrimaryNotes: boolean;
}) => {
  const { notes, previewNote } = store.useSnapshot();
  const { stepCellWidth, stepCellHeight } = uiConfigs;
  const visibleNotes = notes.filter(
    (note) =>
      note.duration >= 1 &&
      note.id !== previewNote?.id &&
      noteOverlapsRange(note, stepsRange),
  );
  const displayNotes =
    previewNote &&
    previewNote.duration >= 1 &&
    noteOverlapsRange(previewNote, stepsRange)
      ? [...visibleNotes, previewNote]
      : visibleNotes;

  return (
    <div
      class={cz(
        "absolute-full flex-h",
        isPrimaryNotes && "[&>div]:(absolute flex-c bd-#4cf bg-#4cf8)",
        !isPrimaryNotes && "[&>div]:(absolute flex-c bd-#9ab bg-#cde5)",
      )}
    >
      {displayNotes.map((note) => (
        <div
          key={note.id}
          style={{
            left: (note.position - stepsRange.offset) * stepCellWidth,
            bottom: note.pitch * stepCellHeight,
            width: note.duration * stepCellWidth,
            height: stepCellHeight,
          }}
        />
      ))}
    </div>
  );
};

const StepsBarEditor = ({
  stepsRange,
  bgInvert,
  isPrimaryNotes = false,
}: {
  stepsRange: StepsRange;
  bgInvert?: boolean;
  isPrimaryNotes?: boolean;
}) => {
  const nx = stepsRange.length;
  const { stepCellWidth, numCellsY } = uiConfigs;
  return (
    <div
      class="relative touch-none"
      style={{ width: stepCellWidth * nx, height: uiConfigs.editorHeight }}
      onPointerDown={(e) => handleStepsBarEditorPointerDown(e, stepsRange)}
    >
      <GridBackground
        nx={nx}
        ny={numCellsY}
        bgAlterStrideX={4}
        bgInvert={bgInvert}
      />
      <GridTonicHighlighter ny={numCellsY} className="absolute-full" />
      <NotesLayer stepsRange={stepsRange} isPrimaryNotes={isPrimaryNotes} />
    </div>
  );
};

const StepsEditorRootInner = () => {
  const { patternLength, currentPageIndex } = store.useSnapshot();
  if (patternLength === 4) {
    return (
      <div class="flex-h">
        <StepsBarEditor stepsRange={{ offset: 0, length: 4 }} isPrimaryNotes />
        <StepsBarEditor stepsRange={{ offset: 0, length: 4 }} bgInvert />
        <StepsBarEditor stepsRange={{ offset: 0, length: 4 }} />
        <StepsBarEditor stepsRange={{ offset: 0, length: 4 }} bgInvert />
      </div>
    );
  } else if (patternLength === 8) {
    return (
      <div class="flex-h">
        <StepsBarEditor stepsRange={{ offset: 0, length: 8 }} isPrimaryNotes />
        <StepsBarEditor stepsRange={{ offset: 0, length: 8 }} />
      </div>
    );
  } else if (patternLength === 16) {
    return (
      <StepsBarEditor stepsRange={{ offset: 0, length: 16 }} isPrimaryNotes />
    );
  } else if (patternLength === 32 || patternLength === 64) {
    return (
      <StepsBarEditor
        stepsRange={{ offset: currentPageIndex * 16, length: 16 }}
        isPrimaryNotes
      />
    );
  }
};

function calculateNotesCenter(notes: Note[]) {
  let minPitch = notes[0].pitch;
  let maxPitch = notes[0].pitch;
  for (const note of notes) {
    if (note.pitch < minPitch) minPitch = note.pitch;
    if (note.pitch > maxPitch) maxPitch = note.pitch;
  }
  const midPitch = (minPitch + maxPitch) / 2;
  const { editorHeight, stepCellHeight } = uiConfigs;
  return editorHeight - (midPitch + 0.5) * stepCellHeight;
}

function useSetInitialScrollPosition(baseDivRef: RefObject<HTMLDivElement>) {
  const { stateLoadRevision, notes } = store.useSnapshot();
  useEffect(() => {
    const el = baseDivRef.current;
    if (el) {
      const centerY =
        notes.length > 0 ? calculateNotesCenter(notes) : el.scrollHeight / 2;
      el.scrollTop = centerY - el.clientHeight / 2;
    }
  }, [stateLoadRevision]);
}

const IndexColumn = () => {
  return (
    <div
      class={cz(
        "w-44px h-full flex-v flex-col-reverse bg-neutral-600 bd-neutral-800",
        "[&>div]:(flex-1 min-h-0 flex-c)",
      )}
      style={{ height: uiConfigs.editorHeight }}
    >
      {seqNumbers(uiConfigs.numCellsY).map((_, i) => {
        const isTonic = i % 7 === 0;
        const tonicIndex = Math.floor(i / 7) - 1;
        return (
          <div key={i}>
            {isTonic ? `R${tonicIndex > 0 ? "+" : ""}${tonicIndex}` : undefined}
          </div>
        );
      })}
    </div>
  );
};

export const StepsEditorRoot = () => {
  const baseDivRef = useRef<HTMLDivElement>(null);
  useSetInitialScrollPosition(baseDivRef);
  return (
    <div
      ref={baseDivRef}
      class="h-[300px] overflow-x-hidden overflow-y-scroll"
      onWheel={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div className="flex-h">
        <IndexColumn />
        <StepsEditorRootInner />
        <div class="border-0.5px border-#222" />
      </div>
    </div>
  );
};
