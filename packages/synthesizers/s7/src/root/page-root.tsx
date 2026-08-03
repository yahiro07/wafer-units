import { cz, qu } from "@/common/css-realm";
import { ButtonWithIndicator } from "@/components/button-with-indicator";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
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
    <div class={qu.flexV().gap(1.5).it}>
      <div class={qu.flexHA().fJustify("between").pl(1.5).pr(1).it}>
        <div class={qu.fontSize(17).weight("bold").it}>S7 Synthesizer</div>
      </div>
      <div class={qu.flexV().gap(0).it}>
        <div class={qu.flexHA().gap(3).it}>
          <LabeledBox label="octave" width={cellW}>
            <Knob
              value={parameters.octave}
              min={-2}
              max={2}
              step={1}
              onChange={(value) => setParameter("octave", value)}
            />
          </LabeledBox>
          <LabeledBox label="detune" width={cellW}>
            <Knob
              value={parameters.unisonDetune}
              onChange={(value) => setParameter("unisonDetune", value)}
            />
          </LabeledBox>
          <LabeledBox label="spread" width={cellW}>
            <Knob
              value={parameters.unisonSpread}
              onChange={(value) => setParameter("unisonSpread", value)}
            />
          </LabeledBox>
          <LabeledBox label="mix" width={cellW}>
            <Knob
              value={parameters.unisonMix}
              onChange={(value) => setParameter("unisonMix", value)}
            />
          </LabeledBox>
        </div>
        <div class={qu.flexHA().gap(3).it}>
          <LabeledBox label="volume" width={cellW}>
            <Knob
              value={parameters.volume}
              onChange={(value) => setParameter("volume", value)}
            />
          </LabeledBox>
          <LabeledBox label="release" width={cellW}>
            <Knob
              value={parameters.ampRelease}
              onChange={(value) => setParameter("ampRelease", value)}
            />
          </LabeledBox>
          <LabeledBox label="ph-rnd" width={cellW}>
            <ButtonWithIndicator
              active={parameters.phaseRandom}
              onClick={() =>
                setParameter("phaseRandom", !parameters.phaseRandom)
              }
            />
          </LabeledBox>
        </div>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class={qu.h("dvh").flexC().it}>
      <EffectorBody className={cz(qu.wh(300, 160).it, qu.flexVC().it)}>
        <ControlsPart />
      </EffectorBody>
    </div>
  );
};
