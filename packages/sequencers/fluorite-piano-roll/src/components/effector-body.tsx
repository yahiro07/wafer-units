import { ComponentChildren } from "preact";
import { cz } from "@/utils/cz";

export const EffectorBody = ({
  children,
  className,
}: {
  children: ComponentChildren;
  className?: string;
}) => {
  return (
    <div class={cz("bg-clPanelBody p-4 text-white", className)}>
      {children}
    </div>
  );
};
