import { seqNumbers } from "mofur/ax";
import { startDragSession } from "mofur/ax-ui";
import { useEffect, useRef } from "react";
import { PageShiftButton } from "@/components/page-shift-button";
import { PianoRollBackgroundOctaveBlock } from "@/components/piano-roll-background-octave-block";
import { store } from "@/store/store";
import { Note } from "@/store/types";

const configs = {
  cellW: 10,
  cellH: 16,
  nx: 32,
  numOctaves: 4,
};

const editorActions = {
  shiftPage(dir: -1 | 1) {
    store.setCurrentPageIndex((prev) => (prev + dir + 8) % 8);
  },
  addNote(note: Note) {
    store.setNotes((prev) => [...prev, note]);
  },
  setDraftNote(note: Note | null) {
    store.setDraftNote(note);
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
  const x = (note.stepPosition - stepOffset) * cellW;
  const y = (7 * numOctaves - note.relativeNoteNumber - 1) * cellH;
  const w = note.stepDuration * cellW;
  const h = cellH;
  return (
    <div
      className="absolute bg-cyan-500/60"
      style={{
        left: x,
        top: y + 1,
        width: w - 1,
        height: h - 1,
        background: isDraft ? "yellow" : undefined,
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
    (note) =>
      stepOffset <= note.stepPosition && note.stepPosition <= stepOffset + 32,
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

function getNoteCoordFromPointerPos(x: number, y: number, stepOffset: number) {
  const stepPosition = Math.floor(x / configs.cellW) + stepOffset;
  const relativeNoteNumber =
    7 * configs.numOctaves - 1 - Math.floor(y / configs.cellH);
  return { stepPosition, relativeNoteNumber };
}

function getNoteHit(
  stepPosition: number,
  relativeNoteNumber: number,
  notes: Note[],
) {
  return notes.find(
    (note) =>
      note.stepPosition <= stepPosition &&
      stepPosition < note.stepPosition + note.stepDuration &&
      note.relativeNoteNumber === relativeNoteNumber,
  );
}

function noteInputs_editNote(note: Note, e0: React.PointerEvent) {
  // const rect = (e0.target as HTMLDivElement).getBoundingClientRect();
  // const scale = rect.width / (configs.cellW * configs.nx);
  startDragSession(
    e0.nativeEvent,
    {
      onMove(e) {
        const { x, y } = e.position;
        const { relativeNoteNumber } = getNoteCoordFromPointerPos(x, y, 0);
        console.log(y, relativeNoteNumber);
      },
      onUp(e) {
        editorActions.setDraftNote(null);
        // editorActions.addNote(newNote);
      },
      onCancel(e) {
        editorActions.setDraftNote(null);
      },
    },
    { coordinate: "relative" },
  );
}

function noteInputs_createNote(
  e0: React.PointerEvent,
  stepPosition: number,
  relativeNoteNumber: number,
) {
  const newNote: Note = {
    stepPosition,
    relativeNoteNumber,
    stepDuration: store.state.noteDuty,
  };
  editorActions.setDraftNote(newNote);

  startDragSession(e0.nativeEvent, {
    onMove(e) {},
    onUp(e) {
      editorActions.setDraftNote(null);
      editorActions.addNote(newNote);
    },
    onCancel(e) {
      editorActions.setDraftNote(null);
    },
  });
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
    store.state.notes,
  );
  if (hitNote) {
    noteInputs_editNote(hitNote, e0);
  } else {
    noteInputs_createNote(e0, stepPosition, relativeNoteNumber);
  }
};

const InputLayer = () => {
  const width = configs.cellW * configs.nx;
  const height = configs.cellH * 7 * configs.numOctaves;
  return (
    <div
      className="absolute-full bd-red"
      style={{ width, height }}
      onPointerDown={handleInputLayerPointerDown}
    />
  );
};

const PianoRollEditor = () => {
  const { notes, currentPageIndex, draftNote } = store.useSnapshot();
  const refBaseDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const baseDiv = refBaseDiv.current!;
    baseDiv.scrollTop =
      baseDiv.scrollHeight / 2 - baseDiv.clientHeight / 2 - 50;
  }, []);
  return (
    <div
      ref={refBaseDiv}
      css={{
        height: "160px",
        overflowX: "hidden",
        overflowY: "scroll",
        position: "relative",
      }}
    >
      <BackgroundGridLayer />
      <NotesLayer
        notes={notes}
        stepOffset={currentPageIndex * 32}
        draftNote={draftNote}
      />
      <InputLayer />
    </div>
  );
};

export const Dev3PianoRollEditorView = () => {
  const { currentPageIndex } = store.useSnapshot();

  return (
    <div className="bg-white">
      <div className="w-[420px] h-[240px] flex-c border border-cyan-600 bg-blue-100/20">
        <div>
          <div className="flex-ha gap-2">
            <PageShiftButton
              direction="left"
              onClick={() => editorActions.shiftPage(-1)}
            />
            <PianoRollEditor />
            <PageShiftButton
              direction="right"
              onClick={() => editorActions.shiftPage(1)}
            />
          </div>
          <div>page: {currentPageIndex + 1} / 8</div>
        </div>
      </div>
    </div>
  );
};
