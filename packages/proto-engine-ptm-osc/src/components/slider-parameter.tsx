export function SliderParameter(props: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  const isDiscrete = props.step && props.step >= 1;

  return (
    <div class="flex-ha h-8 text-[10px] tracking-[0.12em] text-[#d7dfeb] gap-2">
      <div class="w-[72px] text-[#a8b4c0]">{props.label}</div>
      <input
        type="range"
        min={props.min ?? 0}
        max={props.max ?? 1}
        step={props.step ?? 0.01}
        value={props.value}
        class="flex-1 accent-[#2ec965]"
        onInput={(e) => props.onChange(Number(e.currentTarget.value))}
      />
      <div class="w-[22px] text-right text-[#f8f8f8]">
        {isDiscrete ? Math.round(props.value) : props.value.toFixed(2)}
      </div>
    </div>
  );
}
