import { Children } from "@/common/jsx-types";
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
        qu.bg("#fd6").p(4).color("#333").rounded(8),
        qu.css({ border: `inset 3px #aaa4` }),
        className,
      )}
    >
      {children}
    </div>
  );
};
