import { cz, qu } from "@/common/css-realm";
import { GridBackground } from "@/components/grid-background";
import { Note } from "@/root/model";
import { store } from "@/root/store";
import { iife, npx, seqNumbers } from "@/utils/helpers";

const configs = iife(() => {
  const octaveStart = 3;
  const octaveCount = 4;
  const numKeys = octaveCount * 12 + 1;
  return {
    octaveStart,
    octaveCount,
    cellW: 20,
    cellH: 14,
    numKeys,
  };
});

const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const PitchLabelsColumn = () => {
  const { numKeys, cellH } = configs;

  return (
    <div>
      {seqNumbers(numKeys).map((i) => {
        const yi = numKeys - i - 1;
        const octave = ((yi / 12) >>> 0) + 3;
        const subIndex = yi % 12;
        const label = `${noteNames[subIndex]}${octave}`;
        return (
          <div class={cz(qu.wh(36, cellH).p(0.125).it)}>
            <div
              class={cz(
                qu.flexHA().it,
                qu.bd("#0000").bg("#222").fontSize(8).it,
              )}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

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
  return (
    <div
      class={qu.relative().w("full").h("full").it}
      onPointerDown={handlePointerDown}
    />
  );
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

const NotesDisplayLayer = ({ notes }: { notes: Note[] }) => {
  const { cellW, cellH } = configs;
  return (
    <div>
      {notes.map((note, xi) => {
        const yi = note.pitch;
        const dur = note.duration;
        return (
          <div key={xi}>
            <div
              class={qu.absolute().flexC().it}
              style={{
                left: npx(xi * cellW),
                bottom: npx(yi * cellH),
                width: npx(cellW),
                height: npx(cellH),
              }}
            >
              <div class={qu.bg("#0cf").rounded("50%").wh(16, 16).it} />
            </div>
            <div
              class={qu.absolute().flexC().it}
              style={{
                left: npx(xi * cellW),
                bottom: npx(yi * cellH),
                width: npx(cellW * dur),
                height: npx(cellH),
              }}
            >
              <div class={qu.bg("#0cf").w("full").h(8).it} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Editor = () => {
  const { cellW, cellH, numKeys } = configs;
  const editorW = cellW * 32;
  const editorH = cellH * numKeys;
  const st = store.useSnapshot();
  // const pitchLabels = pitchLabelsSource[st.keyLabelMode];
  const bgAltStrideX = st.loopBars === 8 ? 2 : 4;

  return (
    <div
      class={
        qu
          .flexH()
          .gap(2)
          .h(340)
          .css({ overflowX: "hidden", overflowY: "scroll" }).it
      }
    >
      <PitchLabelsColumn />
      <div className={qu.flexV().gap(2).it}>
        <div class={qu.relative().wh(editorW, editorH).it}>
          <GridBackground
            nx={32}
            ny={numKeys}
            width={editorW}
            height={editorH}
            bgAlterStrideX={bgAltStrideX}
          />
          <div class={qu.absolute().top(0).left(0).wh(editorW, editorH).it}>
            <NotesDisplayLayer notes={st.notes} />
          </div>
          <div class={qu.absolute().top(0).left(0).wh(editorW, editorH).it}>
            <EditInputLayer notes={st.notes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PianoRollEditorView = () => {
  return <Editor />;
};
