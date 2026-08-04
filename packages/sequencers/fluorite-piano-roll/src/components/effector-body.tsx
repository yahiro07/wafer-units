import { ComponentChildren } from "preact";
import { qu } from "@/common/css-realm";
import { colors } from "@/editor/theme";

export const EffectorBody = ({
  children,
  className,
}: {
  children: ComponentChildren;
  className?: string;
}) => {
  return (
    <div sx={[qu.bg(colors.panelBody).p(4).color("#fff"), className]}>
      {children}
    </div>
  );
};
