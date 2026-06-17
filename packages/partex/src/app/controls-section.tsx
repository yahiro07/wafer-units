import { seqNumbers } from "mofur/ax";
import { ScalerBox2 } from "mofur/mo-react";
import {
  Button,
  createSelectorOptions,
  GeneralSelector,
  Knob,
} from "mofur-components/mono2";
import { LabeledRow } from "@/components";
import { store } from "@/store/store";

const octaveShiftOptions = createSelectorOptions(
  seqNumbers(7).map((i) => [i - 3, `${i - 3}`]),
);

const loopBarsOptions = createSelectorOptions(
  [0.5, 1, 2, 4, 8, 16].map((v) => [v, `${v === 0.5 ? "1/2" : v}`]),
);

export const ControlsSection = () => {
  const st = store.useSnapshot();
  const clearNotes = () => {
    store.setNotes([]);
    store.setCurrentPageIndex(0);
  };
  return (
    <div className="flex-ha gap-2 justify-between">
      <div>piano-roll</div>
      <div className="flex-ha gap-4 text-sm">
        <LabeledRow label="octave">
          <GeneralSelector
            options={octaveShiftOptions}
            value={st.octaveShift}
            onChange={store.setOctaveShift}
            reverseOptionsOrder
          />
        </LabeledRow>
        <LabeledRow label="duty">
          <ScalerBox2 destWidth={20} destHeight={20}>
            <Knob
              value={st.noteDuty}
              min={0}
              max={1}
              step={0.01}
              onChange={store.setNoteDuty}
            />
          </ScalerBox2>
        </LabeledRow>
        <LabeledRow label="bars">
          <GeneralSelector
            options={loopBarsOptions}
            value={st.loopBars}
            onChange={store.setLoopBars}
          />
        </LabeledRow>
      </div>
      <ScalerBox2 destWidth={24} destHeight={20}>
        <Button text="x" onClick={clearNotes} asr={1.25} />
      </ScalerBox2>
    </div>
  );
};
