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
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) => {
  const d = 24.5;
  const transY = linearInterpolate(value, min, max, d, -d);
  return (
    <KnobFrame
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    >
      <div class={styles}>
        <div class="tick" style={{ transform: `translateY(${transY}px)` }} />
      </div>
    </KnobFrame>
  );
};
const styles = css({
  width: "30px",
  height: "80px",
  ...flexC(),
  position: "relative",
  background: "#444",
  border: "inset 0.5px #222",
  "> .tick": {
    width: "100%",
    height: "30px",
    background: "#999",
    border: "outset 0.5px #666",
  },
});
