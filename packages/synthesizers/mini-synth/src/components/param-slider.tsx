import type { JSXElement } from "solid-js";

interface ParamSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  formatValue?: (v: number) => string;
  onChange: (value: number) => void;
}

export const ParamSlider = (props: ParamSliderProps): JSXElement => {
  const fillPct = () => {
    const pct = ((props.value - props.min) / (props.max - props.min)) * 100;
    return `${pct.toFixed(1)}%`;
  };

  const displayValue = () =>
    props.formatValue ? props.formatValue(props.value) : props.value.toFixed(2);

  return (
    <div class="flex-ha gap-2 w-full px-3">
      <span
        class="text-xs text-neutral-400 shrink-0"
        style={{ width: "50px", "text-align": "left" }}
      >
        {props.label}
      </span>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        class="synth-slider flex-1"
        style={{ "--slider-fill": fillPct() }}
        onInput={(e) =>
          props.onChange(Number.parseFloat(e.currentTarget.value))
        }
      />
      <span
        class="text-xs text-neutral-200 shrink-0 font-mono"
        style={{ width: "30px", "text-align": "right" }}
      >
        {displayValue()}
      </span>
    </div>
  );
};
