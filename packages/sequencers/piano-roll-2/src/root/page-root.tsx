import { cz, qu } from "@/common/css-realm";
import { Icons } from "@/common/icons";
import { Button } from "@/components/button";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { ShiftSelector } from "@/components/shift-selector";
import { PianoRollEditorView } from "@/editor/piano-roll-editor-view";
import { store } from "@/root/store";
import { createSelectorOptions } from "@/utils/selector-option";

const DutyKnobContainer = () => {
  const st = store.useSnapshot();
  return (
    <LabeledBox label="duty">
      <Knob value={st.duty} onChange={store.setDuty} />
    </LabeledBox>
  );
};

const OctaveKnobContainer = () => {
  const st = store.useSnapshot();
  return (
    <LabeledBox label="octave">
      <Knob
        value={st.octave}
        min={-2}
        max={2}
        step={1}
        onChange={store.setOctave}
      />
    </LabeledBox>
  );
};

export const loopBarsOptions = createSelectorOptions(
  [0.5, 1, 2, 4, 8, 16].map((v) => [v, `${v === 0.5 ? "1/2" : v}`]),
);

const LoopBarsSelectorContainer = () => {
  const st = store.useSnapshot();
  return (
    <LabeledBox label="loop bars">
      <ShiftSelector
        minWidth={50}
        value={st.loopBars}
        options={loopBarsOptions}
        onChange={store.setLoopBars}
      />
    </LabeledBox>
  );
};

const PianoRollEditorViewContainer = () => {
  return (
    // <div class={qu.wh(700, 340).bd("#222").it}>
    <PianoRollEditorView />
    // </div>
  );
};

const PagerContainer = () => {
  const st = store.useSnapshot();
  const totalPages = Math.max(1, st.loopBars / 2);
  const canShiftLeft = st.pageIndex > 0;
  const canShiftRight = st.pageIndex < totalPages - 1;

  const shiftPage = (dir: -1 | 1) => {
    store.setPageIndex(st.pageIndex + dir);
  };
  return (
    <div class={qu.flexHA().gap(6).it}>
      <Button disabled={!canShiftLeft} onClick={() => shiftPage(-1)}>
        <Icons.CaretLeft />
      </Button>
      <div>
        {st.pageIndex + 1} / {totalPages}
      </div>
      <Button disabled={!canShiftRight} onClick={() => shiftPage(1)}>
        <Icons.CaretRight />
      </Button>
    </div>
  );
};

const TopBar = () => {
  return (
    <div class={qu.w("full").flexV().gap(4).it}>
      <div class={qu.flexHA().justify("between").it}>
        <div class={qu.weight("bold").w(220).fontSize(22).it}>
          Fluorite Piano Roll
        </div>
        <PagerContainer />
        <div class={qu.flexHA().justify("end").w(220).gap(6).it}>
          <LoopBarsSelectorContainer />
          <OctaveKnobContainer />
          <DutyKnobContainer />
        </div>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class={qu.css({ height: "100dvh" }).flexC().it}>
      <EffectorBody className={cz(qu.wh(800, 450).flexC().it)}>
        <div class={qu.flexV().gap(2).it}>
          <TopBar />
          <PianoRollEditorViewContainer />
        </div>
      </EffectorBody>
    </div>
  );
};
