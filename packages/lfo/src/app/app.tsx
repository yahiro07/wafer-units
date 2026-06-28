import { setup } from "goober";
import { iife, linearInterpolate, seqNumbers } from "mofur/ax";
import { npx } from "mofur/ax-ui";
import { ComponentChildren, h } from "preact";
import { createStore } from "snap-store/preact";
import { queryUnitInterface } from "wafer-host/unit-types";
import { KnobFrame } from "@/components/knob-frame";
import { qu } from "@/utils/qstyle-goober";

setup(h);

const unitInterface = queryUnitInterface("wafer-v01");

enum LfoWave {
  Sine = 0,
  Triangle,
  Saw,
  Rect,
  SampleHold,
}

type LfoSlot = {
  id: number;
  enabled: boolean;
  targetParameterId: string | null;
  wave: LfoWave;
  centerValue: number;
  rate: number;
  rateStepped: boolean;
  depth: number;
};

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

export const Knob = ({
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  onClick,
  disabled,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const tickAngle = linearInterpolate(value, min, max, -135, 135);
  return (
    <KnobFrame
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      onClick={onClick}
      dragDisabled={disabled}
    >
      <div
        class={qu.wh(28, 28).rounded(14).relative().bd("#444")}
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <div
          class={qu.full().flexVA()}
          style={{ transform: `rotate(${tickAngle}deg)` }}
        >
          <div class={qu.wh(2, 10).bg("#fff")} />
        </div>
      </div>
    </KnobFrame>
  );
};

const IndicatorButton = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      class={qu.flexC().wh(20, 20)}
      style={{
        background: active ? "#9f9" : "#ddd",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
};

const PlainCellContent = ({ text, width }: { text: string; width: number }) => {
  return <div class={qu.flexC().w(width)}>{text}</div>;
};

const WaveButton = ({
  wave,
  onClick,
}: {
  wave: LfoWave;
  onClick: () => void;
}) => {
  const text = {
    [LfoWave.Sine]: "◯",
    [LfoWave.Triangle]: "△",
    [LfoWave.Saw]: "⊿",
    [LfoWave.Rect]: "□",
    [LfoWave.SampleHold]: "◉",
  }[wave];
  return (
    <div class={qu.flexC().wh(40, 40).bg("#ddd")} onClick={onClick}>
      {text}
    </div>
  );
};

function reteToStepText(rate: number) {
  const steps = [
    "/64",
    "/32",
    "/16",
    "/8",
    "/4",
    "/2",
    "1",
    "2",
    "4",
    "8",
    "16",
    "32",
    "64",
  ];
  const index = Math.min(Math.floor(rate * steps.length), steps.length - 1);
  return steps[index];
}

const SteppedButton = ({
  active,
  rate,
  onClick,
}: {
  active: boolean;
  rate: number;
  onClick: () => void;
}) => {
  return (
    <div class={qu.flexC().wh(40, 40).bg("#ddd")} onClick={onClick}>
      {active ? reteToStepText(rate) : "--"}
    </div>
  );
};

const LabeledBox = ({
  label,
  children,
  labelAlign = "center",
  width,
}: {
  label: string;
  labelAlign?: "left" | "center" | "right";
  children: ComponentChildren;
  width?: number;
}) => {
  return (
    <div class={qu.flexV()} style={width ? { width: npx(width) } : undefined}>
      <div
        class={qu.fontSize(10).weight("bold").h(15)}
        style={{ textAlign: labelAlign }}
      >
        {label}
      </div>
      <div class={qu.flexC().h(40)}>{children}</div>
    </div>
  );
};

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
          <div class={qu.flexV().gap(2)}>
            {slots.map((slot) => (
              <LfoLane key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
