import { iife, seqNumbers } from "mofur/ax";
import {
  clockDivisionOptions,
  patternRangeOptions,
} from "@/base/selector-options";
import { AutomationLaneItem, PatternRange } from "@/base/types";
import { IndicatorButton, LabeledBox } from "@/components";
import { StepIndicatorLed } from "@/components/led";
import { ParameterGauge } from "@/components/parameter-gauge";
import { ShiftSelector } from "@/components/shift-selector";
import { store } from "@/root/store";
import { qu } from "@/utils/qstyle-goober";

const gaugeReferenceIndexMap: Record<PatternRange, number[]> = {
  2: seqNumbers(8).flatMap(() => [0, 1]),
  3: seqNumbers(2).flatMap(() => [0, 1, 2, 0, 1, 2, 0, 1]),
  4: seqNumbers(4).flatMap(() => [0, 1, 2, 3]),
  8: seqNumbers(2).flatMap(() => [0, 1, 2, 3, 4, 5, 6, 7]),
  16: seqNumbers(16),
};

export const AutomationLane = ({ lane }: { lane: AutomationLaneItem }) => {
  const patchLane = (attrs: Partial<AutomationLaneItem>) => {
    store.setLanes((prev) =>
      prev.map((s) => (s.id === lane.id ? { ...s, ...attrs } : s)),
    );
  };
  const handleClickParamId = () => {
    const { parameterIds } = store.state;
    if (parameterIds.length > 0) {
      const index = parameterIds.indexOf(lane.targetParameterId ?? "");
      const nextIndex = iife(() => {
        if (index === -1) {
          return 0;
        } else if (index === parameterIds.length - 1) {
          return -1;
        } else {
          return index + 1;
        }
      });
      patchLane({ targetParameterId: parameterIds[nextIndex] ?? null });
    }
  };
  const setStepValue = (index: number, value: number) => {
    patchLane({
      stepValues: lane.stepValues.map((v, i) => (i === index ? value : v)),
    });
  };
  return (
    <div class={qu.flexV().gap(4)}>
      <div class={qu.flexHA().justify("between")}>
        <div class={qu.flexHA().gap(2)}>
          <LabeledBox label={`lane ${lane.id + 1}`} width={30}>
            <IndicatorButton
              active={lane.enabled}
              onClick={() => patchLane({ enabled: !lane.enabled })}
            />
          </LabeledBox>
          <LabeledBox label="Target Parameter" labelAlign="left">
            <div
              class={qu.flexC().wh(100, 40).bg("#ddd").fontSize(12)}
              onClick={handleClickParamId}
            >
              {lane.targetParameterId ?? "--"}
            </div>
          </LabeledBox>
        </div>
        <div class={qu.flexHA().gap(3)}>
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
      <div class={qu.flexH().gap(2)}>
        {lane.stepValues.map((_, index) => {
          const destIndex = gaugeReferenceIndexMap[lane.patternRange][index];
          const value = lane.stepValues[destIndex];
          return (
            <div class={qu.flexVC().gap(3)}>
              <StepIndicatorLed active={index === 3} />
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
