import { seqNumbers } from "mofur/ax";
import {
  Button,
  createPlainSelectorOptions,
  createSelectorOptions,
  GeneralSelector,
  LabeledRow,
} from "@/components";
import { Knob } from "@/components/mono3";
import { store } from "@/store/store";
import { PatternMode, SongKey } from "@/store/types";

export const patternModeOptions = createSelectorOptions<PatternMode>([
  ["slice", "slice"],
  ["shift", "shift"],
  ["polyphonicShift", "poly-shift"],
]);

export const songKeyOptions = createPlainSelectorOptions<SongKey>(["Am", "C"]);

const octaveShiftOptions = createSelectorOptions(
  seqNumbers(7).map((i) => [i - 3, `${i - 3}`]),
);

export const patternBarsOptions = createSelectorOptions([
  [0.25, "1/4"],
  [0.5, "1/2"],
  [1, "1"],
]);
export const loopBarsOptions = createSelectorOptions(
  [0.5, 1, 2, 4, 8, 16].map((v) => [v, `${v === 0.5 ? "1/2" : v}`]),
);

const controlActions = {
  clearNotes() {
    store.setState({
      inputNotes: [],
      currentPageIndex: 0,
      realized: false,
    });
  },
  realizeNotes() {
    const st = store.state;
    store.setState({
      backupInputNotes: st.inputNotes,
      inputNotes: st.mappedNotes.map((n) => ({
        ...n,
        noteType: undefined,
      })),
      ghostEnabled: false,
      realized: true,
    });
  },
  undoRealize() {
    const st = store.state;
    if (!st.backupInputNotes) return;
    store.setState({
      inputNotes: st.backupInputNotes,
      backupInputNotes: null,
      ghostEnabled: true,
      realized: false,
    });
  },
};

export const ControlsSection = () => {
  const st = store.useSnapshot();
  return (
    <div className="flex-v gap-2">
      <div className="flex-ha gap-2 justify-between">
        <div>partex</div>
        <div className="flex-ha gap-4 text-sm">
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
        </div>
      </div>
      <div className="flex-ha gap-4">
        <LabeledRow label="key">
          <GeneralSelector
            options={songKeyOptions}
            value={st.songKey}
            onChange={store.setSongKey}
          />
        </LabeledRow>
        <LabeledRow label="oct">
          <GeneralSelector
            options={octaveShiftOptions}
            value={st.octaveShift}
            onChange={store.setOctaveShift}
            reverseOptionsOrder
          />
        </LabeledRow>
        <LabeledRow label="duty">
          <Knob value={st.noteDuty} onChange={store.setNoteDuty} />
        </LabeledRow>

        <div className="grow" />
        {!st.realized && (
          <>
            <Button active={st.ghostEnabled} onClick={store.toggleGhostEnabled}>
              ghost
            </Button>
            <Button
              onClick={controlActions.realizeNotes}
              disabled={!st.ghostEnabled}
            >
              realize
            </Button>
          </>
        )}
        {st.realized && st.backupInputNotes && (
          <Button onClick={controlActions.undoRealize}>restore</Button>
        )}
        <Button text="x" onClick={controlActions.clearNotes} asr={1.25} />
      </div>
    </div>
  );
};
