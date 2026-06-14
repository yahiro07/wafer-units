import { seqNumbers } from "mofur/ax";
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

const NotesLayer = ({
  notes,
  stepOffset,
}: {
  notes: Note[];
  stepOffset: number;
}) => {
  const { cellW, cellH, numOctaves } = configs;
  const notesInView = notes.filter(
    (note) =>
      stepOffset <= note.stepPosition && note.stepPosition <= stepOffset + 32,
  );
  return (
    <div>
      {notesInView.map((note, i) => {
        const x = (note.stepPosition - stepOffset) * cellW;
        const y = (7 * numOctaves - note.relativeNoteNumber - 1) * cellH;
        const w = note.stepDuration * cellW;
        const h = cellH;
        return (
          <div
            key={i}
            className="absolute bg-cyan-500/60"
            style={{ left: x, top: y + 1, width: w - 1, height: h - 1 }}
          />
        );
      })}
    </div>
  );
};

function getNoteCoordFromPointPos(x: number, y: number, stepOffset: number) {
  const stepPosition = Math.floor(x / configs.cellW) + stepOffset;
  const relativeNoteNumber =
    7 * configs.numOctaves - 1 - Math.floor(y / configs.cellH);
  return { stepPosition, relativeNoteNumber };
}

const InputLayer = () => {
  const handleClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const scale = rect.width / (configs.cellW * configs.nx);
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    const stepOffset = store.state.currentPageIndex * 32;
    const { stepPosition, relativeNoteNumber } = getNoteCoordFromPointPos(
      x,
      y,
      stepOffset,
    );
    const newNote: Note = {
      stepPosition,
      relativeNoteNumber,
      stepDuration: store.state.noteDuty,
    };
    editorActions.addNote(newNote);
  };

  const width = configs.cellW * configs.nx;
  const height = configs.cellH * 7 * configs.numOctaves;
  return (
    <div
      className="absolute-full bd-red"
      style={{ width, height }}
      onClick={handleClick}
    />
  );
};

const PianoRollEditor = () => {
  const { notes, currentPageIndex } = store.useSnapshot();
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
      <NotesLayer notes={notes} stepOffset={currentPageIndex * 32} />
      <InputLayer />
    </div>
  );
};

export const Dev3PianoRollEditorView = () => {
  const { currentPageIndex } = store.useSnapshot();

  return (
    <div className="bg-white">
      <div className="w-[420px] h-[240px] flex-c border border-cyan-600 bg-cyan-100/20">
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
