import { ComponentChildren } from "preact";
import { qu } from "@/common/css-realm";
import { uiColors } from "@/common/ui-theme";

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
        qu.bg(uiColors.clPageBg).py(5).color(uiColors.clPageTxt).rounded(2),
        import.meta.env.DEV && qu.bd("solid 1px #0004"),
        className,
      ]}
    >
      {children}
    </div>
  );
};
