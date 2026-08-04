import { ComponentChildren } from "preact";
import { useMemo } from "preact/hooks";
import { cz, qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import {
  buildPresetNotes,
  buildPresetNotesForLoop,
  Preset,
  presets,
} from "@/root/model";
import { actions, store } from "@/root/store";
import { seqNumbers } from "@/utils/helpers";

const LabeledSection = ({
  label,
  children,
}: {
  label: string;
  children: ComponentChildren;
}) => {
  return (
    <div sx={qu.flexV().gap(1)}>
      <div sx={qu.fontSize(12).weight("bold")}>{label}</div>
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
    <div sx={qu.flexHA().gap(1)}>
      {seqNumbers(labels.length).map((i) => {
        const active = (degreeFlags & (1 << i)) !== 0;
        return (
          <div
            onClick={() => handleButtonClick(i)}
            sx={[
              qu.bg("#fff").bd("#888").wh(36, 36).flexC(),
              qu.cursor("pointer"),
            ]}
            style={active ? { background: "#48f8", color: "#fff" } : undefined}
          >
            {labels[i]}
          </div>
        );
      })}
    </div>
  );
};

const OctaveSelector = ({
  octave,
  setOctave,
}: {
  octave: number;
  setOctave: (octave: number) => void;
}) => {
  return (
    <div sx={qu.flexHA().gap(1)}>
      {seqNumbers(5).map((i) => {
        const oct = i - 2;
        const active = oct === octave;
        return (
          <div
            sx={[
              qu.bg("#fff").bd("#888").wh(36, 36).flexC(),
              qu.cursor("pointer"),
            ]}
            style={active ? { background: "#48f8", color: "#fff" } : undefined}
            onClick={() => setOctave(oct)}
          >
            {oct}
          </div>
        );
      })}
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
    <div sx={qu.relative().h("full")}>
      {notes.map((note, i) => (
        <div
          key={i}
          sx={qu.absolute()}
          style={{
            left: note.position * sz,
            bottom: note.degreeIndex * sz,
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
      sx={qu.bg("#fff").bd("#888").relative().wh(100, 44)}
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
          sx={[
            qu.absolute().top(0).right(0).mr(0.25),
            qu.fontSize(11).color("#444"),
          ]}
        >
          {presetIndex}
        </div>
      )}
      {displayBarLength && (
        <div
          sx={[
            qu.absolute().bottom(0).right(0).mr(0.25),
            qu.fontSize(11).color("#444"),
          ]}
        >
          {displayBarLength === 1 ? "1bar" : `${displayBarLength}bars`}
        </div>
      )}
    </div>
  );
};

const PatternList = () => {
  return (
    <div sx={qu.flexH().gap(2).w(540).css({ flexWrap: "wrap" })}>
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
    <div sx={qu.flexV().gap(2)}>
      {seqNumbers(3).map((i) => (
        <div sx={qu.bd("#888").wh(36, 36).flexC()}>{i}</div>
      ))}
    </div>
  );
};

const Timeline = () => {
  const st = store.useSnapshot();
  const notes = useMemo(
    () => buildPresetNotesForLoop(presets[st.presetIndex], 32, st.degreeFlags),
    [st.presetIndex, st.degreeFlags],
  );
  const sz = 10;
  const szx = 16;
  return (
    <div sx={qu.flexV()}>
      <div sx={qu.wh(514, 60).relative().bg("#fff").bd("#888")}>
        {notes.map((note, i) => (
          <div
            key={i}
            sx={qu.absolute()}
            style={{
              left: note.position * szx,
              bottom: note.degreeIndex * sz,
              width: note.duration * szx,
              height: sz,
              background: "#48f6",
              border: "solid 1px #48f",
            }}
          />
        ))}
      </div>
      <div sx={qu.wh(540, 20).flexHA()}>
        {seqNumbers(32).map((i) => {
          const altColor = i % 4 === 0;
          const active = i === st.playPos;
          return (
            <div key={i} sx={qu.wh(szx, 10).flexC()}>
              <div
                sx={[
                  qu.wh(7, 7).rounded("full").bg("#ccc"),
                  altColor && qu.bg("#aaa"),
                  active && qu.bg("#4f0"),
                ]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
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

const DegreeSelectorContainer = () => {
  const st = store.useSnapshot();
  return (
    <DegreesSelector
      degreeFlags={st.degreeFlags}
      setDegreeFlags={store.setDegreeFlags}
    />
  );
};

const OctaveSelectorContainer = () => {
  const st = store.useSnapshot();
  return <OctaveSelector octave={st.octave} setOctave={store.setOctave} />;
};

const DutyKnobContainer = () => {
  const st = store.useSnapshot();
  return <Knob value={st.duty} onChange={store.setDuty} />;
};

export const PageRoot = () => {
  return (
    <div sx={qu.h("dvh").flexC()}>
      <EffectorBody className={cz(qu.wh(750, 450), qu.flexC())}>
        <div sx={qu.flexV().gap(4)}>
          <div sx={qu.flexHA().fJustify("between")}>
            <div>RTFS-P</div>
            <div sx={qu.flexHA().gap(4)}>
              <LabeledSection label="octave">
                <OctaveSelectorContainer />
              </LabeledSection>
              <LabeledBox label="duty">
                <DutyKnobContainer />
              </LabeledBox>
            </div>
          </div>
          <div sx={qu.flexH().gap(4)}>
            <LabeledSection label="pattern">
              <CurrentPatternContainer />
            </LabeledSection>
            <LabeledSection label="degrees">
              <DegreeSelectorContainer />
            </LabeledSection>
          </div>
          <div sx={qu.flexHA().gap(4)}>
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
