import { ComponentChildren } from "preact";
import { cz } from "@/utils/cz";

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
      class={cz("flex-v", className)}
      style={width ? { width } : undefined}
    >
      <div
        class="text-11px font-bold h-13px"
        style={{ textAlign: labelAlign }}
      >
        {label}
      </div>
      <div class="flex-c" style={{ height: contentHeight }}>
        {children}
      </div>
    </div>
  );
};
