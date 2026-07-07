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
  const cellW = 55;
  const gapX = 1;

  return (
    <div class={qu.flexV().gap(1).it}>
      <div class={qu.fontSize(17).weight("bold").it}>MPD1 Synthesizer</div>
      <div class={qu.flexHA().gap(4).it}>
        <div class={qu.flexV().gap(3).it}>
          <div class={qu.flexHA().gap(gapX).it}>
            <ModuleHeader label="OSC" />
            <LabeledBox label="octave" width={cellW}>
              <Knob
                value={parameters.octave}
                min={-2}
                max={2}
                step={1}
                onChange={(value) => setParameter("octave", value)}
              />
            </LabeledBox>
            <LabeledBox label="wave" width={cellW}>
              <Knob
                value={parameters.wave}
                min={0}
                max={7}
                step={1}
                onChange={(value) => setParameter("wave", value)}
              />
            </LabeledBox>
            <LabeledBox label="detune2" width={cellW}>
              <Knob
                value={parameters.detune2}
                onChange={(value) => setParameter("detune2", value)}
              />
            </LabeledBox>
            <LabeledBox label="drift" width={cellW}>
              <Knob
                value={parameters.pitchDrift}
                onChange={(value) => setParameter("pitchDrift", value)}
              />
            </LabeledBox>
          </div>
          <div class={qu.flexHA().gap(gapX).it}>
            <ModuleHeader label="SHAPE" />
            <LabeledBox label="value" width={cellW}>
              <Knob
                value={parameters.shape}
                onChange={(value) => setParameter("shape", value)}
              />
            </LabeledBox>
            <LabeledBox label="attack" width={cellW}>
              <Knob
                value={parameters.shapeEgAttack}
                onChange={(value) => setParameter("shapeEgAttack", value)}
              />
            </LabeledBox>
            <LabeledBox label="decay" width={cellW}>
              <Knob
                value={parameters.shapeEgDecay}
                onChange={(value) => setParameter("shapeEgDecay", value)}
              />
            </LabeledBox>
            <LabeledBox label="mod" width={cellW}>
              <Knob
                value={parameters.shapeModAmount}
                onChange={(value) => setParameter("shapeModAmount", value)}
              />
            </LabeledBox>
          </div>
          <div class={qu.flexHA().gap(gapX).it}>
            <ModuleHeader label="AMP" />
            <LabeledBox label="attack" width={cellW}>
              <Knob
                value={parameters.ampAttack}
                onChange={(value) => setParameter("ampAttack", value)}
              />
            </LabeledBox>
            <LabeledBox label="decay" width={cellW}>
              <Knob
                value={parameters.ampDecay}
                onChange={(value) => setParameter("ampDecay", value)}
              />
            </LabeledBox>
            <LabeledBox label="sustain" width={cellW}>
              <Knob
                value={parameters.ampSustain}
                onChange={(value) => setParameter("ampSustain", value)}
              />
            </LabeledBox>
            <LabeledBox label="release" width={cellW}>
              <Knob
                value={parameters.ampRelease}
                onChange={(value) => setParameter("ampRelease", value)}
              />
            </LabeledBox>
          </div>
        </div>
        <div class={qu.flexV().gap(3).it}>
          <div class={qu.flexHA().gap(gapX).it}>
            <ModuleHeader label="SUB OSC" />
            <LabeledBox label="wave" width={cellW}>
              <Knob
                value={parameters.subOscWave}
                min={0}
                max={3}
                step={1}
                onChange={(value) => setParameter("subOscWave", value)}
              />
            </LabeledBox>
            <LabeledBox label="volume" width={cellW}>
              <Knob
                value={parameters.subOscVolume}
                onChange={(value) => setParameter("subOscVolume", value)}
              />
            </LabeledBox>
          </div>
          <div class={qu.flexHA().gap(gapX).it}>
            <ModuleHeader label="FX" />
            <LabeledBox label="tone" width={cellW}>
              <Knob
                value={parameters.tone}
                onChange={(value) => setParameter("tone", value)}
              />
            </LabeledBox>
            <LabeledBox label="chorus" width={cellW}>
              <Knob
                value={parameters.chorus}
                onChange={(value) => setParameter("chorus", value)}
              />
            </LabeledBox>
          </div>
          <div class={qu.flexHA().gap(gapX).it}>
            <ModuleHeader label="" />
            <LabeledBox label="output" width={cellW}>
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
      <EffectorBody className={cz(qu.wh(480, 260).it, qu.flexVC().it)}>
        <ControlsPart />
      </EffectorBody>
    </div>
  );
};
