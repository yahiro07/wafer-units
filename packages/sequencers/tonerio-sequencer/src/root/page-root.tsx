import { cz, qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { IconButton } from "@/components/icon-button";
import { Icons } from "@/components/icons";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { store } from "@/root/store";
import { isBitSet, seqNumbers, setBit, toggleBit } from "@/utils/helpers";

function getRandomPitch() {
  if (Math.random() < 0.2) return 0; //add weight for root note
  return Math.floor(Math.random() * 8);
}

function generateRandomStepBits() {
  const stepBits = seqNumbers(8).map(() => 0);
  let prevYi = 0;
  for (let i = 0; i < 16; i++) {
    let yi = getRandomPitch();
    if (i >= 1 && yi === prevYi) {
      //retry to reduce the same pitch
      yi = getRandomPitch();
      if (yi === prevYi) {
        yi = getRandomPitch();
      }
    }
    stepBits[yi] = setBit(stepBits[yi], i);
    prevYi = yi;
  }
  return stepBits;
}

const actions = {
  toggleStep(yi: number, xi: number) {
    const { stepBits } = store.state;
    const newStepBits = [...stepBits];
    newStepBits[yi] = toggleBit(newStepBits[yi], xi);
    store.setStepBits(newStepBits);
  },
  setOctave(value: number) {
    store.setOctave(value);
  },
  setDuty(value: number) {
    store.setDuty(value);
  },
  clearSteps() {
    store.setStepBits(seqNumbers(8).map(() => 0));
  },
  randomizeSteps() {
    const stepBits = generateRandomStepBits();
    store.setStepBits(stepBits);
  },
};

const TitleLabel = ({ title }: { title: string }) => {
  return <div sx={qu.fontSize(18).weight("bold")}>{title}</div>;
};

const MatrixPart = () => {
  const { stepBits, playPos } = store.useSnapshot();

  const styles = styleMatrixPart;
  return (
    <div class={styles.base}>
      {seqNumbers(8).map((i) => {
        const yi = 7 - i;
        return (
          <div sx={styles.row}>
            {seqNumbers(16).map((xi) => {
              const isBaseAlt = xi % 8 >= 4;
              const isStepActive = isBitSet(stepBits[yi], xi);
              const isHalfActive = playPos === xi;
              let color = "#777";
              if (isStepActive) {
                color = "#fff";
              } else if (isHalfActive) {
                color = "#999";
              } else if (isBaseAlt) {
                color = "#888";
              }
              return (
                <div
                  sx={
                    styles.cell
                    // isHalfActive && "--half-active",
                    // isStepActive && "--active",
                  }
                  style={{ background: color }}
                  onPointerDown={() => actions.toggleStep(yi, xi)}
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
      <div sx={qu.flexHA().gap(5)}>
        <div sx={qu.flexHA().gap(2)}>
          <IconButton onClick={actions.randomizeSteps}>
            <Icons.Random size={20} />
          </IconButton>
          <IconButton onClick={actions.clearSteps}>
            <Icons.Trash size={20} />
          </IconButton>
        </div>
        <div sx={qu.flexHA().gap(5)}>
          <LabeledBox label="Octave">
            <Knob
              value={octave}
              onChange={actions.setOctave}
              min={-2}
              max={2}
              step={1}
            />
          </LabeledBox>
          <LabeledBox label="Duty">
            <Knob value={duty} onChange={actions.setDuty} />
          </LabeledBox>
        </div>
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
