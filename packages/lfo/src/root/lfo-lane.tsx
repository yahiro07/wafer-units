import { iife } from "mofur/ax";
import { LfoSlot } from "@/base/types";
import {
  IndicatorButton,
  Knob,
  LabeledBox,
  SteppedButton,
  XStepButton,
  YStepButton,
} from "@/components";
import { ButtonFrame } from "@/components/button-frame";
import { UnitWaveView } from "@/components/unit-wave-view";
import { store } from "@/root/store";
import { qu } from "@/utils/qstyle-goober";

export const LfoLane = ({ slot }: { slot: LfoSlot }) => {
  const patchSlot = (attrs: Partial<LfoSlot>) => {
    store.setSlots((prev) =>
      prev.map((s) => (s.id === slot.id ? { ...s, ...attrs } : s)),
    );
  };
  const handleClickParamId = () => {
    const { parameterIds } = store.state;
    if (parameterIds.length > 0) {
      const index = parameterIds.indexOf(slot.targetParameterId ?? "");
      const nextIndex = iife(() => {
        if (index === -1) {
          return 0;
        } else if (index === parameterIds.length - 1) {
          return -1;
        } else {
          return index + 1;
        }
      });
      patchSlot({ targetParameterId: parameterIds[nextIndex] ?? null });
    }
  };
  return (
    <div class={qu.flexHA().gap(3)}>
      <LabeledBox label={`slot ${slot.id + 1}`} width={30}>
        <IndicatorButton
          active={slot.enabled}
          onClick={() => patchSlot({ enabled: !slot.enabled })}
        />
      </LabeledBox>
      <LabeledBox label="Target Parameter" labelAlign="left">
        <div
          class={qu.flexC().wh(100, 40).bg("#ddd").fontSize(12)}
          onClick={handleClickParamId}
        >
          {slot.targetParameterId ?? "--"}
        </div>
      </LabeledBox>
      <LabeledBox label="Center">
        <Knob
          value={slot.centerValue}
          onChange={(value) => patchSlot({ centerValue: value })}
        />
      </LabeledBox>
      <LabeledBox label="Wave">
        <ButtonFrame onClick={() => patchSlot({ wave: (slot.wave + 1) % 5 })}>
          <UnitWaveView wave={slot.wave} />
        </ButtonFrame>
      </LabeledBox>
      <LabeledBox label="Rate">
        <Knob
          value={slot.rate}
          onChange={(value) => patchSlot({ rate: value })}
        />
      </LabeledBox>

      <LabeledBox label="Step">
        <SteppedButton
          active={slot.rateStepped}
          rate={slot.rate}
          // onClick={() => patchSlot({ rateStepped: !slot.rateStepped })}
        />
      </LabeledBox>
      <LabeledBox label="Depth">
        <Knob
          value={slot.depth}
          onChange={(value) => patchSlot({ depth: value })}
        />
      </LabeledBox>
      <LabeledBox label="X Step">
        <XStepButton
          xStep={slot.xStep}
          onClick={() => patchSlot({ xStep: (slot.xStep + 1) % 4 })}
        />
      </LabeledBox>
      <LabeledBox label="Y Step">
        <YStepButton
          yStep={slot.yStep}
          onClick={() => patchSlot({ yStep: (slot.yStep + 1) % 4 })}
        />
      </LabeledBox>
    </div>
  );
};
