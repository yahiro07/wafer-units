import { ComponentChildren } from "preact";
import { qu } from "@/common/css-realm";

export const EffectorBody = ({
  children,
  className,
}: {
  children: ComponentChildren;
  className?: string;
}) => {
  return (
    <div
      sx={[
        qu.bg("#8bd").p(4).color("white").rounded(2),
        qu.bd("inset 1px #0004"),
        className,
      ]}
    >
      {children}
    </div>
  );
};
