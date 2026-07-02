import { EffectParameters } from "@/common/definitions";
import {
  ButtonWithIndicator,
  EffectorBody,
  Knob,
  LabeledBox,
} from "@/components";

import { store } from "@/root/store";
import { qlsx, qu } from "@/utils/qstyle-goober";

const ControlsPart = () => {
  const { parameters } = store.useSnapshot();
  const setParameter = <K extends keyof EffectParameters>(
    key: K,
    value: EffectParameters[K],
  ) => {
    store.setParameters({ ...parameters, [key]: value });
  };
  const cellW = 48;

  return (
    <div class={qu.flexVC().gap(5)}>
      <div class={qu.flexHA().gap(2)}>
        <LabeledBox label="ON" width={cellW}>
          <ButtonWithIndicator
            active={parameters.isOn}
            onClick={() => setParameter("isOn", !parameters.isOn)}
          />
        </LabeledBox>
        <LabeledBox label="Age" width={cellW}>
          <Knob
            value={parameters.age}
            onChange={(value) => setParameter("age", value)}
          />
        </LabeledBox>
        <LabeledBox label="Grit" width={cellW}>
          <Knob
            value={parameters.grit}
            onChange={(value) => setParameter("grit", value)}
          />
        </LabeledBox>
        <LabeledBox label="Degrade" width={cellW}>
          <Knob
            value={parameters.degrade}
            onChange={(value) => setParameter("degrade", value)}
          />
        </LabeledBox>
      </div>
      <div class={qu.flexHA().gap(2)}>
        <LabeledBox label="Saturation Mode" width={cellW}>
          <Knob
            value={parameters.saturationMode}
            min={0}
            max={2}
            step={1}
            onChange={(value) => setParameter("saturationMode", value)}
          />
        </LabeledBox>
        <LabeledBox label="Tone Color" width={cellW}>
          <Knob
            value={parameters.toneColor}
            onChange={(value) => setParameter("toneColor", value)}
          />
        </LabeledBox>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class={qu.flexC()}>
      <EffectorBody className={qlsx(qu.wh(320, 210), qu.flexVC())}>
        <div class={qu.flexV().gap(3)}>
          <div class={qu.flexHA().gap(2).justify("between")}>
            <div class={qu.fontSize(18).weight("bold")}>LoFi Crusher</div>
            {/* <SafetyPart /> */}
          </div>
          <ControlsPart />
        </div>
      </EffectorBody>
    </div>
  );
};
