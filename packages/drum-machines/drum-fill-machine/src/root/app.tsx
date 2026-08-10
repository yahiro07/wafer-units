import { createPlainSelectorOptions } from "@/utils/selector-option";
import { Selector } from "@/components/selector";
import { Button } from "@/components/button";
import { Knob } from "@/components/knob";
import {
  allCymbalSampleKeys,
  allHatSampleKeys,
  PartItem,
  PartKey,
  SampleKey,
} from "@/core/definitions";
import { store } from "@/root/store";
import { Icons } from "@/common/icons";

const loopBarOptions = createPlainSelectorOptions([2, 4, 8, 16, 32]);

const patterOptions = createPlainSelectorOptions([
  "pattern1",
  "pattern2",
  "pattern3",
]);

const PartEditRow = ({ partKey }: { partKey: PartKey }) => {
  const { hatPartItem, cymbalPartItem } = store.useSnapshot();
  const partItem = partKey === "hat" ? hatPartItem : cymbalPartItem;
  const patchPartAttrs = (attrs: Partial<PartItem>) => {
    const patchPartItemFn =
      partKey === "hat" ? store.patchHatPartItem : store.patchCymbalPartItem;
    patchPartItemFn(attrs);
  };
  const shiftSample = () => {
    const allSampleKeys = (
      partKey === "hat" ? allHatSampleKeys : allCymbalSampleKeys
    ) as SampleKey[];
    const index = allSampleKeys.indexOf(partItem.sampleKey);
    const nextIndex = (index + 1) % allSampleKeys.length;
    const nextSampleKey = allSampleKeys[nextIndex];
    patchPartAttrs({ sampleKey: nextSampleKey });
    //todo: play sample here
  };
  return (
    <div class="flex-ha gap-3">
      <div class="grow">{partKey}</div>
      <div class="flex-h">
        <div class="w-[140px] h-[40px] bg-clControlBg bd-clControlEdge flex-c">
          {partItem.sampleKey}
        </div>
        <Button asr={1} onClick={shiftSample}>
          <Icons.Exchange />
        </Button>
      </div>
      <Knob
        value={partItem.pitchTweak}
        onChange={(v) => patchPartAttrs({ pitchTweak: v })}
        min={-1}
        max={1}
        step={0.01}
      />
      <Knob
        value={partItem.volume}
        onChange={(v) => patchPartAttrs({ volume: v })}
      />
      <Button
        asr={1.2}
        children="on"
        active={partItem.enabled}
        onClick={() => patchPartAttrs({ enabled: !partItem.enabled })}
      />
    </div>
  );
};

export const App = () => {
  return (
    <div class="h-[100dvh] flex-c">
      <div class="flex-v gap-3 w-[500px] bg-gray-300 px-8 py-5">
        <h1 class="text-xl font-[600]">Drum Fill Machine</h1>
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
            <PartEditRow partKey="hat" />
            <PartEditRow partKey="cymbal" />
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
