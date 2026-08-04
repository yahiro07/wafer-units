import { cz, qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { store } from "@/root/store";
import { isBitSet, seqNumbers, toggleBit } from "@/utils/helpers";

const TitleLabel = ({ title }: { title: string }) => {
  return <div sx={qu.fontSize(18).weight("bold")}>{title}</div>;
};

const MatrixPart = () => {
  const { stepBits, playPos } = store.useSnapshot();

  const toggleStep = (yi: number, xi: number) => {
    const newStepBits = [...stepBits];
    newStepBits[yi] = toggleBit(newStepBits[yi], xi);
    store.setStepBits(newStepBits);
  };

  const styles = styleMatrixPart;
  return (
    <div class={styles.base}>
      {seqNumbers(8).map((i) => {
        const yi = 7 - i;
        return (
          <div sx={styles.row}>
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
                  sx={
                    styles.cell
                    // isHalfActive && "--half-active",
                    // isStepActive && "--active",
                  }
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
const styleMatrixPart = {
  base: cz(qu.flexV().gap(1)),
  row: cz(qu.flexHA().gap(1)),
  cell: cz(qu.wh(20, 20).cursor("pointer"), {
    background: "#888",
    //not working in qulex 0.1.7, bug?
    // "&.--half-active": {
    //   background: "#999",
    // },
    // "&.--active": {
    //   background: "#fff",
    // },
  }),
};

const ControlsPart = () => {
  const { octave, duty } = store.useSnapshot();
  return (
    <div sx={qu.w("full").flexHA().gap(2).fJustify("between")}>
      <TitleLabel title="Tonerio Sequencer" />
      <div sx={qu.flexHA().gap(6)}>
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
    <div sx={qu.flexC()}>
      <EffectorBody className={cz(qu.wh(480, 280).pt(2), qu.flexVC())}>
        <div sx={qu.flexV().gap(1)}>
          <ControlsPart />
          <MatrixPart />
        </div>
      </EffectorBody>
    </div>
  );
};
