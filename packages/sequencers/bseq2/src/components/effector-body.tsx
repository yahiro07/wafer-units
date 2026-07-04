import { cz, qu } from "@/common/css-realm";
import { Children } from "@/utils/jsx-types";

export const EffectorBody = ({
  children,
  className,
}: {
  children: Children;
  className?: string;
}) => {
  return (
    <div
      class={cz(
        qu.bg("#ddd").p(4).color("#333").rounded(2).it,
        qu.css({ border: `inset 1px #0004` }).it,
        className,
      )}
    >
      {children}
    </div>
  );
};
