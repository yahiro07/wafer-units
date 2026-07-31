import { ComponentChildren } from "preact";
import { qu } from "@/ui/common/css-realm";
import { npx } from "@/utils/helpers";

export const LabeledBox = ({
  className,
  label,
  children,
  labelAlign = "center",
  width,
  contentHeight = 40,
}: {
  className?: string;
  label?: string;
  labelAlign?: "left" | "center" | "right";
  children?: ComponentChildren;
  width?: number;
  contentHeight?: number;
}) => {
  return (
    <div
      class={qu.flexV().addClass(className).it}
      style={width ? { width: npx(width) } : undefined}
    >
      <div
        class={qu.fontSize(11).weight("bold").h(13).it}
        style={{ textAlign: labelAlign }}
      >
        {label}
      </div>
      <div class={qu.flexC().h(contentHeight).it}>{children}</div>
    </div>
  );
};
