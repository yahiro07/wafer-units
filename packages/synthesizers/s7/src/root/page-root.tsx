import { cz, qu } from "@/common/css-realm";
import { ButtonWithIndicator } from "@/components/button-with-indicator";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { SynthParameters } from "@/root/definitions";
import { store } from "@/root/store";

const ControlsPart = () => {
  const { parameters } = store.useSnapshot();
  const setParameter = <K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ) => {
    store.patchParameters({ [key]: value });
  };
  const cellW = 48;

  return (
    <div class={qu.flexV().gap(1.5).it}>
      <div class={qu.flexHA().justify("between").pl(1.5).pr(1).it}>
        <div class={qu.fontSize(17).weight("bold").it}>Channel Strip</div>
        <div class={qu.flexHA().gap(4).it}>
          <LabeledBox label="effect" width={36} contentHeight={24}>
            <ButtonWithIndicator
              active={parameters.effectOn}
              onClick={() => setParameter("effectOn", !parameters.effectOn)}
            />
          </LabeledBox>
          <LabeledBox label="output" width={36} contentHeight={24}>
            <ButtonWithIndicator
              active={parameters.outputOn}
              onClick={() => setParameter("outputOn", !parameters.outputOn)}
            />
          </LabeledBox>
        </div>
      </div>
      <div class={qu.flexV().gap(0).it}>
        <div class={qu.flexHA().gap(3).it}>
          <LabeledBox label="low-cut" width={cellW}>
            <Knob
              value={parameters.lowCut}
              onChange={(value) => setParameter("lowCut", value)}
            />
          </LabeledBox>
          <LabeledBox label="comp" width={cellW}>
            <Knob
              value={parameters.compress}
              onChange={(value) => setParameter("compress", value)}
            />
          </LabeledBox>
          <LabeledBox label="haas" width={cellW}>
            <Knob
              value={parameters.haas}
              onChange={(value) => setParameter("haas", value)}
            />
          </LabeledBox>

          <LabeledBox label="volume" width={cellW}>
            <Knob
              value={parameters.volume}
              onChange={(value) => setParameter("volume", value)}
            />
          </LabeledBox>
        </div>
        <div class={qu.flexHA().gap(3).it}>
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
          <LabeledBox label="pan" width={cellW}>
            <Knob
              value={parameters.pan}
              min={-1}
              max={1}
              onChange={(value) => setParameter("pan", value)}
            />
          </LabeledBox>
        </div>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class={qu.flexC().it}>
      <EffectorBody className={cz(qu.wh(300, 160).it, qu.flexVC().it)}>
        <ControlsPart />
      </EffectorBody>
    </div>
  );
};
