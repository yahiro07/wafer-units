import { useMemo, useState } from "preact/hooks";
import { cz, qu } from "@/common/css-realm";
import { LoopBarLength, Note } from "@/definitions/model";
import { GridBackground } from "@/editor/grid-background";
import { SideKeyboardColumn } from "@/editor/side-keyboard-column";
import { colors } from "@/editor/theme";
import { noteNameLabels, uiConfig } from "@/editor/ui-config";
import { store } from "@/root/store";
import { npx, seqNumbers } from "@/utils/helpers";

type SectionRange = {
  offset: number;
  duration: number;
};

function getSectionStride(loopBars: LoopBarLength) {
  const nx = loopBars < 2 ? 2 / loopBars : 1;
  const sectionStride = 32 / nx;
  return { nx, sectionStride };
}

function mapPointerPositionToCell(
  el: HTMLElement,
  x: number,
  y: number,
): { xi: number; xiFloat: number; yi: number } {
  const { sectionStride } = getSectionStride(store.state.loopBars);
  const rect = el.getBoundingClientRect();
  const xiFloat = ((x - rect.left) / rect.width) * sectionStride;
  const xi = Math.floor(xiFloat);
  const i = Math.floor(((y - rect.top) / rect.height) * uiConfig.numKeys);
  const yi = uiConfig.numKeys - i - 1;
  return { xi, xiFloat, yi };
}

const actions = {
  addNote(position: number, yi: number) {
    const nextId =
      store.state.notes.length > 0
        ? Math.max(...store.state.notes.map((note) => note.id)) + 1
        : 0;
    const newNote: Note = { id: nextId, position, duration: 1, pitch: yi };
    store.setNotes((prev) => [...prev, newNote]);
  },
  clearNotes() {
    // store.setNotes((prev) => prev.map(() => -1));
  },
};

function hitTestNote(
  notes: Note[],
  sectionRange: SectionRange,
  xiFloat: number,
  yi: number,
): { note: Note; part: "body" | "tail" } | undefined {
  const xi = Math.floor(xiFloat);
  for (const note of notes) {
    if (note.pitch === yi) {
      const relPos = note.position - sectionRange.offset;
      const dur = note.duration;
      const noteTailPos = relPos + dur;
      if (xiFloat - 0.3 <= noteTailPos && noteTailPos <= xiFloat + 0.3) {
        return { note, part: "tail" };
      } else if (relPos <= xi && xi < relPos + dur) {
        return { note, part: "body" };
      }
    }
  }
}

const EditInputLayer = ({
  notes,
  sectionRange,
}: {
  notes: Note[];
  sectionRange: SectionRange;
}) => {
  const [pointingPart, setPointingPart] = useState<"body" | "tail" | null>(
    null,
  );

  const handlePointerMove = (e: PointerEvent) => {
    const { xiFloat, yi } = mapPointerPositionToCell(
      e.currentTarget as HTMLElement,
      e.clientX,
      e.clientY,
    );
    // console.log(xiFloat, yi);
    const res = hitTestNote(notes, sectionRange, xiFloat, yi);
    if (res?.part === "body" && pointingPart !== "body") {
      setPointingPart("body");
    } else if (res?.part === "tail" && pointingPart !== "tail") {
      setPointingPart("tail");
    } else if (pointingPart && !res) {
      setPointingPart(null);
    }
  };

  const handlePointerDown = (e: PointerEvent) => {
    const { xiFloat, yi } = mapPointerPositionToCell(
      e.currentTarget as HTMLElement,
      e.clientX,
      e.clientY,
    );

    if (pointingPart === "tail") {
    } else if (pointingPart === "body") {
    } else {
      const position = (sectionRange.offset + xiFloat) >>> 0;
      actions.addNote(position, yi);
    }
  };

  let cursor = "auto";
  if (pointingPart === "body") {
    cursor = "move";
  } else if (pointingPart === "tail") {
    cursor = "e-resize";
  }
  return (
    <div
      class={qu.absoluteFull().it}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      style={{ cursor }}
    />
  );
};

const NoteView = ({
  note,
  sectionRange,
}: {
  note: Note;
  sectionRange: SectionRange;
}) => {
  const { cellW, cellH } = uiConfig;
  const noteH = cellH - 2;
  const pos = note.position - sectionRange.offset;
  const yi = note.pitch;
  const dur = note.duration;
  return (
    <div key={note.id}>
      <div
        class={qu.absolute().flexC().cursor("pointer").it}
        style={{
          left: npx(pos * cellW),
          bottom: npx(yi * cellH),
          width: npx(cellW * dur),
          height: npx(cellH),
        }}
      >
        <div
          class={cz(
            qu.bg(colors.noteBg).w("full").flexHA().it,
            qu.h(noteH).css({ border: "solid 0.5px #0004" }).it,
            qu.rounded(2).pl(0.5).it,
            qu.color("#0008").fontSize(10).it,
            "font-monospace",
          )}
        >
          {noteNameLabels[yi]}
        </div>
      </div>
    </div>
  );
};

const NotesDisplayLayer = ({
  notes,
  sectionRange,
}: {
  notes: Note[];
  sectionRange: SectionRange;
}) => {
  return (
    <div class={qu.absoluteFull().it}>
      {notes
        .filter(
          (note) =>
            sectionRange.offset <= note.position &&
            note.position < sectionRange.offset + sectionRange.duration,
        )
        .map((note) => (
          <NoteView key={note.id} note={note} sectionRange={sectionRange} />
        ))}
    </div>
  );
};

const NoteLayerStrip = ({
  notes,
  sectionRange,
}: {
  notes: Note[];
  sectionRange: SectionRange;
}) => {
  const { cellW, cellH, numKeys } = uiConfig;
  const editorH = cellH * numKeys;
  const editorW = cellW * sectionRange.duration;
  return (
    <div
      class={cz(
        qu.relative().wh(editorW, editorH).it,
        qu.bd("blue").it,
        qu.css({ overflow: "hidden" }).it,
      )}
    >
      <NotesDisplayLayer notes={notes} sectionRange={sectionRange} />
      <EditInputLayer notes={notes} sectionRange={sectionRange} />
    </div>
  );
};

const RepeatingNoteLayers = () => {
  const st = store.useSnapshot();
  const { nx, sectionStride } = getSectionStride(st.loopBars);
  const sectionRange = useMemo(
    () => ({ offset: 0, duration: sectionStride }),
    [sectionStride],
  );
  return (
    <div class={qu.absoluteFull().flexH().it}>
      {seqNumbers(nx).map((i) => {
        return (
          <NoteLayerStrip
            key={i}
            notes={st.notes}
            sectionRange={sectionRange}
          />
        );
      })}
    </div>
  );
};

export const PianoRollEditorView = () => {
  const { cellW, cellH, numKeys } = uiConfig;
  const editorW = cellW * 32;
  const editorH = cellH * numKeys;
  return (
    <div
      class={cz(
        qu.flexH().gap(0.5).h(340).it,
        qu.css({ overflowX: "hidden", overflowY: "scroll" }).it,
      )}
    >
      <SideKeyboardColumn />
      <div class={qu.relative().wh(editorW, editorH).flexH().it}>
        <GridBackground nx={32} ny={numKeys} width={editorW} height={editorH} />
        <RepeatingNoteLayers />
      </div>
    </div>
  );
};
