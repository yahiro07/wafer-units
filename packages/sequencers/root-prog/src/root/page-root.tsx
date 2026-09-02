import { useMemo } from "preact/hooks";
import { qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { GridBackground } from "@/components/grid-background";
import { ShiftSelector } from "@/components/shift-selector";
import { KeyLabelMode, LoopBars } from "@/root/parameters";
import { store } from "@/root/store";
import { npx, seqNumbers } from "@/utils/helpers";
import { createSelectorOptions } from "@/utils/selector-option";
import { uiColors } from "@/common/ui-theme";
import { Icons } from "@/components/icons";

const LoopBarsOptions = createSelectorOptions<LoopBars>([
  [1, "1"],
  [2, "2"],
  [4, "4"],
  [8, "8"],
  [16, "16"],
]);

function useKeyLabelModeOptions() {
  const { keysName } = store.useSnapshot();
  return useMemo(() => {
    const [majorKey, minorKey] = keysName.split("/");
    return createSelectorOptions<KeyLabelMode>([
      ["degreeMajor", `${majorKey} (degree)`],
      ["degreeMinor", `${minorKey} (degree) `],
      ["doremi", `${keysName} (doremi)`],
    ]);
  }, [keysName]);
}

const ControlsPart = () => {
  const st = store.useSnapshot();
  const keyLabelModeOptions = useKeyLabelModeOptions();
  return (
    <div
      sx={[
        // qu.css({ borderBottom: `solid 1px ${uiColors.clEdgeLine}` }),
        qu.px(10),
      ]}
    >
      <div sx={qu.flexHA().gap(2).fJustify("between")}>
        <div sx={qu.fontSize(20).weight("500")}>ROOT-PROG</div>
        <div sx={qu.flexHA().gap(2)}>
          <div sx={qu.fontSize(16).weight("500")}>KEY/LABEL</div>
          <ShiftSelector
            options={keyLabelModeOptions}
            value={st.keyLabelMode}
            onChange={store.setKeyLabelMode}
            minWidth={160}
          />
        </div>
        <div sx={qu.flexHA().gap(2)}>
          <div sx={qu.fontSize(16).weight("500")}>BARS</div>
          <ShiftSelector
            options={LoopBarsOptions}
            value={st.loopBars}
            onChange={store.setLoopBars}
            minWidth={80}
          />
        </div>
        <div onClick={actions.clearNotes} sx={qu.cursor("pointer")}>
          <Icons.Trash size={20} />
        </div>
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
      sx={[qu.wh(4, 4).bg("#888").rounded("50%"), active && qu.bg("#0f0")]}
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
  if (bars === 16) {
    return (
      <div sx={qu.flexC().gap(1.3)}>
        {seqNumbers(4).map((j) => {
          const si = i * 4 + j;
          const active = playStepIndex >> 2 === si;
          return <BeatDot key={j} active={active} />;
        })}
      </div>
    );
  } else if (bars === 8) {
    const stepIndex = i * bars;
    const active1 = playStepIndex >= 0 && stepIndex >> 2 === playStepIndex >> 2;
    const active2 =
      playStepIndex >= 0 && (stepIndex + 4) >> 2 === playStepIndex >> 2;
    return (
      <div sx={qu.flexC().gap(3.5)}>
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
    <div sx={qu.flexH()}>
      {seqNumbers(16).map((i) => (
        <div
          key={i}
          sx={[
            qu.wh((w + 1) / 16, 16).flexC(),
            // qu.bg("#fff").bd("#ccc"),
            qu.color("#888"),
          ]}
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
    <div sx={qu.flexV().gap(0.5).mb(0.75)}>
      {seqNumbers(9).map((i) => {
        const yi = 8 - i;
        return (
          <div
            sx={[
              qu.wh(64, (h - 18) / 9).flexC(),
              qu.bd(uiColors.clEdgeLine).fontSize(14),
              qu.css({ borderWidth: "0.5px" }).rounded(2),
            ]}
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
      sx={qu.relative().w("full").h("full")}
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
              sx={qu.absolute().flexC()}
              style={{
                left: npx(xi * cellW),
                bottom: npx(yi * cellH),
                width: npx(cellW * dur),
                height: npx(cellH),
              }}
            >
              <div sx={qu.bg(uiColors.noteBar).w("full").h(8).rounded(1)} />
            </div>
            <div
              sx={qu.absolute().flexC()}
              style={{
                left: npx(xi * cellW),
                bottom: npx(yi * cellH),
                width: npx(cellW),
                height: npx(cellH),
              }}
            >
              <div
                sx={[
                  qu.bg(uiColors.noteBar).rounded("50%").wh(20, 20),
                  qu.css({ boxShadow: "0 0 0 1px #0004" }),
                ]}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Editor = () => {
  const w = 620;
  const h = 280;
  const st = store.useSnapshot();
  const pitchLabels = pitchLabelsSource[st.keyLabelMode];
  const bgAltStrideX = st.loopBars === 8 ? 2 : 4;

  return (
    <div sx={qu.flexH().fAlign("end").gap(2).px(10)}>
      <PitchLabelsColumn pitchLabels={pitchLabels} h={h} />
      <div sx={qu.flexV().gap(2)}>
        <BeatDotsRow w={w} bars={st.loopBars} />
        <div sx={qu.relative().wh(w, h)}>
          <GridBackground
            nx={16}
            ny={9}
            width={w}
            height={h}
            bgAlterStrideX={bgAltStrideX}
          />
          <div sx={qu.absolute().top(0).left(0).wh(w, h)}>
            <NotesDisplayLayer notes={st.notes} w={w} h={h} />
          </div>
          <div sx={qu.absolute().top(0).left(0).wh(w, h)}>
            <EditInputLayer notes={st.notes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div sx={qu.h("dvh").bg(uiColors.clPageBg).flexC()}>
      <EffectorBody sx={[qu.flexC()]}>
        <div sx={qu.flexV().gap(5)}>
          {/* <div>root-prog</div> */}
          <ControlsPart />
          <Editor />
        </div>
      </EffectorBody>
    </div>
  );
};
