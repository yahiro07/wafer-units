import { Children } from "@/utils/jsx-types";
import { qlsx, qu } from "@/utils/qstyle-goober";

export const EffectorBody = ({
  children,
  className,
}: {
  children: Children;
  className?: string;
}) => {
  return (
    <div
      class={qlsx(
        qu.bg("#ddd").p(4).color("#333").rounded(2),
        qu.css({ border: `inset 1px #0004` }),
        className,
      )}
    >
      {children}
    </div>
  );
};
