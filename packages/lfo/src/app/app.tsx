import { setup } from "goober";
import { iife, seqNumbers } from "mofur/ax";
import { h } from "preact";
import { createStore } from "snap-store/preact";
import { queryUnitInterface } from "wafer-host/unit-types";
import { LfoSlot, LfoWave, XStep, YStep } from "@/base/types";
import {
  IndicatorButton,
  Knob,
  LabeledBox,
  SteppedButton,
  WaveButton,
  XStepButton,
  YStepButton,
} from "@/components";
import { qu } from "@/utils/qstyle-goober";

setup(h);

const unitInterface = queryUnitInterface("wafer-v01");

const store = createStore<{
  count: number;
  connected: boolean;
  parameterIds: string[];
  slots: LfoSlot[];
}>({
  count: 0,
  connected: false,
  parameterIds: [],
  slots: seqNumbers(4).map((i) => ({
    id: i,
    enabled: true,
    targetParameterId: null,
    wave: LfoWave.Sine,
    centerValue: 0.5,
    rate: 0.5,
    rateStepped: true,
    depth: 0.5,
    xStep: XStep.None,
    yStep: YStep.None,
  })),
});

if (1) {
  store.setParameterIds(["param1", "param2", "param3", "param4", "param5"]);
}

unitInterface?.completeSetup({
  unitAspects: {
    unitType: "sequencer",
    outputs: ["automation"],
  },
  unitCallbacks: {
    onConnectedTo(linkedPortSubtypes) {
      console.log("onConnectedTo", linkedPortSubtypes);
      if (linkedPortSubtypes.includes("automation")) {
        const parameterSpecs =
          unitInterface?.automationOutputPort?.getParameterSpecs();
        if (parameterSpecs) {
          store.setParameterIds(parameterSpecs.map((spec) => spec.id));
        }
      }
      store.setConnected(true);
    },
    onDisconnectedTo() {
      store.setParameterIds([]);
      store.setConnected(false);
    },
  },
});

const LfoLane = ({ slot }: { slot: LfoSlot }) => {
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
          class={qu.flexC().wh(100, 40).bg("#ddd")}
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
        <WaveButton
          wave={slot.wave}
          onClick={() => patchSlot({ wave: (slot.wave + 1) % 5 })}
        />
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
          onClick={() => patchSlot({ rateStepped: !slot.rateStepped })}
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

export const App = () => {
  const { parameterIds, connected, slots } = store.useSnapshot();
  return (
    <div class={qu.flexC()}>
      <div class={qu.wh(600, 350).bg("#aaa").p(4).color("#333")}>
        <div class={qu.flexV().gap(2)}>
          <div class={qu.flexH().gap(2)}>
            <div>Multi LFO</div>
            <div class={qu.grow()} />
            <div>{connected ? "Connected" : "Disconnected"}</div>
          </div>
          <div>parameterIds: {JSON.stringify(parameterIds)}</div>
          <div class={qu.flexVC().gap(2)}>
            {slots.map((slot) => (
              <LfoLane key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
