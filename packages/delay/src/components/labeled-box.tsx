import { npx } from "mofur/ax-ui";
import { ComponentChildren } from "preact";
import { qu } from "@/utils/qstyle-goober";

export const LabeledBox = ({
  label,
  children,
  labelAlign = "center",
  width,
}: {
  label?: string;
  labelAlign?: "left" | "center" | "right";
  children: ComponentChildren;
  width?: number;
}) => {
  return (
    <div class={qu.flexV()} style={width ? { width: npx(width) } : undefined}>
      <div
        class={qu.fontSize(11).weight("bold")}
        style={{ textAlign: labelAlign }}
      >
        {label}
      </div>
      <div class={qu.flexC().h(40)}>{children}</div>
    </div>
  );
};
