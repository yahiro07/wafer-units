import "./page.css";
import "beams/ax-ui/utility-classes.css";
import { mountAppRoot } from "beams/ax-solid/mount-app-root";
import { Button } from "@/components/button";
import { Icons } from "@/components/icons";
import { Knob } from "@/components/knob";
import { FeNumberSliderBox } from "@/components/number-slider-box";
import { NoteClockView } from "@/organisms/note-clock-view";
import { StepButton } from "@/organisms/step-button";
import { StepRollBar } from "@/organisms/step-roll-bar";
import { drivers } from "@/sequencer/drivers";
import { appReaders, appState, uiActions } from "@/store/store";
import { getNoteName } from "@/utils/note-name-helper";

const TopBar = () => {
  return (
    <div class="w-full flex-c gap-3 bg-zinc-600 px-2 py-3">
      <Button
        active={appState.playing}
        onClick={() => uiActions.setPlaying(!appState.playing)}
      >
        <Icons.Play />
      </Button>
      {/* <FeNumberSliderBox
        value={appState.bpm}
        onChange={uiActions.setBpm}
        min={90}
        max={140}
        step={1}
        fracDigits={0}
      /> */}
      <div class="flex-ha gap-1">
        <div class="text-white">note</div>
        <FeNumberSliderBox
          value={appState.noteNumber}
          onChange={uiActions.setNoteNumber}
          min={12}
          max={48}
          step={1}
          fracDigits={0}
        />
        <NoteClockView noteNumber={appState.noteNumber} />
        <div class="w-[16px] text-white">
          {getNoteName(appState.noteNumber)}
        </div>
      </div>
      <div class="flex-ha gap-1">
        <div class="text-white">duty</div>
        <Knob
          value={appState.duty}
          onChange={uiActions.setDuty}
          min={0.1}
          max={1}
          step={0.01}
        />
      </div>
    </div>
  );
};

const PageRoot = () => {
  return (
    <div class="w-dvw h-dvh flex-c text-[#444]">
      <div class="w-[340px] h-[210px] flex-vc bg-zinc-100 border border-[#445]">
        <TopBar />
        <div class="grow flex-vc gap-3">
          <StepRollBar
            stepCodes={appState.stepCodes}
            currentStepIndex={appState.currentStepIndex}
            playing={appReaders.somePlaying()}
            duty={appState.duty}
          />
          <div class="flex-ha gap-3">
            {appState.stepCodes.map((code, index) => (
              <StepButton
                index={index}
                code={code}
                active={
                  appState.currentStepIndex === index &&
                  appReaders.somePlaying()
                }
                onChange={(nextCode) => uiActions.setStepCode(index, nextCode)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  console.log("useq 0914");
  drivers.setupAll();

  return <PageRoot />;
};

mountAppRoot(() => <App />);
