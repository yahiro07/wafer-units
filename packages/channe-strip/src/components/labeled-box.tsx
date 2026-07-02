import { npx } from "mofur/ax-ui";
import { Children } from "@/utils/jsx-types";
import { qu } from "@/utils/qstyle-goober";

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
  children?: Children;
  width?: number;
  contentHeight?: number;
}) => {
  return (
    <div
      class={qu.flexV().addClass(className)}
      style={width ? { width: npx(width) } : undefined}
    >
      <div
        class={qu.fontSize(11).weight("bold").h(13)}
        style={{ textAlign: labelAlign }}
      >
        {label}
      </div>
      <div class={qu.flexC().h(contentHeight)}>{children}</div>
    </div>
  );
};
