import { cz, qu } from "@/common/css-realm";
import { Note } from "@/root/model";
import { store } from "@/root/store";
import { colors } from "@/root/theme";
import { iife, npx, seqNumbers } from "@/utils/helpers";

const configs = iife(() => {
  const octaveStart = 2;
  const octaveCount = 5;
  const numKeys = octaveCount * 12 + 1;
  return {
    octaveStart,
    octaveCount,
    cellW: 20,
    cellH: 20,
    numKeys,
  };
});

const GridBackground = ({
  nx,
  ny,
  width,
  height,
}: {
  nx: number;
  ny: number;
  width: number;
  height: number;
}) => {
  const { cellW, cellH } = configs;

  return (
    <div
      style={{
        width: npx(width),
        height: npx(height),
        border: "solid 0.5px #222",
      }}
    >
      {Array.from({ length: nx * ny }).map((_, i) => {
        const xi = i % nx;
        const yi = Math.floor(i / nx);
        const x = xi * cellW;
        const y = yi * cellH;
        const subNoteIndex = (ny - yi - 1) % 12;
        let bgColor = colors.pianoRollBg;
        let borderColor = colors.gridWeak2;
        const isBlackKey = [1, 3, 6, 8, 10].includes(subNoteIndex);
        if (isBlackKey) {
          bgColor = colors.pianoRollBgBlackKey;
        }
        if (xi % 4 === 3) {
          borderColor = colors.gridStrong;
        }
        if (xi === 15) {
          borderColor = colors.gridStrong2;
        }
        const hasBottomBorder = subNoteIndex === 0 || subNoteIndex === 5;
        return (
          <div
            key={`${xi}-${yi}`}
            style={{
              position: "absolute",
              left: npx(x),
              top: npx(y),
              width: npx(cellW),
              height: npx(cellH),
              borderRight: `solid 0.5px ${borderColor}`,
              borderBottom: hasBottomBorder
                ? `solid 0.5px ${colors.gridWeak}`
                : "none",
              backgroundColor: bgColor,
            }}
          />
        );
      })}
    </div>
  );
};

const subNoteNames = [
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

const noteNameLabels = seqNumbers(configs.numKeys).map((i) => {
  const yi = configs.numKeys - i - 1;
  const octave = ((yi / 12) >>> 0) + 2;
  const subIndex = yi % 12;
  return `${subNoteNames[subIndex]}${octave}`;
});

const PitchLabelsColumn = () => {
  const { numKeys, cellH } = configs;

  return (
    <div>
      {seqNumbers(numKeys).map((i) => {
        const yi = numKeys - i - 1;
        const subIndex = yi % 12;
        const label = subIndex === 0 && noteNameLabels[i];
        return (
          <div class={cz(qu.wh(60, cellH).p(0.125).it)}>
            <div
              class={cz(
                qu.flexHA().h("full").it,
                qu.bg("#fff").color("#444").fontSize(8).it,
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
  const { cellW, cellH, numKeys } = configs;
  const noteH = cellH - 2;
  return (
    <div>
      {notes.map((note, xi) => {
        const yi = numKeys - note.pitch - 1;
        const dur = note.duration;
        return (
          <div key={xi}>
            <div
              class={qu.absolute().flexC().it}
              style={{
                left: npx(xi * cellW),
                bottom: npx(yi * cellH),
                width: npx(cellW * dur),
                height: npx(cellH),
              }}
            >
              <div
                class={cz(
                  qu.bg(colors.noteBg).w("full").flexHA().it,
                  qu.h(noteH).rounded(2).pl(0.5).it,
                  qu.color("#0008").fontSize(10).it,
                  "font-monospace",
                )}
              >
                {noteNameLabels[note.pitch]}
              </div>
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

  return (
    <div
      class={cz(
        qu.flexH().gap(2).h(340).it,
        qu.css({ overflowX: "hidden", overflowY: "scroll" }).it,
      )}
    >
      <PitchLabelsColumn />
      <div className={qu.flexV().gap(2).it}>
        <div class={qu.relative().wh(editorW, editorH).it}>
          <GridBackground
            nx={32}
            ny={numKeys}
            width={editorW}
            height={editorH}
          />
          <div class={qu.absoluteFull().it}>
            <NotesDisplayLayer notes={st.notes} />
          </div>
          <div class={qu.absoluteFull().it}>
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
