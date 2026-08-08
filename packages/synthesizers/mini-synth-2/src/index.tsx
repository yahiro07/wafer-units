import { render } from "preact";
import "./setup-twind";
import { KnobBox } from "@/components/knob-box";
import "./page.css";

const App = () => {
  return (
    <div class="h-[100dvh] flex-c text-clText">
      <div class="flex-h gap-8">
        <KnobBox label="wave" value={0.5} onChange={() => {}} />
        <KnobBox label="detune" value={0.5} onChange={() => {}} />
        <KnobBox label="sub" value={0.5} onChange={() => {}} />
        <KnobBox label="drift" value={0.5} onChange={() => {}} />
      </div>
      <div class="flex-h gap-8">
        <KnobBox label="decay" value={0.5} onChange={() => {}} />
        <KnobBox label="release" value={0.5} onChange={() => {}} />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("app")!);
