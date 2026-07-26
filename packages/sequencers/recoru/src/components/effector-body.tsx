import { ComponentChildren } from "preact";
import { cz, qu } from "@/common/css-realm";

export const EffectorBody = ({
  children,
  className,
}: {
  children: ComponentChildren;
  className?: string;
}) => {
  return (
    <div class={cz(qu.bg("#ccc").p(4).color("#777").it, className)}>
      {children}
    </div>
  );
};
