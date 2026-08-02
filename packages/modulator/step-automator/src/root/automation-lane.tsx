import {
  clockDivisionOptions,
  gaugeReferenceIndexMap,
  patternRangeOptions,
} from "@/base/constants";
import { qu } from "@/base/css-realm";
import { createSelectorOptions } from "@/base/selector-option";
import { AutomationLaneItem } from "@/base/types";
import { IndicatorButton, LabeledBox, ParameterSelector } from "@/components";
import { StepIndicatorLed } from "@/components/led";
import { ParameterGauge } from "@/components/parameter-gauge";
import { ShiftSelector } from "@/components/shift-selector";
import { store } from "@/root/store";
import { useMemo } from "preact/hooks";

function useParameterSelectorOptions() {
  const { parameterIds } = store.useSnapshot();
  return useMemo(() => {
    return createSelectorOptions([
      ["", "--"],
      ...(parameterIds.map((id) => [id, id]) as [string, string][]),
    ]);
  }, [parameterIds]);
}

export const AutomationLane = ({
  lane,
  playbackStepIndex,
}: {
  lane: AutomationLaneItem;
  playbackStepIndex: number;
}) => {
  const parameterSelectorOptions = useParameterSelectorOptions();

  const patchLane = (attrs: Partial<AutomationLaneItem>) => {
    store.setLanes((prev) =>
      prev.map((s) => (s.id === lane.id ? { ...s, ...attrs } : s)),
    );
  };
  const setStepValue = (index: number, value: number) => {
    patchLane({
      stepValues: lane.stepValues.map((v, i) => (i === index ? value : v)),
    });
  };
  return (
    <div class={qu.flexV().gap(5).it}>
      <div class={qu.flexHA().fJustify("between").it}>
        <div class={qu.flexHA().gap(2).it}>
          <LabeledBox width={30}>
            <IndicatorButton
              active={lane.enabled}
              onClick={() => patchLane({ enabled: !lane.enabled })}
            />
          </LabeledBox>
          <LabeledBox label="target parameter" labelAlign="left">
            <ParameterSelector
              value={lane.targetParameterId}
              onChange={(value) => patchLane({ targetParameterId: value })}
              options={parameterSelectorOptions}
            />
          </LabeledBox>
        </div>
        <div class={qu.flexHA().gap(3).it}>
          <LabeledBox label="clock-div">
            <ShiftSelector
              options={clockDivisionOptions}
              value={lane.clockDivision}
              onChange={(value) => patchLane({ clockDivision: value })}
            />
          </LabeledBox>
          <LabeledBox label="pt-range">
            <ShiftSelector
              options={patternRangeOptions}
              value={lane.patternRange}
              onChange={(value) => patchLane({ patternRange: value })}
            />
          </LabeledBox>
        </div>
      </div>
      <div class={qu.flexH().gap(2).it}>
        {lane.stepValues.map((_, index) => {
          const destIndex = gaugeReferenceIndexMap[lane.patternRange][index];
          const value = lane.stepValues[destIndex];
          return (
            <div class={qu.flexVC().gap(3).it}>
              <StepIndicatorLed active={playbackStepIndex === index} />
              <ParameterGauge
                key={index}
                value={value}
                onChange={(value) => setStepValue(destIndex, value)}
                altColor={index % 8 >= 4}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
