import { clampValue, seqNumbers } from "mofur/ax";
import { npx, startDragSession } from "mofur/ax-ui";
import { generateRandomId } from "mofur/mo";
import { ScalerBoxAutoSized } from "mofur/mo-react";
import {
  createSelectorOptions,
  GeneralSelector,
  Knob,
} from "mofur-components/mono2";
import { CSSProperties, useState } from "react";
import { LabeledRow } from "@/components";
import { store } from "@/store";
import { DraftNote, Note } from "@/types";

const sortNotes = (notes: Note[]) =>
  [...notes].sort((a, b) => {
    if (a.lane !== b.lane) {
      return a.lane - b.lane;
    }
    if (a.position !== b.position) {
      return a.position - b.position;
    }
    return a.duration - b.duration;
  });

const configs = {
  minPitch: 0,
  maxPitch: 8,
  pitchDragStepPx: 24,
  clickMoveThresholdPx: 6,
  stepCount: 8,
  cellWidthPx: 30,
  defaultInsertedPitch: 0,
};

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
        lane: draftNote.lane,
        position: draftNote.position,
        duration: draftNote.duration,
        relNoteNumber: draftNote.relNoteNumber,
      };
      return sortNotes([...prev, nextNote]);
    });
    store.mutations.setDraftNote(() => null);
  },
};

type LaneCellBox = {
  stepWidth: number;
  note?: Note;
};

const useLaneCellBoxes = (lane: number): LaneCellBox[] => {
  const { notes, draftNote } = store.useSnapshot();
  const laneNotes = sortNotes(
    notes
      .filter((n) => n.lane === lane)
      .concat(draftNote && draftNote.lane === lane ? [draftNote] : []),
  );
  const boxes: LaneCellBox[] = [];
  let pos = 0;
  let noteIndex = 0;
  while (pos < configs.stepCount) {
    const note = laneNotes[noteIndex];
    if (note && note.position === pos) {
      boxes.push({
        stepWidth: note.duration,
        note,
      });
      noteIndex++;
      pos += note.duration;
    } else {
      boxes.push({
        stepWidth: 1,
        note: undefined,
      });
      pos++;
    }
  }
  return boxes;
};

const getMaxDurationForPosition = (
  notes: Note[],
  lane: number,
  position: number,
) => {
  const nextNote = notes
    .filter((note) => note.lane === lane && note.position > position)
    .sort((a, b) => a.position - b.position)[0];
  const laneEnd = nextNote ? nextNote.position : configs.stepCount;
  return Math.max(1, laneEnd - position);
};

function styleLaneCell(
  stepWidth: number,
  variant: "empty" | "note" | "draft",
): CSSProperties {
  const background =
    variant === "draft" ? "#f8d66d" : variant === "note" ? "#aae" : "#fff";
  return {
    width: npx(stepWidth * configs.cellWidthPx),
    height: npx(30),
    border: "solid 1px #ccc",
    background,
    paddingLeft: npx(4),
    display: "flex",
    alignItems: "center",
  };
}

const toneNames = ["R0", "T0", "F0", "S0", "R1", "T1", "F1", "S1", "R2"];

const toneNameOptions = createSelectorOptions([
  ["8", "8"],
  ["7", "7"],
  ["6", "6"],
  ["5", "5"],
  ["4", "4"],
  ["3", "3"],
  ["2", "2"],
  ["1", "1"],
  ["0", "0"],
  ["x", "x"],
]);

const LaneCellWithSelector = ({ note }: { note: Note }) => {
  const handleChange = (value: string) => {
    if (value === "x") {
      actions.removeNote(note.id);
      return;
    }
    actions.setNotePitch(note.id, Number(value));
  };

  return (
    <div
      style={{
        ...styleLaneCell(
          note.duration,
          note.id.startsWith("draft-") ? "draft" : "note",
        ),
        paddingLeft: npx(0),
      }}
    >
      <GeneralSelector
        options={toneNameOptions}
        value={String(note.relNoteNumber)}
        onChange={handleChange}
        className="w-full"
        style={{
          color: note.relNoteNumber % 4 === 0 ? "blue" : "black",
        }}
      />
    </div>
  );
};

