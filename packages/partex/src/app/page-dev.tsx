import {
  loopBarsOptions,
  patternBarsOptions,
  patternModeOptions,
  songKeyOptions,
} from "@/app/controls-section";
import { PianoRollEditorView } from "@/app/piano-roll-editor-view";
import {
  Button,
  Knob,
  PanelFrame,
  ShiftSelector,
  TitleLabel,
  UpperLabel,
} from "@/components/mono3";
import { CssVariablesFrame, colorVars } from "@/components/ui-theme";
import { store } from "@/store/store";

export function PageDev() {
  const snap = store.useSnapshot();
  return (
    <CssVariablesFrame>
      <PanelFrame>
        <div className="flex-v gap-2">
          <div className="flex-ha justify-between px-9">
            <div className="mt-[-14px]">
              <TitleLabel title="pattern sequencer" />
            </div>
            <div className="flex-ha gap-5">
              <UpperLabel label="pt-mode">
                <ShiftSelector
                  className="w-24"
                  options={patternModeOptions}
                  value={snap.patternMode}
                  onChange={store.setPatternMode}
                />
              </UpperLabel>
              <UpperLabel label="pt-bars">
                <ShiftSelector
                  options={patternBarsOptions}
                  value={snap.patternBars}
                  onChange={store.setPatternBars}
                />
              </UpperLabel>
              <UpperLabel label="bars">
                <ShiftSelector
                  options={loopBarsOptions}
                  value={snap.loopBars}
                  onChange={store.setLoopBars}
                />
              </UpperLabel>
            </div>
          </div>
          <div className="flex-ha pt-2 justify-between px-9">
            <div className="flex-ha gap-8">
              <div className="flex-ha gap-4">
                <UpperLabel label="key">
                  <ShiftSelector
                    options={songKeyOptions}
                    value={snap.songKey}
                    onChange={store.setSongKey}
                  />
                </UpperLabel>
              </div>
              <div className="flex-ha gap-7">
                <UpperLabel label="octave">
                  <Knob value={0.5} onChange={() => {}} />
                </UpperLabel>
                <UpperLabel label="duty-s">
                  <Knob value={0.5} onChange={() => {}} />
                </UpperLabel>
                <UpperLabel label="duty-l">
                  <Knob value={0.5} onChange={() => {}} />
                </UpperLabel>
              </div>
              <div
                className="font-medium text-md"
                style={{ color: colorVars.clForeground }}
              >
                {snap.currentPageIndex + 1} / {Math.max(1, snap.loopBars / 2)}
              </div>
            </div>
            <div className="flex-ha gap-4">
              <Button text="ghost" onClick={() => {}} />
              <Button text="realize" onClick={() => {}} />
              {false && <Button text="restore" onClick={() => {}} />}
              <Button className="w-9!" text="x" onClick={() => {}} />
            </div>
          </div>
          <div className="pt-1">
            <PianoRollEditorView />
          </div>
        </div>
      </PanelFrame>
    </CssVariablesFrame>
  );
}
