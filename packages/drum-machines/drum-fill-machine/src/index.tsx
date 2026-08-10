import { render } from "preact";
import { tx } from "./common/setup-twind";
import { createPlainSelectorOptions } from "@/utils/selector-option";
import { Selector } from "@/components/selector";
import { Button } from "@/components/button";

const hatOptions = createPlainSelectorOptions([
  "hc1",
  "hc2",
  "hc3",
  "hc4",
  "hc5",
]);

const cymbalOptions = createPlainSelectorOptions(["cc1", "cc2", "cc3"]);

const loopBarOptions = createPlainSelectorOptions([2, 4, 8, 16, 32]);

const patterOptions = createPlainSelectorOptions([
  "pattern1",
  "pattern2",
  "pattern3",
]);

const App = () => {
  return (
    <div class={tx`h-[100dvh] flex-c`}>
      <div class={tx`flex-v gap-4`}>
        <h1 class={tx`text-2xl font-bold`}>Drum Fill Machine</h1>

        <div class={tx`flex-h gap-6 bd-gray-400 p-4`}>
          <div class={tx`flex-v gap-2`}>
            <div class={tx`flex-ha gap-2 justify-between`}>
              pattern
              <Selector
                options={patterOptions}
                value="pattern1"
                onChange={() => {}}
              />
            </div>
            <div class={tx`flex-ha gap-2`}>
              loop bars
              <Selector
                options={loopBarOptions}
                value={4}
                onChange={() => {}}
              />
            </div>
          </div>

          <div class={tx`flex-v gap-2`}>
            <div class={tx`flex-ha gap-2`}>
              <div class={tx`grow`}>hi-hat</div>
              <Selector options={hatOptions} value="hc1" onChange={() => {}} />
              <Button asr={1.2} active children="on" />
            </div>
            <div class={tx`flex-ha gap-2`}>
              <div class={tx`grow`}>cymbal</div>
              <Selector
                options={cymbalOptions}
                value="cc1"
                onChange={() => {}}
              />
              <Button asr={1.2} children="on" />
            </div>
          </div>
        </div>

        <div class={tx`flex-h gap-2`}>
          <Button>Trigger</Button>
          <Button active>Loop</Button>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("app")!;
render(<App />, rootElement);