const LaneCellByDragPitch = ({ note }: { note: Note }) => {
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = (e0: React.PointerEvent) => {
    const dragState = {
      startPitch: note.relNoteNumber,
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
        if (dist < configs.clickMoveThresholdPx) {
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
        cursor: dragging ? "ns-resize" : "grab",
        touchAction: "none",
        userSelect: "none",
      }}
      onPointerDown={handlePointerDown}
    >
      {toneNames[note.relNoteNumber]}
    </div>
  );
};

const DummyLaneCell = ({
  lane,
  position,
}: {
  lane: number;
  position: number;
}) => {
  const { notes } = store.useSnapshot();
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = (e0: React.PointerEvent) => {
    const cellLeft = e0.currentTarget.getBoundingClientRect().left;
    const maxDuration = getMaxDurationForPosition(notes, lane, position);
    const draftNoteId = crypto.randomUUID();

    actions.setDraftNote({
      id: `draft-${draftNoteId}`,
      pointerId: e0.pointerId,
      lane,
      position,
      duration: 1,
      relNoteNumber: configs.defaultInsertedPitch,
    });

    startDragSession(e0.nativeEvent, {
      onMove({ position: currentPosition }) {
        const localX = currentPosition.x - cellLeft;
        const duration = clampValue(
          Math.floor(localX / configs.cellWidthPx) + 1,
          1,
          maxDuration,
        );
        store.mutations.setDraftNote((currentDraft) => {
          if (!currentDraft || currentDraft.pointerId !== e0.pointerId) {
            return currentDraft;
          }
          return {
            ...currentDraft,
            duration,
          };
        });
      },
      onUp() {
        actions.commitDraftNote();
        setDragging(false);
      },
      onCancel() {
        actions.setDraftNote(null);
        setDragging(false);
      },
    });
    setDragging(true);
  };

  return (
    <div
      style={{
        ...styleLaneCell(1, "empty"),
        cursor: dragging ? "ew-resize" : "cell",
        touchAction: "none",
        userSelect: "none",
      }}
      onPointerDown={handlePointerDown}
    />
  );
};

const SequenceLane = ({ lane }: { lane: number }) => {
  const LaneCell = 1 ? LaneCellWithSelector : LaneCellByDragPitch;
  const cellBoxes = useLaneCellBoxes(lane);
  let position = 0;
  return (
    <div className="flex">
      {cellBoxes.map((box, i) => {
        const cell = box.note ? (
          <LaneCell key={i.toString()} note={box.note} />
        ) : (
          <DummyLaneCell key={i.toString()} lane={lane} position={position} />
        );
        position += box.stepWidth;
        return cell;
      })}
    </div>
  );
};

export const octaveShiftOptions = createSelectorOptions(
  seqNumbers(7).map((i) => [i - 3, `${i - 3}`]),
);

const ControlsSection = () => {
  const st = store.useSnapshot();
  return (
    <div className="flex-ha gap-2 justify-between">
      <LabeledRow label="octave">
        <GeneralSelector
          options={octaveShiftOptions}
          value={st.octaveShift}
          onChange={store.setOctaveShift}
          reverseOptionsOrder
        />
      </LabeledRow>
      <LabeledRow label="duty">
        <div className="w-[24px] h-[24px]">
          <ScalerBoxAutoSized>
            <Knob
              value={st.noteDuty}
              min={0}
              max={1}
              step={0.01}
              onChange={store.setNoteDuty}
            />
          </ScalerBoxAutoSized>
        </div>
      </LabeledRow>
    </div>
  );
};

export const SequenceEditorView = () => {
  return (
    <div className="flex-v gap-2 bg-white p-2">
      <ControlsSection />
      <div>
        <SequenceLane lane={0} />
        <SequenceLane lane={1} />
        <SequenceLane lane={2} />
      </div>
    </div>
  );
};
