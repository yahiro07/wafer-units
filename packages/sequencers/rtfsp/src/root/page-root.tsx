import { cz, qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { seqNumbers } from "@/utils/helpers";

const PatternCard = () => {
  return <div class={qu.bd("#888").w(100).h(40).it}>1</div>;
};

const PatternList = () => {
  return (
    <div class={qu.flexH().gap(2).w(600).css({ flexWrap: "wrap" }).it}>
      {seqNumbers(20).map((i) => (
        <PatternCard key={i} />
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
            <LabeledBox label="duty">
              <Knob value={0.5} onChange={() => {}} />
            </LabeledBox>
          </div>
          <PatternList />
          <Timeline />
        </div>
      </EffectorBody>
    </div>
  );
};
