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

const ControlsPart = () => {
  const { parameters } = store.useSnapshot();
  const setParameter = <K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ) => {
    store.patchParameters({ [key]: value });
  };
  const cellW = 60;
  const gapX = 1;

  return (
    <div class={qu.flexV().gap(1).it}>
      <div class={qu.fontSize(17).weight("bold").it}>S2 Synthesizer</div>
      <div class={qu.flexHA().gap(4).it}>
        <div class={qu.flexV().gap(3).it}>
          <div class={qu.flexHA().gap(gapX).it}>
            <LabeledBox label="octave" width={cellW}>
              <Knob
                value={parameters.octave}
                min={-2}
                max={2}
                step={1}
                onChange={(value) => setParameter("octave", value)}
              />
            </LabeledBox>
            <LabeledBox label="osc mix" width={cellW}>
              <Knob
                value={parameters.oscMix}
                onChange={(value) => setParameter("oscMix", value)}
              />
            </LabeledBox>
          </div>
          <div class={qu.flexHA().gap(gapX).it}>
            <ModuleHeader label="OSC1" />
            <LabeledBox label="wave" width={cellW}>
              <Knob
                value={parameters.osc1Wave}
                min={0}
                max={3}
                step={1}
                onChange={(value) => setParameter("osc1Wave", value)}
              />
            </LabeledBox>
            <LabeledBox label={`coarse ${parameters.osc1Coarse}`} width={cellW}>
              <Knob
                value={parameters.osc1Coarse}
                min={-12}
                max={12}
                step={1}
                onChange={(value) => setParameter("osc1Coarse", value)}
              />
            </LabeledBox>
            <LabeledBox label="fine" width={cellW}>
              <Knob
                value={parameters.osc1Fine}
                min={-1}
                max={1}
                onChange={(value) => setParameter("osc1Fine", value)}
              />
            </LabeledBox>
          </div>
          <div class={qu.flexHA().gap(gapX).it}>
            <ModuleHeader label="OSC2" />
            <LabeledBox label="wave" width={cellW}>
              <Knob
                value={parameters.osc2Wave}
                min={0}
                max={3}
                step={1}
                onChange={(value) => setParameter("osc2Wave", value)}
              />
            </LabeledBox>
            <LabeledBox label={`coarse ${parameters.osc2Coarse}`} width={cellW}>
              <Knob
                value={parameters.osc2Coarse}
                min={-12}
                max={12}
                step={1}
                onChange={(value) => setParameter("osc2Coarse", value)}
              />
            </LabeledBox>
            <LabeledBox label="fine" width={cellW}>
              <Knob
                value={parameters.osc2Fine}
                min={-1}
                max={1}
                onChange={(value) => setParameter("osc2Fine", value)}
              />
            </LabeledBox>
          </div>
          <div class={qu.flexHA().gap(gapX).it}>
            <ModuleHeader label="AMP" />
            <LabeledBox label="decay" width={cellW}>
              <Knob
                value={parameters.ampDecay}
                onChange={(value) => setParameter("ampDecay", value)}
              />
            </LabeledBox>
            <LabeledBox label="release" width={cellW}>
              <Knob
                value={parameters.ampRelease}
                onChange={(value) => setParameter("ampRelease", value)}
              />
            </LabeledBox>
            <LabeledBox label="volume" width={cellW}>
              <Knob
                value={parameters.outputVolume}
                onChange={(value) => setParameter("outputVolume", value)}
              />
            </LabeledBox>
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
