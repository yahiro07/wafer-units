import { render } from "preact";
import "./setup-twind";
import { Knob } from "@/components/knob";

const App = () => {
  return (
    <div class="h-[100dvh] flex-c">
      <Knob value={0.5} onChange={() => {}} />
    </div>
  );
};

render(<App />, document.getElementById("app")!);
