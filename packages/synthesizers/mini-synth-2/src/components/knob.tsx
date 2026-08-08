import { KnobFrame } from "@/components/knob-frame";
import { linearInterpolate } from "@/utils/helpers";
import { css, cx } from "@twind/core";

export const Knob = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const min = 0;
  const max = 1;
  const tickAngle = linearInterpolate(value, min, max, -135, 135);
  return (
    <KnobFrame value={value} min={0} max={1} step={0.01} onChange={onChange}>
      <div class={styles.base}>
        <div class={styles.inner}></div>
        <div
          class={styles.tickPlane}
          style={{ transform: `rotate(${tickAngle}deg)` }}
        >
          <div class={styles.tick} />
        </div>
      </div>
    </KnobFrame>
  );
};
const styles = {
  base: css({
    "@apply": "relative rounded-full",
    width: "60px",
    height: "60px",
    background: "linear-gradient(to bottom, #fff, #0008)",
    padding: "3px",
    border: "solid 0.5px #4448",
  }),
  inner: css({
    "@apply": "w-full h-full rounded-full",
    background: "#eee",
  }),
  tickPlane: css({
    "@apply": "absolute-full flex-va",
  }),
  tick: cx("w-[4px] h-[15px]", "bg-clKnobTick"),
};
