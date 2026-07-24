import { cz, qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { store } from "@/root/store";
import { isBitSet, seqNumbers, toggleBit } from "@/utils/helpers";

const TitleLabel = ({ title }: { title: string }) => {
  return <div class={qu.fontSize(18).weight("bold").it}>{title}</div>;
};

const MatrixPart = () => {
  const { stepBits, playPos } = store.useSnapshot();

  const toggleStep = (yi: number, xi: number) => {
    const newStepBits = [...stepBits];
    newStepBits[yi] = toggleBit(newStepBits[yi], xi);
    store.setStepBits(newStepBits);
  };

  return (
    <div class={qu.flexV().gap(1).it}>
      {seqNumbers(8).map((i) => {
        const yi = 7 - i;
        return (
          <div class={qu.flexHA().gap(1).it}>
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
                  class={qu.wh(20, 20).cp().it}
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
    <div class={qu.w("full").flexHA().gap(2).justify("between").it}>
      <TitleLabel title="Tonerio Sequencer" />
      <div class={qu.flexHA().gap(6).it}>
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
    <div class={qu.flexC().it}>
      <EffectorBody className={cz(qu.wh(480, 280).pt(2).it, qu.flexVC().it)}>
        <div class={qu.flexV().gap(1).it}>
          <ControlsPart />
          <MatrixPart />
        </div>
      </EffectorBody>
    </div>
  );
};
