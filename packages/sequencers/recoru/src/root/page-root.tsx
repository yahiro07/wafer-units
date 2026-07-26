import { cz, qu } from "@/common/css-realm";
import { Icons } from "@/common/icons";
import { Button } from "@/components/button";
import { ButtonsSelector } from "@/components/buttons-selector";
import { EffectorBody } from "@/components/effector-body";
import { IconButton } from "@/components/icon-button";
import { LabeledBox } from "@/components/labeled-box";
import { NarrowButton } from "@/components/narrow-button";
import { ShiftSelector } from "@/components/shift-selector";
import { LoopBarLength } from "@/definitions/model";
import { KeyboardView } from "@/root/keyboard-view";
import { store } from "@/root/store";
import { TimelineView } from "@/root/timeline-view";
import { seqNumbers } from "@/utils/helpers";
import { createSelectorOptions } from "@/utils/selector-option";

// const DutyKnobContainer = () => {
//   const st = store.useSnapshot();
//   return (
//     <LabeledBox label="duty">
//       <Knob value={st.duty} onChange={store.setDuty} />
//     </LabeledBox>
//   );
// };

// const OctaveKnobContainer = () => {
//   const st = store.useSnapshot();
//   return (
//     <LabeledBox label="octave">
//       <Knob
//         value={st.octave}
//         min={-2}
//         max={2}
//         step={1}
//         onChange={store.setOctave}
//       />
//     </LabeledBox>
//   );
// };

const BeatCell = ({ active }: { active: boolean }) => {
  return (
    <div class={cz(qu.w(12).h(12).bg("#bbb").it, active && qu.bg("#08f").it)} />
  );
};

const BeatIndicator = () => {
  return (
    <LabeledBox label="beat position" labelAlign="left">
      <div class={qu.flexV().gap(1).it}>
        <div class={qu.flexH().gap(1).it}>
          <div class={qu.flexH().gap(0.5).it}>
            {seqNumbers(4).map((i) => (
              <BeatCell key={i} active={i === 0} />
            ))}
          </div>
          <div class={qu.flexH().gap(0.5).it}>
            {seqNumbers(4).map((i) => (
              <BeatCell key={i} active={false} />
            ))}
          </div>
        </div>
        <div class={qu.flexH().gap(1).it}>
          <div class={qu.flexH().gap(0.5).it}>
            {seqNumbers(4).map((i) => (
              <BeatCell key={i} active={false} />
            ))}
          </div>
          <div class={qu.flexH().gap(0.5).it}>
            {seqNumbers(4).map((i) => (
              <BeatCell key={i} active={false} />
            ))}
          </div>
        </div>
      </div>
    </LabeledBox>
  );
};

const ChannelOptions = createSelectorOptions<number>(
  [0, 1, 2, 3].map((v) => [v, `${v + 1}`]),
);

const ChannelSelectorContainer = () => {
  const { channel } = store.useSnapshot();
  return (
    <LabeledBox label="part" labelAlign="left">
      <ButtonsSelector
        value={channel}
        options={ChannelOptions}
        onChange={store.setChannel}
      />
    </LabeledBox>
  );
};

const keyCountOptions = createSelectorOptions<number>(
  [25, 32, 37, 49].map((v) => [v, `${v}`]),
);

const loopBarsOptions = createSelectorOptions<LoopBarLength>(
  ([0.25, 0.5, 1, 2, 4, 8, 16] satisfies LoopBarLength[]).map((v) => [
    v,
    `${v < 1 ? `1/${1 / v}` : v}`,
  ]),
);

const LoopBarsSelectorContainer = () => {
  const { loopBars } = store.useSnapshot();
  return (
    <LabeledBox label="loop bars" labelAlign="left">
      <ShiftSelector
        minWidth={45}
        value={loopBars}
        options={loopBarsOptions}
        onChange={store.setLoopBars}
      />
    </LabeledBox>
  );
};

const RecordingBarsSelectorContainer = () => {
  const { recordingBars } = store.useSnapshot();
  return (
    <LabeledBox label="recordings bars" labelAlign="left">
      <ButtonsSelector
        value={recordingBars}
        options={loopBarsOptions}
        onChange={store.setRecordingBars}
      />
    </LabeledBox>
  );
};

