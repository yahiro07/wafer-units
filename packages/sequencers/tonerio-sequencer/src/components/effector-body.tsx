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
        qu.bg("#acf").p(4).color("#333").it,
        import.meta.env.DEV && qu.bd("#0004").it,
        className,
      )}
    >
      {children}
    </div>
  );
};

export const pageBgColor = "#acf";
