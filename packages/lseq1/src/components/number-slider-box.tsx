import { KnobFrame } from "beams/mo-react/components/knob-frame";

export function NumberSliderBoxView(props: {
  value: number;
  fracDigits?: number;
  displayText?: string;
}) {
  return (
    <div className="border border-[#444] bg-[#fff] w-[60px] h-[34px] flex-c">
      {props.displayText ?? props.value.toFixed(props.fracDigits ?? 2)}
    </div>
  );
}

export function FeNumberSliderBox({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  fracDigits = 0,
  displayText,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  fracDigits?: number;
  displayText?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex-vc">
      {label && <div className="text-[14px]">{label}</div>}
      <KnobFrame
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      >
        <NumberSliderBoxView
          value={value}
          fracDigits={fracDigits}
          displayText={displayText}
        />
      </KnobFrame>
    </div>
  );
}
