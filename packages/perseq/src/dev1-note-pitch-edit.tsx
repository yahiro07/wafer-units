import { clampValue } from "mofur/ax";
import { npx, startDragSession } from "mofur/ax-ui";
import { generateRandomId } from "mofur/mo";
import { CSSProperties, useState } from "react";
import { createStore } from "snap-store";
import { GridBackground } from "@/components/grid-background";

export type Note = {
  id: string;
  relNoteNumber: number;
  position: number;
  duration: number;
};

type DraftNote = Note & {
  pointerId: number;
  startPosition: number;
  startPitch: number;
};

const defaultNotes: Note[] = 0
  ? [
      { id: "n0", relNoteNumber: 0, position: 0, duration: 2 },
      { id: "n1", relNoteNumber: 4, position: 2, duration: 2 },
      { id: "n2", relNoteNumber: 8, position: 4, duration: 4 },
      { id: "n3", relNoteNumber: 6, position: 4, duration: 4 },
      // { id: "n4", relNoteNumber: 0, position: 8, duration: 8 },
    ]
  : [];

const store = createStore<{ notes: Note[]; draftNote: DraftNote | null }>({
  notes: defaultNotes,
  draftNote: null,
});

const sortNotes = (notes: Note[]) =>
  [...notes].sort((a, b) => {
    if (a.position !== b.position) {
      return a.position - b.position;
    }
    return a.duration - b.duration;
  });

const configs = {
  minPitch: 0,
  maxPitch: 21,
  pitchDragStepPx: 7,
  clickMoveThresholdPx: 6,
  stepCount: 16,
  cellWidthPx: 30,
  noteHeight: 32,
  yCount: 4,
  editAreaHeight: 140,
  pixelYPerPitch: 5,
  yCenterOffsetRate: 0.85,
};

const getCellMetrics = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    cellWidth: rect.width / configs.stepCount,
    cellHeight: rect.height / configs.yCount,
  };
};

const getCellPositionFromClientX = (
  clientX: number,
  metrics: ReturnType<typeof getCellMetrics>,
) => {
  const rawPosition = Math.floor((clientX - metrics.left) / metrics.cellWidth);
  return clampValue(rawPosition, 0, configs.stepCount - 1);
};

const getPitchFromClientY = (
  clientY: number,
  metrics: ReturnType<typeof getCellMetrics>,
) => {
  const localY = clientY - metrics.top;
  const unscaledY = (localY / metrics.height) * configs.editAreaHeight;
  const visualPitch =
    (configs.editAreaHeight * configs.yCenterOffsetRate - unscaledY) /
    configs.pixelYPerPitch;
  return clampValue(
    Math.round(visualPitch),
    configs.minPitch,
    configs.maxPitch,
  );
};

function calcNoteTopY(relNoteNumber: number) {
  return (
    configs.editAreaHeight * configs.yCenterOffsetRate -
    relNoteNumber * configs.pixelYPerPitch -
    configs.noteHeight / 2
  );
}

const actions = {
  setNotePitch(id: string, pitch: number) {
    store.mutations.setNotes((prev) => {
      return prev.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            relNoteNumber: clampValue(
              pitch,
              configs.minPitch,
              configs.maxPitch,
            ),
          };
        }
        return note;
      });
    });
  },
  removeNote(id: string) {
    store.mutations.setNotes((prev) => {
      return prev.filter((note) => note.id !== id);
    });
  },
  setDraftNote(draftNote: DraftNote | null) {
    store.mutations.setDraftNote(() => draftNote);
  },
  commitDraftNote() {
    const { draftNote } = store.state;
    if (!draftNote) {
      return;
    }
    store.mutations.setNotes((prev) => {
      const nextNote: Note = {
        id: generateRandomId(6),
        position: draftNote.position,
        duration: draftNote.duration,
        relNoteNumber: draftNote.relNoteNumber,
      };
      return sortNotes([...prev, nextNote]);
    });
    store.mutations.setDraftNote(() => null);
  },
};

function styleLaneCell(
  stepWidth: number,
  variant: "empty" | "note" | "draft",
): CSSProperties {
  const background =
    variant === "draft" ? "#aae2" : variant === "note" ? "#aae8" : "#fff";
  return {
    width: npx(stepWidth * configs.cellWidthPx),
    height: npx(configs.noteHeight),
    border: "solid 1px #aae",
    background,
    paddingLeft: npx(8),
    display: "flex",
    alignItems: "center",
  };
}

function getPitchDisplayText(relNoteNumber: number): string {
  return ((relNoteNumber % 7) + 1).toString();
}

