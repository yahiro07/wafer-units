import { npx } from "mofur/ax-ui";
import { ComponentChild } from "preact";

export const UpperLabel = ({
  label,
  children,
  yOffset = 0,
}: {
  label: string;
  children: ComponentChild;
  yOffset?: number;
}) => {
  return (
    <div className="relative">
      {children}
      <div
        className="absolute left-0 w-full text-white flex-c text-[9px] font-bold"
        style={{ top: npx(yOffset - 13) }}
      >
        {label}
      </div>
    </div>
  );
};
