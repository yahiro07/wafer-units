import { ComponentChildren } from "preact";
import { useMemo } from "preact/hooks";
import { createStore } from "snap-store";
import { cz, qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { buildPresetNotes, Preset, presets } from "@/root/model";
import { seqNumbers } from "@/utils/helpers";

const store = createStore({
  presetIndex: 0,
  degreeFlags: presets[0].degreeFlags,
});

const LabeledSection = ({
  label,
  children,
}: {
  label: string;
  children: ComponentChildren;
}) => {
  return (
    <div class={qu.flexV().gap(1).it}>
      <div class={qu.fontSize(12).color("#444").it}>{label}</div>
      {children}
    </div>
  );
};

const DegreesSelector = () => {
  const labels = ["R", "3", "5", "7", "8"];
  return (
    <div class={qu.flexHA().gap(1).it}>
      {seqNumbers(labels.length).map((i) => (
        <div class={qu.bd("#888").wh(36, 36).flexC().it}>{labels[i]}</div>
      ))}
    </div>
  );
};

const OctaveSelector = () => {
  return (
    <div class={qu.flexHA().gap(1).it}>
      {seqNumbers(5).map((i) => (
        <div class={qu.bd("#888").wh(36, 36).flexC().it}>{i - 2}</div>
      ))}
    </div>
  );
};

const PresetNotesView = ({ preset }: { preset: Preset }) => {
  const notes = useMemo(() => buildPresetNotes(preset), [preset]);
  const sz = 8;
  return (
    <div class={qu.relative().h("full").it}>
      {notes.map((note, i) => (
        <div
          key={i}
          class={qu.absolute().it}
          style={{
            left: note.position * sz,
            bottom: (note.degreeIndex * sz) / 2,
            width: Math.min(note.duration, 8) * sz,
            height: sz,
            border: "solid 1px #48f",
            background: "#48f6",
          }}
        />
      ))}
    </div>
  );
};

const PatternCard = ({ index }: { index?: number }) => {
  const preset = index !== undefined ? presets[index] : undefined;
  const displayBarLength = preset?.pattern.includes("!")
    ? preset.stepLength / 16
    : undefined;
  return (
    <div class={qu.bg("#fff").bd("#888").relative().wh(100, 40).it}>
      {preset && <PresetNotesView preset={preset} />}
      <div
        class={cz(
          qu.absolute().top(0).right(0).mr(0.25).it,
          qu.fontSize(11).color("#444").it,
        )}
      >
        {index}
      </div>
      {displayBarLength && (
        <div
          class={cz(
            qu.absolute().bottom(0).right(0).mr(0.25).it,
            qu.fontSize(11).color("#444").it,
          )}
        >
          {displayBarLength === 1 ? "1bar" : `${displayBarLength}bars`}
        </div>
      )}
    </div>
  );
};

const PatternList = () => {
  return (
    <div class={qu.flexH().gap(2).w(540).css({ flexWrap: "wrap" }).it}>
      {seqNumbers(20).map((i) => (
        <PatternCard key={i} index={i} />
      ))}
    </div>
  );
};

const PageList = () => {
  return (
    <div class={qu.flexV().gap(2).it}>
      {seqNumbers(4).map((i) => (
        <div class={qu.bd("#888").wh(36, 36).flexC().it}>{i}</div>
      ))}
    </div>
  );
};

const Timeline = () => {
  return <div class={qu.w(540).h(60).bd("#888").it}>timeline</div>;
};

export const PageRoot = () => {
  return (
    <div class={qu.css({ height: "100dvh" }).flexC().it}>
      <EffectorBody className={cz(qu.wh(800, 500).it, qu.flexC().it)}>
        <div class={qu.flexV().gap(4).it}>
          <div class={qu.flexHA().justify("between").it}>
            <div>RTFS-P</div>
            <div class={qu.flexHA().gap(4).it}>
              <LabeledSection label="octave">
                <OctaveSelector />
              </LabeledSection>
              <LabeledBox label="duty">
                <Knob value={0.5} onChange={() => {}} />
              </LabeledBox>
            </div>
          </div>
          <div class={qu.flexH().gap(4).it}>
            <LabeledSection label="pattern">
              <PatternCard />
            </LabeledSection>
            <LabeledSection label="degrees">
              <DegreesSelector />
            </LabeledSection>
          </div>
          <div class={qu.flexHA().gap(4).it}>
            <LabeledSection label="presets">
              <PatternList />
            </LabeledSection>
            <LabeledSection label="page">
              <PageList />
            </LabeledSection>
          </div>
          <LabeledSection label="timeline">
            <Timeline />
          </LabeledSection>
        </div>
      </EffectorBody>
    </div>
  );
};
