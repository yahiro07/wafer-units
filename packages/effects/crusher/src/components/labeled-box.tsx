import { npx } from "@/utils/helpers";
import { Children } from "@/utils/jsx-types";
import { qu } from "@/utils/qstyle-goober";

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
      class={qu.flexV().addClass(className)}
      style={width ? { width: npx(width) } : undefined}
    >
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
