import { linearInterpolate } from "@lib/mu2609/utils/helpers";
import { mergeProps } from "solid-js";
import { KnobFrame } from "./knob-frame";
import styles from "./knob.module.css";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export const Knob = (inputProps: Props) => {
  const props = mergeProps({ min: 0, max: 1, step: 0.01 }, inputProps);
  const tickAngle = () =>
    linearInterpolate(props.value, props.min, props.max, -135, 135);
  return (
    <KnobFrame
      value={props.value}
      min={props.min}
      max={props.max}
      step={props.step}
      onChange={props.onChange}
    >
      <div class={styles.knob}>
        <div class={styles.inner}></div>
        <div
          class={styles["tick-plane"]}
          style={{ transform: `rotate(${tickAngle()}deg)` }}
        >
          <div class={styles.tick} />
        </div>
      </div>
    </KnobFrame>
  );
};
