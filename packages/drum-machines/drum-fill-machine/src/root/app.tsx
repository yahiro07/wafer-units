import { createPlainSelectorOptions } from "@/utils/selector-option";
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
import { ShiftSelector } from "@/components/shift-selector";
import { useSetupDrivers } from "@/root/drivers";

const loopBarOptions = createPlainSelectorOptions([1, 2, 4, 8, 16, 32]);

const patterOptions = createPlainSelectorOptions([
  "pattern1",
  "pattern2",
  "pattern3",
]);

const PatternSelectorContainer = () => {
  const { patternKey } = store.useSnapshot();
  return (
    <div class="flex-ha gap-2 justify-between">
      pattern
      <ShiftSelector
        options={patterOptions}
        value={patternKey}
        onChange={store.setPatternKey}
        width={140}
      />
    </div>
  );
};

const LoopBarsSelectorContainer = () => {
  const { loopBars } = store.useSnapshot();
  return (
    <div class="flex-ha gap-2">
      loop bars
      <ShiftSelector
        options={loopBarOptions}
        value={loopBars}
        onChange={store.setLoopBars}
        width={100}
      />
    </div>
  );
};

const _TopRow = () => {
  return (
    <div class="flex-h gap-2">
      <PatternSelectorContainer />
      <div class="grow" />
      <LoopBarsSelectorContainer />
    </div>
  );
};

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
    ) as readonly SampleKey[];
    const index = allSampleKeys.indexOf(partItem.sampleKey);
    const nextIndex = (index + 1) % allSampleKeys.length;
    const nextSampleKey = allSampleKeys[nextIndex];
    patchPartAttrs({ sampleKey: nextSampleKey });
    //todo: play sample here
  };
  return (
    <div class="flex-ha gap-3">
      <div class="grow">{partKey === "hat" ? "roll" : "crash"}</div>
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

const _VolumeSlopeUpContainer = () => {
  const { volumeSlopeUp } = store.useSnapshot();

  return (
    <div class="flex-ha gap-2">
      <div>volume slope up</div>
      <Button
        asr={1.2}
        children="on"
        active={volumeSlopeUp}
        onClick={store.toggleVolumeSlopeUp}
      />
    </div>
  );
};

const LoopButton = () => {
  const { loopEnabled } = store.useSnapshot();
  return (
    <Button active={loopEnabled} onClick={store.toggleLoopEnabled}>
      Loop
    </Button>
  );
};

const TriggerOneShotButton = () => {
  const { oneShotTriggered } = store.useSnapshot();
  const triggerOneShot = () => {
    store.toggleOneShotTriggered();
  };
  return (
    <Button activeBlink={oneShotTriggered} onClick={triggerOneShot}>
      Trigger
    </Button>
  );
};

const BottomRow = () => {
  return (
    <div class="flex-h justify-between">
      {/* <VolumeSlopeUpContainer /> */}
      <LoopBarsSelectorContainer />
      <div class="flex-h gap-2">
        <LoopButton />
        <TriggerOneShotButton />
      </div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  return (
    <div class="h-[100dvh] flex-c">
      <div class="flex-v gap-3 w-[500px] bg-gray-300 px-8 py-5">
        <h1 class="text-xl font-[600]">Drum Fill Machine</h1>
        <div class="flex-v gap-5">
          {/* <TopRow /> */}
          <div class="flex-v gap-2">
            <PartEditRow partKey="hat" />
            <PartEditRow partKey="cymbal" />
          </div>
          <BottomRow />
        </div>
      </div>
    </div>
  );
};
