import { linearInterpolate, seqNumbers } from "mofur/ax";
import { npx, startDragSession } from "mofur/ax-ui";
import { useState } from "react";
import { GridBackground } from "@/components/grid-background";
import { sequencer } from "@/sequencer";
import { store } from "@/store";
import { SynthPatternNote } from "@/types";

const configs = {
  editorWidth: 320,
  editorHeight: 160,
  stepCount: 16,
  noteRowCount: 9,
  previewVelocity: 100,
};

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

const getStepIndexFromClientX = (clientX: number, left: number) => {
  const localX = clamp(clientX - left, 0, configs.editorWidth - 1);
  return clamp(Math.floor(localX / cellWidth), 0, configs.stepCount - 1);
};

const getRelativeNoteNumberFromClientY = (clientY: number, top: number) => {
  const localY = clientY - top;
  const y = linearInterpolate(
    localY,
    0,
    configs.editorHeight,
    configs.noteRowCount - 1,
    0,
    true,
  );
  return Math.floor(y);
};

const getNoteRect = (note: SynthPatternNote) => {
  const noteY = configs.editorHeight - note.relativeNoteNumber * cellHeight;
  return {
    x: note.stepPosition * cellWidth,
    y: noteY - cellHeight,
    width: note.stepDuration * cellWidth,
    height: cellHeight,
  };
};

const sortNotes = (notes: SynthPatternNote[]) =>
  [...notes].sort((a, b) => {
    if (a.stepPosition !== b.stepPosition) {
      return a.stepPosition - b.stepPosition;
    }
    if (a.relativeNoteNumber !== b.relativeNoteNumber) {
      return b.relativeNoteNumber - a.relativeNoteNumber;
    }
    return a.stepDuration - b.stepDuration;
  });

const notesOverlap = (a: SynthPatternNote, b: SynthPatternNote) =>
  a.stepPosition < b.stepPosition + b.stepDuration &&
  b.stepPosition < a.stepPosition + a.stepDuration;

function useSynthPatternEditorViewPresenter() {
  // const presenter = useCurrentSynthPatternPresenter();
  const { notes } = store.useSnapshot();
  const [draftNote, setDraftNote] = useState<DraftNote | null>(null);

  const coreActions = {
    replaceNotes(notes: SynthPatternNote[]) {
      store.mutations.setNotes(notes);
    },
  };

  const commitNote = (note: SynthPatternNote) => {
    const nextNotes = notes.filter((existingNote) => {
      return !(
        existingNote.relativeNoteNumber === note.relativeNoteNumber &&
        notesOverlap(existingNote, note)
      );
    });
    coreActions.replaceNotes(sortNotes([...nextNotes, note]));
  };

  const deleteNote = (noteToDelete: SynthPatternNote) => {
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
    rect: DOMRect,
  ) => {
    setDraftNote((currentDraft) => {
      if (!currentDraft || currentDraft.pointerId !== pointerId) {
        return currentDraft;
      }
      const currentStep = getStepIndexFromClientX(clientX, rect.left);
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
    const rect = e0.currentTarget.getBoundingClientRect();
    const startStep = getStepIndexFromClientX(e0.clientX, rect.left);
    const relativeNoteNumber = getRelativeNoteNumberFromClientY(
      e0.clientY,
      rect.top,
    );
    console.log({ relativeNoteNumber });
    setDraftNote({
      pointerId: e0.pointerId,
      startStep,
      relativeNoteNumber,
      stepDuration: 1,
    });
    e0.currentTarget.setPointerCapture(e0.pointerId);

    startDragSession(e0.nativeEvent, {
      onMove({ position }) {
        updateDraftDuration(e0.pointerId, position.x, rect);
      },
      onUp({ position }) {
        updateDraftDuration(e0.pointerId, position.x, rect);
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
              className="flex-c"
              style={{
                height: npx(cellHeight),
                border: "solid 1px #ccc",
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
                backgroundColor: "#4682b4",
                border: "solid 1px #008",
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
                configs.editorHeight -
                  draftNote.relativeNoteNumber * cellHeight -
                  cellHeight,
              ),
              width: npx(draftNote.stepDuration * cellWidth),
              height: npx(cellHeight),
              backgroundColor: "rgb(70 130 180 / 0.45)",
              border: "1px solid #4682b4",
              pointerEvents: "none",
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export const EditorView = () => {
  return (
    <div className="bg-white">
      <SynthPatternEditorView2 />
    </div>
  );
};
