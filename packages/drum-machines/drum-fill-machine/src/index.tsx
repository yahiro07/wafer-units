import { render } from "preact";
import { createPlainSelectorOptions } from "@/utils/selector-option";
import { Selector } from "@/components/selector";
import { Button } from "@/components/button";
import { Knob } from "@/components/knob";

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
    <div class="h-[100dvh] flex-c">
      <div class="flex-v gap-3 w-[480px] bg-gray-300 px-8 py-5">
        <h1 class="text-xl font-bold">Drum Fill Machine</h1>
        <div class="flex-v gap-5">
          <div class="flex-h gap-2">
            <div class="flex-ha gap-2 justify-between">
              pattern
              <Selector
                options={patterOptions}
                value="pattern1"
                onChange={() => {}}
              />
            </div>
            <div class="grow" />
            <div class="flex-ha gap-2">
              loop bars
              <Selector
                options={loopBarOptions}
                value={4}
                onChange={() => {}}
                width={100}
              />
            </div>
          </div>

          <div class="flex-v gap-2">
            <div class="flex-ha gap-3">
              <div class="grow">hi-hat</div>
              <Selector options={hatOptions} value="hc1" onChange={() => {}} />
              <Knob value={0.5} onChange={() => {}} />
              <Knob value={0.5} onChange={() => {}} />
              <Button asr={1.2} active children="on" />
            </div>
            <div class="flex-ha gap-3">
              <div class="grow">cymbal</div>
              <Selector
                options={cymbalOptions}
                value="cc1"
                onChange={() => {}}
              />
              <Knob value={0.5} onChange={() => {}} />
              <Knob value={0.5} onChange={() => {}} />
              <Button asr={1.2} children="on" />
            </div>
          </div>

          <div class="flex-h justify-between">
            <div class="flex-ha gap-2">
              <div>volume slope up</div>
              <Button asr={1.2} children="on" />
            </div>
            <div class="flex-h gap-2">
              <Button>Trigger</Button>
              <Button active>Loop</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("app")!;
render(<App />, rootElement);
