import { cz, qu } from "@/common/css-realm";
import { Note } from "@/definitions/model";
import { GridBackground } from "@/editor/grid-background";
import { SideKeyboardColumn } from "@/editor/side-keyboard-column";
import { colors } from "@/editor/theme";
import { noteNameLabels, uiConfig } from "@/editor/ui-config";
import { store } from "@/root/store";
import { npx, seqNumbers } from "@/utils/helpers";

function mapPointerPositionToCell(
  el: HTMLElement,
  x: number,
  y: number,
): { step: number; yi: number } {
  const rect = el.getBoundingClientRect();
  const step = Math.floor(((x - rect.left) / rect.width) * 16);
  let yi = Math.floor(((y - rect.top) / rect.height) * 9);
  yi = 8 - yi;
  return { step, yi };
}

const actions = {
  setNote(step: number, yi: number) {
    // store.setNotes((prev) => prev.map((note, i) => (i === step ? yi : note)));
  },
  clearNotes() {
    // store.setNotes((prev) => prev.map(() => -1));
  },
};

const EditInputLayer = ({ notes }: { notes: Note[] }) => {
  const handlePointerDown = (e: PointerEvent) => {
    const { step, yi } = mapPointerPositionToCell(
      e.target as HTMLElement,
      e.clientX,
      e.clientY,
    );
    // const hasNote = notes[step] === yi;
    // if (!hasNote) {
    //   actions.setNote(step, yi);
    // } else {
    //   actions.setNote(step, -1);
    // }
  };
  return <div class={qu.absoluteFull().it} onPointerDown={handlePointerDown} />;
};

// function getNoteDuration(notes: Note[], stepFrom: number) {
//   let dur = 1;
//   for (let i = stepFrom + 1; i < notes.length; i++) {
//     if (notes[i] === -1) {
//       dur++;
//     } else {
//       break;
//     }
//   }
//   return dur;
// }

const NotesDisplayLayer = ({
  notes,
  sectionOffset,
  sectionDuration,
}: {
  notes: Note[];
  sectionOffset: number;
  sectionDuration: number;
}) => {
  const { cellW, cellH } = uiConfig;
  const noteH = cellH - 2;
  return (
    <div class={qu.absoluteFull().it}>
      {notes
        .filter(
          (note) =>
            sectionOffset <= note.position &&
            note.position < sectionOffset + sectionDuration,
        )
        .map((note) => {
          const pos = note.position - sectionOffset;
          const yi = note.pitch;
          const dur = note.duration;
          return (
            <div key={note.id}>
              <div
                class={qu.absolute().flexC().it}
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
        })}
    </div>
  );
};

const NoteLayerStrip = ({
  notes,
  sectionOffset,
  sectionDuration,
}: {
  notes: Note[];
  sectionOffset: number;
  sectionDuration: number;
}) => {
  const { cellW, cellH, numKeys } = uiConfig;
  const editorH = cellH * numKeys;
  const editorW = cellW * sectionDuration;
  return (
    <div
      class={cz(
        qu.relative().wh(editorW, editorH).it,
        qu.bd("blue").it,
        qu.css({ overflow: "hidden" }).it,
      )}
    >
      <NotesDisplayLayer
        notes={notes}
        sectionOffset={sectionOffset}
        sectionDuration={sectionDuration}
      />
      <EditInputLayer notes={notes} />
    </div>
  );
};

const RepeatingNoteLayers = () => {
  const st = store.useSnapshot();
  const nx = st.loopBars < 2 ? 2 / st.loopBars : 1;
  const stepStride = 32 / nx;
  return (
    <div class={qu.absoluteFull().flexH().it}>
      {seqNumbers(nx).map((i) => {
        return (
          <NoteLayerStrip
            key={i}
            notes={st.notes}
            sectionOffset={0}
            sectionDuration={stepStride}
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
