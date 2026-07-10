import { cz, qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { store } from "@/root/store";
import { SynthParameters } from "@/root/synth-common";

const ModuleHeader = ({
  label,
  width = 30,
}: {
  label: string;
  width?: number;
}) => {
  return (
    <div class={qu.w(width).pt(3).fontSize(12).weight("bold").it}>{label}</div>
  );
};

const LabeledKnob = ({
  label,
  value,
  onChange,
  cellW = 60,
  min = 0,
  max = 1,
  step = 0.01,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  cellW?: number;
  min?: number;
  max?: number;
  step?: number;
}) => {
  return (
    <LabeledBox label={label} width={cellW}>
      <Knob value={value} min={min} max={max} step={step} onChange={onChange} />
    </LabeledBox>
  );
};

const ControlsPart = () => {
  const { parameters } = store.useSnapshot();
  const setParameter = <K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ) => {
    store.patchParameters({ [key]: value });
  };
  const gapX = 1;

  return (
    <div class={qu.flexV().gap(1).it}>
      <div class={qu.fontSize(17).weight("bold").it}>S2 Synthesizer</div>
      <div class={qu.flexHA().gap(4).it}>
        <div class={qu.flexV().gap(3).it}>
          <div class={qu.flexHA().gap(gapX).it}>
            <LabeledKnob
              label="octave"
              value={parameters.octave}
              min={-2}
              max={2}
              step={1}
              onChange={(value) => setParameter("octave", value)}
            />
            <LabeledKnob
              label="osc mix"
              value={parameters.oscMix}
              onChange={(value) => setParameter("oscMix", value)}
            />
          </div>
          <div class={qu.flexHA().gap(gapX).it}>
            <ModuleHeader label="OSC1" />
            <LabeledKnob
              label="wave"
              value={parameters.osc1Wave}
              min={0}
              max={3}
              step={1}
              onChange={(value) => setParameter("osc1Wave", value)}
            />
            <LabeledKnob
              label={`semi ${parameters.osc1Coarse}`}
              value={parameters.osc1Coarse}
              min={-12}
              max={12}
              step={1}
              onChange={(value) => setParameter("osc1Coarse", value)}
            />
            <LabeledKnob
              label="fine"
              value={parameters.osc1Fine}
              min={-1}
              max={1}
              onChange={(value) => setParameter("osc1Fine", value)}
            />
          </div>
          <div class={qu.flexHA().gap(gapX).it}>
            <ModuleHeader label="OSC2" />
            <LabeledKnob
              label="wave"
              value={parameters.osc2Wave}
              min={0}
              max={3}
              step={1}
              onChange={(value) => setParameter("osc2Wave", value)}
            />
            <LabeledKnob
              label={`semi ${parameters.osc2Coarse}`}
              value={parameters.osc2Coarse}
              min={-12}
              max={12}
              step={1}
              onChange={(value) => setParameter("osc2Coarse", value)}
            />
            <LabeledKnob
              label="fine"
              value={parameters.osc2Fine}
              min={-1}
              max={1}
              onChange={(value) => setParameter("osc2Fine", value)}
            />
          </div>
          <div class={qu.flexHA().gap(gapX).it}>
            <ModuleHeader label="AMP" />
            <LabeledKnob
              label="attack"
              value={parameters.ampAttack}
              onChange={(value) => setParameter("ampAttack", value)}
            />
            <LabeledKnob
              label="decay"
              value={parameters.ampDecay}
              onChange={(value) => setParameter("ampDecay", value)}
            />
            <LabeledKnob
              label="sustain"
              value={parameters.ampSustain}
              onChange={(value) => setParameter("ampSustain", value)}
            />
            <LabeledKnob
              label="release"
              value={parameters.ampRelease}
              onChange={(value) => setParameter("ampRelease", value)}
            />
            <LabeledKnob
              label="volume"
              value={parameters.outputVolume}
              onChange={(value) => setParameter("outputVolume", value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class={qu.css({ height: "100dvh" }).flexC().it}>
      <EffectorBody className={cz(qu.wh(480, 300).it, qu.flexVC().it)}>
        <ControlsPart />
      </EffectorBody>
    </div>
  );
};
