import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { cz, qu } from "@/common/css-realm";
import { LoopBarLength, Note } from "@/definitions/model";
import { GridBackground } from "@/editor/grid-background";
import { SideKeyboardColumn } from "@/editor/side-keyboard-column";
import { colors } from "@/editor/theme";
import { noteNameLabels, uiConfig } from "@/editor/ui-config";
import { store } from "@/root/store";
import { startDragSession } from "@/utils/drag-session";
import { npx, seqNumbers } from "@/utils/helpers";
import { RefObject } from "preact";

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
      if (note.duration >= 2 && xi === noteTailPos - 1) {
        return { note, part: "tail" };
      } else if (relPos <= xi && xi < relPos + dur) {
        return { note, part: "body" };
      }
    }
  }
}

const noteEditActions = {
  addNote(position: number, yi: number) {
    const nextId =
      store.state.notes.length > 0
        ? Math.max(...store.state.notes.map((note) => note.id)) + 1
        : 0;
    const newNote: Note = {
      id: nextId,
      position,
      duration: 1,
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
  updateNoteXYD(note: Note, duration: number, pitch: number) {
    if (!(note.duration === duration && note.pitch === pitch)) {
      noteEditActions.setNoteAttrs(note.id, { duration, pitch });
      return { ...note, duration, pitch };
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
    noteEditActions.startAdjustDuration(e0, note);
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
    let noteLatest = originalNote;
    const baseEl = e0.currentTarget as HTMLElement;
    const originalCoord = mapPointerPositionToCell(
      baseEl,
      e0.clientX,
      e0.clientY,
    );
    store.setPreviewNotePitch(originalNote.pitch);
    const noteId = originalNote.id;

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

          const duration = originalNote.duration + deltaXi;
          const pitch = originalNote.pitch + deltaYi;

          if (pitch !== store.state.previewNotePitch) {
            store.setPreviewNotePitch(pitch);
          }
          noteLatest = noteEditActions.updateNoteXYD(
            noteLatest,
            duration,
            pitch,
          );
        },
        onUp() {
          if (noteLatest.duration <= 0) {
            noteEditActions.removeNote(noteId);
          }
          store.setPreviewNotePitch(null);
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
  const [cursor, setCursor] = useState<string>("auto");

  const handlePointerDown = (e: PointerEvent) => {
    const { xiFloat, yi } = mapPointerPositionToCell(
      e.currentTarget as HTMLElement,
      e.clientX,
      e.clientY,
    );
    const hitNoteInfo = hitTestNote(notes, sectionRange, xiFloat, yi);
    if (hitNoteInfo?.part === "tail") {
      noteEditActions.startAdjustDuration(e, hitNoteInfo.note);
      setCursor("e-resize");
    } else if (hitNoteInfo?.part === "body") {
      noteEditActions.startMoveNote(e, hitNoteInfo.note);
      setCursor("move");
    } else {
      noteEditActions.startInsertNewNote(e, sectionRange);
      setCursor("pointer");
    }
  };

  const handlePointerUp = () => {
    setCursor("auto");
  };
  return (
    <div
      sx={qu.absoluteFull()}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
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
  const pos = note.position - sectionRange.offset;
  const yi = note.pitch;
  const dur = note.duration;
  return (
    <div
      class={styleNoteView.base}
      style={{
        left: npx(pos * cellW),
        bottom: npx(yi * cellH),
        width: npx(cellW * dur - 0.5),
        height: npx(cellH),
      }}
    >
      <div class={styleNoteView.label}>{noteNameLabels[yi]}</div>
    </div>
  );
};
const styleNoteView = {
  base: cz(qu.absolute().flexC().cursor("pointer")),
  label: cz(
    qu.bg(colors.noteBg).w("full").flexHA(),
    qu.h(uiConfig.cellH - 2).css({ border: "solid 0.5px #0004" }),
    qu.rounded(2).pl(0.5),
    qu.color("#0008").fontSize(10),
    "font-monospace",
  ),
};

const NotesDisplayLayer = ({
  notes,
  sectionRange,
}: {
  notes: Note[];
  sectionRange: SectionRange;
}) => {
  return (
    <div sx={qu.absoluteFull()}>
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
      sx={[
        qu.relative().wh(editorW, editorH),
        qu.overflow("hidden").css({ touchAction: "none" }),
      ]}
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
    <div sx={qu.absoluteFull().flexH()}>
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
      class={stylePlayPositionLineLayer.base}
      style={{ left: npx(localPos * cellW - barW) }}
    />
  );
};
const stylePlayPositionLineLayer = {
  base: cz(
    qu.absolute().top(0).pointerEvents("none"),
    qu.wh(uiConfig.cellW * 1.5, "full"),
    qu.css({ borderRight: "solid 1px #0ff4" }),
    qu.bg("linear-gradient(to right, #0cc0, #0ff3)"),
  ),
};

function calculateNotesCenter(notes: Note[]) {
  let minPitch = notes[0].pitch;
  let maxPitch = notes[0].pitch;
  for (const note of notes) {
    if (note.pitch < minPitch) minPitch = note.pitch;
    if (note.pitch > maxPitch) maxPitch = note.pitch;
  }
  const midPitch = (minPitch + maxPitch) / 2;

  const { cellH, numKeys } = uiConfig;
  const editorH = cellH * numKeys;
  return editorH - (midPitch + 0.5) * cellH;
}

function useSetInitialScrollPosition(baseDivRef: RefObject<HTMLDivElement>) {
  const { stateLoadRevision, notes } = store.useSnapshot();

  useEffect(() => {
    const el = baseDivRef.current;
    if (el) {
      const centerY =
        notes.length > 0 ? calculateNotesCenter(notes) : el.scrollHeight / 2;
      el.scrollTop = centerY - el.clientHeight / 2;
    }
  }, [stateLoadRevision]);
}

export const PianoRollEditorView = () => {
  const { cellW, cellH, numKeys } = uiConfig;
  const editorW = cellW * 32;
  const editorH = cellH * numKeys;
  const baseDivRef = useRef<HTMLDivElement>(null);
  useSetInitialScrollPosition(baseDivRef);
  return (
    <div
      ref={baseDivRef}
      sx={[
        qu.flexH().gap(0.5).h(340),
        qu.overflowXY("hidden", "scroll"),
        qu.css({ touchAction: "pan-y" }),
      ]}
      onWheel={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <SideKeyboardColumn />
      <div sx={qu.relative().wh(editorW, editorH).flexH()}>
        <GridBackground nx={32} ny={numKeys} width={editorW} height={editorH} />
        <RepeatingNoteLayers />
        <PlayPositionLineLayer />
      </div>
    </div>
  );
};
