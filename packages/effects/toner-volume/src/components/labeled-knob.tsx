import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";

type Props = {
  value: number;
  label?: string;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export const LabeledKnob = (props: Props) => {
  return (
    <LabeledBox label={props.label ?? ""}>
      <Knob
        value={props.value}
        onChange={props.onChange}
        min={props.min}
        max={props.max}
        step={props.step}
      />
    </LabeledBox>
  );
};
