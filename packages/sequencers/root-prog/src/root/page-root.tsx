import { cz, qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { GridBackground } from "@/components/grid-background";
import { ShiftSelector } from "@/components/shift-selector";
import { KeyLabelMode, LoopBars } from "@/root/parameters";
import { store } from "@/root/store";
import { npx, seqNumbers } from "@/utils/helpers";
import { createSelectorOptions } from "@/utils/selector-option";

const keyLabelModeOptions = createSelectorOptions<KeyLabelMode>([
  ["doremi", "C/Am (doremi)"],
  ["degreeMajor", "C (degree)"],
  ["degreeMinor", "Am (degree) "],
]);

const LoopBarsOptions = createSelectorOptions<LoopBars>([
  [1, "1"],
  [2, "2"],
  [4, "4"],
  [8, "8"],
]);

const ControlsPart = () => {
  const st = store.useSnapshot();
  return (
    <div>
      <div class={qu.flexHA().gap(2).justify("between").it}>
        <div class={qu.flexHA().gap(2).it}>
          <div class={qu.fontSize(14).weight("500").it}>Key/Label</div>
          <ShiftSelector
            options={keyLabelModeOptions}
            value={st.keyLabelMode}
            onChange={store.setKeyLabelMode}
            winWidth={120}
          />
        </div>
        <div class={qu.flexHA().gap(2).it}>
          <div class={qu.fontSize(14).weight("500").it}>Bars</div>
          <ShiftSelector
            options={LoopBarsOptions}
            value={st.loopBars}
            onChange={store.setLoopBars}
          />
        </div>
        <div onClick={actions.clearNotes}>x</div>
      </div>
    </div>
  );
};

const pitchLabelsSource: Record<KeyLabelMode, string[]> = {
  doremi: ["do", "re", "mi", "fa", "so", "la", "si", "do", "re"],
  degreeMajor: ["i", "ii", "iii", "iv", "v", "vi", "vii", "i", "ii"],
  degreeMinor: ["iii", "iv", "v", "vi", "vii", "i", "ii", "iii", "iv"],
};

const BeatDot = () => {
  return <div class={qu.wh(3, 3).bg("#888").rounded("50%").it} />;
};

const BeatDotCellContent = ({ bars, i }: { bars: LoopBars; i: number }) => {
  if (bars === 8) {
    return (
      <div class={qu.flexC().gap(1.5).it}>
        <BeatDot />
        <BeatDot />
      </div>
    );
  } else {
    const show =
      bars === 4 || (bars === 2 && i % 2 === 0) || (bars === 1 && i % 4 === 0);
    return show ? <BeatDot /> : null;
  }
};

const BeatDotsRow = ({ w, bars }: { w: number; bars: LoopBars }) => {
  return (
    <div class={qu.flexH().it}>
      {seqNumbers(16).map((i) => (
        <div
          key={i}
          class={cz(
            qu.wh((w + 1) / 16, 16).flexC().it,
            // qu.bg("#fff").bd("#ccc").it,
            qu.color("#888").fontSize(16).it,
          )}
        >
          <BeatDotCellContent bars={bars} i={i} />
        </div>
      ))}
    </div>
  );
};

const PitchLabelsColumn = ({
  pitchLabels,
  h,
}: {
  pitchLabels: string[];
  h: number;
}) => {
  return (
    <div>
      {seqNumbers(9).map((i) => {
        const yi = 8 - i;
        return (
          <div
            class={cz(
              qu.wh(36, (h + 1) / 9).flexC().it,
              qu.bg("#fff").bd("#ccc").fontSize(12).it,
            )}
          >
            {pitchLabels[yi]}
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
    store.setNotes((prev) => prev.map((note, i) => (i === step ? yi : note)));
  },
  clearNotes() {
    store.setNotes((prev) => prev.map(() => -1));
  },
};

const EditInputLayer = ({ notes }: { notes: number[] }) => {
  const handlePointerDown = (e: PointerEvent) => {
    const { step, yi } = mapPointerPositionToCell(
      e.target as HTMLElement,
      e.clientX,
      e.clientY,
    );
    const hasNote = notes[step] === yi;
    if (!hasNote) {
      actions.setNote(step, yi);
    } else {
      actions.setNote(step, -1);
    }
  };
  return (
    <div
      class={qu.relative().wFull().hFull().it}
      onPointerDown={handlePointerDown}
    />
  );
};

function getNoteDuration(notes: number[], stepFrom: number) {
  let dur = 1;
  for (let i = stepFrom + 1; i < notes.length; i++) {
    if (notes[i] === -1) {
      dur++;
    } else {
      break;
    }
  }
  return dur;
}

const NotesDisplayLayer = ({
  notes,
  w,
  h,
}: {
  notes: number[];
  w: number;
  h: number;
}) => {
  const cellW = w / 16;
  const cellH = h / 9;
  return (
    <div>
      {notes.map((note, xi) => {
        const yi = note;
        if (note === -1) return null;
        const dur = getNoteDuration(notes, xi);
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
              <div class={qu.bg("#0cf").wFull().h(8).it} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Editor = () => {
  const w = 300;
  const h = 160;
  const st = store.useSnapshot();
  const pitchLabels = pitchLabelsSource[st.keyLabelMode];
  const bgAltStrideX = st.loopBars === 8 ? 2 : 4;

  return (
    <div class={qu.flexH().gap(2).it}>
      <PitchLabelsColumn pitchLabels={pitchLabels} h={h} />
      <div className={qu.flexV().gap(2).it}>
        <div class={qu.relative().wh(w, h).it}>
          <GridBackground
            nx={16}
            ny={9}
            width={w}
            height={h}
            bgAlterStrideX={bgAltStrideX}
          />
          <div class={qu.absolute().top(0).left(0).wh(w, h).it}>
            <NotesDisplayLayer notes={st.notes} w={w} h={h} />
          </div>
          <div class={qu.absolute().top(0).left(0).wh(w, h).it}>
            <EditInputLayer notes={st.notes} />
          </div>
        </div>
        <BeatDotsRow w={w} bars={st.loopBars} />
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class={qu.css({ height: "100dvh" }).flexC().it}>
      <EffectorBody className={cz(qu.wh(460, 280).it, qu.flexC().it)}>
        <div class={qu.flexV().gap(2).it}>
          <h2>root-prog</h2>
          <ControlsPart />
          <Editor />
        </div>
      </EffectorBody>
    </div>
  );
};
