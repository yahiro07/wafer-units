import { ComponentChildren } from "preact";
import { qu } from "@/common/css-realm";
import { npx } from "@/utils/helpers";

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
  children?: ComponentChildren;
  width?: number;
}) => {
  return (
    <div
      sx={[qu.flexV(), className]}
      style={width ? { width: npx(width) } : undefined}
    >
      <div
        sx={qu.fontSize(11).weight("bold").h(12)}
        style={{ textAlign: labelAlign }}
      >
        {label}
      </div>
      <div sx={qu.flexC().h(40)}>{children}</div>
    </div>
  );
};
