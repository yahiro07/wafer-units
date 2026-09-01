import { cz } from "@/common/css-realm";
import { GridBackground } from "@/components/grid-background";
import { Note } from "@/defs/definitions";
import { mapPitchIndexToPitchName } from "@/defs/pitch-names";

import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { DragHandlerEvent, startDragSession } from "@/utils/drag-session";
import { bottomLimit, clampValue, seqNumbers } from "@/utils/helpers";
import { useRef } from "preact/hooks";

const uiConfigs = {
  stepCellWidth: 48,
  stepCellHeight: 28,
  numPitches: 37,
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

const rangeHelper = {
  minX(stepsRange: StepsRange) {
    return stepsRange.offset;
  },
  maxX(stepsRange: StepsRange) {
    return stepsRange.offset + stepsRange.length - 1;
  },
  endX(stepsRange: StepsRange) {
    return stepsRange.offset + stepsRange.length;
  },
  noteOverlaps(note: Note, stepsRange: StepsRange) {
    const rangeStart = stepsRange.offset;
    const rangeEnd = rangeHelper.endX(stepsRange);
    return (
      note.position < rangeEnd && note.position + note.duration > rangeStart
    );
  },
};

const cellHelper = {
  fromPointer(pos: { x: number; y: number }, stepsRange: StepsRange): Cell {
    return {
      x: clampValue(
        stepsRange.offset + Math.floor(pos.x / uiConfigs.stepCellWidth),
        rangeHelper.minX(stepsRange),
        rangeHelper.maxX(stepsRange),
      ),
    };
  },
  fromEvent(e: PointerEvent, stepsRange: StepsRange): Cell {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    return cellHelper.fromPointer(
      { x: e.clientX - rect.left, y: e.clientY - rect.top },
      stepsRange,
    );
  },
};

const maskSubIndicesMajor = [1, 3, 6, 8, 10];
const maskSubIndicesMinor = [1, 4, 6, 9, 11];

const pitchHelper = {
  clamp(y: number) {
    return clampValue(y, 0, uiConfigs.numPitches - 1);
  },
  isOutOfScale(pitch: number, root: number, mode: "major" | "minor") {
    const maskSubIndices =
      mode === "major" ? maskSubIndicesMajor : maskSubIndicesMinor;
    return maskSubIndices.includes((pitch - root + 24) % 12);
  },
  diatonicPitches(root: number, mode: "major" | "minor") {
    return seqNumbers(uiConfigs.numPitches).filter(
      (p) => !pitchHelper.isOutOfScale(p, root, mode),
    );
  },
  fromDrag(startY: number, currentY: number, basePitch: number) {
    const numRows = (store.state.patternLength / 16) >>> 0;
    const rowHeight = 360 / numRows;
    const numPitchesY =
      uiConfigs.numPitches *
      (store.state.editScaleMode === "diatonic" ? 7 / 12 : 1);
    const pitchYDragStep = bottomLimit(rowHeight / numPitchesY, 5);
    const delta = Math.round((startY - currentY) / pitchYDragStep);
    if (store.state.editScaleMode !== "diatonic") {
      return pitchHelper.clamp(basePitch + delta);
    }
    const { root, mode } = store.state.keySpec;
    const allowed = pitchHelper.diatonicPitches(root, mode);
    let idx = allowed.indexOf(basePitch);
    if (idx < 0) {
      idx = 0;
      let best = Infinity;
      for (let i = 0; i < allowed.length; i++) {
        const d = Math.abs(allowed[i] - basePitch);
        if (d < best) {
          best = d;
          idx = i;
        }
      }
    }
    return allowed[clampValue(idx + delta, 0, allowed.length - 1)];
  },
  previewIfChanged(pitch: number) {
    if (pitch !== store.state.latestPitchIndex) {
      actions.previewTone(pitch);
    }
  },
  stopPreview() {
    actions.previewTone(-1);
  },
};

const hitHelper = {
  noteAt(notes: Note[], cell: Cell): Note | undefined {
    let hit: Note | undefined;
    for (const note of notes) {
      if (note.position <= cell.x && cell.x < note.position + note.duration) {
        hit = note;
      }
    }
    return hit;
  },
  nextId(notes: Note[]) {
    return notes.length > 0 ? Math.max(...notes.map((note) => note.id)) + 1 : 0;
  },
  isResizeGrab(note: Note, cell: Cell) {
    return note.duration > 1 && cell.x === note.position + note.duration - 1;
  },
};

const previewHelper = {
  create(
    id: number,
    start: Cell,
    current: Cell,
    pitch: number,
    stepsRange: StepsRange,
  ): Note {
    const left = clampValue(
      Math.min(start.x, current.x),
      rangeHelper.minX(stepsRange),
      rangeHelper.maxX(stepsRange),
    );
    const right = clampValue(
      Math.max(start.x, current.x),
      rangeHelper.minX(stepsRange),
      rangeHelper.maxX(stepsRange),
    );
    return {
      id,
      position: left,
      duration: right - left + 1,
      pitch,
    };
  },
  move(
    original: Note,
    start: Cell,
    current: Cell,
    pitch: number,
    stepsRange: StepsRange,
  ): Note {
    let position = original.position + (current.x - start.x);
    const minX = rangeHelper.minX(stepsRange);
    const maxEnd = rangeHelper.endX(stepsRange);
    if (position < minX) position = minX;
    if (position + original.duration > maxEnd) {
      position = maxEnd - original.duration;
    }
    return {
      ...original,
      position,
      pitch,
    };
  },
  resize(
    original: Note,
    start: Cell,
    current: Cell,
    stepsRange: StepsRange,
  ): Note {
    let duration = original.duration + (current.x - start.x);
    const maxEnd = rangeHelper.endX(stepsRange);
    if (original.position + duration > maxEnd) {
      duration = maxEnd - original.position;
    }
    return {
      ...original,
      duration,
    };
  },
  begin(note: Note) {
    store.setPreviewNote(note);
    actions.previewTone(note.pitch);
  },
  commit(preview: Note | null, originalId: number) {
    if (!preview || preview.duration < 1) {
      store.setNotes((prev) => prev.filter((note) => note.id !== originalId));
    } else {
      store.setNotes((prev) =>
        prev.map((note) => (note.id === preview.id ? preview : note)),
      );
    }
  },
  clear() {
    store.setPreviewNote(null);
  },
};

const tapHelper = {
  isTap(ev: DragHandlerEvent, t0: number) {
    const distance = Math.hypot(
      ev.position.x - ev.originalPosition.x,
      ev.position.y - ev.originalPosition.y,
    );
    const elapsed = performance.now() - t0;
    return (
      distance <= tapConfigs.maxDistance && elapsed <= tapConfigs.maxDurationMs
    );
  },
  deleteNote(id: number) {
    store.setNotes((prev) => prev.filter((note) => note.id !== id));
    previewHelper.clear();
  },
};

const dragSessionOptions = { coordinate: "relative" as const };

const sharedDragCallbacks = {
  onCancel() {
    previewHelper.clear();
  },
  onUpOrCancel() {
    pitchHelper.stopPreview();
  },
};

const editModeHandlers = {
  create(e: PointerEvent, stepsRange: StepsRange, startCell: Cell) {
    const originalNote: Note = {
      id: hitHelper.nextId(store.state.notes),
      position: startCell.x,
      pitch: store.state.latestPitchIndex,
      duration: 1,
    };
    previewHelper.begin(originalNote);
    startDragSession(
      e,
      {
        ...sharedDragCallbacks,
        onMove(ev) {
          const current = cellHelper.fromPointer(ev.position, stepsRange);
          const pitch = pitchHelper.fromDrag(
            ev.originalPosition.y,
            ev.position.y,
            originalNote.pitch,
          );
          pitchHelper.previewIfChanged(pitch);
          store.setPreviewNote(
            previewHelper.create(
              originalNote.id,
              startCell,
              current,
              pitch,
              stepsRange,
            ),
          );
        },
        onUp() {
          const preview = store.state.previewNote;
          if (preview && preview.duration >= 1) {
            store.setNotes((prev) => [...prev, preview]);
          }
          previewHelper.clear();
        },
      },
      dragSessionOptions,
    );
  },
  move(
    e: PointerEvent,
    stepsRange: StepsRange,
    startCell: Cell,
    originalNote: Note,
  ) {
    const t0 = performance.now();
    previewHelper.begin({ ...originalNote });
    startDragSession(
      e,
      {
        ...sharedDragCallbacks,
        onMove(ev) {
          const current = cellHelper.fromPointer(ev.position, stepsRange);
          const pitch = pitchHelper.fromDrag(
            ev.originalPosition.y,
            ev.position.y,
            originalNote.pitch,
          );
          pitchHelper.previewIfChanged(pitch);
          store.setPreviewNote(
            previewHelper.move(
              originalNote,
              startCell,
              current,
              pitch,
              stepsRange,
            ),
          );
        },
        onUp(ev) {
          if (tapHelper.isTap(ev, t0)) {
            tapHelper.deleteNote(originalNote.id);
            return;
          }
          previewHelper.commit(store.state.previewNote, originalNote.id);
          previewHelper.clear();
        },
      },
      dragSessionOptions,
    );
  },
  resize(
    e: PointerEvent,
    stepsRange: StepsRange,
    startCell: Cell,
    originalNote: Note,
  ) {
    const t0 = performance.now();
    previewHelper.begin({ ...originalNote });
    startDragSession(
      e,
      {
        ...sharedDragCallbacks,
        onMove(ev) {
          const current = cellHelper.fromPointer(ev.position, stepsRange);
          store.setPreviewNote(
            previewHelper.resize(originalNote, startCell, current, stepsRange),
          );
        },
        onUp(ev) {
          if (tapHelper.isTap(ev, t0)) {
            tapHelper.deleteNote(originalNote.id);
            return;
          }
          previewHelper.commit(store.state.previewNote, originalNote.id);
          previewHelper.clear();
        },
      },
      dragSessionOptions,
    );
  },
};

function handleStepsBarEditorPointerDown(
  e: PointerEvent,
  stepsRange: StepsRange,
) {
  if (e.button !== 0) return;
  const startCell = cellHelper.fromEvent(e, stepsRange);
  const hit = hitHelper.noteAt(store.state.notes, startCell);
  if (!hit) {
    editModeHandlers.create(e, stepsRange, startCell);
    return;
  }
  if (hitHelper.isResizeGrab(hit, startCell)) {
    editModeHandlers.resize(e, stepsRange, startCell, hit);
  } else {
    editModeHandlers.move(e, stepsRange, startCell, hit);
  }
}

const NotesLayer = ({
  stepsRange,
  isPrimaryNotes,
}: {
  stepsRange: StepsRange;
  isPrimaryNotes: boolean;
}) => {
  const { notes, previewNote, octaveShift } = store.useSnapshot();
  const { stepCellWidth, stepCellHeight } = uiConfigs;
  const visibleNotes = notes.filter(
    (note) =>
      note.duration >= 1 &&
      note.id !== previewNote?.id &&
      rangeHelper.noteOverlaps(note, stepsRange),
  );
  const displayNotes =
    previewNote &&
    previewNote.duration >= 1 &&
    rangeHelper.noteOverlaps(previewNote, stepsRange)
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
            bottom: `calc(${note.pitch} / ${uiConfigs.numPitches - 1} * (100% - ${stepCellHeight}px))`,
            width: note.duration * stepCellWidth,
            height: stepCellHeight,
          }}
        >
          {mapPitchIndexToPitchName(note.pitch + octaveShift * 12)}
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
  return <div class="w-18px h-44px bd-#888"></div>;
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
