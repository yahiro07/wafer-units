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
        qu.bg("#8bd").p(4).color("white").rounded(2).it,
        qu.css({ border: `inset 1px #0004` }).it,
        className,
      )}
    >
      {children}
    </div>
  );
};
