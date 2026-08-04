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
        qu.bg("#bbf").p(4).color("#222").rounded(2),
        import.meta.env.DEV && qu.bd("inset 1px #0004"),
        className,
      ]}
    >
      {children}
    </div>
  );
};

export const pageBgColor = "#bbf";
