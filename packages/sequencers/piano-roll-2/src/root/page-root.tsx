import { cz, qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { ShiftSelector } from "@/components/shift-selector";
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

const PianoRollEditorView = () => {
  return <div class={qu.wh(700, 340).bd("#888").it}></div>;
};

const TopBar = () => {
  return (
    <div class={qu.w("full").flexV().gap(4).it}>
      <div class={qu.flexHA().justify("between").it}>
        <div class={qu.weight("bold").it}>Piano Roll 2</div>
        <div class={qu.flexHA().gap(4).it}>
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
      <EffectorBody className={cz(qu.wh(750, 450).flexC().it)}>
        <div class={qu.flexV().gap(2).it}>
          <TopBar />
          <PianoRollEditorView />
        </div>
      </EffectorBody>
    </div>
  );
};
