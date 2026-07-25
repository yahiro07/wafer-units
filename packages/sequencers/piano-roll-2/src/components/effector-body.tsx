import { ComponentChildren } from "preact";
import { cz, qu } from "@/common/css-realm";
import { colors } from "@/root/theme";

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
        qu.bg(colors.panelBody).p(4).color("#fff").it,
        qu.css({ border: `inset 1px #0004` }).it,
        className,
      )}
    >
      {children}
    </div>
  );
};
