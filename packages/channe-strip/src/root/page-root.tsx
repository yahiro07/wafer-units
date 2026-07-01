import { EffectParameters } from "@/common/definitions";
import { ButtonWithIndicator } from "@/components/button-with-indicator";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { store } from "@/root/store";
import { qlsx, qu } from "@/utils/qstyle-goober";

const ControlsPart = () => {
  const { parameters } = store.useSnapshot();
  const setParameter = <K extends keyof EffectParameters>(
    key: K,
    value: EffectParameters[K],
  ) => {
    store.patchParameters({ [key]: value });
  };
  const cellW = 48;

  return (
    <div class={qu.flexV().gap(1.5)}>
      <div class={qu.flexHA().justify("between").pl(1.5).pr(2.5)}>
        <div class={qu.fontSize(17).weight("bold")}>Channel Strip</div>
        <ButtonWithIndicator
          active={parameters.isOn}
          onClick={() => setParameter("isOn", !parameters.isOn)}
        />
      </div>
      <div class={qu.flexV().gap(0)}>
        <div class={qu.flexHA().gap(3)}>
          <LabeledBox label="low-cut" width={cellW}>
            <Knob
              value={parameters.lowCut}
              onChange={(value) => setParameter("lowCut", value)}
            />
          </LabeledBox>
          <LabeledBox label="volume" width={cellW}>
            <Knob
              value={parameters.volume}
              onChange={(value) => setParameter("volume", value)}
            />
          </LabeledBox>
          <LabeledBox label="pan" width={cellW}>
            <Knob
              value={parameters.pan}
              min={-1}
              max={1}
              onChange={(value) => setParameter("pan", value)}
            />
          </LabeledBox>
          <LabeledBox label="haas" width={cellW}>
            <Knob
              value={parameters.haas}
              onChange={(value) => setParameter("haas", value)}
            />
          </LabeledBox>
        </div>
        <div class={qu.flexHA().gap(3)}>
          <LabeledBox label="eq-low" width={cellW}>
            <Knob
              value={parameters.eqLow}
              onChange={(value) => setParameter("eqLow", value)}
            />
          </LabeledBox>
          <LabeledBox label="eq-mid" width={cellW}>
            <Knob
              value={parameters.eqMid}
              onChange={(value) => setParameter("eqMid", value)}
            />
          </LabeledBox>
          <LabeledBox label="eq-high" width={cellW}>
            <Knob
              value={parameters.eqHigh}
              onChange={(value) => setParameter("eqHigh", value)}
            />
          </LabeledBox>
          <LabeledBox label="comp" width={cellW}>
            <Knob
              value={parameters.compress}
              onChange={(value) => setParameter("compress", value)}
            />
          </LabeledBox>
        </div>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class={qu.flexC()}>
      <EffectorBody className={qlsx(qu.wh(300, 160), qu.flexVC())}>
        <ControlsPart />
      </EffectorBody>
    </div>
  );
};
