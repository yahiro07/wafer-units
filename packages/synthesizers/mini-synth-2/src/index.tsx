import { render } from "preact";
import "./setup-twind";
import { KnobBox } from "@/components/knob-box";
import "./page.css";
import { SectionFrame } from "@/components/section-frame";

const App = () => {
  return (
    <div class="h-[100dvh] flex-c text-clText">
      <div class="w-[620px] flex-v gap-4">
        <div class="flex-h gap-4">
          <SectionFrame header="OSCILLATOR" className="w-[60%]">
            <KnobBox label="wave" value={0.5} onChange={() => {}} />
            <KnobBox label="detune" value={0.5} onChange={() => {}} />
            <KnobBox label="sub" value={0.5} onChange={() => {}} />
            <KnobBox label="drift" value={0.5} onChange={() => {}} />
          </SectionFrame>
          <SectionFrame header="AMPLIFIER" className="grow">
            <KnobBox label="decay" value={0.5} onChange={() => {}} />
            <KnobBox label="release" value={0.5} onChange={() => {}} />
          </SectionFrame>
        </div>
        <div class="flex-h gap-4">
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
  );
};

render(<App />, document.getElementById("app")!);
