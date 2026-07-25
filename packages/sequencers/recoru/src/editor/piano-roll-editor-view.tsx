import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { cz, qu } from "@/common/css-realm";
import { LoopBarLength, Note } from "@/definitions/model";
import { GridBackground } from "@/editor/grid-background";
import { KeyboardView } from "@/editor/keyboard-view";
import { colors } from "@/editor/theme";
import { noteNameLabels, uiConfig } from "@/editor/ui-config";
import { store } from "@/root/store";
import { startDragSession } from "@/utils/drag-session";
import { npx, seqNumbers } from "@/utils/helpers";

type SectionRange = {
  offset: number;
  duration: number;
};

function getSectionStride(loopBars: LoopBarLength, pageIndex: number) {
  if (loopBars < 2) {
    const nx = 2 / loopBars;
    const sectionStride = 32 / nx;
    return { nx, sectionOffset: 0, sectionStride };
  } else {
    const nx = 1;
    const sectionStride = 32;
    const sectionOffset = pageIndex * sectionStride;
    return { nx, sectionOffset, sectionStride };
  }
}

function mapPointerPositionToCell(
  el: HTMLElement,
  x: number,
  y: number,
): { xi: number; xiFloat: number; yi: number; yiFloat: number } {
  const st = store.state;
  const { sectionStride } = getSectionStride(st.loopBars, st.pageIndex);
  const rect = el.getBoundingClientRect();
  const xiFloat = ((x - rect.left) / rect.width) * sectionStride;
  const xi = Math.floor(xiFloat);
  const yiFloat = (1 - (y - rect.top) / rect.height) * uiConfig.numKeys;
  const yi = Math.floor(yiFloat);
  return { xi, xiFloat, yi, yiFloat };
}

type HitNoteInfo = { note: Note; part: "body" | "tail" };