const KeyboardNumKeysSelectorContainer = () => {
  const { keyboardNumKeys } = store.useSnapshot();
  return (
    <LabeledBox label="keys">
      <ShiftSelector
        minWidth={45}
        value={keyboardNumKeys}
        options={keyCountOptions}
        onChange={store.setKeyboardNumKeys}
      />
    </LabeledBox>
  );
};
const PagerContainer = () => {
  const st = store.useSnapshot();
  const totalPages = Math.max(1, st.loopBars / 4);
  const canShiftLeft = st.pageIndex > 0;
  const canShiftRight = st.pageIndex < totalPages - 1;

  const shiftPage = (dir: -1 | 1) => {
    store.setPageIndex(st.pageIndex + dir);
  };
  return (
    <LabeledBox label="">
      <div class={qu.flexHA().gap(1).it}>
        <Button
          width={30}
          disabled={!canShiftLeft}
          onClick={() => shiftPage(-1)}
        >
          <Icons.CaretLeft />
        </Button>
        <div class={qu.w(45).flexC().it}>
          {st.pageIndex + 1} / {totalPages}
        </div>
        <Button
          width={30}
          disabled={!canShiftRight}
          onClick={() => shiftPage(1)}
        >
          <Icons.CaretRight />
        </Button>
      </div>
    </LabeledBox>
  );
};

const TrashButtonContainer = () => {
  const hasNote = store.useSnapshot().notes.length > 0;
  return (
    <IconButton disabled={!hasNote} onClick={() => store.setNotes([])}>
      <Icons.Trash />
    </IconButton>
  );
};

// const TopBar = () => {
//   return (
//     <div>
//       <div class={qu.weight("bold").fontSize(20).it}>recoru</div>
//       {/* <div class={qu.flexHA().fJustify("between").it}>
//         <div class={qu.flexHA().gap(7).it}>
//           <div class={qu.flexHA().gap(6).it}></div>
//           <PagerContainer />
//         </div>
//       </div> */}
//     </div>
//   );
// };

const ControlSection = () => {
  return (
    <div class={qu.w("full").flexV().gap(2).it}>
      <div class={qu.flexHA().gap(4).it}>
        <div class={qu.flexHA().gap(2).it}>
          <Button style={{ width: 60, height: 40, fontSize: 17 }}>rec</Button>
          <div class={qu.flexV().gap(0.5).it}>
            <NarrowButton text="toggle" active />
            <NarrowButton text="hold" />
          </div>
        </div>
        <NarrowButton text="assign" />
        <div class={qu.flexHA().gap(2).it}>
          <Button className={qu.fontSize(16).it}>
            <Icons.Undo />
          </Button>
          <div>0 notes</div>
          <Button className={qu.fontSize(16).it}>
            <Icons.Redo />
          </Button>
        </div>
        <TrashButtonContainer />
        <div class={qu.css({ flexGrow: 1 }).it} />
        <div class={qu.flexHA().gap(3).mt(-2).it}>
          <KeyboardNumKeysSelectorContainer />
          <LoopBarsSelectorContainer />
          <LabeledBox label="speed">
            <Button>1/2</Button>
          </LabeledBox>
          <LabeledBox label="quantize">
            <Button>Q</Button>
          </LabeledBox>
        </div>
      </div>
      <div class={qu.flexHA().gap(4).it}>
        {/* <div class={qu.fontSize(22).it}>recoru</div> */}
        <ChannelSelectorContainer />
        <BeatIndicator />
        {/* <PagerContainer /> */}
        <div class={qu.grow().it} />
        <RecordingBarsSelectorContainer />
      </div>
    </div>
  );
};

const TimelineContainer = () => {
  // return <PianoRollEditorView />;
  return <TimelineView />;
};

export const PageRoot = () => {
  return (
    <EffectorBody className={cz(qu.wh(800, 500).flexC().it)}>
      <div class={qu.flexVC().gap(2).it}>
        <ControlSection />
        <TimelineContainer />
        <KeyboardView />
      </div>
    </EffectorBody>
  );
};