const LaneCell = ({ note }: { note: Note }) => {
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = (e0: React.PointerEvent) => {
    e0.stopPropagation();

    const dragState = {
      startPitch: note.relNoteNumber,
      startTime: Date.now(),
    };
    startDragSession(e0.nativeEvent, {
      onMove({ position, originalPosition }) {
        const deltaY = originalPosition.y - position.y;
        const pitchOffset = Math.round(deltaY / configs.pitchDragStepPx);
        actions.setNotePitch(note.id, dragState.startPitch + pitchOffset);
      },
      onUp({ position, originalPosition }) {
        const dist = Math.hypot(
          originalPosition.x - position.x,
          originalPosition.y - position.y,
        );
        const elapsed = Date.now() - dragState.startTime;
        if (dist < configs.clickMoveThresholdPx && elapsed < 200) {
          actions.removeNote(note.id);
        }
        setDragging(false);
      },
      onCancel() {
        setDragging(false);
      },
    });
    setDragging(true);
  };

  return (
    <div
      style={{
        ...styleLaneCell(
          note.duration,
          note.id.startsWith("draft-") ? "draft" : "note",
        ),
        position: "absolute",
        left: npx(note.position * configs.cellWidthPx),
        top: npx(calcNoteTopY(note.relNoteNumber)),
        cursor: dragging ? "ns-resize" : "grab",
        touchAction: "none",
        userSelect: "none",
      }}
      onPointerDown={handlePointerDown}
    >
      {getPitchDisplayText(note.relNoteNumber)}
    </div>
  );
};

const DraftLaneCell = ({ note }: { note: DraftNote }) => {
  return (
    <div
      style={{
        ...styleLaneCell(note.duration, "draft"),
        position: "absolute",
        left: npx(note.position * configs.cellWidthPx),
        top: npx(calcNoteTopY(note.relNoteNumber)),
        pointerEvents: "none",
      }}
    >
      {getPitchDisplayText(note.relNoteNumber)}
    </div>
  );
};

export const SequenceEditorView = () => {
  const { notes, draftNote } = store.useSnapshot();

  const handlePointerDown = (e0: React.PointerEvent) => {
    if (e0.target !== e0.currentTarget) {
      return;
    }
    const metrics = getCellMetrics(e0.currentTarget as HTMLElement);
    const startPosition = getCellPositionFromClientX(e0.clientX, metrics);
    const relNoteNumber = getPitchFromClientY(e0.clientY, metrics);

    const updateDraftFromPosition = (currentPosition: number) => {
      store.mutations.setDraftNote((currentDraft) => {
        if (!currentDraft || currentDraft.pointerId !== e0.pointerId) {
          return currentDraft;
        }
        return {
          ...currentDraft,
          position: Math.min(currentDraft.startPosition, currentPosition),
          duration: Math.abs(currentPosition - currentDraft.startPosition) + 1,
        };
      });
    };

    const updateDraftPitchFromPosition = (currentY: number) => {
      store.mutations.setDraftNote((currentDraft) => {
        if (!currentDraft || currentDraft.pointerId !== e0.pointerId) {
          return currentDraft;
        }
        return {
          ...currentDraft,
          relNoteNumber: getPitchFromClientY(currentY, metrics),
        };
      });
    };

    actions.setDraftNote({
      id: `draft-${generateRandomId(6)}`,
      pointerId: e0.pointerId,
      startPosition,
      position: startPosition,
      duration: 1,
      relNoteNumber,
      startPitch: relNoteNumber,
    });

    startDragSession(e0.nativeEvent, {
      onMove({ position }) {
        const currentPosition = getCellPositionFromClientX(position.x, metrics);
        updateDraftFromPosition(currentPosition);
        updateDraftPitchFromPosition(position.y);
      },
      onUp({ position }) {
        const currentPosition = getCellPositionFromClientX(position.x, metrics);
        updateDraftFromPosition(currentPosition);
        if (currentPosition < startPosition) {
          actions.setDraftNote(null);
          return;
        }
        actions.commitDraftNote();
      },
      onCancel() {
        actions.setDraftNote(null);
      },
    });
  };
  return (
    <div className="bg-white p-4">
      <div
        className="relative"
        style={{
          width: npx(configs.stepCount * configs.cellWidthPx),
          height: npx(configs.editAreaHeight),
        }}
        onPointerDown={handlePointerDown}
      >
        <GridBackground
          nx={configs.stepCount}
          ny={configs.yCount}
          width={configs.stepCount * configs.cellWidthPx}
          height={configs.editAreaHeight}
          bgAlterStrideX={2}
          dotsInterval={2}
        />
        {notes.map((note) => (
          <LaneCell key={note.id} note={note} />
        ))}
        {draftNote ? <DraftLaneCell note={draftNote} /> : null}
      </div>
    </div>
  );
};
