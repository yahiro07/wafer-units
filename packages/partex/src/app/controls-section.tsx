import { seqNumbers } from "mofur/ax";
import {
  Button,
  createSelectorOptions,
  GeneralSelector,
  Knob,
} from "mofur-components/mono2";
import { LabeledRow } from "@/components";
import { store } from "@/store/store";
import { patternModeOptions } from "@/store/types";

const octaveShiftOptions = createSelectorOptions(
  seqNumbers(7).map((i) => [i - 3, `${i - 3}`]),
);

const patternBarsOptions = createSelectorOptions([
  [0.25, "1/4"],
  [0.5, "1/2"],
  [1, "1"],
]);
const loopBarsOptions = createSelectorOptions(
  [0.5, 1, 2, 4, 8, 16].map((v) => [v, `${v === 0.5 ? "1/2" : v}`]),
);

export const ControlsSection = () => {
  const st = store.useSnapshot();
  const clearNotes = () => {
    store.setInputNotes([]);
    store.setCurrentPageIndex(0);
  };
  return (
    <div className="flex-ha gap-2 justify-between">
      <div>piano-roll</div>
      <div className="flex-ha gap-4 text-sm">
        <LabeledRow label="oct">
          <GeneralSelector
            options={octaveShiftOptions}
            value={st.octaveShift}
            onChange={store.setOctaveShift}
            reverseOptionsOrder
          />
        </LabeledRow>
        <LabeledRow label="duty">
          <Knob
            value={st.noteDuty}
            min={0}
            max={1}
            step={0.01}
            onChange={store.setNoteDuty}
          />
        </LabeledRow>
        <LabeledRow label="pt_mode">
          <GeneralSelector
            options={patternModeOptions}
            value={st.patternMode}
            onChange={store.setPatternMode}
          />
        </LabeledRow>
        <LabeledRow label="pt_bars">
          <GeneralSelector
            options={patternBarsOptions}
            value={st.patternBars}
            onChange={store.setPatternBars}
          />
        </LabeledRow>
        <LabeledRow label="bars">
          <GeneralSelector
            options={loopBarsOptions}
            value={st.loopBars}
            onChange={store.setLoopBars}
          />
        </LabeledRow>
        <Button active={st.ghostEnabled} onClick={store.toggleGhostEnabled}>
          ghost
        </Button>
      </div>
      <Button text="x" onClick={clearNotes} asr={1.25} />
    </div>
  );
};
