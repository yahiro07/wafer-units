import { cz } from "@/common/css-realm";
import { GridBackground } from "@/components/grid-background";
import { Note } from "@/defs/definitions";

import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { startDragSession } from "@/utils/drag-session";
import { clampValue, seqNumbers } from "@/utils/helpers";
import { useRef } from "preact/hooks";

const uiConfigs = {
  stepCellWidth: 48,
  stepCellHeight: 28,
  numPitches: 25,
  pitchYDragStep: 4,
};

const tapConfigs = {
  maxDistance: 8,
  maxDurationMs: 250,
};

type StepsRange = {
  offset: number;
  length: number;
};

type Cell = { x: number };
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

function clampPitch(y: number) {
  return clampValue(y, 0, uiConfigs.numPitches - 1);
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
  };
}

function pitchFromDrag(startY: number, currentY: number, basePitch: number) {
  const delta = Math.round((startY - currentY) / uiConfigs.pitchYDragStep);
  return clampPitch(basePitch + delta);
}

function hitTestNote(notes: Note[], cell: Cell): Note | undefined {
  let hit: Note | undefined;
  for (const note of notes) {
    if (note.position <= cell.x && cell.x < note.position + note.duration) {
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
  pitch: number,
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
    pitch,
  };
}

function makeMovePreview(
  original: Note,
  start: Cell,
  current: Cell,
  pitch: number,
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
    pitch,
  };
}

function makeResizePreview(
  original: Note,
  start: Cell,
  current: Cell,
  pitch: number,
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
    pitch,
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
  let startCell: Cell = { x: 0 };
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
            pitch: store.state.latestPitchIndex,
            duration: 1,
          };
          store.setPreviewNote(originalNote);
          actions.previewTone(originalNote.pitch);
          return;
        }
        mode = isResizeGrab(hit, startCell) ? "resize" : "move";
        originalNote = hit;
        store.setPreviewNote({ ...hit });
        actions.previewTone(hit.pitch);
      },
      onMove(ev) {
        if (!originalNote) return;
        const current = cellFromPointer(ev.position, stepsRange);
        const pitch = pitchFromDrag(
          ev.originalPosition.y,
          ev.position.y,
          originalNote.pitch,
        );
        if (pitch !== store.state.latestPitchIndex) {
          actions.previewTone(pitch);
        }
        if (mode === "create") {
          store.setPreviewNote(
            makeCreatePreview(
              originalNote.id,
              startCell,
              current,
              pitch,
              stepsRange,
            ),
          );
        } else if (mode === "move") {
          store.setPreviewNote(
            makeMovePreview(
              originalNote,
              startCell,
              current,
              pitch,
              stepsRange,
            ),
          );
        } else {
          store.setPreviewNote(
            makeResizePreview(
              originalNote,
              startCell,
              current,
              pitch,
              stepsRange,
            ),
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
      onUpOrCancel() {
        actions.previewTone(-1);
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
        styleNotesLayer.base,
        isPrimaryNotes && "primary",
        !isPrimaryNotes && "secondary",
      )}
    >
      {displayNotes.map((note) => (
        <div
          key={note.id}
          style={{
            left: (note.position - stepsRange.offset) * stepCellWidth,
            bottom: note.pitch * stepCellHeight * 0.02,
            width: note.duration * stepCellWidth,
            height: stepCellHeight,
          }}
        >
          {note.pitch}
        </div>
      ))}
    </div>
  );
};
const styleNotesLayer = {
  base: cz(
    "absolute-full flex-h",
    "[&>div]:(absolute flex-ha pl-1 text-white)",
    "[&.primary>div]:(bd-#4cf bg-#4cf8)",
    "[&.secondary>div]:(bd-#9ab bg-#cde5)",
  ),
};

const StepsBarEditor = ({
  stepsRange,
  height,
  bgInvert,
  isPrimaryNotes = false,
}: {
  stepsRange: StepsRange;
  height: number;
  bgInvert?: boolean;
  isPrimaryNotes?: boolean;
}) => {
  const nx = stepsRange.length;
  const { stepCellWidth } = uiConfigs;
  return (
    <div
      class="relative touch-none"
      style={{ width: stepCellWidth * nx, height }}
      onPointerDown={(e) => handleStepsBarEditorPointerDown(e, stepsRange)}
    >
      <GridBackground nx={nx} ny={1} bgAlterStrideX={4} bgInvert={bgInvert} />
      <NotesLayer stepsRange={stepsRange} isPrimaryNotes={isPrimaryNotes} />
    </div>
  );
};

const HeadIndicator = () => {
  return <div class="w-12px h-40px bd-#888"></div>;
};

const StepsEditorRootInner = () => {
  const { patternLength } = store.useSnapshot();
  const numRows = (patternLength / 16) >>> 0;
  const height = 360 / numRows;
  return (
    <div class={cz("flex-v", numRows === 8 ? "gap-1" : "gap-2")}>
      {seqNumbers(numRows).map((i) => {
        return (
          <div class="flex-ha gap-2">
            <HeadIndicator />
            <StepsBarEditor
              stepsRange={{ offset: i * 16, length: 16 }}
              isPrimaryNotes
              height={height}
            />
          </div>
        );
      })}
    </div>
  );
};

export const StepsEditorRoot = () => {
  const baseDivRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={baseDivRef}>
      <div className="flex-h">
        <StepsEditorRootInner />
        <div class="border-0.5px border-#222" />
      </div>
    </div>
  );
};
