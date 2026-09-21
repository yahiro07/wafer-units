import {
  clockDivisionOptions,
  gaugeReferenceIndexMap,
  patternRangeOptions,
} from "@/base/constants";
import { qu } from "@/base/css-realm";
import { AutomationLaneItem } from "@/base/types";
import { IndicatorButton, LabeledBox } from "@/components";
import { StepIndicatorLed } from "@/components/led";
import { ParameterGauge } from "@/components/parameter-gauge";
import { ShiftSelector } from "@/components/shift-selector";
import { store } from "@/root/store";

export const AutomationLane = ({
  lane,
  playbackStepIndex,
}: {
  lane: AutomationLaneItem;
  playbackStepIndex: number;
}) => {
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
    <div sx={qu.flexV().gap(2.5)}>
      <div sx={qu.flexHA().fJustify("between")}>
        <div sx={qu.flexHA().gap(2)}>
          <LabeledBox>
            <div sx={qu.flexHA().gap(2)}>
              <IndicatorButton
                active={lane.enabled}
                onClick={() => patchLane({ enabled: !lane.enabled })}
              />
              <div>Step Automator</div>
            </div>
          </LabeledBox>
        </div>
        <div sx={qu.flexHA().gap(3)}>
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
      <div sx={qu.flexH().gap(2)}>
        {lane.stepValues.map((_, index) => {
          const destIndex = gaugeReferenceIndexMap[lane.patternRange][index];
          const value = lane.stepValues[destIndex];
          return (
            <div sx={qu.flexVC().gap(3)}>
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
