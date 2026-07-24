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

const actions = {
  selectPreset(index: number) {
    store.assign({
      presetIndex: index,
      degreeFlags: presets[index].degreeFlags,
    });
  },
};

const LabeledSection = ({
  label,
  children,
}: {
  label: string;
  children: ComponentChildren;
}) => {
  return (
    <div class={qu.flexV().gap(1).it}>
      <div class={qu.fontSize(12).weight("bold").it}>{label}</div>
      {children}
    </div>
  );
};

const DegreesSelector = ({
  degreeFlags,
  setDegreeFlags,
}: {
  degreeFlags: number;
  setDegreeFlags: (degreeFlags: number) => void;
}) => {
  const labels = ["R", "3", "5", "7", "8"];

  const handleButtonClick = (index: number) => {
    const newDegreeFlags = degreeFlags ^ (1 << index);
    setDegreeFlags(newDegreeFlags);
  };
  return (
    <div class={qu.flexHA().gap(1).it}>
      {seqNumbers(labels.length).map((i) => {
        const active = (degreeFlags & (1 << i)) !== 0;
        return (
          <div
            onClick={() => handleButtonClick(i)}
            class={cz(
              qu.bg("#fff").bd("#888").wh(36, 36).flexC().it,
              qu.cursor("pointer").it,
            )}
            style={active ? { background: "#48f8", color: "#fff" } : undefined}
          >
            {labels[i]}
          </div>
        );
      })}
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

const PresetNotesView = ({
  preset,
  degreeFlagsOverride,
}: {
  preset: Preset;
  degreeFlagsOverride?: number;
}) => {
  const notes = useMemo(
    () => buildPresetNotes(preset, degreeFlagsOverride),
    [preset, degreeFlagsOverride],
  );
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

const PatternCard = ({
  preset,
  onClick,
  presetIndex,
  degreeFlagsOverride,
}: {
  preset: Preset;
  onClick?: () => void;
  presetIndex?: number;
  degreeFlagsOverride?: number;
}) => {
  const displayBarLength = preset?.pattern.includes("!")
    ? preset.stepLength / 16
    : undefined;
  return (
    <div
      class={qu.bg("#fff").bd("#888").relative().wh(100, 40).it}
      onClick={onClick}
      style={onClick && { cursor: "pointer" }}
    >
      {preset && (
        <PresetNotesView
          preset={preset}
          degreeFlagsOverride={degreeFlagsOverride}
        />
      )}
      {presetIndex !== undefined && (
        <div
          class={cz(
            qu.absolute().top(0).right(0).mr(0.25).it,
            qu.fontSize(11).color("#444").it,
          )}
        >
          {presetIndex}
        </div>
      )}
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
      {seqNumbers(presets.length).map((i) => (
        <PatternCard
          key={i}
          preset={presets[i]}
          presetIndex={i}
          onClick={() => {
            actions.selectPreset(i);
          }}
        />
      ))}
    </div>
  );
};

const PageList = () => {
  return (
    <div class={qu.flexV().gap(2).it}>
      {seqNumbers(3).map((i) => (
        <div class={qu.bd("#888").wh(36, 36).flexC().it}>{i}</div>
      ))}
    </div>
  );
};

const Timeline = () => {
  return <div class={qu.w(540).h(60).bd("#888").it}>timeline</div>;
};

const CurrentPatternContainer = () => {
  const st = store.useSnapshot();
  return (
    <PatternCard
      preset={presets[st.presetIndex]}
      degreeFlagsOverride={st.degreeFlags}
    />
  );
};

export const PageRoot = () => {
  const st = store.useSnapshot();
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
              <CurrentPatternContainer />
            </LabeledSection>
            <LabeledSection label="degrees">
              <DegreesSelector
                degreeFlags={st.degreeFlags}
                setDegreeFlags={store.setDegreeFlags}
              />
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
