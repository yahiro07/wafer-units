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
        qu.bg("#acf").p(4).color("#333"),
        import.meta.env.DEV && qu.bd("#0004"),
        className,
      ]}
    >
      {children}
    </div>
  );
};

export const pageBgColor = "#acf";
