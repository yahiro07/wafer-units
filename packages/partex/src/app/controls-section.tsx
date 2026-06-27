import {
  Button,
  Knob,
  ShiftSelector,
  TitleLabel,
  UpperLabel,
} from "@/components/mono3";
import {
  createPlainSelectorOptions,
  createSelectorOptions,
} from "@/components/selector-option";
import { colorVars } from "@/components/ui-theme";
import { store } from "@/store/store";
import { PatternMode, SongKey } from "@/store/types";

export const patternModeOptions = createSelectorOptions<PatternMode>([
  ["slice", "slice"],
  ["shift", "shift"],
  ["polyphonicShift", "poly-shift"],
]);

export const songKeyOptions = createPlainSelectorOptions<SongKey>(["Am", "C"]);

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
    <div className="flex-v gap-3">
      <div className="flex-ha justify-between px-9">
        <div className="mt-[-14px]">
          <TitleLabel title="PARTEX" />
        </div>
        <div className="flex-ha gap-5">
          <UpperLabel label="pt-mode">
            <ShiftSelector
              className="w-24"
              options={patternModeOptions}
              value={st.patternMode}
              onChange={store.setPatternMode}
            />
          </UpperLabel>
          <UpperLabel label="pt-bars">
            <ShiftSelector
              options={patternBarsOptions}
              value={st.patternBars}
              onChange={store.setPatternBars}
            />
          </UpperLabel>
          <UpperLabel label="bars">
            <ShiftSelector
              options={loopBarsOptions}
              value={st.loopBars}
              onChange={store.setLoopBars}
            />
          </UpperLabel>
        </div>
      </div>
      <div className="flex-ha justify-between px-9">
        <div className="flex-ha gap-8">
          <div className="flex-ha gap-4">
            <UpperLabel label="key">
              <ShiftSelector
                options={songKeyOptions}
                value={st.songKey}
                onChange={store.setSongKey}
              />
            </UpperLabel>
          </div>
          <div className="flex-ha gap-7">
            <UpperLabel label="octave">
              <Knob
                value={st.octaveShift}
                onChange={store.setOctaveShift}
                min={-3}
                max={3}
                step={1}
              />
            </UpperLabel>
            <UpperLabel label="duty">
              <Knob value={st.noteDuty} onChange={store.setNoteDuty} />
            </UpperLabel>
          </div>
          <div
            className="font-medium text-md ml-[40px]"
            style={{ color: colorVars.clForeground }}
          >
            {st.currentPageIndex + 1} / {Math.max(1, st.loopBars / 2)}
          </div>
        </div>
        <div className="flex-ha gap-4">
          {!st.realized && (
            <>
              <Button
                active={st.ghostEnabled}
                onClick={store.toggleGhostEnabled}
              >
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
          <Button
            text="x"
            className="w-9!"
            onClick={controlActions.clearNotes}
          />
        </div>
      </div>
    </div>
  );
};
