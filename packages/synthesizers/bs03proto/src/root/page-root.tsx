import { cz, qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { NarrowButton } from "@/components/narrow-button";
import { store } from "@/root/store";
import { SynthParameters } from "@/root/synth-common";

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
    <div sx={qu.flexV().gap(1.5)}>
      <div sx={qu.flexHA().fJustify("between").pl(1.5).pr(1)}>
        <div sx={qu.fontSize(17).weight("bold")}>BS03 Synthesizer</div>
      </div>
      <div sx={qu.flexV().gap(0)}>
        <div sx={qu.flexHA().gap(3)}>
          <LabeledBox label="wave" width={cellW}>
            <div sx={qu.flexV().gap(0.25)}>
              <NarrowButton
                text="saw"
                active={parameters.wave === 0}
                onClick={() => setParameter("wave", 0)}
              />
              <NarrowButton
                text="rect"
                active={parameters.wave === 1}
                onClick={() => setParameter("wave", 1)}
              />
            </div>
          </LabeledBox>
          <LabeledBox label="cutoff" width={cellW}>
            <Knob
              value={parameters.cutoff}
              onChange={(value) => setParameter("cutoff", value)}
            />
          </LabeledBox>
          <LabeledBox label="peak" width={cellW}>
            <Knob
              value={parameters.peak}
              onChange={(value) => setParameter("peak", value)}
            />
          </LabeledBox>
          <LabeledBox label="env mod" width={cellW}>
            <Knob
              value={parameters.envMod}
              onChange={(value) => setParameter("envMod", value)}
            />
          </LabeledBox>
        </div>
        <div sx={qu.flexHA().gap(3)}>
          <LabeledBox label="glide" width={cellW}>
            <Knob
              value={parameters.glide}
              onChange={(value) => setParameter("glide", value)}
            />
          </LabeledBox>
          <LabeledBox label="accent" width={cellW}>
            <Knob
              value={parameters.accent}
              onChange={(value) => setParameter("accent", value)}
            />
          </LabeledBox>
          <LabeledBox label="decay" width={cellW}>
            <Knob
              value={parameters.decay}
              onChange={(value) => setParameter("decay", value)}
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
      <EffectorBody className={cz(qu.wh(300, 160), qu.flexVC())}>
        <ControlsPart />
      </EffectorBody>
    </div>
  );
};
