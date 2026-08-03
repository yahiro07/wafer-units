import { qu } from "@/base/css-realm";
import { LfoSlot } from "@/base/types";
import {
  IndicatorButton,
  Knob,
  LabeledBox,
  NarrowButton,
  ParameterSelector,
  reteToStepText,
  YStepButton,
} from "@/components";
import { ButtonFrame } from "@/components/button-frame";
import { UnitWaveView } from "@/components/unit-wave-view";
import { store } from "@/root/store";
import { createSelectorOptions } from "@/utils/selector-option";
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

export const LfoLane = ({ slot }: { slot: LfoSlot }) => {
  const patchSlot = (attrs: Partial<LfoSlot>) => {
    store.setSlots((prev) =>
      prev.map((s) => (s.id === slot.id ? { ...s, ...attrs } : s)),
    );
  };
  const parameterSelectorOptions = useParameterSelectorOptions();
  return (
    <div class={qu.flexHA().gap(3).it}>
      <LabeledBox label={`slot ${slot.id + 1}`} width={30}>
        <IndicatorButton
          active={slot.enabled}
          onClick={() => patchSlot({ enabled: !slot.enabled })}
        />
      </LabeledBox>
      <LabeledBox label="Target Parameter" labelAlign="left">
        <ParameterSelector
          value={slot.targetParameterId}
          onChange={(value) => patchSlot({ targetParameterId: value })}
          options={parameterSelectorOptions}
        />
      </LabeledBox>
      <LabeledBox label="Center">
        <Knob
          value={slot.centerValue}
          onChange={(value) => patchSlot({ centerValue: value })}
        />
      </LabeledBox>
      <LabeledBox label="Wave">
        <ButtonFrame onClick={() => patchSlot({ wave: (slot.wave + 1) % 5 })}>
          <UnitWaveView
            wave={slot.wave}
            inverted={slot.inverted}
            shifted={slot.shifted}
          />
        </ButtonFrame>
      </LabeledBox>
      <LabeledBox>
        <div class={qu.flexV().gap(1).it}>
          <NarrowButton
            text="INV"
            active={slot.inverted}
            onClick={() => patchSlot({ inverted: !slot.inverted })}
          />
          <NarrowButton
            text="SHIFT"
            active={slot.shifted}
            onClick={() => patchSlot({ shifted: !slot.shifted })}
          />
        </div>
      </LabeledBox>

      <LabeledBox label={`Rate ${reteToStepText(slot.rate)}`} width={40}>
        <Knob
          value={slot.rate}
          onChange={(value) => patchSlot({ rate: value })}
          min={0}
          max={1}
          step={1 / 8}
        />
      </LabeledBox>
      {/* <LabeledBox label="Step">
        <SteppedButton
          active={slot.rateStepped}
          rate={slot.rate}
          // onClick={() => patchSlot({ rateStepped: !slot.rateStepped })}
        />
      </LabeledBox> */}
      <LabeledBox label="Depth">
        <Knob
          value={slot.depth}
          onChange={(value) => patchSlot({ depth: value })}
        />
      </LabeledBox>

      {/* <LabeledBox label="X Step">
        <XStepButton
          xStep={slot.xStep}
          onClick={() => patchSlot({ xStep: (slot.xStep + 1) % 4 })}
        />
      </LabeledBox> */}
      <LabeledBox label="Y Step">
        <YStepButton
          yStep={slot.yStep}
          onClick={() => patchSlot({ yStep: (slot.yStep + 1) % 4 })}
        />
      </LabeledBox>
    </div>
  );
};
