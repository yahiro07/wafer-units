import { npx } from "mofur/ax-ui";
import { cz, qu } from "@/common/css-realm";
import { Children } from "@/utils/jsx-types";

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
      class={cz(qu.flexV().it, className)}
      style={width ? { width: npx(width) } : undefined}
    >
      <div
        class={qu.fontSize(11).weight("bold").h(12).it}
        style={{ textAlign: labelAlign }}
      >
        {label}
      </div>
      <div class={qu.flexC().h(40).it}>{children}</div>
    </div>
  );
};
