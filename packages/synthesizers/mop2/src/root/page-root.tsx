import { cz, qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { OptionMappedKnob } from "@/components/option-mapped-knob";
import { store } from "@/root/store";
import { SynthParameters } from "@/root/synth-common";
import { createPlainSelectorOptions } from "@/utils/selector-option";

const ratioOptionValues = [0.5, 1, 2, 3, 4, 5, 7, 9, 11, 13];
const ratioOptions = createPlainSelectorOptions(ratioOptionValues);

const ModuleHeader = ({ label }: { label: string }) => {
  return <div sx={qu.w(20).pt(3).fontSize(12).weight("bold")}>{label}</div>;
};

const ControlsPart = () => {
  const { parameters } = store.useSnapshot();
  const setParameter = <K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ) => {
    store.patchParameters({ [key]: value });
  };
  const cellW = 55;

  return (
    <div sx={qu.flexC().gap(4)}>
      <div sx={qu.h("full").flexV().fJustify("between").pt(4)}>
        <div sx={qu.fontSize(17).weight("bold")}>mop2</div>
        <LabeledBox label="octave" width={cellW}>
          <Knob
            value={parameters.octave}
            min={-2}
            max={2}
            step={1}
            onChange={(value) => setParameter("octave", value)}
          />
        </LabeledBox>
        <div sx={qu.h(40)} />
      </div>
      <div sx={qu.flexV().gap(3)}>
        <div sx={qu.flexHA().gap(2)}>
          <ModuleHeader label="OP1" />
          <LabeledBox label={`ratio: ${parameters.op1Ratio}`} width={cellW}>
            <OptionMappedKnob
              value={parameters.op1Ratio}
              options={ratioOptions}
              onChange={(value) => setParameter("op1Ratio", value)}
            />
          </LabeledBox>
          <LabeledBox label="egv" width={cellW}>
            <Knob
              value={parameters.op1ModSpeed}
              onChange={(value) => setParameter("op1ModSpeed", value)}
            />
          </LabeledBox>
          <LabeledBox label="mod" width={cellW}>
            <Knob
              value={parameters.op1Mod}
              onChange={(value) => setParameter("op1Mod", value)}
            />
          </LabeledBox>
          <LabeledBox label="volume" width={cellW}>
            <Knob
              value={parameters.op1Volume}
              onChange={(value) => setParameter("op1Volume", value)}
            />
          </LabeledBox>
        </div>
        <div sx={qu.flexHA().gap(2)}>
          <ModuleHeader label="OP2" />
          <LabeledBox label={`ratio: ${parameters.op2Ratio}`} width={cellW}>
            <OptionMappedKnob
              value={parameters.op2Ratio}
              options={ratioOptions}
              onChange={(value) => setParameter("op2Ratio", value)}
            />
          </LabeledBox>
          <LabeledBox label="egv" width={cellW}>
            <Knob
              value={parameters.op2ModSpeed}
              onChange={(value) => setParameter("op2ModSpeed", value)}
            />
          </LabeledBox>
          <LabeledBox label="mod" width={cellW}>
            <Knob
              value={parameters.op2Mod}
              onChange={(value) => setParameter("op2Mod", value)}
            />
          </LabeledBox>
          <LabeledBox label="volume" width={cellW}>
            <Knob
              value={parameters.op2Volume}
              onChange={(value) => setParameter("op2Volume", value)}
            />
          </LabeledBox>
        </div>
        <div sx={qu.flexHA().gap(2)}>
          <ModuleHeader label="AMP" />
          <LabeledBox label="attack" width={cellW}>
            <Knob
              value={parameters.egAttack}
              onChange={(value) => setParameter("egAttack", value)}
            />
          </LabeledBox>
          <LabeledBox label="decay" width={cellW}>
            <Knob
              value={parameters.egDecay}
              onChange={(value) => setParameter("egDecay", value)}
            />
          </LabeledBox>
          <LabeledBox label="release" width={cellW}>
            <Knob
              value={parameters.egRelease}
              onChange={(value) => setParameter("egRelease", value)}
            />
          </LabeledBox>
        </div>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div sx={qu.h("dvh").flexC()}>
      <EffectorBody className={cz(qu.wh(380, 220), qu.flexVC())}>
        <ControlsPart />
      </EffectorBody>
    </div>
  );
};
