import { cz } from "@lib/mu2609/utils/cz";
import { JSXElement } from "solid-js";

type Props = {
  className?: string;
  label: string;
  children: JSXElement;
  onLabelClick?: () => void;
};

export const LabeledBox = (props: Props) => {
  return (
    <div class={cz("flex-vc", props.className)}>
      <div>{props.children}</div>
      <div class="w-0 flex-c">
        <div
          class={cz(
            "whitespace-nowrap",
            props.onLabelClick && "cursor-pointer",
          )}
          onClick={props.onLabelClick}
        >
          {props.label}
        </div>
      </div>
    </div>
  );
};
