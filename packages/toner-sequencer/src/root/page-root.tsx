import { isBitSet, seqNumbers, toggleBit } from "mofur/ax";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { store } from "@/root/store";
import { qlsx, qu } from "@/utils/qstyle-goober";

const TitleLabel = ({ title }: { title: string }) => {
  return <div class={qu.fontSize(18).weight("bold")}>{title}</div>;
};

const MatrixPart = () => {
  const { stepBits, playPos } = store.useSnapshot();

  const toggleStep = (yi: number, xi: number) => {
    const newStepBits = [...stepBits];
    newStepBits[yi] = toggleBit(newStepBits[yi], xi);
    store.setStepBits(newStepBits);
  };

  return (
    <div class={qu.flexV().gap(1)}>
      {seqNumbers(10).map((i) => {
        const yi = 9 - i;
        return (
          <div class={qu.flexHA().gap(1)}>
            {seqNumbers(16).map((xi) => {
              const isStepActive = isBitSet(stepBits[yi], xi);
              const isHalfActive = playPos === xi;
              let color = "#888";
              if (isStepActive) {
                color = "#fff";
              } else if (isHalfActive) {
                color = "#999";
              }
              return (
                <div
                  class={qu.wh(20, 20).cp()}
                  style={{ background: color }}
                  onPointerDown={() => toggleStep(yi, xi)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const ControlsPart = () => {
  const { octave, duty } = store.useSnapshot();
  return (
    <div class={qu.wFull().flexHA().gap(2).justify("between")}>
      <TitleLabel title="Toner Sequencer" />
      <div class={qu.flexHA().gap(6)}>
        <LabeledBox label="Octave">
          <Knob
            value={octave}
            onChange={(value) => store.setOctave(value)}
            min={-2}
            max={2}
            step={1}
          />
        </LabeledBox>
        <LabeledBox label="Duty">
          <Knob value={duty} onChange={(value) => store.setDuty(value)} />
        </LabeledBox>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class={qu.flexC()}>
      <EffectorBody className={qlsx(qu.wh(480, 330), qu.flexVC())}>
        <div class={qu.flexV().gap(1)}>
          <ControlsPart />
          <MatrixPart />
        </div>
      </EffectorBody>
    </div>
  );
};
