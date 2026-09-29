import { cz } from "@lib/mu2609/utils/cz";
import { ComponentChildren } from "preact";

export const LabeledBox = ({
  className,
  label,
  children,
  onLabelClick,
  valueText,
}: {
  className?: string;
  label: string;
  children: ComponentChildren;
  onLabelClick?: () => void;
  valueText?: string;
}) => {
  return (
    <div class={cz("flex-vc", className)}>
      <div class="w-30px flex-c">
        <div
          class={cz(
            "text-14px font-600 whitespace-nowrap",
            onLabelClick && "cursor-pointer",
          )}
          onClick={onLabelClick}
        >
          {label}
        </div>
      </div>
      <div>{children}</div>
      <div
        class={cz(
          "w-40px h-16px flex-c mt-2px",
          "bg-#333 rounded-xs text-white text-xs",
        )}
      >
        {valueText}
      </div>
    </div>
  );
};
