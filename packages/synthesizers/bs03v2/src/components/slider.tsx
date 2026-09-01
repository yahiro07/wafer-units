import { css } from "@/common/css-realm";
import { KnobFrame } from "@/components/headless/knob-frame";
import { linearInterpolate } from "@/utils/helpers";
import { flexC } from "@/utils/utility-styles";

export const Slider = ({
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  invertY,
  toggleOnClick,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  invertY?: boolean;
  toggleOnClick?: boolean;
}) => {
  const d = 24.5;
  let transY = linearInterpolate(value, min, max, d, -d);
  if (invertY) {
    transY *= -1;
  }
  const toggle = () => {
    if (value < (max - min) / 2) {
      onChange(max);
    } else {
      onChange(min);
    }
  };
  return (
    <KnobFrame
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      invertY={invertY}
      onClick={toggleOnClick ? toggle : undefined}
    >
      <div class={styles}>
        <div
          class="tick"
          style={{
            transform: `translateY(${transY}px)`,
          }}
        />
      </div>
    </KnobFrame>
  );
};
const styles = css({
  width: "30px",
  height: "80px",
  ...flexC(),
  position: "relative",
  background: "#a0a6b4",
  border: "inset 0.5px #222",
  "> .tick": {
    width: "100%",
    height: "30px",
    background: "#ddd",
    border: "outset 0.5px #666",
  },
});
