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
    <div sx={qu.flexVC().gap(5)}>
      <div sx={qu.flexHA().gap(2)}>
        <LabeledBox label="On" width={cellW}>
          <ButtonWithIndicator
            active={parameters.isOn}
            onClick={() => setParameter("isOn", !parameters.isOn)}
          />
        </LabeledBox>
        <LabeledBox label="Time" width={cellW} className={cz(qu.relative())}>
          <OptionMappedKnob<DelayTime>
            options={delayTimeOptions}
            value={parameters.time}
            onChange={(value) => setParameter("time", value)}
          />
          <div
            sx={[
              qu.absolute().bottom(-14).left(0).fontSize(12).w(cellW),
              qu.flexC(),
            ]}
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
      <div sx={qu.flexHA().gap(2)}>
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
        <div sx={qu.flexVC().gap(2.5).pt(4)}>
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
      <label sx={qu.flexH().gap(1)}>
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
    <div sx={qu.flexC()}>
      <EffectorBody className={cz(qu.wh(320, 210), qu.flexVC())}>
        <div sx={qu.flexV().gap(3)}>
          <div sx={qu.flexHA().gap(2).fJustify("between")}>
            <div sx={qu.fontSize(18).weight("bold")}>Sunset Delay</div>
            <SafetyPart />
          </div>
          <ControlsPart />
        </div>
      </EffectorBody>
    </div>
  );
};
