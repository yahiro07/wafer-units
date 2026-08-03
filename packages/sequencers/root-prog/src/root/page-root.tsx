import { useMemo } from "preact/hooks";
import { cz, qu } from "@/common/css-realm";
import { EffectorBody, pageBgColor } from "@/components/effector-body";
import { GridBackground } from "@/components/grid-background";
import { ShiftSelector } from "@/components/shift-selector";
import { KeyLabelMode, LoopBars } from "@/root/parameters";
import { store } from "@/root/store";
import { npx, seqNumbers } from "@/utils/helpers";
import { createSelectorOptions } from "@/utils/selector-option";

const LoopBarsOptions = createSelectorOptions<LoopBars>([
  [1, "1"],
  [2, "2"],
  [4, "4"],
  [8, "8"],
]);

function useKeyLabelModeOptions() {
  const { keysName } = store.useSnapshot();
  return useMemo(() => {
    const [majorKey, minorKey] = keysName.split("/");
    return createSelectorOptions<KeyLabelMode>([
      ["doremi", `${keysName} (doremi)`],
      ["degreeMajor", `${majorKey} (degree)`],
      ["degreeMinor", `${minorKey} (degree) `],
    ]);
  }, [keysName]);
}

const ControlsPart = () => {
  const st = store.useSnapshot();
  const keyLabelModeOptions = useKeyLabelModeOptions();
  return (
    <div>
      <div class={qu.flexHA().gap(2).fJustify("between").it}>
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

const BeatDot = ({ active }: { active: boolean }) => {
  return (
    <div
      class={cz(
        qu.wh(4, 4).bg("#888").rounded("50%").it,
        active && qu.bg("#0f0").it,
      )}
    />
  );
};

const BeatDotCellContent = ({
  bars,
  i,
  playStepIndex,
}: {
  bars: LoopBars;
  i: number;
  playStepIndex: number;
}) => {
  if (bars === 8) {
    const stepIndex = i * bars;
    const active1 = playStepIndex >= 0 && stepIndex >> 2 === playStepIndex >> 2;
    const active2 =
      playStepIndex >= 0 && (stepIndex + 4) >> 2 === playStepIndex >> 2;
    return (
      <div class={qu.flexC().gap(1.5).it}>
        <BeatDot active={active1} />
        <BeatDot active={active2} />
      </div>
    );
  } else {
    const show =
      bars === 4 || (bars === 2 && i % 2 === 0) || (bars === 1 && i % 4 === 0);

    const stepIndex = i * bars;
    const active = playStepIndex >= 0 && stepIndex >> 2 === playStepIndex >> 2;
    return show ? <BeatDot active={active} /> : null;
  }
};

const BeatDotsRow = ({ w, bars }: { w: number; bars: LoopBars }) => {
  const { playStepIndex } = store.useSnapshot();
  return (
    <div class={qu.flexH().it}>
      {seqNumbers(16).map((i) => (
        <div
          key={i}
          class={cz(
            qu.wh((w + 1) / 16, 16).flexC().it,
            // qu.bg("#fff").bd("#ccc").it,
            qu.color("#888").it,
          )}
        >
          <BeatDotCellContent bars={bars} i={i} playStepIndex={playStepIndex} />
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
      class={qu.relative().w("full").h("full").it}
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
              <div class={qu.bg("#0cf").w("full").h(8).it} />
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
    <div class={qu.flexH().fAlign("end").gap(2).it}>
      <PitchLabelsColumn pitchLabels={pitchLabels} h={h} />
      <div className={qu.flexV().gap(2).it}>
        <BeatDotsRow w={w} bars={st.loopBars} />
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
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class={qu.h("dvh").bg(pageBgColor).flexC().it}>
      <EffectorBody className={cz(qu.wh(420, 260).it, qu.flexC().it)}>
        <div class={qu.flexV().gap(2).it}>
          {/* <div>root-prog</div> */}
          <ControlsPart />
          <Editor />
        </div>
      </EffectorBody>
    </div>
  );
};
