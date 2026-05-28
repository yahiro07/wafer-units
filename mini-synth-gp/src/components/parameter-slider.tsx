type ParameterSliderProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onInput: (value: number) => void;
};

export function ParameterSlider(props: ParameterSliderProps) {
  return (
    <label class="flex-ha h-9 w-full gap-2 text-xs">
      <span class="w-14 text-zinc-200">{props.label}</span>
      <input
        type="range"
        class="h-5 w-[170px] accent-amber-400"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onInput={(event) => {
          props.onInput(Number(event.currentTarget.value));
        }}
      />
      <span class="w-9 text-right text-zinc-400">
        {props.value.toFixed(props.step >= 1 ? 0 : 2)}
      </span>
    </label>
  );
}