function hitTestNote(
  notes: Note[],
  sectionRange: SectionRange,
  xiFloat: number,
  yi: number,
): HitNoteInfo | undefined {
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

let gLastNoteDuration = 1;

const noteEditActions = {
  addNote(position: number, yi: number) {
    const nextId =
      store.state.notes.length > 0
        ? Math.max(...store.state.notes.map((note) => note.id)) + 1
        : 0;
    const newNote: Note = {
      id: nextId,
      position,
      duration: gLastNoteDuration,
      pitch: yi,
    };
    store.setNotes((prev) => [...prev, newNote]);
    return newNote;
  },
  setNoteAttrs(noteId: number, attrs: Partial<Note>) {
    store.setNotes((prev) =>
      prev.map((note) => (note.id === noteId ? { ...note, ...attrs } : note)),
    );
  },
  updateNoteXY(note: Note, position: number, pitch: number) {
    if (!(note.position === position && note.pitch === pitch)) {
      noteEditActions.setNoteAttrs(note.id, { position, pitch });
      return { ...note, position, pitch };
    }
    return note;
  },
  removeNote(noteId: number) {
    store.setNotes((prev) => prev.filter((note) => note.id !== noteId));
  },
  startInsertNewNote(e0: PointerEvent, sectionRange: SectionRange) {
    const { xi, yi } = mapPointerPositionToCell(
      e0.currentTarget as HTMLElement,
      e0.clientX,
      e0.clientY,
    );
    const position = sectionRange.offset + xi;
    const note = noteEditActions.addNote(position, yi);
    noteEditActions.startMoveNote(e0, note);
  },
  startMoveNote(e0: PointerEvent, originalNote: Note) {
    let noteLatest = originalNote;
    const baseEl = e0.currentTarget as HTMLElement;
    const originalCoord = mapPointerPositionToCell(
      baseEl,
      e0.clientX,
      e0.clientY,
    );
    store.setPreviewNotePitch(originalNote.pitch);

    startDragSession(
      e0,
      {
        onMove(e) {
          const movedCoord = mapPointerPositionToCell(
            baseEl,
            e.position.x,
            e.position.y,
          );
          const deltaXi = movedCoord.xi - originalCoord.xi;
          const deltaYi = movedCoord.yi - originalCoord.yi;

          const position = originalNote.position + deltaXi;
          const pitch = originalNote.pitch + deltaYi;

          if (store.state.previewNotePitch !== pitch) {
            store.setPreviewNotePitch(pitch);
          }

          noteLatest = noteEditActions.updateNoteXY(
            noteLatest,
            position,
            pitch,
          );
        },
        onUpOrCancel() {
          store.setPreviewNotePitch(null);
        },
      },
      { coordinate: "page" },
    );
  },
  startAdjustDuration(e0: PointerEvent, originalNote: Note) {
    const baseEl = e0.currentTarget as HTMLElement;
    const originalCoord = mapPointerPositionToCell(
      baseEl,
      e0.clientX,
      e0.clientY,
    );
    const noteId = originalNote.id;
    let latestDuration = originalNote.duration;
    let changed = false;

    startDragSession(
      e0,
      {
        onMove(e) {
          const movedCoord = mapPointerPositionToCell(
            baseEl,
            e.position.x,
            e.position.y,
          );
          const deltaXi = movedCoord.xi - originalCoord.xi;
          const dur = originalNote.duration + deltaXi;
          if (dur !== latestDuration) {
            noteEditActions.setNoteAttrs(noteId, { duration: dur });
            latestDuration = dur;
            changed = true;
          }
        },
        onUp() {
          if (latestDuration <= 0) {
            noteEditActions.removeNote(noteId);
          } else if (changed) {
            gLastNoteDuration = latestDuration;
          }
        },
      },
      { coordinate: "page" },
    );
  },
};

const EditInputLayer = ({
  notes,
  sectionRange,
}: {
  notes: Note[];
  sectionRange: SectionRange;
}) => {
  const [hitNoteInfo, setHitNoteInfo] = useState<HitNoteInfo | null>(null);

  const handlePointerMove = (e: PointerEvent) => {
    const { xiFloat, yi } = mapPointerPositionToCell(
      e.currentTarget as HTMLElement,
      e.clientX,
      e.clientY,
    );
    // console.log(xiFloat, yi);
    const res = hitTestNote(notes, sectionRange, xiFloat, yi);
    if (res?.part === "body" && hitNoteInfo?.part !== "body") {
      setHitNoteInfo(res);
    } else if (res?.part === "tail" && hitNoteInfo?.part !== "tail") {
      setHitNoteInfo(res);
    } else if (hitNoteInfo && !res) {
      setHitNoteInfo(null);
    }
  };

  const handlePointerDown = (e: PointerEvent) => {
    if (hitNoteInfo?.part === "tail") {
      noteEditActions.startAdjustDuration(e, hitNoteInfo.note);
    } else if (hitNoteInfo?.part === "body") {
      noteEditActions.startMoveNote(e, hitNoteInfo.note);
    } else {
      noteEditActions.startInsertNewNote(e, sectionRange);
    }
  };

  let cursor = "auto";
  if (hitNoteInfo?.part === "body") {
    cursor = "move";
  } else if (hitNoteInfo?.part === "tail") {
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
          width: npx(cellW * dur - 0.5),
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
        // qu.bd("blue").it,
        qu.overflow("hidden").it,
      )}
    >
      <NotesDisplayLayer notes={notes} sectionRange={sectionRange} />
      <EditInputLayer notes={notes} sectionRange={sectionRange} />
    </div>
  );
};

const RepeatingNoteLayers = () => {
  const st = store.useSnapshot();
  const { nx, sectionOffset, sectionStride } = getSectionStride(
    st.loopBars,
    st.pageIndex,
  );
  const sectionRange = useMemo(
    () => ({ offset: sectionOffset, duration: sectionStride }),
    [sectionOffset, sectionStride],
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

const PlayPositionLineLayer = () => {
  const { cellW } = uiConfig;
  const { playPos } = store.useSnapshot();
  if (playPos === null) return;
  const barW = cellW * 1.5;
  const localPos = playPos % 32;

  return (
    <div
      class={cz(
        qu.absolute().top(0).wh(barW, "full").pointerEvents("none").it,
        qu.css({ borderRight: "solid 1px #0ff4" }).it,
        qu.bg("linear-gradient(to right, #0cc0, #0ff3)").it,
      )}
      style={{ left: npx(localPos * cellW - barW) }}
    />
  );
};

export const PianoRollEditorView = () => {
  const { cellW, cellH, numKeys } = uiConfig;
  const editorW = cellW * 32;
  const editorH = cellH * numKeys;
  const baseDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = baseDivRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight / 2 - el.clientHeight / 2;
    }
  }, []);

  return (
    <div
      ref={baseDivRef}
      class={cz(
        qu.flexH().gap(0.5).h(340).it,
        qu.overflowXY("hidden", "scroll").it,
      )}
    >
      <KeyboardView />
      <div class={qu.relative().wh(editorW, editorH).flexH().it}>
        <GridBackground nx={32} ny={numKeys} width={editorW} height={editorH} />
        <RepeatingNoteLayers />
        <PlayPositionLineLayer />
      </div>
    </div>
  );
};
