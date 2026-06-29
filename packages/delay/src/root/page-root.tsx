import { rateDivisionOptions } from "@/common/constants";
import { EffectParameters, RateDivision } from "@/common/types";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { LedIndicator } from "@/components/led-indicator";
import { OptionMappedKnob } from "@/components/option-mapped-knob";
import { StompButton } from "@/components/stomp-button";
import { store } from "@/root/store";
import { qlsx, qu } from "@/utils/qstyle-goober";

export const PageRoot = () => {
  const { parameters } = store.useSnapshot();
  const setParameter = <K extends keyof EffectParameters>(
    key: K,
    value: EffectParameters[K],
  ) => {
    store.setParameters({ ...parameters, [key]: value });
  };
  const cellW = 48;
  return (
    <div class={qu.flexC()}>
      <EffectorBody className={qlsx(qu.wh(180, 260), qu.flexVA())}>
        <div class={qu.flexVC().gap(4)}>
          <div class={qu.flexH().gap(2)}>
            <div class={qu.fontSize(20).weight("bold")}>Step Delay</div>
          </div>
          <div class={qu.flexHA().gap(2)}>
            <LabeledBox label={`Rate /${parameters.rate}`} width={cellW}>
              <OptionMappedKnob<RateDivision>
                options={rateDivisionOptions}
                value={parameters.rate}
                onChange={(value) => setParameter("rate", value)}
              />
            </LabeledBox>
            <LabeledBox label="Feed" width={cellW}>
              <Knob
                value={parameters.feed}
                onChange={(value) => setParameter("feed", value)}
              />
            </LabeledBox>
            <LabeledBox label="Mix" width={cellW}>
              <Knob
                value={parameters.mix}
                onChange={(value) => setParameter("mix", value)}
              />
            </LabeledBox>
          </div>
          <div class={qu.flexVC().gap(2.5).pt(4)}>
            <LedIndicator active={parameters.isOn} />
            <StompButton
              onClick={() => setParameter("isOn", !parameters.isOn)}
            />
          </div>
        </div>
      </EffectorBody>
    </div>
  );
};
