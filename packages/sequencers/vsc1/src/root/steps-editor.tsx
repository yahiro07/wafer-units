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
  overlapX(a: Note, b: Note) {
    return (
      a.position < b.position + b.duration &&
      a.position + a.duration > b.position
    );
  },
};

const cellHelper = {
  pointerPos(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  },
  stepXFromPointer(pos: { x: number }, stepsRange: StepsRange) {
    return stepsRange.offset + pos.x / uiConfigs.stepCellWidth;
  },
  fromPointer(
    pos: { x: number; y: number },
    stepsRange: StepsRange,
    overflow?: "right" | "both",
  ): Cell {
    const x = Math.floor(cellHelper.stepXFromPointer(pos, stepsRange));
    if (overflow === "both") {
      return { x };
    }
    if (overflow === "right") {
      return { x: Math.max(x, rangeHelper.minX(stepsRange)) };
    }
    return {
      x: clampValue(
        x,
        rangeHelper.minX(stepsRange),
        rangeHelper.maxX(stepsRange),
      ),
    };
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
  nearestAllowed(pitch: number) {
    const { root, mode } = store.state.keySpec;
    const allowed = pitchHelper.diatonicPitches(root, mode);
    let idx = 0;
    let best = Infinity;
    for (let i = 0; i < allowed.length; i++) {
      const d = Math.abs(allowed[i] - pitch);
      if (d < best) {
        best = d;
        idx = i;
      }
    }
    return allowed[idx];
  },
  fromPointerY(y: number, height: number) {
    const h = uiConfigs.stepCellHeight;
    const n = uiConfigs.numPitches;
    const pitch = pitchHelper.clamp(
      Math.round(((height - y - h / 2) * (n - 1)) / (height - h)),
    );
    if (store.state.editScaleMode !== "diatonic") return pitch;
    return pitchHelper.nearestAllowed(pitch);
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
  nextId(notes: Note[]) {
    return notes.length > 0 ? Math.max(...notes.map((note) => note.id)) + 1 : 0;
  },
  hitTestNote(
    notes: Note[],
    cell: Cell,
    stepX: number,
  ): { note: Note; part: "body" | "tail" } | undefined {
    let bodyHit: { note: Note; part: "body" } | undefined;
    let tailHit: { note: Note; part: "tail" } | undefined;
    for (const note of notes) {
      const x = stepX - (note.position + note.duration);
      if (-0.5 <= x && x <= 0) {
        tailHit = { note, part: "tail" };
      } else if (
        note.position <= cell.x &&
        cell.x < note.position + note.duration
      ) {
        bodyHit = { note, part: "body" };
      }
    }
    return tailHit ?? bodyHit;
  },
};

const previewHelper = {
  create(id: number, start: Cell, current: Cell, pitch: number): Note {
    const patternMaxX = store.state.patternLength - 1;
    const left = Math.max(0, Math.min(start.x, current.x));
    const right = Math.min(patternMaxX, Math.max(start.x, current.x));
    return {
      id,
      position: left,
      duration: right - left + 1,
      pitch,
    };
  },
  move(original: Note, start: Cell, current: Cell, pitch: number): Note {
    let position = original.position + (current.x - start.x);
    if (position < 0) position = 0;
    const maxEnd = store.state.patternLength;
    if (position + original.duration > maxEnd) {
      position = maxEnd - original.duration;
    }
    return {
      ...original,
      position,
      pitch,
    };
  },
  resize(original: Note, start: Cell, current: Cell, pitch: number): Note {
    let duration = original.duration + (current.x - start.x);
    if (duration < 1) duration = 1;
    const maxEnd = store.state.patternLength;
    if (original.position + duration > maxEnd) {
      duration = maxEnd - original.position;
    }
    return {
      ...original,
      duration,
      pitch,
    };
  },
  begin(note: Note) {
    previewHelper.set(note);
    actions.previewTone(note.pitch);
  },
  set(note: Note) {
    const previewOccludedNoteIds = store.state.notes
      .filter((n) => n.id !== note.id && rangeHelper.overlapX(n, note))
      .map((n) => n.id);
    store.assign({ previewNote: note, previewOccludedNoteIds });
  },
  apply(preview: Note) {
    store.setNotes((prev) => [
      ...prev.filter(
        (n) => n.id !== preview.id && !rangeHelper.overlapX(n, preview),
      ),
      preview,
    ]);
  },
  commit(preview: Note | null, originalId: number) {
    if (!preview || preview.duration < 1) {
      store.setNotes((prev) => prev.filter((note) => note.id !== originalId));
    } else {
      previewHelper.apply(preview);
    }
  },
  clear() {
    store.assign({ previewNote: null, previewOccludedNoteIds: [] });
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

const cursorHelper = {
  begin(cursor: "move" | "ew-resize") {
    document.body.style.cursor = cursor;
  },
  end() {
    document.body.style.cursor = "";
  },
};

const dragSessionOptions = { coordinate: "relative" as const };

const sharedDragCallbacks = {
  onCancel() {
    previewHelper.clear();
  },
  onUpOrCancel() {
    cursorHelper.end();
    pitchHelper.stopPreview();
  },
};

const editModeHandlers = {
  create(e: PointerEvent, stepsRange: StepsRange, startCell: Cell) {
    const pos = cellHelper.pointerPos(e);
    const height = (e.currentTarget as HTMLElement).clientHeight;
    const originalNote: Note = {
      id: hitHelper.nextId(store.state.notes),
      position: startCell.x,
      pitch:
        store.state.patternLength === 128
          ? store.state.latestPitchIndex
          : pitchHelper.fromPointerY(pos.y, height),
      duration: 1,
    };
    previewHelper.begin(originalNote);
    startDragSession(
      e,
      {
        ...sharedDragCallbacks,
        onMove(ev) {
          const current = cellHelper.fromPointer(
            ev.position,
            stepsRange,
            "right",
          );
          const pitch = pitchHelper.fromDrag(
            ev.originalPosition.y,
            ev.position.y,
            originalNote.pitch,
          );
          pitchHelper.previewIfChanged(pitch);
          previewHelper.set(
            previewHelper.create(originalNote.id, startCell, current, pitch),
          );
        },
        onUp() {
          const preview = store.state.previewNote;
          if (preview && preview.duration >= 1) {
            previewHelper.apply(preview);
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
    cursorHelper.begin("move");
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
          previewHelper.set(
            previewHelper.move(originalNote, startCell, current, pitch),
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
    cursorHelper.begin("ew-resize");
    startDragSession(
      e,
      {
        ...sharedDragCallbacks,
        onMove(ev) {
          const current = cellHelper.fromPointer(
            ev.position,
            stepsRange,
            "both",
          );
          const pitch = pitchHelper.fromDrag(
            ev.originalPosition.y,
            ev.position.y,
            originalNote.pitch,
          );
          pitchHelper.previewIfChanged(pitch);
          previewHelper.set(
            previewHelper.resize(originalNote, startCell, current, pitch),
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
  const pos = cellHelper.pointerPos(e);
  const startCell = cellHelper.fromPointer(pos, stepsRange);
  const hit = hitHelper.hitTestNote(
    store.state.notes,
    startCell,
    cellHelper.stepXFromPointer(pos, stepsRange),
  );
  if (!hit) {
    editModeHandlers.create(e, stepsRange, startCell);
    return;
  }
  if (hit.part === "tail") {
    const lastCell = {
      x: hit.note.position + hit.note.duration - 1,
    };
    editModeHandlers.resize(e, stepsRange, lastCell, hit.note);
    return;
  }
  editModeHandlers.move(e, stepsRange, startCell, hit.note);
}

const NotesLayer = ({
  stepsRange,
  isPrimaryNotes,
}: {
  stepsRange: StepsRange;
  isPrimaryNotes: boolean;
}) => {
  const { notes, previewNote, previewOccludedNoteIds, octaveShift } =
    store.useSnapshot();
  const { stepCellWidth, stepCellHeight } = uiConfigs;
  const visibleNotes = notes.filter(
    (note) =>
      note.duration >= 1 &&
      note.id !== previewNote?.id &&
      !previewOccludedNoteIds.includes(note.id) &&
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
      {displayNotes.map((note) => {
        const visStart = Math.max(note.position, stepsRange.offset);
        const visEnd = Math.min(
          note.position + note.duration,
          rangeHelper.endX(stepsRange),
        );
        return (
          <div
            key={note.id}
            style={{
              left: (visStart - stepsRange.offset) * stepCellWidth,
              bottom: `calc(${note.pitch} / ${uiConfigs.numPitches - 1} * (100% - ${stepCellHeight}px))`,
              width: (visEnd - visStart) * stepCellWidth,
              height: stepCellHeight,
            }}
          >
            {mapPitchIndexToPitchName(note.pitch + octaveShift * 12)}
          </div>
        );
      })}
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

const HeadIndicator = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      class={cz("w-18px h-44px bd-#888 cursor-pointer", active && "bg-#6cf")}
      onClick={onClick}
    />
  );
};

const StepsEditorRootInner = () => {
  const { patternLength, playHeadIndex } = store.useSnapshot();
  const numRows = (patternLength / 16) >>> 0;
  const height = 360 / numRows;
  return (
    <div class={cz("flex-v", numRows === 8 ? "gap-1" : "gap-2")}>
      {seqNumbers(numRows).map((i) => {
        return (
          <div class="flex-ha gap-2">
            <HeadIndicator
              active={i === playHeadIndex}
              onClick={() => store.setPlayHeadIndex(i)}
            />
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
