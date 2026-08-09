import { render } from "preact";
import "./setup-twind";
import { KnobBox } from "@/components/knob-box";
import "./page.css";
import { SectionFrame } from "@/components/section-frame";
import { Button } from "@/components/button";
import { createPlainSelectorOptions } from "@/utils/selector-option";
import { Selector } from "@/components/selector";

const TitleText = () => {
  return (
    <div class="text-[18px]">
      MiniSynth<span class="text-clPrimary">2</span>
    </div>
  );
};

const presetOptions = createPlainSelectorOptions([
  "preset1",
  "preset2",
  "preset3",
]);

const PresetSelectionPart = () => {
  return (
    <div class="flex-ha gap-1.5">
      <Button asr={1.3}>
        <i class="ri-arrow-left-s-line text-2xl" />
      </Button>
      <Selector
        value={presetOptions[0].value}
        onChange={() => {}}
        options={presetOptions}
        height={44}
      />
      <Button asr={1.3}>
        <i class="ri-arrow-right-s-line text-2xl" />
      </Button>
    </div>
  );
};

const TopBar = () => {
  return (
    <div class="bd-clSectionEdge rounded-[3px] flex-ha py-2 px-3 justify-between">
      <div class="w-[120px]">
        <TitleText />
      </div>
      <PresetSelectionPart />
      <div class="w-[120px] flex-ha justify-end">
        <Button asr={2}>
          <div class="flex-ha gap-1">
            <span class="text-clPrimary">RND</span>
            <i class="ri-dice-3-line text-xl" />
          </div>
        </Button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div class="h-[100dvh] flex-c text-clText">
      <div class="w-[680px] flex-v gap-3">
        <TopBar />
        <div class="flex-v gap-3">
          <div class="flex-h gap-3">
            <SectionFrame header="OSCILLATOR" className="w-[60%]">
              <KnobBox label="wave" value={0.5} onChange={() => {}} />
              <KnobBox label="detune" value={0.5} onChange={() => {}} />
              <KnobBox label="sub" value={0.5} onChange={() => {}} />
              <KnobBox label="drift" value={0.5} onChange={() => {}} />
            </SectionFrame>
            <SectionFrame
              header="AMPLIFIER"
              className="grow"
              contentClassName="!px-3"
            >
              <KnobBox label="decay" value={0.5} onChange={() => {}} />
              <KnobBox label="release" value={0.5} onChange={() => {}} />
            </SectionFrame>
          </div>
          <div class="flex-h gap-3">
            <SectionFrame header="FILTER" className="grow">
              <KnobBox label="cutoff" value={0.5} onChange={() => {}} />
              <KnobBox label="peak" value={0.5} onChange={() => {}} />
              <KnobBox label="envmod" value={0.5} onChange={() => {}} />
            </SectionFrame>
            <SectionFrame header="MASTER" className="grow">
              <KnobBox label="chorus" value={0.5} onChange={() => {}} />
              <KnobBox label="reverb" value={0.5} onChange={() => {}} />
              <KnobBox label="volume" value={0.5} onChange={() => {}} />
            </SectionFrame>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("app")!);
