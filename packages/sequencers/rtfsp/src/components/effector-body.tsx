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
    <div
      class={cz(
        qu.bg("#ddd").p(4).color("#555").rounded(2).it,
        qu.bd("inset 1px #0004").it,
        className,
      )}
    >
      {children}
    </div>
  );
};
