import { ComponentChildren } from "preact";
import { cz, qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { seqNumbers } from "@/utils/helpers";

const presets = [
  { degrees: "R", pattern: "_ooo", hint: "bass 16th x3" },
  { degrees: "R", pattern: "__oo", hint: "bass 16th x2" },
  { degrees: "R", pattern: "__o>", hint: "bass 8th" },
  //if pattern includes p,q,r (other than o)
  //it's an arpeggio and number of degree selection should be fixed
  { degrees: "R8", pattern: "o>p>", hint: "bass 8th octave altering" },
  { degrees: "R5", pattern: "o>p>", hint: "bass 8th(dur) 5th(pitch) altering" },
  { degrees: "R35", pattern: "o>p>q>p>", hint: "arp" },
  { degrees: "R358", pattern: "opqr", hint: "arp" },
  //various arp patterns could be added here
  { degrees: "R", pattern: "o16", hint: "whole note" },
  { degrees: "R358", pattern: "o16", hint: "whole note" },
  { degrees: "R", pattern: "o32", hint: "2 bars note" },
  { degrees: "R358", pattern: "o32", hint: "2 bars note" },
  { degrees: "R", pattern: "ooo>", hint: "trans gate" },
  { degrees: "R8", pattern: "ooo>", hint: "trans gate" },
  { degrees: "R", pattern: "o>_o>_o>", hint: "trans gate" },
];

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

const PatternCard = ({ index }: { index?: number }) => {
  return <div class={qu.bd("#888").w(100).h(40).it}>{index}</div>;
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
