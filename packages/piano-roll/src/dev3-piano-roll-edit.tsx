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
  console.log({ notes, notesInView });
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
            className="absolute bg-cyan-500/80"
            style={{ left: x, top: y, width: w, height: h }}
          />
        );
      })}
    </div>
  );
};

const PianoRollEditor = () => {
  const { notes, currentPageIndex } = store.useSnapshot();
  const refBaseDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const baseDiv = refBaseDiv.current!;
    // baseDiv.scrollTop = baseDiv.scrollHeight / 2 - baseDiv.clientHeight / 2;
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
    </div>
  );
};

export const Dev3PianoRollEditorView = () => {
  return (
    <div className="bg-white">
      <div className="w-[420px] h-[240px] flex-c border border-cyan-600 bg-cyan-100/20">
        <div className="flex-ha gap-2">
          <PageShiftButton direction="left" />
          <PianoRollEditor />
          <PageShiftButton direction="right" />
        </div>
      </div>
    </div>
  );
};
