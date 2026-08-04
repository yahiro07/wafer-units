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
        qu.bg("#ddd").p(4).color("#333").rounded(2),
        import.meta.env.DEV && qu.bd("inset 1px #0004"),
        className,
      ]}
    >
      {children}
    </div>
  );
};

export const pageBgColor = "#ddd";
