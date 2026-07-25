import { delayTimeOptions } from "@/common/constants";
import { cz, qu } from "@/common/css-realm";
import { DelayTime, EffectParameters } from "@/common/types";
import { ButtonWithIndicator } from "@/components/button-with-indicator";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { OptionMappedKnob } from "@/components/option-mapped-knob";
import { LedIndicator } from "@/components/unused/led-indicator";
import { StompButton } from "@/components/unused/stomp-button";
import { store } from "@/root/store";

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
    <div class={qu.flexVC().gap(5).it}>
      <div class={qu.flexHA().gap(2).it}>
        <LabeledBox label="On" width={cellW}>
          <ButtonWithIndicator
            active={parameters.isOn}
            onClick={() => setParameter("isOn", !parameters.isOn)}
          />
        </LabeledBox>
        <LabeledBox label="Time" width={cellW} className={qu.relative().it}>
          <OptionMappedKnob<DelayTime>
            options={delayTimeOptions}
            value={parameters.time}
            onChange={(value) => setParameter("time", value)}
          />
          <div
            class={cz(
              qu.absolute().bottom(-14).left(0).fontSize(12).w(cellW).it,
              qu.flexC().it,
            )}
          >
            {parameters.time.toString()}
          </div>
        </LabeledBox>
        <LabeledBox label="Feed" width={cellW}>
          <Knob
            value={parameters.feed}
            onChange={(value) => setParameter("feed", value)}
          />
        </LabeledBox>
        <LabeledBox label="Tone" width={cellW}>
          <Knob
            value={parameters.tone}
            onChange={(value) => setParameter("tone", value)}
          />
        </LabeledBox>
        <LabeledBox label="Mix" width={cellW}>
          <Knob
            value={parameters.mix}
            onChange={(value) => setParameter("mix", value)}
          />
        </LabeledBox>
      </div>
      <div class={qu.flexHA().gap(2).it}>
        <LabeledBox label="LFO" width={cellW}>
          <ButtonWithIndicator
            active={parameters.lfoOn}
            onClick={() => setParameter("lfoOn", !parameters.lfoOn)}
          />
        </LabeledBox>
        <LabeledBox label="Rate" width={cellW}>
          <Knob
            value={parameters.lfoRate}
            onChange={(value) => setParameter("lfoRate", value)}
          />
        </LabeledBox>
        <LabeledBox label="Depth" width={cellW}>
          <Knob
            value={parameters.lfoDepth}
            onChange={(value) => setParameter("lfoDepth", value)}
          />
        </LabeledBox>
      </div>
      {false && (
        <div class={qu.flexVC().gap(2.5).pt(4).it}>
          <LedIndicator active={parameters.isOn} />
          <StompButton onClick={() => setParameter("isOn", !parameters.isOn)} />
        </div>
      )}
    </div>
  );
};

const SafetyPart = () => {
  const { parameters } = store.useSnapshot();
  const setParameter = <K extends keyof EffectParameters>(
    key: K,
    value: EffectParameters[K],
  ) => {
    store.setParameters({ ...parameters, [key]: value });
  };
  return (
    <div>
      <label class={qu.flexH().gap(1).it}>
        <input
          type="checkbox"
          checked={parameters.safety}
          onChange={(e) =>
            setParameter(
              "safety",
              (e.currentTarget as HTMLInputElement).checked,
            )
          }
        />
        safety
      </label>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class={qu.flexC().it}>
      <EffectorBody className={cz(qu.wh(320, 210).it, qu.flexVC().it)}>
        <div class={qu.flexV().gap(3).it}>
          <div class={qu.flexHA().gap(2).fJustify("between").it}>
            <div class={qu.fontSize(18).weight("bold").it}>Sunset Delay</div>
            <SafetyPart />
          </div>
          <ControlsPart />
        </div>
      </EffectorBody>
    </div>
  );
};
