import { npx } from "mofur/ax-ui";
import { Children } from "@/utils/jsx-types";
import { qu } from "@/utils/qulex-goober";

export const LabeledBox = ({
  className,
  label,
  children,
  labelAlign = "center",
  width,
}: {
  className?: string;
  label?: string;
  labelAlign?: "left" | "center" | "right";
  children?: Children;
  width?: number;
}) => {
  return (
    <div
      class={qu.flexV().addClass(className).it}
      style={width ? { width: npx(width) } : undefined}
    >
      <div
        class={qu.fontSize(11).weight("bold").it}
        style={{ textAlign: labelAlign }}
      >
        {label}
      </div>
      <div class={qu.flexC().h(40).it}>{children}</div>
    </div>
  );
};
