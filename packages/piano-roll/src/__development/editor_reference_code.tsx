import { seqNumbers } from "mofur/ax";
import { npx, startDragSession } from "mofur/ax-ui";
import { ScalerBox2 } from "mofur/mo-react";
import {
  Button,
  createSelectorOptions,
  GeneralSelector,
  Knob,
} from "mofur-components/mono2";
import { useState } from "react";
import { GridBackground } from "@/__development/grid-background";
import { LabeledRow } from "@/components";
import { sequencer } from "@/logic/sequencer";
import { store } from "@/store/store";
import { Note } from "@/store/types";

const configs = {
  editorWidth: 320,
  editorHeight: 160,
  stepCount: 16,
  noteRowCount: 9,
  previewVelocity: 100,
};

const noteColors = {
  noteFill: "#9fe581",
  noteBorder: "#478915",
  draftFill: "#4682b473",
  draftBorder: "#4682b4",
  keyBorder: "#cccccc",
  labelText: "#666666",
} as const;

const cellWidth = configs.editorWidth / configs.stepCount;
const cellHeight = configs.editorHeight / configs.noteRowCount;

type DraftNote = {
  pointerId: number;
  startStep: number;
  relativeNoteNumber: number;
  stepDuration: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

type GridPointerMetrics = {
  left: number;
  top: number;
  scaleX: number;
  scaleY: number;
  cellW: number;
  cellH: number;
  actualWidth: number;
  actualHeight: number;
};

const getGridPointerMetrics = (element: HTMLElement): GridPointerMetrics => {
  const rect = element.getBoundingClientRect();
  const actualWidth = element.clientWidth;
  const actualHeight = element.clientHeight;

  return {
    left: rect.left,
    top: rect.top,
    scaleX: rect.width > 0 ? actualWidth / rect.width : 1,
    scaleY: rect.height > 0 ? actualHeight / rect.height : 1,
    cellW: actualWidth / configs.stepCount,
    cellH: actualHeight / configs.noteRowCount,
    actualWidth,
    actualHeight,
  };
};

const getStepIndexFromClientX = (
  clientX: number,
  metrics: GridPointerMetrics,
) => {
  const localX = clamp(
    (clientX - metrics.left) * metrics.scaleX,
    0,
    metrics.actualWidth - 1,
  );
  return clamp(Math.floor(localX / metrics.cellW), 0, configs.stepCount - 1);
};

const getRelativeNoteNumberFromClientY = (
  clientY: number,
  metrics: GridPointerMetrics,
) => {
  const localY = clamp(
    (clientY - metrics.top) * metrics.scaleY,
    0,
    metrics.actualHeight - 1,
  );
  const rowFromTop = Math.floor(localY / metrics.cellH);
  return clamp(
    configs.noteRowCount - 1 - rowFromTop,
    0,
    configs.noteRowCount - 1,
  );
};

const getNoteRect = (note: Note) => {
  const noteY =
    (configs.noteRowCount - 1 - note.relativeNoteNumber) * cellHeight;
  return {
    x: note.stepPosition * cellWidth,
    y: noteY,
    width: note.stepDuration * cellWidth,
    height: cellHeight,
  };
};

const sortNotes = (notes: Note[]) =>
  [...notes].sort((a, b) => {
    if (a.stepPosition !== b.stepPosition) {
      return a.stepPosition - b.stepPosition;
    }
    if (a.relativeNoteNumber !== b.relativeNoteNumber) {
      return b.relativeNoteNumber - a.relativeNoteNumber;
    }
    return a.stepDuration - b.stepDuration;
  });

const notesOverlap = (a: Note, b: Note) =>
  a.stepPosition < b.stepPosition + b.stepDuration &&
  b.stepPosition < a.stepPosition + a.stepDuration;

function useSynthPatternEditorViewPresenter() {
  // const presenter = useCurrentSynthPatternPresenter();
  const { notes } = store.useSnapshot();
  const [draftNote, setDraftNote] = useState<DraftNote | null>(null);

  const coreActions = {
    replaceNotes(notes: Note[]) {
      store.mutations.setNotes(notes);
    },
  };

  const commitNote = (note: Note) => {
    const nextNotes = notes.filter((existingNote) => {
      return !(
        existingNote.relativeNoteNumber === note.relativeNoteNumber &&
        notesOverlap(existingNote, note)
      );
    });
    coreActions.replaceNotes(sortNotes([...nextNotes, note]));
  };

  const deleteNote = (noteToDelete: Note) => {
    coreActions.replaceNotes(
      notes.filter((note) => {
        return !(
          note.relativeNoteNumber === noteToDelete.relativeNoteNumber &&
          note.stepPosition === noteToDelete.stepPosition &&
          note.stepDuration === noteToDelete.stepDuration
        );
      }),
    );
  };

  const updateDraftDuration = (
    pointerId: number,
    clientX: number,
    metrics: GridPointerMetrics,
  ) => {
    setDraftNote((currentDraft) => {
      if (!currentDraft || currentDraft.pointerId !== pointerId) {
        return currentDraft;
      }
      const currentStep = getStepIndexFromClientX(clientX, metrics);
      return {
        ...currentDraft,
        stepDuration: clamp(
          currentStep - currentDraft.startStep + 1,
          1,
          configs.stepCount - currentDraft.startStep,
        ),
      };
    });
  };

  const handlePointerDown = (e0: React.PointerEvent) => {
    const metrics = getGridPointerMetrics(e0.currentTarget as HTMLElement);
    const startStep = getStepIndexFromClientX(e0.clientX, metrics);
    const relativeNoteNumber = getRelativeNoteNumberFromClientY(
      e0.clientY,
      metrics,
    );
    setDraftNote({
      pointerId: e0.pointerId,
      startStep,
      relativeNoteNumber,
      stepDuration: 1,
    });
    e0.currentTarget.setPointerCapture(e0.pointerId);

    startDragSession(e0.nativeEvent, {
      onMove({ position }) {
        updateDraftDuration(e0.pointerId, position.x, metrics);
      },
      onUp({ position }) {
        updateDraftDuration(e0.pointerId, position.x, metrics);
        setDraftNote((currentDraft) => {
          if (!currentDraft || currentDraft.pointerId !== e0.pointerId) {
            return currentDraft;
          }
          commitNote({
            relativeNoteNumber: currentDraft.relativeNoteNumber,
            stepPosition: currentDraft.startStep,
            stepDuration: currentDraft.stepDuration,
          });
          return null;
        });
      },
      onCancel() {
        setDraftNote(null);
      },
    });
  };

  const handleKeysColumnPointerDown = (
    e: React.PointerEvent,
    index: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // const relNote = 8 - index;
    // const relNote
    const noteNumber = 48 + index;

    const noteOn = () => sequencer.setPreviewNote(noteNumber);
    const noteOff = () => sequencer.setPreviewNote(null);

    noteOn();

    startDragSession(e.nativeEvent, {
      onUp() {
        noteOff();
      },
      onCancel() {
        noteOff();
      },
    });
  };

  return {
    handlePointerDown,
    handleKeysColumnPointerDown,
    draftNote,
    notes,
    deleteNote,
  };
}

function getToneLabel(index: number) {
  return ["R", "3", "5", "7"][index % 4];
}

const SynthPatternEditorView2 = () => {
  const {
    handlePointerDown,
    handleKeysColumnPointerDown,
    draftNote,
    notes,
    deleteNote,
  } = useSynthPatternEditorViewPresenter();

  return (
    <div className="flex-v bg-white gap-2">
      <div className="flex-h gap-2">
        <div
          style={{
            width: npx(30),
            height: npx(configs.editorHeight),
            fontSize: "8px",
          }}
        >
          {seqNumbers(9).map((i) => {
            const toneIndex = 8 - i;
            return (
              <div
                key={i}
                className="flex-c text-[11px]"
                style={{
                  height: npx(cellHeight),
                  border: `solid 0.5px ${noteColors.keyBorder}`,
                }}
                onPointerDown={(e) => handleKeysColumnPointerDown(e, i)}
              >
                {getToneLabel(toneIndex)}
              </div>
            );
          })}
        </div>
        <div
          style={{
            width: npx(configs.editorWidth),
            height: npx(configs.editorHeight),
            position: "relative",
            touchAction: "none",
            userSelect: "none",
          }}
          onPointerDown={handlePointerDown}
        >
          <GridBackground
            width={configs.editorWidth}
            height={configs.editorHeight}
            nx={configs.stepCount}
            ny={configs.noteRowCount}
            bgAlterStrideX={4}
          />
          {notes.map((note) => {
            const noteRect = getNoteRect(note);
            return (
              <div
                key={`${note.stepPosition}-${note.stepDuration}-${note.relativeNoteNumber}`}
                style={{
                  position: "absolute",
                  left: npx(noteRect.x),
                  top: npx(noteRect.y),
                  width: npx(noteRect.width),
                  height: npx(noteRect.height),
                  boxSizing: "border-box",
                  backgroundColor: noteColors.noteFill,
                  border: `solid 1px ${noteColors.noteBorder}`,
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  deleteNote(note);
                }}
              />
            );
          })}
          {draftNote ? (
            <div
              style={{
                position: "absolute",
                left: npx(draftNote.startStep * cellWidth),
                top: npx(
                  (configs.noteRowCount - 1 - draftNote.relativeNoteNumber) *
                    cellHeight,
                ),
                width: npx(draftNote.stepDuration * cellWidth),
                height: npx(cellHeight),
                boxSizing: "border-box",
                backgroundColor: noteColors.draftFill,
                border: `1px solid ${noteColors.draftBorder}`,
                pointerEvents: "none",
                borderRadius: "2px",
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

const octaveShiftOptions = createSelectorOptions(
  seqNumbers(7).map((i) => [i - 3, `${i - 3}`]),
);

const ControlsSection = () => {
  const st = store.useSnapshot();
  const clearNotes = () => {
    store.setNotes([]);
  };
  return (
    <div className="flex-ha gap-2 justify-between">
      <div>perseq</div>
      <div className="flex-ha gap-4">
        <LabeledRow label="octave">
          <GeneralSelector
            options={octaveShiftOptions}
            value={st.octaveShift}
            onChange={store.setOctaveShift}
            reverseOptionsOrder
          />
        </LabeledRow>
        <LabeledRow label="duty">
          <ScalerBox2 destWidth={24} destHeight={24}>
            <Knob
              value={st.noteDuty}
              min={0}
              max={1}
              step={0.01}
              onChange={store.setNoteDuty}
            />
          </ScalerBox2>
        </LabeledRow>
      </div>
      <ScalerBox2 destWidth={32} destHeight={24}>
        <Button text="x" onClick={clearNotes} asr={1.25} />
      </ScalerBox2>
    </div>
  );
};

export const EditorView00 = () => {
  return (
    <div className="bg-white w-[392px] h-[240px] flex-v gap-3 p-4">
      <ControlsSection />
      <SynthPatternEditorView2 />
    </div>
  );
};
